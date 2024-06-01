import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  
  const getLocalItems = () => {
    let list = localStorage.getItem('TodoList');
    if (list) {
      list = JSON.parse(list);
     
      return list.map(item => typeof item === 'string' ? { text: item, completed: false } : item);
    } else {
      return [];
    }
  };


  const [ListTodo, setListTodo] = useState(getLocalItems());
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [inputValue, setInputValue] = useState('');

  const addList = (inputText) => {
    if (inputText.trim() !== "") {
      setListTodo([...ListTodo, { text: inputText.trim(), completed: false }]);
      setInputValue(''); 
    }
  }

  const deleteListItem = (key) => {
    let newListTodo = [...ListTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  }
  const toggleCompletion = (index) => {
    let newListTodo = [...ListTodo];
    newListTodo[index].completed = !newListTodo[index].completed;
    setListTodo([...newListTodo]);
  }

  const filteredList = ListTodo.filter(item => {
    if (filter === 'completed') return item.completed;
    if (filter === 'not_completed') return !item.completed;
    return true;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sort === 'asc') return a.text.localeCompare(b.text);
    if (sort === 'desc') return b.text.localeCompare(a.text);
    return 0;
  });
  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(ListTodo));
  }, [ListTodo]);

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-header">Todo List</h1>
      <input
        type="text"
        className="todo-list-input"
        placeholder="Add a new task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addList(inputValue);
          }
        }}
      />
      <button className="todo-list-button" onClick={() => addList(inputValue)}>Add Task</button>

      <h2>TODO List</h2>
      <ul>
        {sortedList.map((task, index) => (
          <li key={index} className="todo-list-item">
            <input
              type="checkbox"
              className="todo-list-checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
            <button className="todo-list-delete-button" onClick={() => deleteListItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="todo-list-filters">
        <button className="todo-list-filter-button" onClick={() => setFilter('all')}>All</button>
        <button className="todo-list-filter-button" onClick={() => setFilter('completed')}>Completed</button>
        <button className="todo-list-filter-button" onClick={() => setFilter('not_completed')}>Not Completed</button>
      </div>
      <div className="todo-list-sort-buttons">
        <button className="todo-list-sort-button" onClick={() => setSort('default')}>Default</button>
        <button className="todo-list-sort-button" onClick={() => setSort('asc')}>Sort A-Z</button>
        <button className="todo-list-sort-button" onClick={() => setSort('desc')}>Sort Z-A</button>
      </div>
    </div>
  );
}

export default TodoList;
