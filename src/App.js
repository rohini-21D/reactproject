import React, { useState } from "react";
import "./App.css";

function App() {
  
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList([...todoList, task]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedTaskName(task.taskName);
  };

  const editTask = () => {
    setTodoList(
      todoList.map((task) =>
        task.id === editingTask ? { ...task, taskName: editedTaskName } : task
      )
    );
    setEditingTask(null);
    setEditedTaskName("");
  };

  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="back_imag">
      <div className="App">
        <h1>To-Do List</h1>
        <div className="addTask">
          <input value={newTask} onChange={handleChange} placeholder="Add a task" />
          <button onClick={addTask}>Add Task</button>
          </div>
          <div className="list">
            {todoList.map((task) => (
              <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
                {editingTask === task.id ? (
                <>
                  <input value={editedTaskName} onChange={(e) => setEditedTaskName(e.target.value)}/>
                   <button onClick={editTask}>Save</button>
                </>) 
                : 
              (
              <>
                <h2>{task.taskName}</h2>
                <button onClick={() => toggleComplete(task.id)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>X</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;
