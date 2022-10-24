import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";
import { TASK_URL } from "./lib/constants";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(TASK_URL)
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks));
  }, []);
  console.log(tasks, "tasks");


  
  function handleAddTask(task) {
    setTasks(tasks.concat(task));
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task._id !== id));
  }
  function editTask(task) {
    let updateTask = tasks.map((t) =>{
      if(task._id === t._id){
        return task
      }return t;
    })
    setTasks(updateTask)
  }
  return (
    <div className="App">
      <AddTask handleAddTask={handleAddTask} />
      <Tasks tasks={tasks} removeTask={removeTask} editTask={editTask}/>
    </div>
  );
}

export default App;
