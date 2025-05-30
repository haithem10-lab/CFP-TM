import { Task, TaskStatus } from '../Types/Task';
import { randomUUID } from 'crypto';

let tasks: Task[] = [];

export const getAllTasks = () => tasks;

export const createTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: randomUUID(),
    title,
    description,
    status: 'pending'
  };
  tasks.push(newTask);
  return newTask;
};

export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length < initialLength;
};

export const updateTaskStatus = (id: string, status: TaskStatus): Task | null => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  task.status = status;
  return task;
};
