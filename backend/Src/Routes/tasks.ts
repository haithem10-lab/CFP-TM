import express, { Router } from 'express';
import { z } from 'zod';
import { getAllTasks, createTask, deleteTask, updateTaskStatus } from '../Services/taskService';

const router = express.Router();

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

const updateTaskSchema = z.object({
  status: z.enum(['pending', 'done'])
});

router.get('/', (req, res) => {
  res.json(getAllTasks());
});

router.post('/', (req, res) => {
  const parse = createTaskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.format() });
  }

  const task = createTask(parse.data.title, parse.data.description);
  res.status(201).json(task);
});

router.delete('/:id', (req, res) => {
  const success = deleteTask(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).send();
});

router.patch('/:id', (req, res) => {
  const parse = updateTaskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.format() });
  }

  const updated = updateTaskStatus(req.params.id, parse.data.status);
  if (!updated) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(updated);
});

export default router;
