import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Corrected the typo from 'require' to 'required'
      unique: true,
      index: true, // Adding index for performance improvement in case of large database
    },
    email: {
      type: String,
      required: true, // Corrected the typo from 'require' to 'required'
      unique: true,
      index: true, // Adding index for email field for better performance
    },
    password: {
      type: String,
      required: true, // Corrected the typo from 'require' to 'required'
    },
    profilePicture: {
      type: String,
      default: 'https://www.flaticon.com/free-icon/user_3177440', // Default profile picture
    },
  },
  { timestamps: true }
);

// Indexing email and username to optimize lookups
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

export default User;
