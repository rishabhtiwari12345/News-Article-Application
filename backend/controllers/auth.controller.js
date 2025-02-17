import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // सभी फील्ड्स चेक करें
    if (!username || !email || !password) {
      next(errorHandler(400, 'All fields are required'));
    }

    // पहले से registered user check करें
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'यह ईमेल पहले से उपयोग में है' });
    }

    // पासवर्ड को Hash करें
    const hashedPassword = await bcryptjs.hash(password, 10);

    // नया यूजर बनाएं
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // यूजर को DB में सेव करें
    await newUser.save();

    res.status(201).json({ message: 'Signup सफल हुआ', user: newUser });
  } catch (error) {
    next(error);
  }
};
