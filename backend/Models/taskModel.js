const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Phonenumber: { type: Number, require: true, unique: true },
    Email: { type: String, required: true, unique: true },
    hobbies: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TasktModel = mongoose.model('taskmodel', taskSchema);

module.exports = {TasktModel};
