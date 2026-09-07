import { pool } from "../db/pool.js";
import { NotFoundError } from "../errors/not-found.error.js";

export async function getTodos() {
  const result = await pool.query(`
    SELECT *
    FROM todos
    ORDER BY created_at DESC
  `);

  return result.rows;
}

export async function createTodo(title: string) {
  const result = await pool.query(
    `
      INSERT INTO todos (title)
      VALUES ($1)
      RETURNING *
    `,
    [title],
  );

  return result.rows[0];
}

export async function updateTodo(
  id: number,
  title: string,
  completed: boolean,
) {
  const result = await pool.query(
    `
      UPDATE todos
      SET
        title = $1,
        completed = $2,
        updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `,
    [title, completed, id],
  );

  if (!result.rows[0]) {
    throw new NotFoundError("Todo not found");
  }

  return result.rows[0];
}

export async function deleteTodo(id: number) {
  const result = await pool.query(
    `
      DELETE FROM todos
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0];
}
