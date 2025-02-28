import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    console.log(req.body);

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, 'Wrong Credentials'));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, profilePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );

      const { password: pass, ...rest } = user._doc;

      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    // sucide_machine
    const newUser = new User({
      username:
        name.toLowerCase().split(' ').join('') +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: profilePhotoUrl,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = newUser._doc;

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
