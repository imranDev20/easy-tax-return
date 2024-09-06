import { z } from "zod";

const taxpayerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  nationalIdOrPassport: z
    .string()
    .min(1, "National ID or Passport number is required")
    .optional(),
  tin: z.string().optional(),
  circle: z.string().optional(),
  zone: z.string().optional(),
  assessmentYear: z
    .string()
    .regex(/^\d{4}$/, "Assessment year must be a 4-digit number"),
  residentialStatus: z.enum(["Resident", "Non-resident"]),
  specialBenefit: z
    .enum([
      "A gazetted war-wounded freedom fighter",
      "Third gender",
      "Aged 65 years or more",
      "Female",
      "Disabled person",
      "Parent/legal guardian of a disabled person",
    ])
    .optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Date of birth must be in DD-MM-YYYY format"),
  spouseName: z.string().optional(),
  spouseTIN: z.string().optional(),
});

type TaxpayerForm = z.infer<typeof taxpayerSchema>;

export { taxpayerSchema, type TaxpayerForm };

// Helper function to check if a field is required
export const isFieldRequired = (fieldName: keyof TaxpayerForm): boolean => {
  const fieldSchema = taxpayerSchema.shape[fieldName];
  return !fieldSchema.isOptional();
};
