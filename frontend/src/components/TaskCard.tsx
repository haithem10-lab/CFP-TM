import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';
import taskService from '../services/taskService';
import { z } from 'zod';

const nextStatus: Record<Task['status'], Task['status']> = {
  pending: 'done',
  done: 'pending',
};

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const TaskCard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskService.getAll().then(setTasks);
  }, []);

  const handleAddTask = (status: Task['status']) => {
    const title = prompt("Titre de la tâche :");
    const description = prompt("Description :");

    const result = TaskSchema.safeParse({ title, description });
    if (!result.success) {
      alert("Entrée invalide : " + result.error.issues.map(i => i.message).join(', '));
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: result.data.title,
      description: result.data.description,
      status,
    };

    taskService.create(newTask).then(res => setTasks(prev => [...prev, res]));
  };

  const handleDeleteTask = (id: string) => {
    taskService.remove(id).then(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
    });
  };

  const handleStatusUpdate = (id: string, currentStatus: Task['status']) => {
    const newStatus: Task['status'] = nextStatus[currentStatus];

    taskService.updateStatus(id, newStatus).then(() => {
      setTasks(prev =>
        prev.map(task => (task.id === id ? { ...task, status: newStatus } : task))
      );
    }).catch(err => {
      console.error("Erreur lors du PATCH:", err.response?.data || err);
      alert("Erreur lors de la mise à jour du statut : " + (err.response?.data?.message || "voir console"));
    });
  };

  const columns: { key: Task['status']; label: string }[] = [
    { key: 'pending', label: 'To Do' },
    { key: 'done', label: 'Done' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {columns.map(col => (
        <div key={col.key} className="bg-white rounded-xl shadow-md p-4 min-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">{col.label}</h2>
            <button
              onClick={() => handleAddTask(col.key)}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              + Ajouter
            </button>
          </div>
          <div className="space-y-4">
            {tasks
              .filter(t => t.status === col.key)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={() => handleDeleteTask(task.id)}
                  onAdvanceStatus={() => handleStatusUpdate(task.id, task.status)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;