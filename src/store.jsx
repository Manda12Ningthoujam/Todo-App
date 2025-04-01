import { applyMiddleware,createStore } from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASK = "task/fetch";

const initialState = {
  task: []
}

const taskReducer = (state=initialState,action)=>{
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload]
      }

    case DELETE_TASK:{
      const updatedTask = state.task.filter((_,index)=>{
        return index !== action.payload
      })
      return {
        ...state,
        task: updatedTask
      }
    } 
    case FETCH_TASK:{
      return {
        ...state,
        task: [...state.task, ...action.payload]
      } 
    } 
    default:
      return state;
  }
}


export const store = createStore(taskReducer, composeWithDevTools(applyMiddleware(thunk)));

export const addTask = (data)=> {
  return {type: ADD_TASK, payload: data}
}

export const deleteTask = (id)=>{
  return {type: DELETE_TASK, payload: id}
}

export const fetchTask = () => {
  return async (dispatch) =>{
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
      const task = await res.json();
      dispatch({type: FETCH_TASK, payload: task.map((currTask)=>currTask.title)});
    } catch (error) {
      console.log(error);
    }
  }
}

store.dispatch(addTask("Water Plant"))

store.dispatch({type: ADD_TASK, payload: "Exercise 1 hour"});

