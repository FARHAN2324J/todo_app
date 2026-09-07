import { RequestHandler } from "express";
import { z } from "zod";

export function validate(schema: z.ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };
}
