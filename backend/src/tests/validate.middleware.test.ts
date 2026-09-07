import { describe, it, expect } from "vitest";
import { z } from "zod";

describe("validate middleware", () => {
  it("should reject an invalid request body", () => {
    const schema = z.object({
      title: z.string().min(1),
    });

    const result = schema.safeParse({
      title: "",
    });

    expect(result.success).toBe(false);
  });
});