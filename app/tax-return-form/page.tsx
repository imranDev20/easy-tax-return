"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TaxReturnFormInput, taxReturnFormSchema } from "./schema";
import {
  MINIMUM_TAX_OPTIONS,
  NET_WEALTH_SURCHARGE_OPTIONS,
  REPAIR_COLLECTION_OPTIONS,
} from "../lib/constants";
import { kebabToNormal } from "../lib/utils";

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
      <h1>First Page</h1>
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

      <div>
        <label htmlFor="addressLine1">Address:</label>
        <input {...register("addressLine1")} id="addressLine1" />
        {errors.addressLine1 && <span>{errors.addressLine1.message}</span>}
      </div>

      <div>
        <input {...register("addressLine2")} id="addressLine2" />
        {errors.addressLine2 && <span>{errors.addressLine2.message}</span>}
      </div>

      <div>
        <label htmlFor="telephone">Telephone:</label>
        <input {...register("telephone")} id="telephone" />
        {errors.telephone && <span>{errors.telephone.message}</span>}
      </div>
      <div>
        <label htmlFor="mobile">Mobile:</label>
        <input {...register("mobile")} id="mobile" />
        {errors.mobile && <span>{errors.mobile.message}</span>}
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input {...register("email")} id="email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="employerName">
          If employed, employer&apos;s (latest employer&apos;s name in case of
          multiple employement):
        </label>
        <input {...register("employerName")} id="employerName" />
        {errors.employerName && <span>{errors.employerName.message}</span>}
      </div>
      <div>
        <label htmlFor="businessName">Business Name:</label>
        <input {...register("businessName")} id="businessName" />
        {errors.businessName && <span>{errors.businessName.message}</span>}
      </div>
      <div>
        <label htmlFor="bin">Business Identification number (BIN):</label>
        <input {...register("bin")} id="bin" />
        {errors.bin && <span>{errors.bin.message}</span>}
      </div>
      <div>
        <label htmlFor="partnersMembersAssociation1">
          Name and TIN of Partners / Members in case of Firm / Association of
          Person:
        </label>
        <input
          {...register("partnersMembersAssociation1")}
          id="partnersMembersAssociation1"
        />
        {errors.partnersMembersAssociation1 && (
          <span>{errors.partnersMembersAssociation1.message}</span>
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
        <label htmlFor="exemptedIncomeFromBusiness">Exempted Income from Business</label>
        <input {...register("exemptedIncomeFromBusiness")} id="exemptedIncomeFromBusiness" />
        {errors.exemptedIncomeFromBusiness && <span>{errors.exemptedIncomeFromBusiness.message}</span>}
      </div>

      <div>
        <label htmlFor="exemptedAgriculturalIncome">Exempted Agricultural income</label>
        <input {...register("exemptedAgriculturalIncome")} id="exemptedAgriculturalIncome" />
        {errors.exemptedAgriculturalIncome && <span>{errors.exemptedAgriculturalIncome.message}</span>}
      </div>

      <div>
        <label htmlFor="incomeFromProvidentFund">Income from Provident Fund / Recognized Provident Fund</label>
        <input {...register("incomeFromProvidentFund")} id="incomeFromProvidentFund" />
        {errors.incomeFromProvidentFund && <span>{errors.incomeFromProvidentFund.message}</span>}
      </div>

      <div>
        <label htmlFor="foreignRemittance">Foreign Remittance</label>
        <input {...register("foreignRemittance")} id="foreignRemittance" />
        {errors.foreignRemittance && <span>{errors.foreignRemittance.message}</span>}
      </div>

      <div>
        <label htmlFor="typeOfReceipts1">Type of receipts</label>
        <input {...register("typeOfReceipts1")} id="typeOfReceipts1" />
        {errors.typeOfReceipts1 && <span>{errors.typeOfReceipts1.message}</span>}
        <input {...register("typeOfReceiptsAmount1")} id="typeOfReceiptsAmount1" />
        {errors.typeOfReceiptsAmount1 && <span>{errors.typeOfReceiptsAmount1.message}</span>}
        <input {...register("typeOfReceipts2")} id="typeOfReceipts2" />
        {errors.typeOfReceipts2 && <span>{errors.typeOfReceipts2.message}</span>}
        <input {...register("typeOfReceiptsAmount2")} id="typeOfReceiptsAmount2" />
        {errors.typeOfReceiptsAmount2 && <span>{errors.typeOfReceiptsAmount2.message}</span>}
        <input {...register("typeOfReceipts3")} id="typeOfReceipts3" />
        {errors.typeOfReceipts3 && <span>{errors.typeOfReceipts3.message}</span>}
        <input {...register("typeOfReceiptsAmount3")} id="typeOfReceiptsAmount3" />
        {errors.typeOfReceiptsAmount3 && <span>{errors.typeOfReceiptsAmount3.message}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
