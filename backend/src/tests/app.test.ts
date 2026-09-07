import { describe, it, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";

import app from "../app.js";
import { pool } from "../db/pool.js";
import { updateTodo } from "../services/todo.service.js";

beforeEach(async () => {
  await pool.query("DELETE FROM todos");
});

describe("GET /todos", () => {
  it("should return todos from the database", async () => {
    await pool.query(`
      INSERT INTO todos (title, completed)
      VALUES ('Learn TDD', false)
    `);

    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(1);

    expect(response.body[0]).toMatchObject({
      title: "Learn TDD",
      completed: false,
    });
  });
});

describe("POST /todos", () => {
  it("should create a new todo", async () => {
    const response = await request(app).post("/todos").send({
      title: "Learn TDD",
    });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      title: "Learn TDD",
      completed: false,
    });

    const result = await pool.query("SELECT * FROM todos WHERE title = $1", [
      "Learn TDD",
    ]);

    expect(result.rows).toHaveLength(1);
  });
  it("should return 400 when title is empty", async () => {
    const response = await request(app).post("/todos").send({
      title: "",
    });

    expect(response.status).toBe(400);

    const result = await pool.query("SELECT * FROM todos");

    expect(result.rows).toHaveLength(0);
  });
});

describe("PUT /todos/:id", () => {
  it("should update an existing todo", async () => {
    const result = await pool.query(`
      INSERT INTO todos (title, completed)
      VALUES ('Learn TDD', false)
      RETURNING id
    `);

    const todoId = result.rows[0].id;

    const response = await request(app).put(`/todos/${todoId}`).send({
      title: "Learn Backend",
      completed: true,
    });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: todoId,
      title: "Learn Backend",
      completed: true,
    });

    const updated = await pool.query("SELECT * FROM todos WHERE id = $1", [
      todoId,
    ]);

    expect(updated.rows[0]).toMatchObject({
      title: "Learn Backend",
      completed: true,
    });
  });
  it("should return 400 when todo id is invalid", async () => {
    const response = await request(app).put("/todos/abc").send({
      title: "Learn Backend",
      completed: true,
    });

    expect(response.status).toBe(400);
  });
  it("should return 404 when todo does not exist", async () => {
    const response = await request(app).put("/todos/999999").send({
      title: "Learn Backend",
      completed: true,
    });

    expect(response.status).toBe(404);
  });
  it("should return 400 when title is empty", async () => {
    const result = await pool.query(`
    INSERT INTO todos (title, completed)
    VALUES ('Learn TDD', false)
    RETURNING id
  `);

    const todoId = result.rows[0].id;

    const response = await request(app).put(`/todos/${todoId}`).send({
      title: "",
      completed: true,
    });

    expect(response.status).toBe(400);

    const updated = await pool.query("SELECT * FROM todos WHERE id = $1", [
      todoId,
    ]);

    expect(updated.rows[0]).toMatchObject({
      title: "Learn TDD",
      completed: false,
    });
  });
  it("should throw NotFoundError when todo does not exist in todo.service.ts", async () => {
    await expect(updateTodo(999999, "Learn Backend", true)).rejects.toThrow(
      "Todo not found",
    );
  });
});

describe("DELETE /todos/:id", () => {
  it("should delete an existing todo", async () => {
    const result = await pool.query(`
      INSERT INTO todos (title, completed)
      VALUES ('Learn TDD', false)
      RETURNING id
    `);

    const todoId = result.rows[0].id;

    const response = await request(app).delete(`/todos/${todoId}`);

    expect(response.status).toBe(204);

    const deleted = await pool.query("SELECT * FROM todos WHERE id = $1", [
      todoId,
    ]);

    expect(deleted.rows).toHaveLength(0);
  });
  it("should return 404 when todo does not exist", async () => {
    const response = await request(app).delete("/todos/999999");

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await pool.end();
});
