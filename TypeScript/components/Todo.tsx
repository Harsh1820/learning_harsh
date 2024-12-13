import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

interface TodoItem {
  name: string;
  status: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      axios.put(`http://localhost:3001/todos/${editIndex}`, { name, status })
        .then(response => {
          const updatedTodos = [...todos];
          updatedTodos[editIndex] = { name, status };
          setTodos(updatedTodos);
          setName('');
          setStatus('');
          setEditIndex(null);
        })
        .catch(error => console.error('Error updating todo', error));
    } else {
      axios.post('http://localhost:3001/todos', { name, status })
        .then(response => {
          setTodos([...todos, { name, status }]);
          setName('');
          setStatus('');
        })
        .catch(error => console.error('Error adding todo', error));
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setName(todos[index].name);
    setStatus(todos[index].status);
  };

  const handleDelete = (index: number) => {
    axios.delete(`http://localhost:3001/todos/${index}`)
      .then(response => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error deleting todo', error));
  };

  return (
    <div className="todo-container">
      <h2 className="todo-heading">Todo List</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="todo-name">Name:</label>
          <input type="text" id="todo-name" value={name} onChange={e => setName(e.target.value)} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="todo-status">Status:</label>
          <input type="text" id="todo-status" value={status} onChange={e => setStatus(e.target.value)} className="form-input" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <div className="todo-content">
              <span className="todo-name">{todo.name}</span>
              <span className="todo-status">{todo.status}</span>
            </div>
            <div className="todo-actions">
              <button className="action-button edit-button" onClick={() => handleEdit(index)}>Edit</button>
              <button className="action-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
