import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../services/api';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { token } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(token);
      setTodos(todos);
    };

    fetchTodos();
  }, [token]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const todo = await addTodo({ text: newTodo }, token);
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleToggle = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const updatedTodo = await updateTodo(id, { ...todo, completed: !todo.completed }, token);
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id, token);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTodo}>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="New Todo" 
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
