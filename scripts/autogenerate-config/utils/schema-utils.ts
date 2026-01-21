import z from "zod";
import { parseFloatNull, parseIntNull } from "@dan-schel/js-utils";

export const intStringSchema = z.string().transform((x, ctx) => {
  const result = parseIntNull(x);
  if (result != null) return result;

  ctx.addIssue({ code: "custom", message: "Not an integer.", input: x });
  return z.NEVER;
});

export const floatStringSchema = z.string().transform((x, ctx) => {
  const result = parseFloatNull(x);
  if (result != null) return result;

  ctx.addIssue({ code: "custom", message: "Not a number.", input: x });
  return z.NEVER;
});

// export const booleanIntegerStringSchema = z.string().transform((x, ctx) => {
//   const result = parseIntNull(x);
//   if (result === 0) return false;
//   if (result === 1) return true;

//   console.log(result);

//   ctx.addIssue({ code: "custom", message: 'Expecting "0" or "1".', input: x });
//   return z.NEVER;
// });
