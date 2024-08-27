import { useState, useEffect } from "react";
import axios from "axios";
import './Todo.css'; // Import the CSS file

function Todo() {
    let [todos, setTodos] = useState([]);
    let [todoEntered, setTodoEntered] = useState("");
    let [statusEntered, setStatusEntered] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [editTodoId, setEditTodoId] = useState(null);
    let [editName, setEditName] = useState("");
    let [editStatus, setEditStatus] = useState(false);

    useEffect(() => {
        console.log("Fetching todos on load");
        getTodos();
    }, []);

    async function getTodos() {
        try {
            let response = await axios.get("http://localhost:3005/todos");
            console.log("Todos fetched:", response.data);
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos", error);
        }
    }

    function handleTodoChange(e) {
        setTodoEntered(e.target.value);
    }

    function handleStatusChange(e) {
        setStatusEntered(e.target.value === "completed");
    }

    async function addTodo() {
        let newTodoObject = { name: todoEntered, status: statusEntered };
        try {
            let response = await axios.post("http://localhost:3005/todos", newTodoObject);
            console.log("Todo added:", response.data);
            if (response.data.status === 1) {
                getTodos();
            }
        } catch (err) {
            console.error("Error adding todo", err);
        }
    }

    async function deleteTodo(id) {
        try {
            let response = await axios.delete(`http://localhost:3005/todos/${id}`);
            console.log("Todo deleted:", response.data);
            getTodos();
        } catch (error) {
            console.error("Error deleting todo", error);
        }
    }

    function startEditing(todo) {
        setEditMode(true);
        setEditTodoId(todo._id);
        setEditName(todo.name);
        setEditStatus(todo.status);
    }

    async function updateTodo() {
      let updatedTodo = { name: editName, status: editStatus };
      try {
          let response = await axios.put(`http://localhost:3005/todos/${editTodoId}`, updatedTodo);
          console.log("Todo updated:", response.data);
          if (response.data.status === 1) {
              getTodos();
              setEditMode(false);
              setEditTodoId(null);
          }
      } catch (err) {
          console.error("Error updating todo", err);
      }
  }
  

    function reset() {
        setTodos([]);
    }

    return (
        <div className="Todos">
            <h1>Todos</h1>
            {!editMode ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Todo"
                        value={todoEntered}
                        onChange={handleTodoChange}
                    />
                    <select onChange={handleStatusChange}>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                    <button onClick={addTodo}>Add Todo</button>
                    <button onClick={reset}>Reset All</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Edit Todo"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <select onChange={(e) => setEditStatus(e.target.value === "completed")} value={editStatus ? "completed" : "incomplete"}>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                    <button onClick={updateTodo}>Update Todo</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
            )}

            {todos.map((todo) => (
                <div key={todo._id} className="todo-item">
                    <p>{todo.name}</p>
                    <p>Status: {todo.status ? "Completed" : "Incomplete"}</p>
                    <button className="todo-edit" onClick={() => startEditing(todo)}>Edit</button>
                    <button className="todo-delete" onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Todo;
