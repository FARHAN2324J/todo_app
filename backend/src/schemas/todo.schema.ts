import * as z from "zod";

export const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(255),
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1).max(255),
  completed: z.boolean(),
});