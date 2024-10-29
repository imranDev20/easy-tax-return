"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "./schema";

export async function createIndividualTaxReturn(
  data: IndividualTaxReturnFormInput
) {
  try {
    const validatedData = individualTaxReturnSchema.parse(data);

    return {
      message: "Individual tax return and payment processed successfully",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        "An error occurred while submitting individual tax return and processing payment.",
      success: false,
    };
  }
}
