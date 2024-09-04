"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaxReturnFormInput, taxReturnFormSchema } from "./schema";
import {
  MINIMUM_TAX_OPTIONS,
  NET_WEALTH_LAST_DATE,
  NET_WEALTH_SURCHARGE_OPTIONS,
  REPAIR_COLLECTION_OPTIONS,
} from "../lib/constants";
import { kebabToNormal } from "../lib/utils";
import Image1 from "@/public/images/1.png";
import Image from "next/image";
import CheckedMark from "./_components/checked-mark";
export default function TaxReturnFormPage() {
  const {
    register,
    handleSubmit,
    watch,
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
      {/* fist page start*/}
      <div className="first-page container">
        <div className="relative w-[100vw] h-[1976px]">
          <Image style={{objectFit:"contain"}} fill src={Image1} alt="image1" />
          <div className="absolute">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              value=""
              {...register("taxpayerName")}
              id="taxpayerName"
            />
            {errors.taxpayerName && (
              <span className="text-red-500 z-[1000]">
                {errors.taxpayerName.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[665px] left-[820px] w-[600px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              value=""
              {...register("nationalId")}
              id="nationalId"
            />
            {errors.nationalId && (
              <span className="text-red-500 z-[1000] inline-block">
                {errors.nationalId.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>
          <div className="absolute top-[730px] left-[820px] w-[600px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              value=""
              {...register("tin")}
              id="tin"
            />
            {errors.tin && (
              <span className="text-red-500 z-[1000]">
                {errors.tin.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[795px] left-[390px] w-[420px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              value=""
              {...register("circle")}
              id="circle"
            />
            {errors.circle && (
              <span className="text-red-500 z-[1000]">
                {errors.circle.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[795px] left-[390px] w-[420px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              value=""
              {...register("circle")}
              id="circle"
            />
            {errors.circle && (
              <span className="text-red-500 z-[1000]">
                {errors.circle.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>
          <div className="absolute top-[795px] left-[1050px] w-[360px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              value=""
              {...register("zone")}
              id="zone"
            />
            {errors.zone && (
              <span className="text-red-500 z-[1000]">
                {errors.zone.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[900px] left-[1085px] w-[59px] h-[59px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              type="checkbox"
              {...register("residentialStatus")}
              value="Resident"
              id="Resident"
            />
            <label
              htmlFor="Resident"
              className="absolute inset-0 flex items-center justify-center bg-[#E8F9FD] border border-[#0ac0e9] cursor-pointer"
            >
              {watch("residentialStatus") == "Resident" && <CheckedMark />}
            </label>
            {errors.residentialStatus && (
              <span className="text-red-500 z-[1000]">
                {errors.residentialStatus.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[900px] left-[1355px] w-[59px] h-[59px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              type="checkbox"
              {...register("residentialStatus")}
              value="Non-resident"
              id="Non-resident"
            />
            <label
              htmlFor="Non-resident"
              className="absolute inset-0 flex items-center justify-center bg-[#E8F9FD] border border-[#0ac0e9] cursor-pointer"
            >
              {watch("residentialStatus") == "Non-resident" && <CheckedMark />}
            </label>
            {errors.residentialStatus && (
              <span className="text-red-500 z-[1000]">
                {errors.residentialStatus.message}
              </span>
            )}

            {/* Triangle with * symbol */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                {...register("isParentOfDisabledPerson")}
              />
              A parent/legal guardian of a disabled person
            </label>
          </div>

          <div>
            <label htmlFor="dateOfBirth">Date of Birth (DD-MM-YYYY):</label>
            <input {...register("dateOfBirth")} id="dateOfBirth" />
            {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}
          </div>

          <div className="absolute top-[1250px] left-[1000px] w-[420px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("spouseName")}
              id="spouseName"
            />
            {errors.spouseName && (
              <span className="text-red-500 z-[1000]">
                {errors.spouseName.message}
              </span>
            )}
          </div>

          <div className="absolute top-[1330px] left-[1000px] w-[420px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("spouseTin")}
              id="spouseTin"
            />
            {errors.spouseTin && (
              <span className="text-red-500 z-[1000]">
                {errors.spouseTin.message}
              </span>
            )}
          </div>

          <div className="absolute top-[1410px] left-[345px] w-[1070px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("addressLine1")}
              id="addressLine1"
            />
            {errors.addressLine1 && (
              <span className="text-red-500 z-[1000]">
                {errors.addressLine1.message}
              </span>
            )}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[1475px] left-[345px] w-[1070px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("addressLine2")}
              id="addressLine2"
            />
            {errors.addressLine2 && (
              <span className="text-red-500 z-[1000]">
                {errors.addressLine2.message}
              </span>
            )}
           
          </div>
          <div className="absolute top-[1575px] left-[205px] w-[390px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("telephone")}
              id="telephone"
            />
            {errors.telephone && (
              <span className="text-red-500 z-[1000]">
                {errors.telephone.message}
              </span>
            )}
           
          </div>

          <div className="absolute top-[1575px] left-[610px] w-[410px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("mobile")}
              id="mobile"
            />
            {errors.mobile && (
              <span className="text-red-500 z-[1000]">
                {errors.mobile.message}
              </span>
            )}
           <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[1575px] left-[1040px] w-[380px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("email")}
              id="email"
            />
            {errors.email && (
              <span className="text-red-500 z-[1000]">
                {errors.email.message}
              </span>
            )}
           <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-[#0ac0e93b] border-l-[24px] border-l-transparent">
              <span className="absolute top-[-25px] right-[2px] text-white text-md font-bold">
                *
              </span>
            </div>
          </div>

          <div className="absolute top-[1685px] left-[210px] w-[1200px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("employerName")}
              id="employerName"
            />
            {errors.employerName && (
              <span className="text-red-500 z-[1000]">
                {errors.employerName.message}
              </span>
            )}         
          </div>

          <div className="absolute top-[1750px] left-[750px] w-[670px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("businessName")}
              id="businessName"
            />
            {errors.businessName && (
              <span className="text-red-500 z-[1000]">
                {errors.businessName.message}
              </span>
            )}         
          </div>

          <div className="absolute top-[1820px] left-[750px] w-[670px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("bin")}
              id="bin"
            />
            {errors.bin && (
              <span className="text-red-500 z-[1000]">
                {errors.bin.message}
              </span>
            )}         
          </div>

          <div className="absolute top-[1930px] left-[200px] w-[1150px] h-[50px]">
            <input
              className="relative w-full h-full block border bg-[#E8F9FD] border-[#0ac0e9] focus:bg-white outline-none pr-4"
              {...register("partnersMembersAssociation1")}
              id="bin"
            />
            {errors.partnersMembersAssociation1 && (
              <span className="text-red-500 z-[1000]">
                {errors.partnersMembersAssociation1.message}
              </span>
            )}         
          </div>
               
         
          <div>
            <input
              {...register("partnersMembersAssociation2")}
              id="partnersMembersAssociation2"
            />
            {errors.partnersMembersAssociation2 && (
              <span>{errors.partnersMembersAssociation2.message}</span>
            )}
          </div>
        </div>

        {/* first page end */}
      </div>

      <h2>Page 2</h2>

      <div>
        <label htmlFor="partnersMembersAssociation1">
          Statement of Income and Income Tax for the income year ended on:
        </label>
        <input
          disabled
          {...register("incomeYearEndedOn")}
          id="incomeYearEndedOn"
        />
        {errors.incomeYearEndedOn && (
          <span>{errors.incomeYearEndedOn.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="taxpayerName">Name of the Taxpayer:</label>
        <input disabled {...register("taxpayerName")} id="taxpayerName" />
        {errors.taxpayerName && <span>{errors.taxpayerName.message}</span>}
      </div>

      <div>
        <label htmlFor="tin">TIN:</label>
        <input disabled {...register("tin")} id="tin" />
        {errors.tin && <span>{errors.tin.message}</span>}
      </div>
      <div>
        <label htmlFor="incomeFishFarming">
          Income from Poultry Farms, Poultry, Shrimp and Fish Hatcheries and
          Fish Farming (SRO no 157/2022):
        </label>
        <input
          type="checkbox"
          {...register("incomeFishFarming")}
          id="incomeFishFarming"
        />
        {errors.incomeFishFarming && (
          <span>{errors.incomeFishFarming.message}</span>
        )}
      </div>
      <div>
        <input
          {...register("incomeFishFarmingAmount")}
          id="incomeFishFarmingAmount"
        />
        {errors.incomeFishFarmingAmount && (
          <span>{errors.incomeFishFarmingAmount.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="shareOfIncomeFromAOP">
          Share of Income from Firm or AOP:
        </label>
        <input
          {...register("shareOfIncomeFromAOP")}
          id="shareOfIncomeFromAOP"
        />
        {errors.shareOfIncomeFromAOP && (
          <span>{errors.shareOfIncomeFromAOP.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeOfMinor">
          Income of Minor or Spouse (if not Taxpayer):
        </label>
        <input {...register("incomeOfMinor")} id="incomeOfMinor" />
        {errors.incomeOfMinor && <span>{errors.incomeOfMinor.message}</span>}
      </div>

      <div>
        <label htmlFor="taxableIncomeFromAbroad">
          Taxable Income from Abroad:
        </label>
        <input
          {...register("taxableIncomeFromAbroad")}
          id="taxableIncomeFromAbroad"
        />
        {errors.taxableIncomeFromAbroad && (
          <span>{errors.taxableIncomeFromAbroad.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="minimumTax" className="block mb-1">
          Minimum Tax:
        </label>
        <select
          {...register("minimumTax")}
          id="minimumTax"
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Minimum Tax area:(Choose One)</option>
          {MINIMUM_TAX_OPTIONS.map((minimumTax) => (
            <option key={minimumTax} value={minimumTax}>
              {kebabToNormal(minimumTax)}
            </option>
          ))}
        </select>
        {errors.minimumTax && (
          <span className="text-red-500 text-sm">
            {errors.minimumTax.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="netWealthSurcharge" className="block mb-1">
          (a) Net Wealth Surcharge (if applicable):
        </label>
        <select
          {...register("netWealthSurcharge")}
          id="netWealthSurcharge"
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">
            Do you have more than one motor vehicle or more than 8000 sqft house
            property/properties (in city corporation area)?{" "}
          </option>
          {NET_WEALTH_SURCHARGE_OPTIONS.map((options) => (
            <option key={options} value={options}>
              {kebabToNormal(options)}
            </option>
          ))}
        </select>
        {errors.netWealthSurcharge && (
          <span className="text-red-500 text-sm">
            {errors.netWealthSurcharge.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="environmentalSurcharge">
          (b) Environmental Surcharge (if applicable):
        </label>
        <input
          {...register("environmentalSurcharge")}
          id="environmentalSurcharge"
        />
        {errors.environmentalSurcharge && (
          <span>{errors.environmentalSurcharge.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="delayInterest">
          Delay Interest, Penalty or any other amount Under Income Tax Act (if
          any):
        </label>
        <input {...register("delayInterest")} id="delayInterest" />
        {errors.delayInterest && <span>{errors.delayInterest.message}</span>}
      </div>

      <div>
        <label htmlFor="calculate">Calculate /Re-calculate:</label>
        <input {...register("calculate")} id="calculate" />
        {errors.calculate && <span>{errors.calculate.message}</span>}
      </div>

      <h2>Page 3</h2>

      <div>
        <label htmlFor="advanceTaxPaidAmount">
          Advance Tax paid (attach proof)
        </label>
        <input
          {...register("advanceTaxPaidAmount")}
          id="advanceTaxPaidAmount"
        />
        {errors.advanceTaxPaidAmount && (
          <span>{errors.advanceTaxPaidAmount.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="adjustmentOfTaxRefund">
          Adjustment of Tax Refund {"{"} mention assessment year(s) of refund{" "}
          {"}"}
        </label>
        <input
          {...register("adjustmentOfTaxRefund")}
          id="adjustmentOfTaxRefund"
        />
        {errors.adjustmentOfTaxRefund && (
          <span>{errors.adjustmentOfTaxRefund.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="taxPaidWithThisReturn">Tax Paid with this Return</label>
        <input
          {...register("taxPaidWithThisReturn")}
          id="taxPaidWithThisReturn"
        />
        {errors.taxPaidWithThisReturn && (
          <span>{errors.taxPaidWithThisReturn.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="listOfDocumentsFurnishedWithThisReturn1">
          List of Documents Furnished with this Return
        </label>
        <textarea
          {...register("listOfDocumentsFurnishedWithThisReturn1")}
          id="listOfDocumentsFurnishedWithThisReturn1"
        ></textarea>
        {errors.listOfDocumentsFurnishedWithThisReturn1 && (
          <span>{errors.listOfDocumentsFurnishedWithThisReturn1.message}</span>
        )}
        <textarea
          {...register("listOfDocumentsFurnishedWithThisReturn2")}
          id="listOfDocumentsFurnishedWithThisReturn2"
        ></textarea>
        {errors.listOfDocumentsFurnishedWithThisReturn2 && (
          <span>{errors.listOfDocumentsFurnishedWithThisReturn2.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="fatherOrHusband">father /husband</label>
        <input {...register("fatherOrHusband")} id="fatherOrHusband" />
        {errors.fatherOrHusband && (
          <span>{errors.fatherOrHusband.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="placeOfSignature">Place of Signature</label>
        <input {...register("placeOfSignature")} id="placeOfSignature" />
        {errors.placeOfSignature && (
          <span>{errors.placeOfSignature.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="signature">Signature</label>
        <input {...register("signature")} id="signature" />
        {errors.signature && <span>{errors.signature.message}</span>}
      </div>

      <div>
        <label htmlFor="dateOfSignature">Date of Signature (DD-MM-YYYY):</label>
        <input {...register("dateOfSignature")} id="dateOfSignature" />
        {errors.dateOfSignature && (
          <span>{errors.dateOfSignature.message}</span>
        )}
      </div>

      <h1> Page 4 </h1>
      <div>
        <label htmlFor="incomeFromEmployment">
          Do you have any Income from Employment?:
        </label>
        <input
          type="checkbox"
          {...register("incomeFromEmployment")}
          name="incomeFromEmployment"
          id="incomeFromEmployment"
        />{" "}
        Yes
        <input
          type="checkbox"
          {...register("incomeFromEmployment")}
          name="incomeFromEmployment"
          id="incomeFromEmployment"
        />{" "}
        No
        {errors.incomeFromEmployment && (
          <span>{errors.incomeFromEmployment.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="privateOrganization">Private Organization:</label>
        <input
          type="checkbox"
          {...register("privateOrganization")}
          name="privateOrganization"
          id="privateOrganization"
        />
        {errors.privateOrganization && (
          <span>{errors.privateOrganization.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="government">Government:</label>
        <input
          type="checkbox"
          {...register("government")}
          name="government"
          id="government"
        />
        {errors.government && <span>{errors.government.message}</span>}
      </div>
      <div>
        <label htmlFor="taxDeductedSourceIncomeFromEmployment">
          Tax Deducted at Source from Income from Employment:
        </label>
        <input
          {...register("taxDeductedSourceIncomeFromEmployment")}
          id="taxDeductedSourceIncomeFromEmployment"
        />
        {errors.taxDeductedSourceIncomeFromEmployment && (
          <span>{errors.taxDeductedSourceIncomeFromEmployment.message}</span>
        )}
      </div>

      <h2>Page 5</h2>

      <div>
        <label htmlFor="LocationDescriptionOwnershipProportionOfProperty">
          Location, description and ownership proportion of property:
        </label>
        <textarea
          {...register("locationDescriptionOwnershipProportionOfProperty")}
          name="locationDescriptionOwnershipProportionOfProperty"
          id="locationDescriptionOwnershipProportionOfProperty"
        ></textarea>
        {errors.locationDescriptionOwnershipProportionOfProperty && (
          <span>
            {errors.locationDescriptionOwnershipProportionOfProperty.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="rentReceivedOrAnnualValue">
          Rent Received or Annual value (whichever is higher)
        </label>
        <input
          {...register("rentReceivedOrAnnualValue")}
          id="rentReceivedOrAnnualValue"
        />
        {errors.rentReceivedOrAnnualValue && (
          <span>{errors.rentReceivedOrAnnualValue.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="advanceRentReceived">Advance Rent Received</label>
        <input {...register("advanceRentReceived")} id="advanceRentReceived" />
        {errors.advanceRentReceived && (
          <span>{errors.advanceRentReceived.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="valueOfAnyBenefit">
          Value of any Benefit in addition to 1 & 2
        </label>
        <input {...register("valueOfAnyBenefit")} id="valueOfAnyBenefit" />
        {errors.valueOfAnyBenefit && (
          <span>{errors.valueOfAnyBenefit.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="adjustedAdvanceRent">Adjusted Advance Rent</label>
        <input {...register("adjustedAdvanceRent")} id="adjustedAdvanceRent" />
        {errors.adjustedAdvanceRent && (
          <span>{errors.adjustedAdvanceRent.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="vacancyAllowance">Vacancy Allowance</label>
        <input {...register("vacancyAllowance")} id="vacancyAllowance" />
        {errors.vacancyAllowance && (
          <span>{errors.vacancyAllowance.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="repairCollection" className="block mb-1">
          Repair, Collection etc.
        </label>
        <select
          {...register("repairCollection")}
          id="repairCollection"
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Choose One</option>
          {REPAIR_COLLECTION_OPTIONS.map((options) => (
            <option key={options} value={options}>
              {kebabToNormal(options)}
            </option>
          ))}
        </select>
        {errors.repairCollection && (
          <span className="text-red-500 text-sm">
            {errors.repairCollection.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="municipalOrLocalTax">Municipal or Local Tax</label>
        <input {...register("municipalOrLocalTax")} id="municipalOrLocalTax" />
        {errors.municipalOrLocalTax && (
          <span>{errors.municipalOrLocalTax.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="landRevenue">Land Revenue</label>
        <input {...register("landRevenue")} id="landRevenue" />
        {errors.landRevenue && <span>{errors.landRevenue.message}</span>}
      </div>
      <div>
        <label htmlFor="interestMortgageCapitalCharge">
          Interest Paid on Loan / Mortgage / Capital Charge
        </label>
        <input
          {...register("interestMortgageCapitalCharge")}
          id="interestMortgageCapitalCharge"
        />
        {errors.interestMortgageCapitalCharge && (
          <span>{errors.interestMortgageCapitalCharge.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="insurancePremiumPaid">Insurance Premium Paid</label>
        <input
          {...register("insurancePremiumPaid")}
          id="insurancePremiumPaid"
        />
        {errors.insurancePremiumPaid && (
          <span>{errors.insurancePremiumPaid.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="others">Others, if any</label>
        <input {...register("others")} id="others" />
        {errors.others && <span>{errors.others.message}</span>}
      </div>
      <div>
        <label htmlFor="TaxpayersShare">
          Taxpayer&apos;s Share, if applicable
        </label>
        <input
          value="100"
          {...register("TaxpayersShare")}
          id="TaxpayersShare"
        />{" "}
        %{errors.TaxpayersShare && <span>{errors.TaxpayersShare.message}</span>}
      </div>
      <div>
        <label htmlFor="taxDeductedSourceFromIncomeRent">
          Tax Deducted at Source from Income from Rent
        </label>
        <input
          {...register("taxDeductedSourceFromIncomeRent")}
          id="taxDeductedSourceFromIncomeRent"
        />
        {errors.taxDeductedSourceFromIncomeRent && (
          <span>{errors.taxDeductedSourceFromIncomeRent.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="salesTurnoverReceipt">Sales / Turnover / Receipt</label>
        <input
          {...register("salesTurnoverReceipt")}
          id="salesTurnoverReceipt"
        />
        {errors.salesTurnoverReceipt && (
          <span>{errors.salesTurnoverReceipt.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="grossProfit">Gross Profit</label>
        <input {...register("grossProfit")} id="grossProfit" />
        {errors.grossProfit && <span>{errors.grossProfit.message}</span>}
      </div>
      <div>
        <label htmlFor="generalExpensesSellingExpenses">
          General Expenses, Selling Expenses, Land Revenue, Rates, Loan
          Interest, Insurance Premium and Other Expenses
        </label>
        <input
          {...register("generalExpensesSellingExpenses")}
          id="generalExpensesSellingExpenses"
        />
        {errors.generalExpensesSellingExpenses && (
          <span>{errors.generalExpensesSellingExpenses.message}</span>
        )}
      </div>

      <h2>Page 6</h2>
      <div>
        <label htmlFor="nameOfBusiness">Name of Business:</label>
        <input {...register("nameOfBusiness")} id="nameOfBusiness" />
        {errors.nameOfBusiness && <span>{errors.nameOfBusiness.message}</span>}
      </div>
      <div>
        <label htmlFor="natureOfBusiness">Nature of Business:</label>
        <input {...register("natureOfBusiness")} id="natureOfBusiness" />
        {errors.natureOfBusiness && (
          <span>{errors.natureOfBusiness.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="addressOfBusiness">Address of Business:</label>
        <input {...register("addressOfBusiness")} id="addressOfBusiness" />
        {errors.addressOfBusiness && (
          <span>{errors.addressOfBusiness.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="salesTurnoverReceipts">Sales/ Turnover/ Receipts</label>
        <input
          {...register("salesTurnoverReceipts")}
          id="salesTurnoverReceipts"
        />
        {errors.salesTurnoverReceipts && (
          <span>{errors.salesTurnoverReceipts.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="grossProfitAmount">Gross Profit </label>
        <input {...register("grossProfitAmount")} id="grossProfitAmount" />
        {errors.grossProfitAmount && (
          <span>{errors.grossProfitAmount.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="generalAdministrativeSellingExpenses">
          General, administrative, selling and other expenses{" "}
        </label>
        <input
          {...register("generalAdministrativeSellingExpenses")}
          id="generalAdministrativeSellingExpenses"
        />
        {errors.generalAdministrativeSellingExpenses && (
          <span>{errors.generalAdministrativeSellingExpenses.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="badDebtExpense">Bad Debt Expense</label>
        <input {...register("badDebtExpense")} id="badDebtExpense" />
        {errors.badDebtExpense && <span>{errors.badDebtExpense.message}</span>}
      </div>

      <div>
        <label htmlFor="inventories">Inventories</label>
        <input {...register("inventories")} id="inventories" />
        {errors.inventories && <span>{errors.inventories.message}</span>}
      </div>

      <div>
        <label htmlFor="otherAssets">Other assets</label>
        <input {...register("otherAssets")} id="otherAssets" />
        {errors.otherAssets && <span>{errors.otherAssets.message}</span>}
      </div>

      <div>
        <label htmlFor="openingCapital">Opening capital</label>
        <input {...register("openingCapital")} id="openingCapital" />
        {errors.openingCapital && <span>{errors.openingCapital.message}</span>}
      </div>

      <div>
        <label htmlFor="withdrawalsInTheIncomeYear">
          Withdrawals in the income year
        </label>
        <input
          {...register("withdrawalsInTheIncomeYear")}
          id="withdrawalsInTheIncomeYear"
        />
        {errors.withdrawalsInTheIncomeYear && (
          <span>{errors.withdrawalsInTheIncomeYear.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="liabilities">Liabilities</label>
        <input {...register("liabilities")} id="liabilities" />
        {errors.liabilities && <span>{errors.liabilities.message}</span>}
      </div>

      <div>
        <label htmlFor="liabilities">Interest/ Profit from Bank / FI</label>
        <input
          {...register("interestProfitFromBankFIAmount")}
          id="interestProfitFromBankFIAmount"
        />
        {errors.interestProfitFromBankFIAmount && (
          <span>{errors.interestProfitFromBankFIAmount.message}</span>
        )}
        <input
          {...register("interestProfitFromBankFIDeductions")}
          id="interestProfitFromBankFIDeductions"
        />
        {errors.interestProfitFromBankFIDeductions && (
          <span>{errors.interestProfitFromBankFIDeductions.message}</span>
        )}
        <input
          {...register("interestProfitFromBankFITax")}
          id="interestProfitFromBankFITax"
        />
        {errors.interestProfitFromBankFITax && (
          <span>{errors.interestProfitFromBankFITax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeFromSavingCertificatesAmount">
          Income from Saving Certificates
        </label>
        <input
          {...register("incomeFromSavingCertificatesAmount")}
          id="incomeFromSavingCertificatesAmount"
        />
        {errors.incomeFromSavingCertificatesAmount && (
          <span>{errors.incomeFromSavingCertificatesAmount.message}</span>
        )}
        <input
          {...register("incomeFromSavingCertificatesDeductions")}
          id="incomeFromSavingCertificatesDeductions"
        />
        {errors.incomeFromSavingCertificatesDeductions && (
          <span>{errors.incomeFromSavingCertificatesDeductions.message}</span>
        )}
        <input
          {...register("incomeFromSavingCertificatesTax")}
          id="incomeFromSavingCertificatesTax"
        />
        {errors.incomeFromSavingCertificatesTax && (
          <span>{errors.incomeFromSavingCertificatesTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeFromSecuritiesDebenturesAmount">
          Income From Securities / Debentures
        </label>
        <input
          {...register("incomeFromSecuritiesDebenturesAmount")}
          id="incomeFromSecuritiesDebenturesAmount"
        />
        {errors.incomeFromSecuritiesDebenturesAmount && (
          <span>{errors.incomeFromSecuritiesDebenturesAmount.message}</span>
        )}
        <input
          {...register("incomeFromSecuritiesDebenturesDeductions")}
          id="incomeFromSecuritiesDebenturesDeductions"
        />
        {errors.incomeFromSecuritiesDebenturesDeductions && (
          <span>{errors.incomeFromSecuritiesDebenturesDeductions.message}</span>
        )}
        <input
          {...register("incomeFromSecuritiesDebenturesTax")}
          id="incomeFromSecuritiesDebenturesTax"
        />
        {errors.incomeFromSecuritiesDebenturesTax && (
          <span>{errors.incomeFromSecuritiesDebenturesTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeFromFinancialProductSchemeAmount">
          Income From Financial Product / Scheme
        </label>
        <input
          {...register("incomeFromFinancialProductSchemeAmount")}
          id="incomeFromFinancialProductSchemeAmount"
        />
        {errors.incomeFromFinancialProductSchemeAmount && (
          <span>{errors.incomeFromFinancialProductSchemeAmount.message}</span>
        )}
        <input
          {...register("incomeFromFinancialProductSchemeDeductions")}
          id="incomeFromFinancialProductSchemeDeductions"
        />
        {errors.incomeFromFinancialProductSchemeDeductions && (
          <span>
            {errors.incomeFromFinancialProductSchemeDeductions.message}
          </span>
        )}
        <input
          {...register("incomeFromFinancialProductSchemeTax")}
          id="incomeFromFinancialProductSchemeTax"
        />
        {errors.incomeFromFinancialProductSchemeTax && (
          <span>{errors.incomeFromFinancialProductSchemeTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="dividendIncomeAmount">Dividend Income</label>
        <input
          {...register("dividendIncomeAmount")}
          id="dividendIncomeAmount"
        />
        {errors.dividendIncomeAmount && (
          <span>{errors.dividendIncomeAmount.message}</span>
        )}
        <input
          {...register("dividendIncomeDeductions")}
          id="dividendIncomeDeductions"
        />
        {errors.dividendIncomeDeductions && (
          <span>{errors.dividendIncomeDeductions.message}</span>
        )}
        <input {...register("dividendIncomeTax")} id="dividendIncomeTax" />
        {errors.dividendIncomeTax && (
          <span>{errors.dividendIncomeTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="capitalGainFromTransferOfPropertyAmount">
          Capital Gain From Transfer of Property
        </label>
        <input
          {...register("capitalGainFromTransferOfPropertyAmount")}
          id="capitalGainFromTransferOfPropertyAmount"
        />
        {errors.capitalGainFromTransferOfPropertyAmount && (
          <span>{errors.capitalGainFromTransferOfPropertyAmount.message}</span>
        )}
        <input
          {...register("capitalGainFromTransferOfPropertyDeductions")}
          id="capitalGainFromTransferOfPropertyDeductions"
        />
        {errors.capitalGainFromTransferOfPropertyDeductions && (
          <span>
            {errors.capitalGainFromTransferOfPropertyDeductions.message}
          </span>
        )}
        <input
          {...register("capitalGainFromTransferOfPropertyTax")}
          id="capitalGainFromTransferOfPropertyTax"
        />
        {errors.capitalGainFromTransferOfPropertyTax && (
          <span>{errors.capitalGainFromTransferOfPropertyTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeFromBusinessAmount">Income From Business</label>
        <input
          {...register("incomeFromBusinessAmount")}
          id="incomeFromBusinessAmount"
        />
        {errors.incomeFromBusinessAmount && (
          <span>{errors.incomeFromBusinessAmount.message}</span>
        )}
        <input
          {...register("incomeFromBusinessDeductions")}
          id="incomeFromBusinessDeductions"
        />
        {errors.incomeFromBusinessDeductions && (
          <span>{errors.incomeFromBusinessDeductions.message}</span>
        )}
        <input
          {...register("incomeFromBusinessTax")}
          id="incomeFromBusinessTax"
        />
        {errors.incomeFromBusinessTax && (
          <span>{errors.incomeFromBusinessTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="workersParticipationFundAmount">
          Workers Participation Fund
        </label>
        <input
          {...register("workersParticipationFundAmount")}
          id="workersParticipationFundAmount"
        />
        {errors.workersParticipationFundAmount && (
          <span>{errors.workersParticipationFundAmount.message}</span>
        )}
        <input
          {...register("workersParticipationFundDeductions")}
          id="workersParticipationFundDeductions"
        />
        {errors.workersParticipationFundDeductions && (
          <span>{errors.workersParticipationFundDeductions.message}</span>
        )}
        <input
          {...register("workersParticipationFundTax")}
          id="workersParticipationFundTax"
        />
        {errors.workersParticipationFundTax && (
          <span>{errors.workersParticipationFundTax.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeFromOtherSourcesAmount">
          Income from Other Sources
        </label>
        <input
          {...register("incomeFromOtherSourcesAmount")}
          id="incomeFromOtherSourcesAmount"
        />
        {errors.incomeFromOtherSourcesAmount && (
          <span>{errors.incomeFromOtherSourcesAmount.message}</span>
        )}
        <input
          {...register("incomeFromOtherSourcesDeductions")}
          id="incomeFromOtherSourcesDeductions"
        />
        {errors.incomeFromOtherSourcesDeductions && (
          <span>{errors.incomeFromOtherSourcesDeductions.message}</span>
        )}
        <input
          {...register("incomeFromOtherSourcesTax")}
          id="incomeFromOtherSourcesTax"
        />
        {errors.incomeFromOtherSourcesTax && (
          <span>{errors.incomeFromOtherSourcesTax.message}</span>
        )}
      </div>

      <h2>Page 7</h2>
      <div>
        <label htmlFor="lifeInsurancePremium">
          Life Insurance Premium or Contractual Deferred Annuity Paid in
          Bangladesh
        </label>
        <input
          {...register("lifeInsurancePremium")}
          id="lifeInsurancePremium"
        />
        {errors.lifeInsurancePremium && (
          <span>{errors.lifeInsurancePremium.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="contributionToDeposit">
          Contribution to deposit pension scheme (not exceeding allowable limit)
        </label>
        <input
          {...register("contributionToDeposit")}
          id="contributionToDeposit"
        />
        {errors.contributionToDeposit && (
          <span>{errors.contributionToDeposit.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="investmentInGovernmentSecurities1">
          Investment in Government Securities, Unit Certificate, Mutual Fund.
          ETF or Joint Investment Scheme Unit Certificate
        </label>
        <input
          {...register("investmentInGovernmentSecurities1")}
          id="investmentInGovernmentSecurities1"
        />
        {errors.investmentInGovernmentSecurities1 && (
          <span>{errors.investmentInGovernmentSecurities1.message}</span>
        )}
        <input
          {...register("investmentInGovernmentSecurities2")}
          id="investmentInGovernmentSecurities2"
        />
        {errors.investmentInGovernmentSecurities2 && (
          <span>{errors.investmentInGovernmentSecurities2.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="investmentInSecurities">
          Investment in Securities listed with Approved Stock Exchanee
        </label>
        <input
          {...register("investmentInSecurities")}
          id="investmentInSecurities"
        />
        {errors.investmentInSecurities && (
          <span>{errors.investmentInSecurities.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="contributionToProvidentFund">
          Contribution to provident fund to which Provident Fund Act, 1925
          applies
        </label>
        <input
          {...register("contributionToProvidentFund")}
          id="contributionToProvidentFund"
        />
        {errors.contributionToProvidentFund && (
          <span>{errors.contributionToProvidentFund.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="SelfAndEmployersContribution">
          Self and employer&apos;s contribution to Recognized Provident Fund
        </label>
        <input
          {...register("SelfAndEmployersContribution")}
          id="SelfAndEmployersContribution"
        />
        {errors.SelfAndEmployersContribution && (
          <span>{errors.SelfAndEmployersContribution.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="contributionToSuperAnnuationFund">
          Contribution to Super Annuation Fund
        </label>
        <input
          {...register("contributionToSuperAnnuationFund")}
          id="contributionToSuperAnnuationFund"
        />
        {errors.contributionToSuperAnnuationFund && (
          <span>{errors.contributionToSuperAnnuationFund.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="contributionToBenevolentFund">
          Contribution to Benevolent Fund / Group Insurance Premium
        </label>
        <input
          {...register("contributionToBenevolentFund")}
          id="contributionToBenevolentFund"
        />
        {errors.contributionToBenevolentFund && (
          <span>{errors.contributionToBenevolentFund.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="contributionToZakatFund1">
          Contribution to Zakat Fund
        </label>
        <input
          {...register("contributionToZakatFund1")}
          id="contributionToZakatFund1"
        />
        {errors.contributionToZakatFund1 && (
          <span>{errors.contributionToZakatFund1.message}</span>
        )}
        <input
          {...register("contributionToZakatFund2")}
          id="contributionToZakatFund2"
        />
        {errors.contributionToZakatFund2 && (
          <span>{errors.contributionToZakatFund2.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="OthersIf1">Others, if any (provide detail)</label>
        <input {...register("OthersIf1")} id="OthersIf1" />
        {errors.OthersIf1 && <span>{errors.OthersIf1.message}</span>}
        <input {...register("OthersIf2")} id="OthersIf2" />
        {errors.OthersIf2 && <span>{errors.OthersIf2.message}</span>}
      </div>

      <h2>Page 8</h2>
      <div>
        <label htmlFor="ExpensesForFoodAmount">
          Expenses for food, clothing and other essentials
        </label>
        <input
          {...register("ExpensesForFoodAmount")}
          id="ExpensesForFoodAmount"
        />
        {errors.ExpensesForFoodAmount && (
          <span>{errors.ExpensesForFoodAmount.message}</span>
        )}
        <input
          {...register("ExpensesForFoodComment")}
          id="ExpensesForFoodComment"
        />
        {errors.ExpensesForFoodComment && (
          <span>{errors.ExpensesForFoodComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="housingExpenseAmount">Housing expense</label>
        <input
          {...register("housingExpenseAmount")}
          id="housingExpenseAmount"
        />
        {errors.housingExpenseAmount && (
          <span>{errors.housingExpenseAmount.message}</span>
        )}
        <input
          {...register("housingExpenseComment")}
          id="housingExpenseComment"
        />
        {errors.housingExpenseComment && (
          <span>{errors.housingExpenseComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="personalTransportationExpensesAmount">
          Personal transportation expenses
        </label>
        <input
          {...register("personalTransportationExpensesAmount")}
          id="personalTransportationExpensesAmount"
        />
        {errors.personalTransportationExpensesAmount && (
          <span>{errors.personalTransportationExpensesAmount.message}</span>
        )}
        <input
          {...register("personalTransportationExpensesAmountComment")}
          id="personalTransportationExpensesAmountComment"
        />
        {errors.personalTransportationExpensesAmountComment && (
          <span>
            {errors.personalTransportationExpensesAmountComment.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="utilityExpenseAmount">
          Utility Expense (Electricity, C Mobile, Internet etc. Bills)
        </label>
        <input
          {...register("utilityExpenseAmount")}
          id="utilityExpenseAmount"
        />
        {errors.utilityExpenseAmount && (
          <span>{errors.utilityExpenseAmount.message}</span>
        )}
        <input
          {...register("utilityExpenseComment")}
          id="utilityExpenseComment"
        />
        {errors.utilityExpenseComment && (
          <span>{errors.utilityExpenseComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="educationExpensesAmount">Education expenses</label>
        <input
          {...register("educationExpensesAmount")}
          id="educationExpensesAmount"
        />
        {errors.educationExpensesAmount && (
          <span>{errors.educationExpensesAmount.message}</span>
        )}
        <input
          {...register("educationExpensesComment")}
          id="educationExpensesComment"
        />
        {errors.educationExpensesComment && (
          <span>{errors.educationExpensesComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="personalExpenseAmount">
          Personal Expense for Local and Foreign Travel, Vacation etc.
        </label>
        <input
          {...register("personalExpenseAmount")}
          id="personalExpenseAmount"
        />
        {errors.personalExpenseAmount && (
          <span>{errors.personalExpenseAmount.message}</span>
        )}
        <input
          {...register("personalExpenseComment")}
          id="personalExpenseComment"
        />
        {errors.personalExpenseComment && (
          <span>{errors.personalExpenseComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="festivalExpenseAmount">
          Festival and Other Special Expense
        </label>
        <input
          {...register("festivalExpenseAmount")}
          id="festivalExpenseAmount"
        />
        {errors.festivalExpenseAmount && (
          <span>{errors.festivalExpenseAmount.message}</span>
        )}
        <input
          {...register("festivalExpenseComment")}
          id="festivalExpenseComment"
        />
        {errors.festivalExpenseComment && (
          <span>{errors.festivalExpenseComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="taxDeductedAmount">
          Tax Deducted / Collected at Source (with TDS on Profit of
          Sanchaypatra)
        </label>
        <input {...register("taxDeductedAmount")} id="taxDeductedAmount" />
        {errors.taxDeductedAmount && (
          <span>{errors.taxDeductedAmount.message}</span>
        )}
        <input {...register("taxDeductedComment")} id="taxDeductedComment" />
        {errors.taxDeductedComment && (
          <span>{errors.taxDeductedComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="advanceTaxPaid2Amount">Advance Tax paid</label>
        <input
          {...register("advanceTaxPaid2Amount")}
          id="advanceTaxPaid2Amount"
        />
        {errors.advanceTaxPaid2Amount && (
          <span>{errors.advanceTaxPaid2Amount.message}</span>
        )}
        <input
          {...register("advanceTaxPaidComment")}
          id="advanceTaxPaidComment"
        />
        {errors.advanceTaxPaidComment && (
          <span>{errors.advanceTaxPaidComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="taxSurchargePaidAmount">
          Tax & Surcharge Paid based on Tax Return of Last Year (paid with last
          year&apos;s tax return)
        </label>
        <input
          {...register("taxSurchargePaidAmount")}
          id="taxSurchargePaidAmount"
        />
        {errors.taxSurchargePaidAmount && (
          <span>{errors.taxSurchargePaidAmount.message}</span>
        )}
        <input
          {...register("taxSurchargePaidComment")}
          id="taxSurchargePaidComment"
        />
        {errors.taxSurchargePaidComment && (
          <span>{errors.taxSurchargePaidComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="interestPaidAmount">
          Interest Paid on Personal Loan Received from Institution & Other
          Source
        </label>
        <input {...register("interestPaidAmount")} id="interestPaidAmount" />
        {errors.interestPaidAmount && (
          <span>{errors.interestPaidAmount.message}</span>
        )}
        <input {...register("interestPaidComment")} id="interestPaidComment" />
        {errors.interestPaidComment && (
          <span>{errors.interestPaidComment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="total">Total</label>
        <input {...register("total")} id="total" />
        {errors.total && <span>{errors.total.message}</span>}
      </div>

      <div>
        <label htmlFor="exemptedIncomeFromBusiness">
          Exempted Income from Business
        </label>
        <input
          {...register("exemptedIncomeFromBusiness")}
          id="exemptedIncomeFromBusiness"
        />
        {errors.exemptedIncomeFromBusiness && (
          <span>{errors.exemptedIncomeFromBusiness.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="exemptedAgriculturalIncome">
          Exempted Agricultural income
        </label>
        <input
          {...register("exemptedAgriculturalIncome")}
          id="exemptedAgriculturalIncome"
        />
        {errors.exemptedAgriculturalIncome && (
          <span>{errors.exemptedAgriculturalIncome.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="incomeFromProvidentFund">
          Income from Provident Fund / Recognized Provident Fund
        </label>
        <input
          {...register("incomeFromProvidentFund")}
          id="incomeFromProvidentFund"
        />
        {errors.incomeFromProvidentFund && (
          <span>{errors.incomeFromProvidentFund.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="foreignRemittance">Foreign Remittance</label>
        <input {...register("foreignRemittance")} id="foreignRemittance" />
        {errors.foreignRemittance && (
          <span>{errors.foreignRemittance.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="typeOfReceipts1">Type of receipts</label>
        <input {...register("typeOfReceipts1")} id="typeOfReceipts1" />
        {errors.typeOfReceipts1 && (
          <span>{errors.typeOfReceipts1.message}</span>
        )}
        <input
          {...register("typeOfReceiptsAmount1")}
          id="typeOfReceiptsAmount1"
        />
        {errors.typeOfReceiptsAmount1 && (
          <span>{errors.typeOfReceiptsAmount1.message}</span>
        )}
        <input {...register("typeOfReceipts2")} id="typeOfReceipts2" />
        {errors.typeOfReceipts2 && (
          <span>{errors.typeOfReceipts2.message}</span>
        )}
        <input
          {...register("typeOfReceiptsAmount2")}
          id="typeOfReceiptsAmount2"
        />
        {errors.typeOfReceiptsAmount2 && (
          <span>{errors.typeOfReceiptsAmount2.message}</span>
        )}
        <input {...register("typeOfReceipts3")} id="typeOfReceipts3" />
        {errors.typeOfReceipts3 && (
          <span>{errors.typeOfReceipts3.message}</span>
        )}
        <input
          {...register("typeOfReceiptsAmount3")}
          id="typeOfReceiptsAmount3"
        />
        {errors.typeOfReceiptsAmount3 && (
          <span>{errors.typeOfReceiptsAmount3.message}</span>
        )}
      </div>

      <h2>Page 9</h2>

      <div>
        <label htmlFor="minimumTax" className="block mb-1">
          Net wealth at the last date of the previous income year
        </label>
        <select
          {...register("netWealthLastDate")}
          id="netWealthLastDate"
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Did you file a tax return last year?</option>
          {NET_WEALTH_LAST_DATE.map((minimumTax) => (
            <option key={minimumTax} value={minimumTax}>
              {kebabToNormal(minimumTax)}
            </option>
          ))}
        </select>
        {errors.netWealthLastDate && (
          <span className="text-red-500 text-sm">
            {errors.netWealthLastDate.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="giftExpense">
          Gift / Expenses / Loss Not Mentioned in IT-10BB
        </label>
        <input {...register("giftExpense")} id="giftExpense" />
        {errors.giftExpense && <span>{errors.giftExpense.message}</span>}
      </div>

      <div>
        <label htmlFor="institutionalLiabilities">
          Institutional Liabilities
        </label>
        <input
          {...register("institutionalLiabilities")}
          id="institutionalLiabilities"
        />
        {errors.institutionalLiabilities && (
          <span>{errors.institutionalLiabilities.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="nonInstitutionalLiabilities">
          Non-Institutional Liabilities
        </label>
        <input
          {...register("nonInstitutionalLiabilities")}
          id="nonInstitutionalLiabilities"
        />
        {errors.nonInstitutionalLiabilities && (
          <span>{errors.nonInstitutionalLiabilities.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="otherLiabilities">Other Liabilities</label>
        <input {...register("otherLiabilities")} id="otherLiabilities" />
        {errors.otherLiabilities && (
          <span>{errors.otherLiabilities.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="totalAssetOfBusiness">Total Asset of Business</label>
        <input
          {...register("totalAssetOfBusiness")}
          id="totalAssetOfBusiness"
        />
        {errors.totalAssetOfBusiness && (
          <span>{errors.totalAssetOfBusiness.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="lessBusinessLiabilities">
          Less: Business Liabilities (Institutional & Non-Institutional)
        </label>
        <input
          {...register("lessBusinessLiabilities")}
          id="lessBusinessLiabilities"
        />
        {errors.lessBusinessLiabilities && (
          <span>{errors.lessBusinessLiabilities.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="companyName1">Company Name</label>
        <input {...register("companyName1")} id="companyName1" />
        {errors.companyName1 && <span>{errors.companyName1.message}</span>}
        <input {...register("companyName2")} id="companyName2" />
        {errors.companyName2 && <span>{errors.companyName2.message}</span>}
        <input {...register("companyName3")} id="companyName3" />
        {errors.companyName3 && <span>{errors.companyName3.message}</span>}
      </div>

      <div>
        <label htmlFor="noOfShare1">No. of shares</label>
        <input {...register("noOfShare1")} id="noOfShare1" />
        {errors.noOfShare1 && <span>{errors.noOfShare1.message}</span>}
        <input {...register("noOfShare2")} id="noOfShare2" />
        {errors.noOfShare2 && <span>{errors.noOfShare2.message}</span>}
        <input {...register("noOfShare3")} id="noOfShare3" />
        {errors.noOfShare3 && <span>{errors.noOfShare3.message}</span>}
      </div>

      <div>
        <label htmlFor="value1">Value (TK)</label>
        <input {...register("value1")} id="value1" />
        {errors.value1 && <span>{errors.value1.message}</span>}
        <input {...register("value2")} id="value2" />
        {errors.value2 && <span>{errors.value2.message}</span>}
        <input {...register("value3")} id="value3" />
        {errors.value3 && <span>{errors.value3.message}</span>}
      </div>

      <div>
        <label htmlFor="nameOfPartnershipFirm1">Name of Partnership Firm</label>
        <input
          {...register("nameOfPartnershipFirm1")}
          id="nameOfPartnershipFirm1"
        />
        {errors.nameOfPartnershipFirm1 && (
          <span>{errors.nameOfPartnershipFirm1.message}</span>
        )}
        <input
          {...register("nameOfPartnershipFirm2")}
          id="nameOfPartnershipFirm2"
        />
        {errors.nameOfPartnershipFirm2 && (
          <span>{errors.nameOfPartnershipFirm2.message}</span>
        )}
        <input
          {...register("nameOfPartnershipFirm3")}
          id="nameOfPartnershipFirm3"
        />
        {errors.nameOfPartnershipFirm3 && (
          <span>{errors.nameOfPartnershipFirm3.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="shareOfProfit1">Share of profit (%)</label>
        <input {...register("shareOfProfit1")} id="shareOfProfit1" />
        {errors.shareOfProfit1 && <span>{errors.shareOfProfit1.message}</span>}
        <input {...register("shareOfProfit2")} id="shareOfProfit2" />
        {errors.shareOfProfit2 && <span>{errors.shareOfProfit2.message}</span>}
        <input {...register("shareOfProfit3")} id="shareOfProfit3" />
        {errors.shareOfProfit3 && <span>{errors.shareOfProfit3.message}</span>}
      </div>

      <div>
        <label htmlFor="capitalContributed1">Capital contributed</label>
        <input {...register("capitalContributed1")} id="capitalContributed1" />
        {errors.capitalContributed1 && (
          <span>{errors.capitalContributed1.message}</span>
        )}
        <input {...register("capitalContributed2")} id="capitalContributed2" />
        {errors.capitalContributed2 && (
          <span>{errors.capitalContributed2.message}</span>
        )}
        <input {...register("capitalContributed3")} id="capitalContributed3" />
        {errors.capitalContributed3 && (
          <span>{errors.capitalContributed3.message}</span>
        )}
      </div>

      <h2>Page 10</h2>

      <div>
        <label htmlFor="locationDescription1">Location and Description</label>
        <input
          {...register("locationDescription1")}
          id="locationDescription1"
        />
        {errors.locationDescription1 && (
          <span>{errors.locationDescription1.message}</span>
        )}
        <input
          {...register("locationDescription2")}
          id="locationDescription2"
        />
        {errors.locationDescription2 && (
          <span>{errors.locationDescription2.message}</span>
        )}
        <input
          {...register("locationDescription3")}
          id="locationDescription3"
        />
        {errors.locationDescription3 && (
          <span>{errors.locationDescription3.message}</span>
        )}
        <input
          {...register("locationDescription4")}
          id="locationDescription4"
        />
        {errors.locationDescription4 && (
          <span>{errors.locationDescription4.message}</span>
        )}
        <input
          {...register("locationDescription5")}
          id="locationDescription5"
        />
        {errors.locationDescription5 && (
          <span>{errors.locationDescription5.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="locationValue1">Value (Taka)</label>
        <input {...register("locationValue1")} id="locationValue1" />
        {errors.locationValue1 && <span>{errors.locationValue1.message}</span>}
        <input {...register("locationValue2")} id="locationValue2" />
        {errors.locationValue2 && <span>{errors.locationValue2.message}</span>}
        <input {...register("locationValue3")} id="locationValue3" />
        {errors.locationValue3 && <span>{errors.locationValue3.message}</span>}
        <input {...register("locationValue4")} id="locationValue4" />
        {errors.locationValue4 && <span>{errors.locationValue4.message}</span>}
        <input {...register("locationValue5")} id="locationValue5" />
        {errors.locationValue5 && <span>{errors.locationValue5.message}</span>}
      </div>

      <div>
        <label htmlFor="agriculturalLocationAndDescription1">
          Location and Description
        </label>
        <input
          {...register("agriculturalLocationAndDescription1")}
          id="agriculturalLocationAndDescription1"
        />
        {errors.agriculturalLocationAndDescription1 && (
          <span>{errors.agriculturalLocationAndDescription1.message}</span>
        )}
        <input
          {...register("agriculturalLocationAndDescription2")}
          id="agriculturalLocationAndDescription2"
        />
        {errors.agriculturalLocationAndDescription2 && (
          <span>{errors.agriculturalLocationAndDescription2.message}</span>
        )}
        <input
          {...register("agriculturalLocationAndDescription3")}
          id="agriculturalLocationAndDescription3"
        />
        {errors.agriculturalLocationAndDescription3 && (
          <span>{errors.agriculturalLocationAndDescription3.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="agriculturalLocationValue1">Value (Taka)</label>
        <input
          {...register("agriculturalLocationValue1")}
          id="agriculturalLocationValue1"
        />
        {errors.agriculturalLocationValue1 && (
          <span>{errors.agriculturalLocationValue1.message}</span>
        )}
        <input
          {...register("agriculturalLocationValue2")}
          id="agriculturalLocationValue2"
        />
        {errors.agriculturalLocationValue2 && (
          <span>{errors.agriculturalLocationValue2.message}</span>
        )}
        <input
          {...register("agriculturalLocationValue3")}
          id="agriculturalLocationValue3"
        />
        {errors.agriculturalLocationValue3 && (
          <span>{errors.agriculturalLocationValue3.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="shareDebentureUnitCertificate">
          Share / Debenture / Unit Certificate etc.
        </label>
        <input
          {...register("shareDebentureUnitCertificate")}
          id="shareDebentureUnitCertificate"
        />
        {errors.shareDebentureUnitCertificate && (
          <span>{errors.shareDebentureUnitCertificate.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="bondsGovernment">
          Bonds and other Government Securities
        </label>
        <input {...register("bondsGovernment")} id="bondsGovernment" />
        {errors.bondsGovernment && (
          <span>{errors.bondsGovernment.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="sanchayapatraSavingsCertificate">
          (i1) Sanchayapatra / Savings certificate
        </label>
        <input
          {...register("sanchayapatraSavingsCertificate")}
          id="sanchayapatraSavingsCertificate"
        />
        {errors.sanchayapatraSavingsCertificate && (
          <span>{errors.sanchayapatraSavingsCertificate.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="depositPensionScheme">Deposit Pension Scheme</label>
        <input
          {...register("depositPensionScheme")}
          id="depositPensionScheme"
        />
        {errors.depositPensionScheme && (
          <span>{errors.depositPensionScheme.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="loansGivenToOthers">(111) Loans given to others</label>
        <input {...register("loansGivenToOthers")} id="loansGivenToOthers" />
        {errors.loansGivenToOthers && (
          <span>{errors.loansGivenToOthers.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input {...register("name")} id="name" />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="nid">NID</label>
        <input {...register("nid")} id="nid" />
        {errors.nid && <span>{errors.nid.message}</span>}
        <input {...register("nidValue")} id="nidValue" />
        {errors.nidValue && <span>{errors.nidValue.message}</span>}
      </div>

      <div>
        <label htmlFor="savingDeposit">
          (1v) Savings Deposit / Term Deposit / Fixed deposits
        </label>
        <input {...register("savingDeposit")} id="savingDeposit" />
        {errors.savingDeposit && <span>{errors.savingDeposit.message}</span>}
      </div>
      <div>
        <label htmlFor="providentFund">
          (v) Provident Fund or Other Fund (if any)
        </label>
        <input {...register("providentFund")} id="providentFund" />
        {errors.providentFund && <span>{errors.providentFund.message}</span>}
      </div>

      <div>
        <label htmlFor="otherInvestment1">(vi) Other Investment</label>
        <input {...register("otherInvestment1")} id="otherInvestment1" />
        {errors.otherInvestment1 && (
          <span>{errors.otherInvestment1.message}</span>
        )}
        <input {...register("otherInvestment2")} id="otherInvestment2" />
        {errors.otherInvestment2 && (
          <span>{errors.otherInvestment2.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="typeOfMotorVehicle1">Type of Motor Vehicle</label>
        <input {...register("typeOfMotorVehicle1")} id="typeOfMotorVehicle1" />
        {errors.typeOfMotorVehicle1 && (
          <span>{errors.typeOfMotorVehicle1.message}</span>
        )}
        <input {...register("typeOfMotorVehicle2")} id="typeOfMotorVehicle2" />
        {errors.typeOfMotorVehicle2 && (
          <span>{errors.typeOfMotorVehicle2.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="typeOfMotorVehicle1">Type of Motor Vehicle</label>
        <input {...register("typeOfMotorVehicle1")} id="typeOfMotorVehicle1" />
        {errors.typeOfMotorVehicle1 && (
          <span>{errors.typeOfMotorVehicle1.message}</span>
        )}
        <input {...register("typeOfMotorVehicle2")} id="typeOfMotorVehicle2" />
        {errors.typeOfMotorVehicle2 && (
          <span>{errors.typeOfMotorVehicle2.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="registrationNumber1">Registration Number</label>
        <input {...register("registrationNumber1")} id="registrationNumber1" />
        {errors.registrationNumber1 && (
          <span>{errors.registrationNumber1.message}</span>
        )}
        <input {...register("registrationNumber2")} id="registrationNumber2" />
        {errors.registrationNumber2 && (
          <span>{errors.registrationNumber2.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="motorValue1">Value (Taka)</label>
        <input {...register("motorValue1")} id="motorValue1" />
        {errors.motorValue1 && <span>{errors.motorValue1.message}</span>}
        <input {...register("motorValue2")} id="motorValue2" />
        {errors.motorValue2 && <span>{errors.motorValue2.message}</span>}
      </div>

      <div>
        <label htmlFor="ornaments1">Ornaments (Mention Quantity)</label>
        <input {...register("ornaments1")} id="ornaments1" />
        {errors.ornaments1 && <span>{errors.ornaments1.message}</span>}
        <input {...register("ornaments2")} id="ornaments2" />
        {errors.ornaments2 && <span>{errors.ornaments2.message}</span>}
      </div>

      <div>
        <label htmlFor="furnitureAndElectronic">
          Furniture and Electronic Items
        </label>
        <input
          {...register("furnitureAndElectronic")}
          id="furnitureAndElectronic"
        />
        {errors.furnitureAndElectronic && (
          <span>{errors.furnitureAndElectronic.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="furnitureAndElectronic">
          Other Assets (Except Assets Mentioned in SL. 8K)
        </label>
        <input {...register("othersAssets1")} id="othersAssets1" />
        {errors.othersAssets1 && <span>{errors.othersAssets1.message}</span>}
        <input {...register("othersAssets2")} id="othersAssets2" />
        {errors.othersAssets2 && <span>{errors.othersAssets2.message}</span>}
      </div>
      <div>
        <label htmlFor="bankBalance">Bank Balance</label>
        <input {...register("bankBalance")} id="bankBalance" />
        {errors.bankBalance && <span>{errors.bankBalance.message}</span>}
      </div>
      <div>
        <label htmlFor="cashInHand">Cash in Hand</label>
        <input {...register("cashInHand")} id="cashInHand" />
        {errors.cashInHand && <span>{errors.cashInHand.message}</span>}
      </div>

      <div>
        <label htmlFor="others1">Others</label>
        <input {...register("others1")} id="others1" />
        {errors.others1 && <span>{errors.others1.message}</span>}
        <input {...register("others2")} id="others2" />
        {errors.others2 && <span>{errors.others2.message}</span>}
      </div>
      <div>
        <label htmlFor="assetOutsideBangladesh">Asset Outside Bangladesh</label>
        <input
          {...register("assetOutsideBangladesh")}
          id="assetOutsideBangladesh"
        />
        {errors.assetOutsideBangladesh && (
          <span>{errors.assetOutsideBangladesh.message}</span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
