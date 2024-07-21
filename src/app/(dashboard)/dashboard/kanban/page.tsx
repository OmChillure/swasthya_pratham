"use client";
import React, { useEffect, useState, ChangeEvent } from 'react';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

interface Todo {
  id: string;
  title: String;
  description: String;
  completed: Boolean;
}

const Index: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosCopy, setTodosCopy] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

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
      const res = await axios.post('http://127.0.0.1:8080/todos', { title: todoInput, description: descriptionInput, completed: false });
      setTodos([...todos, res.data]);
      setTodosCopy([...todos, res.data]);
      setTodoInput('');
      setDescriptionInput('');
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

  const renderTodos = (todosToRender: Todo[]) => {
    return todosToRender.map((todo) => (
      <tr key={todo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          <div>{todo.title}</div>
          <div className="text-gray-500">{todo.description}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          <span className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => deleteTodo(todo.id)}>
            <MdDelete />
          </span>
        </td>
      </tr>
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
    const timer = setTimeout(() => setSearchInput(searchInput), 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (searchInput) {
      onHandleSearch(searchInput);
    } else {
      onClearSearch();
    }
  }, [searchInput]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            id="todoInput"
            placeholder="Add Title"
            value={todoInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoInput(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="text"
            id="descriptionInput"
            placeholder="Add Description"
            value={descriptionInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionInput(e.target.value)}
            className="ml-2 border border-gray-300 px-4 py-2 rounded-md"
          />
          <button onClick={addTodo} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            Add
          </button>
        </div>
        <div>
          <input
            type="text"
            id="search-input"
            placeholder="Search"
            value={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Todo
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {renderTodos(todos)}
          </tbody>
        </table>
        {todos.length === 0 && (
          <div className="text-center py-4">
            <h1 className="text-gray-500">No todos to display</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
