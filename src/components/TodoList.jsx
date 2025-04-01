import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, fetchTask } from '../store';


const TodoList = () => {
  const [task, setTask] = useState("");

  const tasks = useSelector((state)=>state.task);

  const dispatch = useDispatch();

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    dispatch(addTask(task));
    return setTask("");
  }

  const handleTaskDelete = (id)=>{
    return dispatch(deleteTask(id));
  }

  const handleFetchTasks = ()=>{
    dispatch(fetchTask());
  }

  return (
    <div className="container">
      <h2 className="card-title text-center">TodoList App</h2>
      <div className="card bg-light mt-2">
        <div className="card-body">
          
          {/* Input Section */}
          
            <form onSubmit={handleFormSubmit} className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Write your todo..."
              id="input"
              value={task}
              onChange={(e)=>setTask(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
            </form>
            <button  className="btn btn-primary mb-3" onClick={handleFetchTasks}>Fetch Tasks</button>
         
          {/* Todo Items Section */}
          <ul className="list-group">
            {tasks.map((currTask, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {index + 1}. {currTask}
                </span>
                <button className="btn btn-danger" onClick={()=>handleTaskDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

