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
});
