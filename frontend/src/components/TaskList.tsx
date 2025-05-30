import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'done';
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: 'pending' | 'done') => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { status: newStatus });
      setTasks(prev =>
        prev.map(task => (task.id === id ? { ...task, status: newStatus } : task))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-white shadow p-4 rounded border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
            <span>Statut: <strong>{task.status}</strong></span>
            <button
              onClick={() => handleToggleStatus(task.id, task.status)}
              className="text-blue-600 hover:underline"
            >
              Changer
            </button>
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="w-full bg-red-100 text-red-600 hover:bg-red-200 py-1 rounded"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
