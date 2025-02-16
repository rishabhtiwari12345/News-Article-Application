import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // सभी फील्ड्स चेक करें
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'सभी फ़ील्ड अनिवार्य हैं' });
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
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};
