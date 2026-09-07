import { describe, it, expect } from "vitest";
import { AppError } from "../errors/app.error";

describe("AppError", () => {
  it("should have a message and status code", () => {
    const error = new AppError("Something went wrong", 500);

    expect(error.message).toBe("Something went wrong");
    expect(error.statusCode).toBe(500);
  });
  it("should store additional errors", () => {
    const errors = [
      {
        path: ["title"],
        message: "Title is required",
      },
    ];

    const error = new AppError("Invalid request body", 400, errors);

    expect(error.errors).toEqual(errors);
  });
});
