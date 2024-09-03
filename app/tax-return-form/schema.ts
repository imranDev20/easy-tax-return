import dayjs from "dayjs";
import z from "zod";

// Define the Zod schema
export const taxReturnFormSchema = z.object({
  taxpayerName: z.string().min(1, "Name is required"),
  nationalId: z.string().min(1, "National ID or Passport number is required"),
  tin: z.string().min(1, "TIN is required"),
  circle: z.string().min(1, "Circle is required"),
  zone: z.string().min(1, "Zone is required"),
  residentialStatus: z.enum(["Resident", "Non-resident"]),

  specialBenefits: z
    .enum([
      "None",
      "GazettedWarWoundedFreedomFighter",
      "Female",
      "ThirdGender",
      "DisabledPerson",
      "Aged65OrMore",
    ])
    .optional(),

  isParentOfDisabledPerson: z.boolean().optional(),
  dateOfBirth: z
    .string()
    .refine((date) => dayjs(date, "DD-MM-YYYY", true).isValid(), {
      message: "Invalid date format. Use DD-MM-YYYY",
    }),

  spouseName: z.string().optional(),
  spouseTin: z.string().optional(),

  addressLine1: z.string(),
  addressLine2: z.string().optional(),

  telephone: z.string().optional(),
  mobile: z.string(),
  email: z.string().email(),

  employerName: z.string().optional(),
  businessName: z.string().optional(),
  bin: z.string().optional(),
  partnersInfo: z.string().optional(),

  specialFarmingIncome: z.boolean(),
});

export type TaxReturnFormInput = z.infer<typeof taxReturnFormSchema>;
