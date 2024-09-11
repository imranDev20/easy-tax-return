import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFieldRequired(
  schema: z.ZodObject<any>,
  fieldName: string
): boolean {
  if (!(fieldName in schema.shape)) {
    throw new Error(`Field "${fieldName}" does not exist in the schema.`);
  }

  const fieldSchema = schema.shape[fieldName];

  if (fieldSchema instanceof z.ZodOptional) {
    return false;
  }

  if (fieldSchema instanceof z.ZodDefault) {
    return false;
  }

  if (fieldSchema instanceof z.ZodUnion) {
    return !fieldSchema._def.options.some(
      (option: z.ZodTypeAny) =>
        option instanceof z.ZodUndefined || option instanceof z.ZodNull
    );
  }

  return true;
}

export function snakeToNormalText(snakeStr:string) {
  return snakeStr
    .toLowerCase() // Convert the entire string to lowercase
    .split('_') // Split by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words with a space
}
