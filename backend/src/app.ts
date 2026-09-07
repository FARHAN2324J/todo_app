import express from "express";
import todoRouter from "./routes/todo.routes.js";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(todoRouter);
app.use(errorHandler);

export default app;
