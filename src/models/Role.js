import mongoose from "mongoose";

const { model, Schema } = mongoose;

const Role = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

export default model('roles', Role);
