import * as types from './actionTypes';

const initialState = {
  tasks: [],
  singletask: {},
  loading: true,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TASK:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    case types.DELETE_TASK:
    case types.ADD_TASK:
    case types.UPDATE_TASK:
      return {
        ...state,
        loading: false,
      };

    case types.GET_SINGLE_TASK:
      return {
        ...state,
        singletask: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default taskReducer;
