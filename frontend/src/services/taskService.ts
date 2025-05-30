import axios from 'axios';
import { Task, TaskStatus } from '../types/Task';

const API = `${process.env.REACT_APP_API_URL}/tasks`;

const getAll = async (): Promise<Task[]> => {
  const res = await axios.get(API);
  return res.data;
};

const create = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await axios.post(API, task);
  return res.data;
};

const remove = async (id: string): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};

const updateStatus = async (id: string, status: TaskStatus): Promise<void> => {
  await axios.patch(`${API}/${id}`, { status });
};

export default { getAll, create, remove, updateStatus };
