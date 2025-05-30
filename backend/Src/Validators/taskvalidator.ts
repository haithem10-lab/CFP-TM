import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(["pending", "done"]),
});
