"use client";
import React, { useEffect, useState, ChangeEvent } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import axios from 'axios';
import { format } from 'date-fns';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Index: React.FC = () => {
  const [editText, setEditText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosCopy, setTodosCopy] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Todo[]>([]);

  // State management
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>(search);

  useEffect(() => {
    fetchTodos();
  }, [count]);

  const editTodo = (index: number) => {
    setTodoInput(todos[index].title);
    setEditIndex(index);
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8080/todos');
      setTodos(res.data);
      setTodosCopy(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      if (editIndex === -1) {
        const res = await axios.post('http://127.0.0.1:8080/todos', { title: todoInput, description: '', completed: false });
        setTodos([...todos, res.data]);
        setTodosCopy([...todos, res.data]);
        setTodoInput('');
      } else {
        // Handle edit logic here if needed
        return null;
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      setTodosCopy(todosCopy.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid date';
    }
  };

  const renderTodos = (todosToRender: Todo[]) => {
    return todosToRender.map((todo, index) => (
      <li key={todo.id} className="li">
        <label htmlFor="" className="form-check-label"></label>
        <span className="todo-text">{todo.title}</span>
        <span className="span-button" onClick={() => deleteTodo(todo.id)}>
          <MdDelete />
        </span>
        <span className="span-button" onClick={() => editTodo(index)}>
          <MdEdit />
        </span>
      </li>
    ));
  };

  const onHandleSearch = (value: string) => {
    const filterTodos = todos.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    if (filterTodos.length === 0) {
      setTodos(todosCopy);
    } else {
      setTodos(filterTodos);
    }
  };

  const onClearSearch = () => {
    if (todos.length && todosCopy.length) {
      setTodos(todosCopy);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <div className="main-body">
      <div className="todo-app">
        <div className="input-section">
          <input
            type="text"
            id="todoInput"
            placeholder="Add Item."
            value={todoInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoInput(e.target.value)}
          />
          <button onClick={addTodo} className="add">
            Add
          </button>
          <input
            type="text"
            id="search-input"
            placeholder="Search."
            value={searchItem}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchItem(e.target.value)}
          />
          <button onClick={() => {}}>Search</button>
        </div>

        <div className="todos">
          <ul className="todo-list">{renderTodos(todos)}</ul>
          {todos.length === 0 && (
            <div>
              <h1 className="not-found">No todos to display</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
