import React from "react";
import { TASK_URL } from "../lib/constants";

export default function Tasks(props) {
  function handleDelete(id) {
    fetch(TASK_URL + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        props.removeTask(res.id);
      });
  }
  function handleEdit(id){
    let updatedTask = prompt("please provide the updated task");
    if(!updatedTask.trim())return
    fetch(TASK_URL+id,{
      method:"PUT",
      body: JSON.stringify({ text: updatedTask }),
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then(res=>res.json())
    .then((res) => {
      props.editTask(res)
    })
  }
  return (
    <div className="tasks">
      <ul>
        {props.tasks.map((task) => {
          return (
            <div className="tasks_ul">
              <li>{task.text}</li>
              <span>
                <button onClick={() => handleEdit(task._id)}>Edit</button>
              </span>
              <span>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
