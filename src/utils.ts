import { createSchemaHelpers } from "@dan-schel/js-utils";
import z from "zod";

export const { intStringSchema, floatStringSchema } = createSchemaHelpers(z);
