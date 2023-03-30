import * as types from './actionTypes';
import axios from 'axios';

const getTasks = (tasks) => ({
  type: types.GET_TASK,
  payload: tasks,
});

const taskDeleted = () => ({
  type: types.DELETE_TASK,
});

const taskAdded = () => ({
  type: types.ADD_TASK,
});

const getsingleTask = (singletask) => ({
  type: types.GET_SINGLE_TASK,
  payload: singletask,
});

const taskUpdated = () => ({
  type: types.UPDATE_TASK,
});

export const loadTasks = () => {
  return function (dispatch) {
    axios
      .get(`http://localhost:8080/task`)
      .then((res) => {
        dispatch(getTasks(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteTask = (id) => {
  return function (dispatch) {
    axios
      .delete(`http://localhost:8080/task/${id}`)
      .then((res) => {
        dispatch(taskDeleted());
        dispatch(loadTasks());
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addTask = (task, toast) => {
  return function (dispatch) {
    axios
      .post(`http://localhost:8080/task/post`, task)
      .then((res) => {

        dispatch(taskAdded());

        toast({
          title: 'form is Added 😄',
          status: 'success',
          duration: 7000,
          isClosable: true,
          position: 'top',
        });

        dispatch(loadTasks());

      })
      .catch((err) => {
        toast({
          title: 'something went wrong',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      });
  };
};

export const getSingleTasks = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:8080/task/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getsingleTask(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateTask = (task, id) => {
  return function (dispatch) {
    axios
      .patch(`http://localhost:8080/task/${id}`, task)
      .then((res) => {
        console.log(res.data);
        dispatch(taskUpdated());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
