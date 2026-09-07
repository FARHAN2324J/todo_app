import { describe, it, expect } from "vitest";
import { NotFoundError } from "../errors/not-found.error.js";

describe("NotFoundError", () => {
  it("should have status code 404", () => {
    const error = new NotFoundError("Todo not found");

    expect(error.statusCode).toBe(404);
  });

  it("should have the provided message", () => {
    const error = new NotFoundError("Todo not found");

    expect(error.message).toBe("Todo not found");
  });
});