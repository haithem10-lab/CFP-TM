import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
        title,
        description,
      });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Titre"
          className="border rounded p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border rounded p-2 flex-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default TaskForm;