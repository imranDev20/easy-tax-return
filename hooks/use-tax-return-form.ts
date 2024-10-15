// useTaxReturnForm.ts

import { useForm } from "react-hook-form";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "@/app/(site)/individual-tax-return/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormFields } from "./use-form-fields";
import { useCalculations } from "./use-calculations";
import {
  CalculationType,
  IncomeFromEmployment,
  MinimumTax,
  NetWealthLastDate,
} from "@prisma/client";

export const useTaxReturnForm = () => {
  const form = useForm<IndividualTaxReturnFormInput>({
    resolver: zodResolver(individualTaxReturnSchema),
    defaultValues: {
      taxpayerName: "John Doe",
      nationalId: "1234567890",
      tin: "TIN123456",
      circle: "Circle A",
      zone: "Zone 1",
      residentialStatus: "RESIDENT",
      dateOfBirth: new Date("1980-01-01"),
      addressLine1: "123 Main St",
      mobile: "1234567890",
      email: "johndoe@example.com",
      statementOfIncomeYearEndedOn: new Date("2023-12-31"),
      minimumTax: MinimumTax.DHAKA_CHATTOGRAM_CITY_CORPORATION_AREA,
      netWealthSurcharge: "NO",
      calculate: CalculationType.CALCULATE,
      taxPaidWithThisReturn: "1000",
      fatherOrHusband: "Father's Name",
      dateOfSignature: new Date(),
      isIncomeFromEmployment: IncomeFromEmployment.YES,
      taxpayersSharePercentage: "100",
      netWealthLastDate: NetWealthLastDate.NO_I_AM_A_NEW_TAXPAYER,
      humanVarification: "123",
      assessmentYear: "2024-25",
      typeOfEmployment: "GOVERNMENT",

      basicPayGovtEmployment: { amount: "0", taxExempted: "0", taxable: "0" },
      arrearPayGovtEmployment: { amount: "0", taxExempted: "0", taxable: "0" },
      specialAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      houseRentAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      medicalAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      conveyanceAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      festivalAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      allowanceForSupportStaffGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      leaveAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      honorariumRewardGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      overtimeAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      banglaNoboborshoAllowancesGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      interestAccruedProvidentFundGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      lumpGrantGovtEmployment: { amount: "0", taxExempted: "0", taxable: "0" },
      gratuityGovtEmployment: { amount: "0", taxExempted: "0", taxable: "0" },
      otherAllowanceGovtEmployment: {
        amount: "0",
        taxExempted: "0",
        taxable: "0",
      },
      totalGovtEmployment: { amount: "0", taxExempted: "0", taxable: "0" },
      taxDeductedAtSourceFromIncomefromEmployment: "0",

      interestProfitFromBankFI: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      incomeFromSavingCertificates: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      incomeFromSecuritiesDebentures: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      incomeFromFinancialProductScheme: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      dividendIncome: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      capitalGainFromTransferOfProperty: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      incomeFromBusinessMinTax: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      workersParticipationFund: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      incomeFromOtherSourcesMinTax: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },
      otherSubjectToMinTax: {
        particulars: "",
        amountOfIncome: "0",
        deductionsExpensesExemptedIncome: "0",
        netTaxableIncome: "0",
        taxDeductedAtSource: "0",
      },

      expensesForFood: { amount: "0", comment: "" },
      housingExpense: { amount: "0", comment: "" },
      personalTransportationExpenses: { amount: "0", comment: "" },
      utilityExpense: { amount: "0", comment: "" },
      educationExpenses: { amount: "0", comment: "" },
      personalExpenseForLocalForeignTravel: { amount: "0", comment: "" },
      festivalExpense: { amount: "0", comment: "" },
      taxDeductedCollectedAtSource: { amount: "0", comment: "" },
      advanceTaxPaid: { amount: "0", comment: "" },
      taxSurchargePaid: { amount: "0", comment: "" },
      interestPaid: { amount: "0", comment: "" },
      totalExpenseIndividualPerson: { amount: "0", comment: "" },
    },
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
