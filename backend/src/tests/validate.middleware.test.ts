import { describe, it, expect, vi } from "vitest";
import { Request, Response } from "express";
import { z } from "zod";

import { validate } from "../middlewares/validate.middleware.js";

describe("validate middleware", () => {
  it("should return 400 when request body is invalid", () => {
    const schema = z.object({
      title: z.string().min(1),
    });

    const req = {
      body: {
        title: "",
      },
    } as Request;

    const json = vi.fn();

    const res = {
      status: vi.fn().mockReturnValue({
        json,
      }),
    } as unknown as Response;

    const next = vi.fn();

    const middleware = validate(schema);

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalled();

    expect(next).not.toHaveBeenCalled();
  });
});
