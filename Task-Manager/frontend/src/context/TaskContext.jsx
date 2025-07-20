// src/context/TaskContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosPrivate'; // make sure this file exists

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, []);

  // Delete task function
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// ✅ This fixes your import error
export const useTaskContext = () => useContext(TaskContext);
