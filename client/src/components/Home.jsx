import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const navigateTo = useNavigate();

  //console.log(todos);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/todo/fetch",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setTodos(response.data.allTodos);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // useEffect(() => {
  //   console.log(newTodo);
  // }, [newTodo]);

  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/todo/create",
        { text: newTodo, completed: false },
        {
          withCredentials: true,
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTodos(
        todos.map((todo) => (todo._id === id ? response.data.todo : todo))
      );
    } catch {
      setError("Failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("User logged out successfully");
      localStorage.removeItem("jwt");
      navigateTo("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = todos?.filter((todo) => !todo?.completed).length;

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>
      <div className="mb-4 flex mt-2">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && todoCreate()}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          onClick={todoCreate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos &&
            todos.length > 0 &&
            todos.map((todo) => (
              <li
                key={todo?._id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => todoStatus(todo._id)}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-gray-800 font-semibold"
                        : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => todoDelete(todo._id)}
                  className="text-red-500 hover:text-red-800 duration-300 rounded-lg px-2 py-1 border border-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      )}
      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodos} remaining todos
      </p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
