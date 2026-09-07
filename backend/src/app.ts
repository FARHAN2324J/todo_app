import express from "express";
import todoRouter from "./routes/todo.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(todoRouter);

export default app;
