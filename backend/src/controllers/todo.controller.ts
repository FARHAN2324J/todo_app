import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todo.service.js";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema.js";

export async function getTodosHandler(_req: Request, res: Response) {
  const todos = await getTodos();

  res.json(todos);
}

export async function createTodoHandler(req: Request, res: Response) {
  const todo = await createTodo(req.body.title);

  return res.status(201).json(todo);
}

export async function updateTodoHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid todo id",
    });
  }

  const todo = await updateTodo(id, req.body.title, req.body.completed);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  return res.json(todo);
}

export async function deleteTodoHandler(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "Invalid todo id",
    });
  }

  const todo = await deleteTodo(id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  return res.status(204).send();
}
