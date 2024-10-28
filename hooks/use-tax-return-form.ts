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
  });

  const { watch, setValue, getValues, setError, clearErrors } = form;

  const calculations = useCalculations(
    watch,
    setValue,
    getValues,
    setError,
    clearErrors
  );
  const formFields = useFormFields(
    watch,
    setValue,
    getValues,
    setError,
    clearErrors
  );

  return {
    form,
    formFields,
    calculations,
  };
};
