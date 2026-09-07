import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from "../controllers/todo.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema.js";

const router = Router();
router.get("/todos", getTodosHandler);
router.post("/todos", validate(createTodoSchema), createTodoHandler);
router.put("/todos/:id", validate(updateTodoSchema), updateTodoHandler);
router.delete("/todos/:id", deleteTodoHandler);

export default router;
