// useTaxReturnForm.ts

import { useForm } from "react-hook-form";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "@/app/(site)/individual-tax-return/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormFields } from "./use-form-fields";
import { useCalculations } from "./use-calculations";

export const useTaxReturnForm = () => {
  const form = useForm<IndividualTaxReturnFormInput>({
    resolver: zodResolver(individualTaxReturnSchema),
    defaultValues: {},
  });

  const { watch, setValue, getValues } = form;

  const calculations = useCalculations(watch, setValue, getValues);
  const formFields = useFormFields(watch, setValue, getValues);

  return {
    form,
    formFields,
    calculations,
  };
};
