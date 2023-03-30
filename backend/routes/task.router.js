const express = require('express');
const { TasktModel } = require('../Models/taskModel');
const taskControl = express.Router();

taskControl.get('/', async (req, res) => {
  try {
    const taskList = await TasktModel.find();
    return res.status(200).send(taskList);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

taskControl.get('/:id', async (req, res) => {
  const { id } = req.params;
  const singleTask = await TasktModel.findOne({ _id: id });
  res.send(singleTask);
});

taskControl.post('/post', async (req, res) => {
  try {
    const newTask = await TasktModel.create(req.body);
    return res
      .status(200)
      .send({ message: 'NewTask added successfully', newTask });
  } catch (err) {
    return res.status(500).send('newTask added failed');
  }
});

taskControl.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await TasktModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).send({ message: 'Task Updated', updatedTask });
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
});

taskControl.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await TasktModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: ' Task Deleted successfully' });
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
});

module.exports = { taskControl };
