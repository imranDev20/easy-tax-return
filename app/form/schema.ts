import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().nullable(),
  radioOption: z.enum(["option1", "option2", "option3"]),
  favoriteColor: z.enum(["red", "blue", "green"]).optional(),
});

export type FormData = z.infer<typeof formSchema>;
