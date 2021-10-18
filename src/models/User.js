import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { model, Schema } = mongoose;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'roles',
  }
}, {
  timestamps: true,
  versionKey: false,
  strict: false
});

User.methods.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

User.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model('users', User);
