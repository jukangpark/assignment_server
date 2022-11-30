import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId }],
  comments: [{ type: mongoose.Schema.Types.ObjectId }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
