import { describe, it, expect } from "vitest";
import { BadRequestError } from "../errors/bad-request.error";

describe("BadRequestError", () => {
  it("should have status code 400", () => {
    const error = new BadRequestError("Invalid todo id");

    expect(error.statusCode).toBe(400);
  });
  it("should have the provided message", () => {
    const error = new BadRequestError("Invalid todo id");

    expect(error.message).toBe("Invalid todo id");
  });
  it("should store additional errors", () => {
    const errors = [
      {
        path: ["title"],
        message: "Title is required",
      },
    ];

    const error = new BadRequestError("Invalid request body", errors);

    expect(error.errors).toEqual(errors);
  });
});
