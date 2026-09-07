import { describe, it, expect, vi } from "vitest";
import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error.middleware";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { AppError } from "../errors/app.error";

describe("errorHandler", () => {
  it("should return 500 with the error message", () => {
    const error = new Error("Something went wrong");

    const req = {} as Request;

    const json = vi.fn();

    const res = {
      status: vi.fn().mockReturnValue({
        json,
      }),
    } as unknown as Response;

    errorHandler(error, req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(500);

    expect(json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
  it("should return 404 for NotFoundError", () => {
    const error = new NotFoundError("Todo not found");

    const req = {} as Request;

    const json = vi.fn();

    const res = {
      status: vi.fn().mockReturnValue({
        json,
      }),
    } as unknown as Response;

    errorHandler(error, req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);

    expect(json).toHaveBeenCalledWith({
      message: "Todo not found",
    });
  });
  it("should return 400 for BadRequestError", () => {
    const error = new BadRequestError("Invalid todo id");

    const req = {} as Request;

    const json = vi.fn();

    const res = {
      status: vi.fn().mockReturnValue({
        json,
      }),
    } as unknown as Response;

    errorHandler(error, req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith({
      message: "Invalid todo id",
    });
  });
  it("should return additional errors when they exist", () => {
    const errors = [
      {
        path: ["title"],
        message: "Title is required",
      },
    ];

    const error = new AppError("Invalid request body", 400, errors);

    const req = {} as Request;

    const json = vi.fn();

    const res = {
      status: vi.fn().mockReturnValue({
        json,
      }),
    } as unknown as Response;

    errorHandler(error, req, res, vi.fn());

    expect(json).toHaveBeenCalledWith({
      message: "Invalid request body",
      errors,
    });
  });
});
