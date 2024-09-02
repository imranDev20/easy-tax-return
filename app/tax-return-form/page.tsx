"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaxReturnFormInput, taxReturnFormSchema } from "./schema";

export default function TaxReturnFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaxReturnFormInput>({
    resolver: zodResolver(taxReturnFormSchema),
  });

  const onSubmit = (data: TaxReturnFormInput) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="taxpayer-form">
      <div>
        <label htmlFor="taxpayerName">Name of the Taxpayer:</label>
        <input {...register("taxpayerName")} id="taxpayerName" />
        {errors.taxpayerName && <span>{errors.taxpayerName.message}</span>}
      </div>

      <div>
        <label htmlFor="nationalId">
          National ID (NID) No. / Passport No.:
        </label>
        <input {...register("nationalId")} id="nationalId" />
        {errors.nationalId && <span>{errors.nationalId.message}</span>}
      </div>

      <div>
        <label htmlFor="tin">Taxpayer Identification Number (TIN):</label>
        <input {...register("tin")} id="tin" />
        {errors.tin && <span>{errors.tin.message}</span>}
      </div>

      <div>
        <label htmlFor="circle">Circle:</label>
        <input {...register("circle")} id="circle" />
        {errors.circle && <span>{errors.circle.message}</span>}
      </div>

      <div>
        <label htmlFor="zone">Zone:</label>
        <input {...register("zone")} id="zone" />
        {errors.zone && <span>{errors.zone.message}</span>}
      </div>

      <div>
        <label>Residential Status:</label>
        <label>
          <input
            type="radio"
            {...register("residentialStatus")}
            value="Resident"
          />
          Resident
        </label>
        <label>
          <input
            type="radio"
            {...register("residentialStatus")}
            value="Non-resident"
          />
          Non-resident
        </label>
        {errors.residentialStatus && (
          <span>{errors.residentialStatus.message}</span>
        )}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("isParentOfDisabledPerson")} />A
          parent/legal guardian of a disabled person
        </label>
      </div>

      <div>
        <label htmlFor="dateOfBirth">Date of Birth (DD-MM-YYYY):</label>
        <input {...register("dateOfBirth")} id="dateOfBirth" />
        {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
      </div>

      <div>
        <label htmlFor="spouseName">Spouse Name:</label>
        <input {...register("spouseName")} id="spouseName" />
        {errors.spouseName && <span>{errors.spouseName.message}</span>}
      </div>

      <div>
        <label htmlFor="spouseTin">Spouse TIN:</label>
        <input {...register("spouseTin")} id="spouseTin" />
        {errors.spouseTin && <span>{errors.spouseTin.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
