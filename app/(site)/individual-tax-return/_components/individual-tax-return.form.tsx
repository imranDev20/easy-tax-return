"use client";

import { RadioGroup } from "@/components/custom/radio";
import CustomSelect from "@/components/custom/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import CustomDatePicker from "@/components/custom/date-picker";
import SignatureField from "@/components/custom/signature";
import { Button } from "@/components/ui/button";
import { isFieldRequired, snakeToNormalText } from "@/lib/utils";
import "flatpickr/dist/themes/airbnb.css";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Save,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "../schema";

import {
  CALCULATE_OPTION,
  MINIMUM_TAX_OPTIONS,
  NET_WEALTH_LAST_DATE,
  NET_WEALTH_SURCHARGE_OPTIONS,
  REPAIR_COLLECTION_OPTIONS,
} from "@/lib/constants";
import ImageOne from "@/public/images/1.png";
import ImageTen from "@/public/images/10.png";
import ImageEleven from "@/public/images/11.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import ImageFour from "@/public/images/4.png";
import ImageFive from "@/public/images/5.png";
import ImageSix from "@/public/images/6.png";
import ImageSeven from "@/public/images/7.png";
import ImageEight from "@/public/images/8.png";
import ImageNine from "@/public/images/9.png";
import { createIndividualTaxReturn, createPayment } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CustomCheckbox from "@/components/custom/checkbox";
import { RepairCollection } from "@prisma/client";
import { z } from "zod";

// Define the possible field types
type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "select"
  | "signature"
  | "textarea";

interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Helper type to infer the type from a Zod schema
type Infer<T> = T extends z.ZodType<infer R> ? R : never;

// Updated NestedKeys type
type NestedKeys<T, Prefix extends string = ""> = T extends z.ZodType
  ? NestedKeys<Infer<T>, Prefix>
  : T extends Array<any>
  ? `${Prefix}${number}`
  : T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends z.ZodType
        ? `${Prefix}${K}` | NestedKeys<Infer<T[K]>, `${Prefix}${K}.`>
        : T[K] extends object
        ? `${Prefix}${K}` | NestedKeys<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & (string | number)]
  : never;

interface BaseFormField {
  name: NestedKeys<IndividualTaxReturnFormInput>;
  type: FieldType;
  label: string;
  x: number;
  y: number;
  disabled?: boolean;
  onBlur?: (value: string | boolean) => void;
  value?: string | number | Date;
  width: number;
  height: number;
  isVisible?: boolean;
  imageIndex: number;
}

interface RadioFormField extends BaseFormField {
  type: "radio";
  options: Array<{
    label: string;
    value: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  resetFields?: (keyof IndividualTaxReturnFormInput)[];
}

interface TextAreaFormField extends BaseFormField {
  type: "textarea";
  rows?: number;
  cols?: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SelectFormField extends BaseFormField {
  type: "select";
  options: Array<{ label: string; value: string }>;
  placeholder: string;
}

interface DateFormField extends BaseFormField {
  type: "date";
  dayPosition: DateFieldPosition;
  monthPosition: DateFieldPosition;
  yearPosition: DateFieldPosition;
}

interface SignatureFormField extends BaseFormField {
  type: "signature";
}

type OtherFormField = Omit<BaseFormField, "type"> & {
  type: Exclude<
    FieldType,
    "radio" | "select" | "date" | "signature" | "textarea"
  >;
};

type FormField =
  | RadioFormField
  | SelectFormField
  | DateFormField
  | SignatureFormField
  | OtherFormField
  | TextAreaFormField;

const images = [
  ImageOne,
  ImageTwo,
  ImageThree,
  ImageFour,
  ImageFive,
  ImageSix,
  ImageSeven,
  ImageEight,
  ImageNine,
  ImageTen,
  ImageEleven,
];

const IndividualTaxReturnForm: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<IndividualTaxReturnFormInput>({
    resolver: zodResolver(individualTaxReturnSchema),
    defaultValues: {},
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = form;

  const calculateTotalAssetsInBangladeshAndOutside = () => {
    const nonAgriculturalProperty = calculateTotalNonAgriculturalAssets();
    const agriculturalProperty = calculateTotalAgriculturalAssets();
    const totalFinancialAssets = calculateTotalFinancialAssets();
    const totalMotorValue = calculateTotalMotorValue();
    const totalCashInHandAndFund = calculateTotalCashInHandAndFund();

    const fields = [
      "ornamentsValue",
      "furnitureAndElectronic",
      "othersAssetsValue",
      "assetOutsideBangladesh",
    ];

    let totalInBangladesh =
      nonAgriculturalProperty +
      agriculturalProperty +
      totalFinancialAssets +
      totalMotorValue +
      totalCashInHandAndFund;

    let totalIncludingOutside = totalInBangladesh;

    fields.forEach((field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");

      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return;
      }

      const safeValue = Math.max(0, numberValue);

      if (field !== "assetOutsideBangladesh") {
        totalInBangladesh += safeValue;
      }
      totalIncludingOutside += safeValue;
    });

    const safeTotalInBangladesh = Math.round(totalInBangladesh * 100) / 100;
    const safeTotalIncludingOutside =
      Math.round(totalIncludingOutside * 100) / 100;

    setValue(
      "totalAssetslocatedInBangladesh",
      safeTotalInBangladesh.toFixed(2)
    );

    setValue(
      "totalAssetsInBangladeshAndOutsideBangladesh",
      safeTotalIncludingOutside.toFixed(2)
    );

    return {
      totalInBangladesh: safeTotalInBangladesh,
      totalIncludingOutside: safeTotalIncludingOutside,
    };
  };

  const calculateTotalCashInHandAndFund = () => {
    const fields = ["bankBalance", "cashInHand", "othersValue"];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");

      // Guard against NaN and return the current sum if the value is not a valid number
      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return sum;
      }

      // Ensure we're adding a positive number (or zero)
      return sum + Math.max(0, numberValue);
    }, 0);

    // Ensure the final total is not NaN, and round to 2 decimal places
    const safeTotal = isNaN(total) ? 0 : Math.round(total * 100) / 100;

    // Assuming you have a field for the total cash in hand and fund outside business
    setValue("totalCashInHandsAndFundOutsideBusiness", safeTotal.toFixed(2));
    return safeTotal;
  };

  const calculateTotalMotorValue = () => {
    const fields = ["motorValue1", "motorValue2"];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");

      // Guard against NaN and return the current sum if the value is not a valid number
      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return sum;
      }

      // Ensure we're adding a positive number (or zero)
      return sum + Math.max(0, numberValue);
    }, 0);

    // Ensure the final total is not NaN, and round to 2 decimal places
    const safeTotal = isNaN(total) ? 0 : Math.round(total * 100) / 100;

    // Assuming you have a field for the total motor value
    setValue("motorVehiclesAmount", safeTotal.toFixed(2));
    return safeTotal;
  };

  const calculateTotalFinancialAssets = () => {
    const fields = [
      "shareDebentureUnitCertificate",
      "bondsGovernment",
      "sanchayapatraSavingsCertificate",
      "depositPensionScheme",
      "loansGivenToOthers",
      "nidValue",
      "savingDeposit",
      "providentFund",
      "otherInvestmentAmount",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");

      // Guard against NaN and return the current sum if the value is not a valid number
      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return sum;
      }

      // Ensure we're adding a positive number (or zero)
      return sum + Math.max(0, numberValue);
    }, 0);

    // Ensure the final total is not NaN, and round to 2 decimal places
    const safeTotal = isNaN(total) ? 0 : Math.round(total * 100) / 100;

    // Assuming you have a field for the total financial assets
    setValue("totalFinancialAssets", safeTotal.toFixed(2));
    return safeTotal;
  };

  const calculateTotalAgriculturalAssets = () => {
    const fields = [
      "agriculturalLocationValue1",
      "agriculturalLocationValue2",
      "agriculturalLocationValue3",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");

      // Guard against NaN and return the current sum if the value is not a valid number
      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return sum;
      }

      // Ensure we're adding a positive number (or zero)
      return sum + Math.max(0, numberValue);
    }, 0);

    // Ensure the final total is not NaN, and round to 2 decimal places
    const safeTotal = isNaN(total) ? 0 : Math.round(total * 100) / 100;

    // Assuming you have a field for the total agricultural location value
    setValue("agriculturalProperty", safeTotal.toFixed(2));
    return safeTotal;
  };

  const calculateTotalNonAgriculturalAssets = () => {
    const fields = [
      "locationValue1",
      "locationValue2",
      "locationValue3",
      "locationValue4",
      "locationValue5",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");

      // Guard against NaN and return the current sum if the value is not a valid number
      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return sum;
      }

      // Ensure we're adding a positive number (or zero)
      return sum + Math.max(0, numberValue);
    }, 0);

    // Ensure the final total is not NaN, and round to 2 decimal places
    const safeTotal = isNaN(total) ? 0 : Math.round(total * 100) / 100;

    // Assuming you have a field for the total location value
    setValue("nonAgriculturalPropertyLandHouseProperty", safeTotal.toFixed(2));

    return safeTotal;
  };

  // individual person expense
  const calculateTotalExpenseIndividualPerson = () => {
    const fields = [
      "expensesForFood",
      "housingExpense",
      "personalTransportationExpenses",
      "utilityExpense",
      "educationExpenses",
      "personalExpenseForLocalForeignTravel",
      "festivalExpense",
      "taxDeductedCollectedAtSource",
      "advanceTaxPaid",
      "taxSurchargePaid",
      "interestPaid",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(
        `${field}.amount` as keyof IndividualTaxReturnFormInput
      );
      const numberValue = parseFloat(value?.toString() || "0");

      // Guard against NaN and return the current sum if the value is not a valid number
      if (isNaN(numberValue)) {
        console.warn(`Invalid value for ${field}: ${value}`);
        return sum;
      }

      // Ensure we're adding a positive number (or zero)
      return sum + Math.max(0, numberValue);
    }, 0);

    // Ensure the final total is not NaN, and round to 2 decimal places
    const safeTotal = isNaN(total) ? 0 : Math.round(total * 100) / 100;

    setValue("totalExpenseIndividualPerson.amount", safeTotal.toFixed(2));
    return safeTotal;
  };

  // rebate
  const calculateTotalAllowableInvestmentContribution = () => {
    const fields = [
      "lifeInsurancePremium",
      "contributionToDeposit",
      "investmentInGovernmentSecuritiesDetails",
      "investmentInGovernmentSecuritiesAmount",
      "investmentInSecurities",
      "contributionToProvidentFund",
      "selfAndEmployersContribution",
      "contributionToSuperAnnuationFund",
      "contributionToBenevolentFund",
      "contributionToZakatFundAmount",
      "othersRebateAmount",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalAllowableInvestmentContribution", total.toFixed(2));
    return total;
  };

  // Schedule 4
  const calculateSummaryOfBalanceSheet = () => {
    const netProfitFromBusinessIncome = parseFloat(
      watch("netProfitFromBusinessIncome") || "0"
    );

    const cashInHandAtBank = parseFloat(watch("cashInHandAtBank") || "0");
    const inventories = parseFloat(watch("inventories") || "0");
    const fixedAssets = parseFloat(watch("fixedAssets") || "0");
    const otherAssets = parseFloat(watch("otherAssets") || "0");

    const totalAssets =
      cashInHandAtBank + inventories + otherAssets + fixedAssets;

    setValue("totalAssets", totalAssets.toFixed(2));

    const openingCapital = parseFloat(watch("openingCapital") || "0");
    const withdrawalsInTheIncomeYear = parseFloat(
      watch("withdrawalsInTheIncomeYear") || "0"
    );

    const closingCapital =
      openingCapital + netProfitFromBusinessIncome - withdrawalsInTheIncomeYear;

    setValue("closingCapital", closingCapital.toFixed(2));

    const liabilities = parseFloat(watch("liabilities") || "0");
    const totalCapitalsAndLiabilities = liabilities + closingCapital;

    setValue(
      "totalCapitalsAndLiabilities",
      totalCapitalsAndLiabilities.toFixed(2)
    );

    return 0;
  };

  const calculateNetProfitFromBusinessIncome = (): number => {
    calculateSummaryOfBalanceSheet();

    const grossProfit = parseFloat(watch("grossProfitFromBusiness") || "0");
    const expenses = parseFloat(
      watch("generalAdministrativeSellingExpenses") || "0"
    );
    const badDebt = parseFloat(watch("badDebtExpense") || "0");

    // Guard against NaN values
    const safeGrossProfit = isNaN(grossProfit) ? 0 : grossProfit;
    const safeExpenses = isNaN(expenses) ? 0 : expenses;
    const safeBadDebt = isNaN(badDebt) ? 0 : badDebt;

    // Calculate net profit
    const netProfit = safeGrossProfit - safeExpenses - safeBadDebt;
    setValue("netProfitFromBusinessIncome", netProfit.toFixed(2));
    return Math.max(netProfit, 0);
  };

  // Schedule 1
  const calculatePrivateEmploymentTotals = useCallback(() => {
    const fields = [
      "basicPayPrivateEmployment",
      "allowancesPrivateEmployment",
      "advanceArrearSalaryPrivateEmployment",
      "gratuityAnnuityPensionOrSimilarBenefitPrivateEmployment",
      "perquisitesPrivateEmployment",
      "receiptInLieuOfOrInAdditionToSalaryOrWagesPrivateEmployment",
      "incomeFromEmployeeShareSchemePrivateEmployment",
      "accommodationFacilityPrivateEmployment",
      "transportFacilityPrivateEmployment",
      "anyOtherFacilityProvidedByEmployerPrivateEmployment",
      "employerContributionToRecognizedProvidentFundPrivateEmployment",
      "otherIfAnyPrivateEmployment",
    ] as const;

    let totalIncome = 0;

    for (const field of fields) {
      const fieldValue = watch(field);
      if (fieldValue && typeof fieldValue === "string") {
        const amount = parseFloat(fieldValue);
        if (!isNaN(amount)) {
          totalIncome += amount;
        }
      }
    }

    // Handle transport facility checkbox and vehicle CC
    const transportFacilityChecked = watch("transporFacilityPrivateCheck");
    const vehicleCC = watch("tranportFacilityPrivateVehicleCC");

    if (vehicleCC && transportFacilityChecked) {
      const transportAmount = vehicleCC === "LT_EQ_2500" ? 120000 : 300000;
      const currentTransportIncome = parseFloat(
        watch("transportFacilityPrivateEmployment") || "0"
      );

      if (currentTransportIncome) {
        totalIncome = totalIncome - currentTransportIncome;
      }
      totalIncome += transportAmount;

      setValue(
        "transportFacilityPrivateEmployment",
        transportAmount.toFixed(2)
      );
    }

    const totalExempted = Math.round(Math.min(totalIncome / 3, 450000));
    const totalIncomeFromSalary = totalIncome - totalExempted;

    setValue("exemptedAmountPrivateEmployment", totalExempted.toFixed(2));
    setValue("totalSalaryReceivedPrivateEmployment", totalIncome.toFixed(2));
    setValue(
      "totalIncomeFromSalaryPrivateEmployment",
      totalIncomeFromSalary.toFixed(2)
    );

    setValue("incomeFromEmployment", totalIncomeFromSalary.toFixed(2)); // for the second page

    return {
      totalIncome: isNaN(totalIncome) ? 0 : totalIncome,
    };
  }, [watch, setValue]);

  const calcualateScheduleOneOtherAllowanceGovtTaxable = () => {
    const incomeAmount = parseFloat(
      watch("otherAllowanceGovtEmployment.amount") || "0"
    );
    const taxExempted = parseFloat(
      watch("otherAllowanceGovtEmployment.taxExempted") || "0"
    );

    const result = incomeAmount - taxExempted;
    setValue("otherAllowanceGovtEmployment.taxable", result.toFixed(2));

    return result;
  };

  const calculateScheduleOneGovtTotals = () => {
    const taxExemptedFields = [
      "specialAllowanceGovtEmployment",
      "houseRentAllowanceGovtEmployment",
      "medicalAllowanceGovtEmployment",
      "conveyanceAllowanceGovtEmployment",
      "allowanceForSupportStaffGovtEmployment",
      "leaveAllowanceGovtEmployment",
      "honorariumRewardGovtEmployment",
      "banglaNoboborshoAllowancesGovtEmployment",
      "overtimeAllowanceGovtEmployment",
      "interestAccruedProvidentFundGovtEmployment",
      "lumpGrantGovtEmployment",
      "gratuityGovtEmployment",
    ] as const;

    const taxableFields = [
      "basicPayGovtEmployment",
      "arrearPayGovtEmployment",
      "festivalAllowanceGovtEmployment",
    ] as const;

    let totalIncome = 0;
    let totalTaxExempted = 0;
    let totalTaxable = 0;

    // Calculate total income and tax exempted
    for (const field of taxExemptedFields) {
      const fieldValue = watch(field);
      if (
        fieldValue &&
        typeof fieldValue === "object" &&
        "amount" in fieldValue
      ) {
        const amount = parseFloat(fieldValue.amount || "0");
        if (!isNaN(amount)) {
          totalIncome += amount;
          totalTaxExempted += amount;
        }
      }
    }

    // Calculate taxable income and add to total income
    for (const field of taxableFields) {
      const fieldValue = watch(field);
      if (
        fieldValue &&
        typeof fieldValue === "object" &&
        "amount" in fieldValue
      ) {
        const amount = parseFloat(fieldValue.amount || "0");
        if (!isNaN(amount)) {
          totalIncome += amount;
          totalTaxable += amount;
        }
      }
    }

    // Handle otherAllowanceGovtEmployment separately
    const otherAllowance = watch("otherAllowanceGovtEmployment");
    if (
      otherAllowance &&
      typeof otherAllowance === "object" &&
      "amount" in otherAllowance &&
      "taxExempted" in otherAllowance
    ) {
      const amount = parseFloat(otherAllowance.amount || "0");
      const taxExempted = parseFloat(otherAllowance.taxExempted || "0");
      if (!isNaN(amount) && !isNaN(taxExempted)) {
        totalIncome += amount;
        totalTaxExempted += taxExempted;
        totalTaxable += amount - taxExempted;
      }
    }

    // Set the calculated values
    setValue("totalGovtEmployment.amount", totalIncome.toFixed(2));
    setValue("totalGovtEmployment.taxExempted", totalTaxExempted.toFixed(2));
    setValue("totalGovtEmployment.taxable", totalTaxable.toFixed(2));
    setValue("incomeFromEmployment", totalTaxable.toFixed(2)); // for second page

    return {
      totalIncome: isNaN(totalIncome) ? 0 : totalIncome,
      totalTaxExempted: isNaN(totalTaxExempted) ? 0 : totalTaxExempted,
      totalTaxable: isNaN(totalTaxable) ? 0 : totalTaxable,
    };
  };

  const calculateScheduleThreeNetProfit = () => {
    const grossProfitFromAgriculture = parseFloat(
      watch("grossProfitFromAgriculture") || "0"
    );
    const generalExpensesSellingExpenses = parseFloat(
      watch("generalExpensesSellingExpenses") || "0"
    );

    // Handle NaN cases
    const safeGrossProfit = isNaN(grossProfitFromAgriculture)
      ? 0
      : grossProfitFromAgriculture;
    const safeGeneralExpensesSellingExpenses = isNaN(
      generalExpensesSellingExpenses
    )
      ? 0
      : generalExpensesSellingExpenses;

    const netProfitFromAgriculture =
      safeGrossProfit - safeGeneralExpensesSellingExpenses;

    // Ensure the result is not NaN before setting the value
    const safeNetProfit = isNaN(netProfitFromAgriculture)
      ? 0
      : netProfitFromAgriculture;

    setValue("netProfitFromAgriculture", safeNetProfit.toFixed(2));
    return safeNetProfit;
  };

  const calculateTaxPayersShare = () => {
    const netIncome = parseFloat(watch("netIncome") || "0");
    const taxpayersSharePercentage = parseFloat(
      watch("taxpayersSharePercentage") || "0"
    );

    // Handle NaN cases
    const safeNetIncome = isNaN(netIncome) ? 0 : netIncome;
    const safeTaxpayersSharePercentage = isNaN(taxpayersSharePercentage)
      ? 0
      : taxpayersSharePercentage;

    const result = safeNetIncome * (safeTaxpayersSharePercentage / 100);

    // Ensure the result is not NaN before setting the value
    const safeResult = isNaN(result) ? 0 : result;

    setValue("taxpayersShareAmount", safeResult.toFixed(2));
    return safeResult;
  };

  const calculateScheduleOneNetIncome = () => {
    const totalRentValue = parseFloat(watch("totalRentValue") || "0");
    const totalAdmissibleDeduction = parseFloat(
      watch("totalAdmissibleDeduction") || "0"
    );

    const netIncome = totalRentValue - totalAdmissibleDeduction;

    // Set the calculated net income in the form
    setValue("netIncome", netIncome.toFixed(2));
    return netIncome;
  };

  const calculateTotalAdmissibleDeduction = () => {
    const fields = [
      "repairCollectionAmount",
      "municipalOrLocalTax",
      "landRevenue",
      "interestMortgageCapitalCharge",
      "insurancePremiumPaid",
      "others",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalAdmissibleDeduction", total.toFixed(2));
    return total;
  };

  const calculateRepairCollectionAmount = (
    repairCollectionType?: RepairCollection
  ) => {
    const watchedRepairCollection = watch("repairCollectionProperty");
    const effectiveRepairCollection =
      repairCollectionType || watchedRepairCollection;
    const totalRentValue = parseFloat(watch("totalRentValue") || "0");

    let calculatedAmount = 0;

    switch (effectiveRepairCollection) {
      case "COMMERCIAL_PROPERTY":
        calculatedAmount = totalRentValue * 0.3;
        break;
      case "NON_COMMERCIAL":
      case "RESIDENTIAL_PROPERTY":
      case "MIXED_PROPERTY":
        calculatedAmount = totalRentValue * 0.25;
        break;
      default:
        calculatedAmount = 0;
    }

    setValue("repairCollectionAmount", calculatedAmount.toFixed(2));
  };

  const calculateTotalRentValue = () => {
    const parseNumber = (value: string | undefined): number => {
      if (value === undefined) return 0;
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    };

    const rentReceivedOrAnnualValue = watch("rentReceivedOrAnnualValue");
    const advanceRentReceived = watch("advanceRentReceived");
    const valueOfAnyBenefit = watch("valueOfAnyBenefit");
    const adjustedAdvanceRent = watch("adjustedAdvanceRent");
    const vacancyAllowance = watch("vacancyAllowance");

    const total =
      parseNumber(rentReceivedOrAnnualValue) +
      parseNumber(advanceRentReceived) +
      parseNumber(valueOfAnyBenefit) -
      parseNumber(adjustedAdvanceRent) -
      parseNumber(vacancyAllowance);

    setValue("totalRentValue", total.toFixed(2));
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "netWealthSurcharge") {
        if (value.netWealthSurcharge === "YES") {
          setValue("netWealthSurchargeAmount", "0.0");
        } else {
          setValue("netWealthSurchargeAmount", undefined);
        }
      }

      if (name === "tranportFacilityPrivateVehicleCC") {
        calculatePrivateEmploymentTotals();
      }

      if (name === "netWealthLastDate") {
        if (value.netWealthLastDate === "NO_I_AM_A_NEW_TAXPAYER") {
          setValue("netWealthLastDateAmount", "0.0");
        } else {
          setValue("netWealthLastDateAmount", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, calculatePrivateEmploymentTotals]);

  const formFields: FormField[] = [
    // Image 1

    {
      name: "taxpayerName",
      type: "text",
      label: "",
      x: 341,
      y: 275,
      width: 594,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },

    {
      name: "nationalId",
      type: "text",
      label: "",
      x: 538,
      y: 306,
      width: 397,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "",

      x: 538,
      y: 337,
      width: 397,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "circle",
      type: "text",
      label: "",
      x: 252,
      y: 367,
      width: 285,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "zone",
      type: "text",
      label: "",

      x: 685,
      y: 367,
      width: 250,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "residentialStatus",
      type: "radio",
      label: "",
      options: [
        {
          label: "",
          value: "RESIDENT",
          x: 712,
          y: 416,
          width: 45,
          height: 32,
        },
        {
          label: "",
          value: "NON_RESIDENT",
          x: 890,
          y: 416,
          width: 45,
          height: 32,
        },
      ],
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "specialBenefits",
      type: "radio",
      label: "",
      options: [
        {
          label: "",
          value: "GAZETTED_WAR_WOUNDED_FREEDOM_FIGHTER",
          x: 490,
          y: 470,
          width: 49,
          height: 35,
        },
        {
          label: "",
          value: "FEMALE",
          x: 888,
          y: 470,
          width: 49,
          height: 35,
        },
        {
          label: "",
          value: "THIRD_GENDER",
          x: 490,
          y: 505,
          width: 49,
          height: 35,
        },
        {
          label: "",
          value: "DISABLED_PERSON",
          x: 888,
          y: 505,
          width: 49,
          height: 35,
        },

        {
          label: "",
          value: "AGED_65_OR_MORE",
          x: 490,
          y: 540,
          width: 49,
          height: 35,
        },
      ],
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "isParentOfDisabledPerson",
      type: "radio",
      label: "",
      options: [
        {
          label: "",
          value: "true",
          x: 888,
          y: 543,
          width: 49,
          height: 35,
        },
      ],
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "",

      x: 538,
      y: 475,
      width: 397,
      height: 29,
      imageIndex: 0,
      dayPosition: { x: 150, y: 620, width: 60, height: 29 },
      monthPosition: { x: 220, y: 620, width: 60, height: 29 },
      yearPosition: { x: 290, y: 620, width: 100, height: 29 },
      isVisible: true,
    },
    {
      name: "spouseName",
      type: "text",
      label: "",

      x: 650,
      y: 577,
      width: 287,
      height: 34,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "spouseTin",
      type: "text",
      label: "",
      x: 650,
      y: 612,
      width: 287,
      height: 39,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "addressLine1",
      type: "text",
      label: "",
      x: 223,
      y: 651,
      width: 712,
      height: 32,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "addressLine2",
      type: "text",
      label: "",
      x: 223,
      y: 682,
      width: 712,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "telephone",
      type: "text",
      label: "",
      x: 130,
      y: 732,
      width: 267,
      height: 31,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "mobile",
      type: "text",
      label: "",
      x: 396,
      y: 732,
      width: 281,
      height: 31,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "email",
      type: "email",
      label: "",
      x: 678,
      y: 731,
      width: 259,
      height: 31,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "employerName",
      type: "text",
      label: "",
      x: 130,
      y: 782,
      width: 805,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "businessName",
      type: "text",
      label: "",
      x: 488,
      y: 812,
      width: 449,
      height: 31,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "bin",
      type: "text",
      label: "",
      x: 488,
      y: 843,
      width: 449,
      height: 31,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "partnersMembersAssociation1",
      type: "text",
      label: "",
      x: 130,
      y: 893,
      width: 807,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },
    {
      name: "partnersMembersAssociation2",
      type: "text",
      label: "",
      x: 130,
      y: 923,
      width: 807,
      height: 30,
      imageIndex: 0,
      isVisible: true,
    },

    // Image 2
    {
      name: "statementOfIncomeYearEndedOn",
      type: "date",
      label: "",
      x: 100,
      y: 100,
      width: 397,
      height: 29,
      imageIndex: 1,
      dayPosition: { x: 720, y: 40, width: 60, height: 29 },
      monthPosition: { x: 785, y: 40, width: 60, height: 29 },
      yearPosition: { x: 850, y: 40, width: 100, height: 29 },
      isVisible: true,
    },
    {
      name: "taxpayerName",
      type: "text",
      label: "",
      x: 92,
      y: 113,
      disabled: true,
      width: 570,
      height: 21,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "",
      disabled: true,
      x: 668,
      y: 113,
      width: 265,
      height: 20,
      imageIndex: 1,
      isVisible: true,
    },

    {
      name: "incomeFromEmployment",
      type: "text",
      label: "",
      disabled: true,
      x: 774,
      y: 180,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "taxpayersShareAmount", // this is taxable income fromt rent
      type: "text",
      label: "",
      disabled: true,
      x: 774,
      y: 208,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "netProfitFromAgriculture", // this is income from agriculture
      type: "text",
      label: "",
      disabled: true,
      x: 774,
      y: 236,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeFishFarming",
      type: "checkbox",
      label: "",
      x: 712,
      y: 266,
      width: 50,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeFishFarmingAmount",
      type: "text",
      label: "Fish farming amount",
      disabled: watch("incomeFishFarming") ? false : true,
      x: 772,
      y: 265,
      width: 166,
      height: 30,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeFromBusiness",
      type: "text",
      label: "incomeFromBusiness",
      disabled: true,
      x: 774,
      y: 300,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeFromBusinessMinimum",
      type: "text",
      label: "incomeFromBusinessMinimum",
      disabled: true,
      x: 774,
      y: 328,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "shareOfIncomeFromAOP",
      type: "text",
      label: "",
      x: 770,
      y: 450,
      width: 168,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeOfMinor",
      type: "text",
      label: "incomeOfMinor",
      x: 770,
      y: 479,
      width: 168,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },

    {
      name: "incomeFromCapitalGains",
      type: "text",
      label: "incomeFromCapitalGains",
      disabled: true,
      x: 774,
      y: 357,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeFromFinancialAssets",
      type: "text",
      label: "incomeFromFinancialAssets",
      disabled: true,
      x: 774,
      y: 388,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "incomeFromOtherSources",
      type: "text",
      label: "incomeFromOtherSources",
      disabled: true,
      x: 774,
      y: 418,
      width: 160,
      height: 30,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "totalIncome",
      type: "text",
      label: "totalIncome",
      disabled: true,
      x: 774,
      y: 538,
      width: 160,
      height: 27,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "totalAmountPayable",
      type: "text",
      label: "totalAmountPayable",
      disabled: true,
      x: 774,
      y: 855,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "taxableIncomeFromAbroad",
      type: "text",
      label: "incomeOfMinor",
      x: 770,
      y: 508,
      width: 168,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "minimumTax",
      type: "select",
      label: "Choose One",
      placeholder: "Minimum Tax Area",
      options: MINIMUM_TAX_OPTIONS.map((minimumTax) => ({
        label: snakeToNormalText(minimumTax),
        value: minimumTax,
      })),
      x: 270,
      y: 708,
      width: 350,
      height: 28,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "taxPayable",
      type: "text",
      label: "taxPayable",

      disabled: true,
      x: 774,
      y: 740,
      width: 165,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "netWealthSurchargeAmount",
      type: "text",
      label: "netWealthSurchargeAmount",
      disabled: true,
      x: 774,
      y: 768,
      width: 160,
      height: 25,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "netWealthSurcharge",
      type: "select",
      label: "Choose One",
      placeholder:
        "Do you have more than one motor vehicle or more than 8000 sqft house property/properties (in city corporation area)?",
      options: NET_WEALTH_SURCHARGE_OPTIONS.map((netWealth) => ({
        label: snakeToNormalText(netWealth),
        value: netWealth,
      })),
      x: 170,
      y: 780,
      width: 599,
      height: 12,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "environmentalSurcharge",
      type: "text",
      label: "environmentalSurcharge",
      x: 770,
      y: 795,
      width: 170,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "delayInterest",
      type: "text",
      label: "delay Interest",

      x: 770,
      y: 823,
      width: 170,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },
    {
      name: "calculate",
      type: "select",
      label: "Choose One",
      placeholder: "placeholder",
      options: CALCULATE_OPTION.map((calculate) => ({
        label: snakeToNormalText(calculate),
        value: calculate,
      })),
      x: 780,
      y: 885,
      width: 160,
      height: 29,
      imageIndex: 1,
      isVisible: true,
    },

    // Image 3

    {
      name: "taxDeductedOrCollected",
      type: "text",
      label: "taxDeductedOrCollected",
      disabled: true,
      x: 775,
      y: 111,
      width: 160,
      height: 25,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "totalTaxPaidAndAdjusted",
      type: "text",
      label: "totalTaxPaidAndAdjusted",
      disabled: true,
      x: 775,
      y: 225,
      width: 160,
      height: 25,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "excessPayment",
      type: "text",
      label: "excessPayment",
      disabled: true,
      x: 775,
      y: 255,
      width: 160,
      height: 25,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "taxExemptedTaxFreeIncome",
      type: "text",
      label: "taxExemptedTaxFreeIncome",
      disabled: true,
      x: 775,
      y: 312,
      width: 160,
      height: 25,
      imageIndex: 2,
      isVisible: true,
    },

    {
      name: "advanceTaxPaidAmount",
      type: "text",
      label: "",
      x: 770,
      y: 137,
      width: 170,
      height: 29,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "adjustmentOfTaxRefund",
      type: "text",
      label: "adjustmentOfTaxRefund",
      x: 770,
      y: 167,
      width: 170,
      height: 29,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "taxPaidWithThisReturn",
      type: "text",
      label: "taxPaidWithThisReturn",
      x: 770,
      y: 195,
      width: 170,
      height: 29,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "listOfDocumentsFurnishedWithThisReturn1",
      type: "textarea",
      label: "listOfDocumentsFurnishedWithThisReturn1",
      x: 91,
      y: 384,
      width: 425,
      height: 300,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "listOfDocumentsFurnishedWithThisReturn2",
      type: "textarea",
      label: "listOfDocumentsFurnishedWithThisReturn2",
      x: 516,
      y: 384,
      width: 424,
      height: 300,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "fatherOrHusband",
      type: "text",
      label: "fatherOrHusband",
      x: 632,
      y: 730,
      width: 300,
      height: 29,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "placeOfSignature",
      type: "text",
      label: "placeOfSignature",
      x: 145,
      y: 870,
      width: 250,
      height: 29,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "dateOfSignature",
      type: "date",
      label: "Date of Signature",

      x: 538,
      y: 910,
      width: 397,
      height: 29,
      imageIndex: 2,
      dayPosition: { x: 150, y: 920, width: 60, height: 29 },
      monthPosition: { x: 220, y: 920, width: 60, height: 29 },
      yearPosition: { x: 290, y: 920, width: 100, height: 29 },
      isVisible: true,
    },
    {
      name: "taxpayerName",
      type: "text",
      label: "",
      x: 160,
      y: 740,
      disabled: true,
      width: 300,
      height: 22,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "",
      x: 190,
      y: 765,
      disabled: true,
      width: 275,
      height: 22,
      imageIndex: 2,
      isVisible: true,
    },
    {
      name: "signature",
      type: "signature",
      label: "Signature",
      x: 650,
      y: 800,
      width: 500,
      height: 200,
      imageIndex: 2,
      isVisible: true,
    },

    // Image 4
    {
      name: "isIncomeFromEmployment",
      type: "radio",
      label: "Do you have any income from employment?",
      disabled: false,
      x: 308,
      y: 6,
      width: 265,
      height: 18,
      imageIndex: 3,
      resetFields: ["typeOfEmployment"],
      options: [
        {
          label: "Yes",
          height: 20,
          x: 640,
          y: 25,
          value: "YES",
          width: 33,
        },
        {
          label: "No",
          height: 20,
          x: 640,
          y: 48,
          value: "NO",
          width: 33,
        },
      ],
      isVisible: true,
    },
    {
      name: "typeOfEmployment",
      type: "radio",
      label: "",
      disabled:
        !watch("isIncomeFromEmployment") ||
        watch("isIncomeFromEmployment") === "NO",
      x: 308,
      y: 6,
      width: 265,
      height: 18,
      imageIndex: 3,
      options: [
        {
          label: "Private Organization",
          height: 20,
          x: 930,
          y: 25,
          value: "PRIVATE",
          width: 33,
        },
        {
          label: "Government",
          height: 20,
          x: 930,
          y: 48,
          value: "GOVERNMENT",
          width: 33,
        },
      ],
      resetFields: [
        "basicPayGovtEmployment",
        "arrearPayGovtEmployment",
        "specialAllowanceGovtEmployment",
        "houseRentAllowanceGovtEmployment",
        "medicalAllowanceGovtEmployment",
        "conveyanceAllowanceGovtEmployment",
        "festivalAllowanceGovtEmployment",
        "allowanceForSupportStaffGovtEmployment",
        "leaveAllowanceGovtEmployment",
        "honorariumRewardGovtEmployment",
        "overtimeAllowanceGovtEmployment",
        "banglaNoboborshoAllowancesGovtEmployment",
        "interestAccruedProvidentFundGovtEmployment",
        "lumpGrantGovtEmployment",
        "gratuityGovtEmployment",
        "otherAllowanceGovtEmployment",
        "totalGovtEmployment",
        "taxDeductedAtSourceFromIncomefromEmployment",
        "basicPayPrivateEmployment",
        "allowancesPrivateEmployment",
        "advanceArrearSalaryPrivateEmployment",
        "gratuityAnnuityPensionOrSimilarBenefitPrivateEmployment",
        "perquisitesPrivateEmployment",
        "receiptInLieuOfOrInAdditionToSalaryOrWagesPrivateEmployment",
        "incomeFromEmployeeShareSchemePrivateEmployment",
        "accommodationFacilityPrivateEmployment",
        "transportFacilityPrivateEmployment",
        "transporFacilityPrivateCheck",
        "tranportFacilityPrivateVehicleCC",
        "anyOtherFacilityProvidedByEmployerPrivateEmployment",
        "employerContributionToRecognizedProvidentFundPrivateEmployment",
        "otherIfAnyPrivateEmployment",
        "totalSalaryReceivedPrivateEmployment",
        "exemptedAmountPrivateEmployment",
        "totalIncomeFromSalaryPrivateEmployment",
        "incomeFromEmployment",
      ],
      isVisible: true,
    },
    {
      name: "taxpayerName",
      type: "text",
      label: "",
      disabled: true,
      x: 95,
      y: 147,
      width: 570,
      height: 18,
      imageIndex: 3,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "",
      disabled: true,
      x: 668,
      y: 147,
      width: 265,
      height: 18,
      imageIndex: 3,
      isVisible: true,
    },

    {
      name: "basicPayGovtEmployment.amount",
      type: "number",
      label: "",
      onBlur: (val) => {
        console.log(typeof val);

        if (typeof val === "string")
          setValue("basicPayGovtEmployment.taxable", val);

        calculateScheduleOneGovtTotals();
      },

      x: 474,
      y: 215,
      width: 153,
      height: 19,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "basicPayGovtEmployment.taxable",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 216,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "arrearPayGovtEmployment.amount",
      type: "number",
      label: "",
      x: 475,
      y: 235,
      width: 151,
      height: 32,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();

        if (typeof val === "string")
          setValue("arrearPayGovtEmployment.taxable", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "arrearPayGovtEmployment.taxable",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 235,
      width: 151,
      height: 32,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "specialAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      x: 475,
      y: 268,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("specialAllowanceGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "specialAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 268,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "houseRentAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      x: 475,
      y: 288,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("houseRentAllowanceGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "houseRentAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 288,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "medicalAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      x: 475,
      y: 307,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("medicalAllowanceGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "medicalAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 307,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "conveyanceAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 326,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("conveyanceAllowanceGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "conveyanceAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 326,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },

    {
      name: "festivalAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 348,
      width: 151,
      height: 16,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("festivalAllowanceGovtEmployment.taxable", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "festivalAllowanceGovtEmployment.taxable",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 348,
      width: 151,
      height: 16,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },

    {
      name: "allowanceForSupportStaffGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 367,
      width: 151,
      height: 16,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("allowanceForSupportStaffGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "allowanceForSupportStaffGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 367,
      width: 151,
      height: 16,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "leaveAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 385,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("leaveAllowanceGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "leaveAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 385,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "honorariumRewardGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 404,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("honorariumRewardGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "honorariumRewardGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 404,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "overtimeAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 424,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("overtimeAllowanceGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "overtimeAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 424,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "banglaNoboborshoAllowancesGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 443,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("banglaNoboborshoAllowancesGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "banglaNoboborshoAllowancesGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 443,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "interestAccruedProvidentFundGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 462,
      width: 151,
      height: 32,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue(
            "interestAccruedProvidentFundGovtEmployment.taxExempted",
            val
          );
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "interestAccruedProvidentFundGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 462,
      width: 151,
      height: 32,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "lumpGrantGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 496,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("lumpGrantGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "lumpGrantGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 496,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "gratuityGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 515,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur: (val) => {
        calculateScheduleOneGovtTotals();
        if (typeof val === "string")
          setValue("gratuityGovtEmployment.taxExempted", val);
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "gratuityGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 515,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },

    {
      name: "otherAllowanceGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: false,
      x: 475,
      y: 535,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calcualateScheduleOneOtherAllowanceGovtTaxable();
        calculateScheduleOneGovtTotals();
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "otherAllowanceGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: false,
      x: 630,
      y: 535,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calcualateScheduleOneOtherAllowanceGovtTaxable();
        calculateScheduleOneGovtTotals();
      },
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "otherAllowanceGovtEmployment.taxable",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 535,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "totalGovtEmployment.amount",
      type: "number",
      label: "",
      disabled: true,
      x: 475,
      y: 554,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "totalGovtEmployment.taxExempted",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 554,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "totalGovtEmployment.taxable",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 554,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },
    {
      name: "taxDeductedAtSourceFromIncomefromEmployment",
      type: "number",
      label: "Tax Deducted at source from employment",
      // disabled: true,
      x: 785,
      y: 576,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "GOVERNMENT",
    },

    // private

    {
      name: "basicPayPrivateEmployment",
      type: "number",
      label: "",
      x: 630,
      y: 650,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "allowancesPrivateEmployment",
      type: "number",
      label: "",
      x: 630,
      y: 670,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "advanceArrearSalaryPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 690,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "gratuityAnnuityPensionOrSimilarBenefitPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 708,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "perquisitesPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 728,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "receiptInLieuOfOrInAdditionToSalaryOrWagesPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 748,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "incomeFromEmployeeShareSchemePrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 767,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "accommodationFacilityPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 787,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "transporFacilityPrivateCheck",
      type: "checkbox",
      label: "",
      x: 295,
      y: 805,
      width: 30,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },

    {
      name: "tranportFacilityPrivateVehicleCC",
      type: "select",
      label: "",
      placeholder: "Choose One",
      options: [
        { label: "Vehicle up to 2500 cc", value: "LT_EQ_2500" },
        {
          label: "Vehicle above to 2500 cc",
          value: "GT_2500",
        },
      ],
      x: 330,
      y: 805,
      width: 290,
      height: 18,
      imageIndex: 3,
      isVisible:
        watch("transporFacilityPrivateCheck") &&
        watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "transportFacilityPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 806,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },

    {
      name: "anyOtherFacilityProvidedByEmployerPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 825,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "employerContributionToRecognizedProvidentFundPrivateEmployment",
      type: "number",
      label: "",
      x: 630,
      y: 845,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "otherIfAnyPrivateEmployment",
      type: "number",
      label: "",
      // disabled: true,
      x: 630,
      y: 865,
      width: 151,
      height: 18,
      imageIndex: 3,
      onBlur() {
        calculatePrivateEmploymentTotals();
      },
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "totalSalaryReceivedPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 884,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "totalSalaryReceivedPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 884,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "exemptedAmountPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 903,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "exemptedAmountPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 903,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "totalIncomeFromSalaryPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 630,
      y: 922,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },
    {
      name: "totalIncomeFromSalaryPrivateEmployment",
      type: "number",
      label: "",
      disabled: true,
      x: 785,
      y: 922,
      width: 151,
      height: 18,
      imageIndex: 3,
      isVisible: watch("typeOfEmployment") === "PRIVATE",
    },

    // Image 5
    {
      name: "taxpayerName",
      type: "text",
      label: "taxpayerName",
      disabled: true,
      x: 93,
      y: 130,
      width: 570,
      height: 19,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 666,
      y: 130,
      width: 271,
      height: 19,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "locationDescriptionOwnershipProportionOfProperty",
      type: "textarea",
      label: "locationDescriptionOwnershipProportionOfProperty",

      x: 90,
      y: 227,
      width: 260,
      height: 340,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "rentReceivedOrAnnualValue",
      type: "number",
      label: "rentReceivedOrAnnualValue",
      x: 750,
      y: 227,
      width: 95,
      height: 34,
      imageIndex: 4,
      onBlur() {
        calculateTotalRentValue();
        calculateRepairCollectionAmount();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "advanceRentReceived",
      type: "number",
      label: "advanceRentReceived",
      x: 750,
      y: 260,
      width: 95,
      height: 20,
      imageIndex: 4,
      onBlur() {
        calculateTotalRentValue();
        calculateRepairCollectionAmount();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "valueOfAnyBenefit",
      type: "number",
      label: "valueOfAnyBenefit",
      x: 750,
      y: 280,
      width: 95,
      height: 20,
      imageIndex: 4,
      onBlur() {
        calculateTotalRentValue();
        calculateRepairCollectionAmount();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "adjustedAdvanceRent",
      type: "text",
      label: "adjustedAdvanceRent",
      x: 750,
      y: 300,
      width: 95,
      height: 20,
      imageIndex: 4,
      onBlur() {
        calculateTotalRentValue();
        calculateRepairCollectionAmount();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "vacancyAllowance",
      type: "text",
      label: "vacancyAllowance",
      x: 750,
      y: 320,
      width: 95,
      height: 18,
      imageIndex: 4,
      onBlur() {
        calculateTotalRentValue();
        calculateRepairCollectionAmount();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "totalRentValue",
      type: "number",
      label: "totalRentValue",
      disabled: true,
      x: 845,
      y: 339,
      width: 90,
      height: 18,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "repairCollectionProperty",
      type: "select",
      label: "Choose One",
      placeholder: "Choose One",
      options: REPAIR_COLLECTION_OPTIONS.map((repairCollection) => ({
        label: snakeToNormalText(repairCollection),
        value: repairCollection,
      })),
      x: 640,
      y: 378,
      width: 110,
      height: 18,
      imageIndex: 4,
      onBlur: (val) => {
        calculateRepairCollectionAmount(val as RepairCollection);
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "repairCollectionAmount",
      label: "repairCollectionAmount",
      type: "text",
      disabled: true,
      x: 753,
      y: 378,
      width: 90,
      height: 18,
      imageIndex: 4,
      onBlur() {
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "municipalOrLocalTax",
      type: "text",
      label: "municipalOrLocalTax",
      x: 751,
      y: 397,
      width: 95,
      height: 19,
      imageIndex: 4,
      onBlur() {
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "landRevenue",
      type: "text",
      label: "landRevenue",
      x: 751,
      y: 417,
      width: 95,
      height: 19,
      imageIndex: 4,
      onBlur() {
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "interestMortgageCapitalCharge",
      type: "text",
      label: "interestMortgageCapitalCharge",
      x: 751,
      y: 435,
      width: 95,
      height: 34,
      imageIndex: 4,
      onBlur() {
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "insurancePremiumPaid",
      type: "text",
      label: "insurancePremiumPaid",
      x: 751,
      y: 470,
      width: 95,
      height: 19,
      imageIndex: 4,
      onBlur() {
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "others",
      type: "text",
      label: "others",
      x: 751,
      y: 490,
      width: 95,
      height: 19,
      imageIndex: 4,
      onBlur() {
        calculateTotalAdmissibleDeduction();
        calculateScheduleOneNetIncome();
        calculateTaxPayersShare();
      },
      isVisible: true,
    },
    {
      name: "totalAdmissibleDeduction",
      type: "text",
      label: "totalAdmissibleDeduction",
      disabled: true,
      x: 845,
      y: 508,
      width: 90,
      height: 18,
      imageIndex: 4,
      isVisible: true,
    },
    {
      name: "netIncome",
      type: "text",
      label: "netIncome",
      disabled: true,
      x: 845,
      y: 528,
      width: 90,
      height: 18,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "taxpayersSharePercentage",
      type: "text",
      label: "",
      x: 655,
      y: 547,
      width: 60,
      height: 18,
      imageIndex: 4,
      onBlur() {
        calculateTaxPayersShare();
      },
      isVisible: true,
    },

    {
      name: "taxpayersShareAmount",
      type: "text",
      label: "taxpayersShareAmount",
      disabled: true,
      x: 845,
      y: 548,
      width: 90,
      height: 18,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "taxDeductedSourceFromIncomeRent",
      type: "text",
      label: "taxDeductedSourceFromIncomeRent",
      x: 845,
      y: 570,
      width: 95,
      height: 19,
      imageIndex: 4,
      isVisible: true,
    },

    // schedule 3
    {
      name: "taxpayerName",
      type: "text",
      label: "taxpayerName",
      disabled: true,
      x: 93,
      y: 683,
      width: 570,
      height: 19,
      imageIndex: 4,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 666,
      y: 683,
      width: 271,
      height: 19,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "salesTurnoverReceipt",
      type: "text",
      label: "",
      x: 844,
      y: 765,
      width: 95,
      height: 20,
      imageIndex: 4,
      isVisible: true,
    },

    {
      name: "grossProfitFromAgriculture",
      type: "text",
      label: "",
      x: 844,
      y: 785,
      width: 95,
      height: 20,
      imageIndex: 4,
      onBlur() {
        calculateScheduleThreeNetProfit();
      },
      isVisible: true,
    },

    {
      name: "generalExpensesSellingExpenses",
      type: "text",
      label: "generalExpensesSellingExpenses",
      x: 844,
      y: 805,
      width: 95,
      height: 34,
      imageIndex: 4,
      onBlur() {
        calculateScheduleThreeNetProfit();
      },
      isVisible: true,
    },

    {
      name: "netProfitFromAgriculture",
      type: "text",
      label: "",
      disabled: true,
      x: 845,
      y: 840,
      width: 90,
      height: 15,
      imageIndex: 4,
      isVisible: true,
    },

    //  Image 6
    {
      name: "taxpayerName",
      type: "text",
      label: "Tax payer name",
      x: 92,
      y: 130,
      disabled: true,
      width: 570,
      height: 22,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 668,
      y: 132,
      width: 265,
      height: 20,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "nameOfBusiness",
      type: "text",
      label: "nameOfBusiness",

      x: 318,
      y: 169,
      width: 590,
      height: 21,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "natureOfBusiness",
      type: "text",
      label: "natureOfBusiness",
      x: 318,
      y: 192,
      width: 590,
      height: 21,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "addressOfBusiness",
      type: "text",
      label: "addressOfBusiness",
      x: 318,
      y: 213,
      width: 590,
      height: 21,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "salesTurnoverReceipts",
      type: "text",
      label: "salesTurnoverReceipts",
      x: 703,
      y: 285,
      width: 205,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "grossProfitFromBusiness",
      type: "text",
      label: "",
      x: 703,
      y: 303,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateNetProfitFromBusinessIncome();
      },
      isVisible: true,
    },
    {
      name: "generalAdministrativeSellingExpenses",
      type: "text",
      label: "",
      x: 703,
      y: 320,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateNetProfitFromBusinessIncome();
      },
      isVisible: true,
    },
    {
      name: "badDebtExpense",
      type: "text",
      label: "badDebtExpense",
      x: 703,
      y: 338,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateNetProfitFromBusinessIncome();
      },
      isVisible: true,
    },
    {
      name: "netProfitFromBusinessIncome",
      type: "text",
      label: "",
      disabled: true,
      x: 702,
      y: 358,
      width: 205,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },

    {
      name: "cashInHandAtBank",
      type: "text",
      label: "cashInHandAtBank",
      disabled: false,
      x: 702,
      y: 425,
      width: 200,
      height: 15,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },
    {
      name: "inventories",
      type: "text",
      label: "inventories",
      x: 700,
      y: 442,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },
    {
      name: "fixedAssets",
      type: "text",
      label: "fixedAssets",
      x: 700,
      y: 460,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },

    {
      name: "otherAssets",
      type: "text",
      label: "otherAssets",
      x: 700,
      y: 477,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },

    {
      name: "totalAssets",
      type: "text",
      label: "totalAssets",
      disabled: true,
      x: 702,
      y: 495,
      width: 200,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "openingCapital",
      type: "text",
      label: "openingCapital",
      x: 700,
      y: 512,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },
    {
      name: "netProfitFromBusinessIncome",
      type: "text",
      label: "",
      disabled: true,
      x: 702,
      y: 530,
      width: 200,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "withdrawalsInTheIncomeYear",
      type: "text",
      label: "withdrawalsInTheIncomeYear",
      x: 700,
      y: 548,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },
    {
      name: "closingCapital",
      type: "text",
      label: "",
      disabled: true,
      x: 702,
      y: 565,
      width: 200,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "liabilities",
      type: "text",
      label: "liabilities",
      x: 700,
      y: 583,
      width: 205,
      height: 18,
      imageIndex: 5,
      onBlur() {
        calculateSummaryOfBalanceSheet();
      },
      isVisible: true,
    },
    {
      name: "totalCapitalsAndLiabilities",
      type: "text",
      label: "totalCapitalsAndLiabilities",

      disabled: true,
      x: 702,
      y: 602,
      width: 200,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },

    // statement of income subject to minimum tax .........................................
    {
      name: "interestProfitFromBankFI.amountOfIncome",
      type: "number",
      label: "Interest/Profit from Bank/FI Amount",
      x: 490,
      y: 730,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "interestProfitFromBankFI.deductionsExpensesExemptedIncome",
      type: "number",
      label: "",

      x: 605,
      y: 730,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "interestProfitFromBankFI.netTaxableIncome",
      type: "number",
      label: "",
      disabled: true,
      x: 720,
      y: 732,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "interestProfitFromBankFI.taxDeductedAtSource",
      type: "number",
      label: "Interest/Profit from Bank/FI  Tax Deduction",
      value: "",
      x: 828,
      y: 730,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSavingCertificates.amountOfIncome",
      type: "number",
      label: "incomeFromSavingCertificatesAmount",

      x: 490,
      y: 750,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSavingCertificates.deductionsExpensesExemptedIncome",
      type: "number",
      label: "incomeFromSavingCertificatesDeductions",

      x: 605,
      y: 748,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSavingCertificates.netTaxableIncome",
      type: "number",
      label: "incomeFromSavingCertificatesNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 750,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSavingCertificates.taxDeductedAtSource",
      type: "number",
      label: "incomeFromSavingCertificatesTax",

      x: 828,
      y: 748,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSecuritiesDebentures.amountOfIncome",
      type: "number",
      label: "incomeFromSecuritiesDebenturesAmount",

      x: 490,
      y: 765,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSecuritiesDebentures.deductionsExpensesExemptedIncome",
      type: "number",
      label: "incomeFromSecuritiesDebenturesDeductions",

      x: 605,
      y: 766,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },

    {
      name: "incomeFromSecuritiesDebentures.netTaxableIncome",
      type: "number",
      label: "incomeFromSavingCertificatesNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 768,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromSecuritiesDebentures.taxDeductedAtSource",
      type: "number",
      label: "incomeFromSecuritiesDebenturesTax",

      x: 828,
      y: 766,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromFinancialProductScheme.amountOfIncome",
      type: "number",
      label: "incomeFromFinancialProductSchemeAmount",

      x: 490,
      y: 785,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromFinancialProductScheme.deductionsExpensesExemptedIncome",
      type: "number",
      label: "incomeFromFinancialProductSchemeDeductions",

      x: 605,
      y: 784,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromFinancialProductScheme.netTaxableIncome",
      type: "number",
      label: "incomeFromFinancialProductSchemeNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 785,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromFinancialProductScheme.taxDeductedAtSource",
      type: "number",
      label: "incomeFromFinancialProductSchemeTax",

      x: 828,
      y: 784,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "dividendIncome.amountOfIncome",
      type: "number",
      label: "dividendIncomeAmount",

      x: 490,
      y: 800,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "dividendIncome.deductionsExpensesExemptedIncome",
      type: "number",
      label: "dividendIncomeDeductions",

      x: 605,
      y: 802,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "dividendIncome.netTaxableIncome",
      type: "number",
      label: "dividendIncomeNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 803,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "dividendIncome.taxDeductedAtSource",
      type: "text",
      label: "dividendIncomeTax",

      x: 828,
      y: 800,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "capitalGainFromTransferOfProperty.amountOfIncome",
      type: "number",
      label: "capitalGainFromTransferOfPropertyAmount",

      x: 490,
      y: 820,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "capitalGainFromTransferOfProperty.deductionsExpensesExemptedIncome",
      type: "number",
      label: "capitalGainFromTransferOfPropertyDeductions",

      x: 605,
      y: 820,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "capitalGainFromTransferOfProperty.netTaxableIncome",
      type: "number",
      label: "capitalGainFromTransferofPropertyNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 820,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "capitalGainFromTransferOfProperty.taxDeductedAtSource",
      type: "number",
      label: "capitalGainFromTransferOfPropertyTax",

      x: 828,
      y: 820,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromBusinessMinTax.amountOfIncome",
      type: "number",
      label: "incomeFromBusinessAmount",

      x: 490,
      y: 838,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromBusinessMinTax.deductionsExpensesExemptedIncome",
      type: "number",
      label: "incomeFromBusinessDeductions",

      x: 605,
      y: 838,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromBusinessMinTax.netTaxableIncome",
      type: "number",
      label: "incomeFromBusinessNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 840,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },

    {
      name: "incomeFromBusinessMinTax.taxDeductedAtSource",
      type: "number",
      label: "incomeFromBusinessTax",

      x: 828,
      y: 838,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "workersParticipationFund.amountOfIncome",
      type: "number",
      label: "workersParticipationFundAmount",
      x: 490,
      y: 856,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "workersParticipationFund.deductionsExpensesExemptedIncome",
      type: "number",
      label: "workersParticipationFundDeductions",

      x: 605,
      y: 856,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "workersParticipationFund.netTaxableIncome",
      type: "number",
      label: "workersParticinationFundNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 856,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "workersParticipationFund.taxDeductedAtSource",
      type: "number",
      label: "workersParticipationFundTax",

      x: 828,
      y: 856,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromOtherSourcesMinTax.amountOfIncome",
      type: "number",
      label: "incomeFromOtherSourcesAmount",

      x: 490,
      y: 873,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromOtherSourcesMinTax.deductionsExpensesExemptedIncome",
      type: "number",
      label: "incomeFromOtherSourcesDeductions",

      x: 605,
      y: 872,
      width: 115,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromOtherSourcesMinTax.netTaxableIncome",
      type: "number",
      label: "incomeFromOtherSourcesNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 875,
      width: 105,
      height: 15,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "incomeFromOtherSourcesMinTax.taxDeductedAtSource",
      type: "text",
      label: "incomeFromOtherSourcesTax",

      x: 828,
      y: 874,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "otherSubjectToMinTax.particulars",
      type: "text",
      label: "customSource.particulars",
      x: 135,
      y: 890,
      width: 355,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "otherSubjectToMinTax.amountOfIncome",
      type: "number",
      label: "customSource.amountOfIncome",

      x: 490,
      y: 890,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "otherSubjectToMinTax.deductionsExpensesExemptedIncome",
      type: "number",
      label: "customSource.deductionsExpensesExemptedIncome",

      x: 605,
      y: 890,
      width: 112,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "otherSubjectToMinTax.netTaxableIncome",
      type: "number",
      label: "customSource.netTaxableIncome",
      disabled: true,
      x: 718,
      y: 890,
      width: 108,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },
    {
      name: "otherSubjectToMinTax.taxDeductedAtSource",
      type: "number",
      label: "customSource.taxDeductedAtSource",

      x: 828,
      y: 890,
      width: 110,
      height: 18,
      imageIndex: 5,
      isVisible: true,
    },

    // Image 7

    {
      name: "taxpayerName",
      type: "text",
      label: "taxpayerName",
      disabled: true,
      x: 95,
      y: 125,
      width: 570,
      height: 18,
      imageIndex: 6,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 668,
      y: 125,
      width: 265,
      height: 18,
      imageIndex: 6,
      isVisible: true,
    },
    {
      name: "lifeInsurancePremium",
      type: "text",
      label: "lifeInsurancePremium",
      x: 795,
      y: 195,
      width: 145,
      height: 18,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "contributionToDeposit",
      type: "text",
      label: "contributionToDeposit",
      x: 795,
      y: 215,
      width: 145,
      height: 18,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "investmentInGovernmentSecuritiesDetails",
      type: "text",
      label: "investmentInGovernmentSecuritiesDetails",
      x: 490,
      y: 248,
      width: 305,
      height: 18,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "investmentInGovernmentSecuritiesAmount",
      type: "text",
      label: "investmentInGovernmentSecuritiesAmount",
      x: 795,
      y: 232,
      width: 145,
      height: 35,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "investmentInSecurities",
      type: "text",
      label: "investmentInSecurities",
      x: 795,
      y: 265,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "contributionToProvidentFund",
      type: "text",
      label: "contributionToProvidentFund",
      x: 795,
      y: 284,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "selfAndEmployersContribution",
      type: "text",
      label: "selfAndEmployersContribution",
      x: 795,
      y: 306,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "contributionToSuperAnnuationFund",
      type: "text",
      label: "contributionToSuperAnnuationFund",
      x: 795,
      y: 324,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "contributionToBenevolentFund",
      type: "text",
      label: "contributionToBenevolentFund",
      x: 795,
      y: 344,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "contributionToZakatFundDetails",
      type: "text",
      label: "contributionToZakatFundDetails",
      x: 380,
      y: 364,
      width: 415,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },

    {
      name: "contributionToZakatFundAmount",
      type: "text",
      label: "",
      x: 795,
      y: 364,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "othersRebateDetails",
      type: "text",
      label: "othersRebateDetails",
      x: 395,
      y: 382,
      width: 400,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },

    {
      name: "othersRebateAmount",
      type: "text",
      label: "",
      x: 795,
      y: 382,
      width: 145,
      height: 20,
      imageIndex: 6,
      onBlur() {
        calculateTotalAllowableInvestmentContribution();
      },
      isVisible: true,
    },
    {
      name: "totalAllowableInvestmentContribution",
      type: "text",
      label: "totalAllowableInvestmentContribution",

      disabled: true,
      x: 795,
      y: 405,
      width: 140,
      height: 15,
      imageIndex: 6,
      isVisible: true,
    },

    {
      name: "taxOnIncomeFromPoultryHatcheriesFishFarming",
      type: "text",
      label: "taxOnIncomeFromPoultryHatcheriesFishFarming",
      // disabled: true,
      x: 735,
      y: 915,
      width: 200,
      height: 18,
      imageIndex: 6,
      isVisible: true,
    },

    // Image 8
    // 45 inputs
    {
      name: "taxpayerName",
      type: "text",
      label: "Tax payer name",
      disabled: true,
      x: 95,
      y: 135,
      width: 570,
      height: 20,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 668,
      y: 135,
      width: 265,
      height: 20,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "expensesForFood.amount",
      type: "text",
      label: "",
      x: 598,
      y: 205,
      width: 135,
      height: 20,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },

    {
      name: "expensesForFood.comment",
      type: "text",
      label: "",
      x: 732,
      y: 205,
      width: 208,
      height: 20,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "housingExpense.amount",
      type: "text",
      label: "",
      x: 598,
      y: 225,
      width: 135,
      height: 17,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "housingExpense.comment",
      type: "text",
      label: "",
      x: 732,
      y: 225,
      width: 208,
      height: 17,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "personalTransportationExpenses.amount",
      type: "text",
      label: "",
      x: 598,
      y: 242,
      width: 135,
      height: 17,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "personalTransportationExpenses.comment",
      type: "text",
      label: "",
      x: 732,
      y: 242,
      width: 208,
      height: 17,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "utilityExpense.amount",
      type: "text",
      label: "",
      x: 598,
      y: 260,
      width: 135,
      height: 32,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },

    {
      name: "utilityExpense.comment",
      type: "text",
      label: "",
      x: 732,
      y: 260,
      width: 208,
      height: 32,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "educationExpenses.amount",
      type: "text",
      label: "",
      x: 598,
      y: 292,
      width: 135,
      height: 17,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "educationExpenses.comment",
      type: "text",
      label: "",

      x: 732,
      y: 292,
      width: 208,
      height: 17,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "personalExpenseForLocalForeignTravel.amount",
      type: "text",
      label: "",
      x: 598,
      y: 311,
      width: 135,
      height: 32,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "personalExpenseForLocalForeignTravel.comment",
      type: "text",
      label: "",
      x: 732,
      y: 311,
      width: 208,
      height: 32,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "festivalExpense.amount",
      type: "text",
      label: "",
      x: 598,
      y: 345,
      width: 135,
      height: 17,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "festivalExpense.comment",
      type: "text",
      label: "",
      x: 732,
      y: 345,
      width: 208,
      height: 17,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "taxDeductedCollectedAtSource.amount",
      type: "text",
      label: "",
      disabled: true,
      x: 598,
      y: 362,
      width: 135,
      height: 32,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "taxDeductedCollectedAtSource.comment",
      type: "text",
      label: "",
      x: 732,
      y: 362,
      width: 208,
      height: 32,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "advanceTaxPaidAmount",
      type: "text",
      label: "",
      disabled: true,
      x: 598,
      y: 395,
      width: 135,
      height: 18,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "advanceTaxPaid.comment",
      type: "text",
      label: "advanceTaxPaidComment",

      x: 732,
      y: 395,
      width: 208,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "taxSurchargePaid.amount",
      type: "text",
      label: "",
      x: 596,
      y: 412,
      width: 138,
      height: 35,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },
    {
      name: "taxSurchargePaid.comment",
      type: "text",
      label: "",

      x: 732,
      y: 412,
      width: 208,
      height: 35,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "interestPaid.amount",
      type: "text",
      label: "",
      x: 596,
      y: 445,
      width: 138,
      height: 35,
      imageIndex: 7,
      onBlur() {
        calculateTotalExpenseIndividualPerson();
      },
      isVisible: true,
    },

    {
      name: "interestPaid.comment",
      type: "text",
      label: "",
      x: 732,
      y: 445,
      width: 208,
      height: 35,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "totalExpenseIndividualPerson.amount",
      type: "text",
      label: "",
      disabled: true,
      x: 598,
      y: 480,
      width: 135,
      height: 17,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "totalExpenseIndividualPerson.comment",
      type: "text",
      label: "total",
      x: 732,
      y: 480,
      width: 208,
      height: 17,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "taxpayerName",
      type: "text",
      label: "",
      disabled: true,
      x: 150,
      y: 595,
      width: 345,
      height: 20,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "totalAmount2",
      type: "text",
      label: "totalAmount2",

      disabled: true,
      x: 785,
      y: 798,
      width: 150,
      height: 16,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "totalAmount3",
      type: "text",
      label: "totalAmount3",
      disabled: true,
      x: 785,
      y: 928,
      width: 150,
      height: 16,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "exemptedIncomeFromSalary",
      type: "text",
      label: "exemptedIncomeFromSalary",
      x: 782,
      y: 672,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "exemptedIncomeFromBusiness",
      type: "text",
      label: "exemptedIncomeFromBusiness",

      x: 782,
      y: 690,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "exemptedAgriculturalIncome",
      type: "text",
      label: "exemptedAgriculturalIncome",

      x: 782,
      y: 705,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "incomeFromProvidentFund",
      type: "text",
      label: "incomeFromProvidentFund",

      x: 782,
      y: 725,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "foreignRemittance",
      type: "text",
      label: "foreignRemittance",

      x: 782,
      y: 742,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfReceipts1",
      type: "text",
      label: "typeOfReceipts1",

      x: 138,
      y: 872,
      width: 642,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfReceiptsAmount1",
      type: "text",
      label: "typeOfReceiptsAmount1",

      x: 782,
      y: 872,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfReceipts2",
      type: "text",
      label: "typeOfReceipts2",

      x: 138,
      y: 890,
      width: 642,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfReceiptsAmount2",
      type: "text",
      label: "typeOfReceiptsAmount2",

      x: 782,
      y: 890,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfReceipts3",
      type: "text",
      label: "typeOfReceipts3",

      x: 138,
      y: 908,
      width: 642,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfReceiptsAmount3",
      type: "text",
      label: "typeOfReceiptsAmount3",

      x: 782,
      y: 908,
      width: 157,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfTaxExemptedTaxFreeIncome6",
      type: "text",
      label: "typeOfTaxExemptedTaxFreeIncome6",

      x: 138,
      y: 760,
      width: 645,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfTaxExemptedTaxFreeIncomeAmount6",
      type: "text",
      label: "typeOfTaxExemptedTaxFreeIncomeAmount6",

      x: 782,
      y: 760,
      width: 158,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfTaxExemptedTaxFreeIncome7",
      type: "text",
      label: "typeOfTaxExemptedTaxFreeIncome7",

      x: 138,
      y: 778,
      width: 645,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },
    {
      name: "typeOfTaxExemptedTaxFreeIncomeAmount7",
      type: "text",
      label: "typeOfTaxExemptedTaxFreeIncomeAmount7",

      x: 782,
      y: 778,
      width: 158,
      height: 19,
      imageIndex: 7,
      isVisible: true,
    },

    {
      name: "signature",
      type: "signature",
      label: "Signature",
      x: 650,
      y: 540,
      width: 200,
      height: 40,
      imageIndex: 7,
      isVisible: true,
    },

    // Image 9
    // input 42
    {
      name: "taxpayerName",
      type: "text",
      label: "Tax payer name",
      x: 92,
      y: 300,
      disabled: true,
      width: 570,
      height: 20,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 668,
      y: 300,
      width: 265,
      height: 20,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "totalIncomeShownInTheReturn",
      type: "text",
      label: "totalIncomeShownInTheReturn",

      disabled: true,
      x: 775,
      y: 375,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "taxExemptedIncomeAndAllowance",
      type: "text",
      label: "taxExemptedIncomeAndAllowance",

      disabled: true,
      x: 775,
      y: 393,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "receiptOfGiftOtherReceipts",
      type: "text",
      label: "receiptOfGiftOtherReceipts",

      disabled: true,
      x: 775,
      y: 410,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "totalSourceOfFund",
      type: "text",
      label: "totalSourceOfFund",

      disabled: true,
      x: 775,
      y: 428,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "sumOfSourceOfFundAndPreviousYearsNetWealth",
      type: "text",
      label: "sumOfSourceOfFundAndPreviousYearsNetWealth",

      disabled: true,
      x: 775,
      y: 463,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "expenseRelatingToLifestyle",
      type: "text",
      label: "expenseRelatingToLifestyle",

      disabled: true,
      x: 775,
      y: 498,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "totalExpensesAndLoss",
      type: "text",
      label: "totalExpensesAndLoss",

      disabled: true,
      x: 775,
      y: 535,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "netWealthAtTheLastDateOfThisFinancialYear",
      type: "text",
      label: "netWealthAtTheLastDateOfThisFinancialYear",

      disabled: true,
      x: 775,
      y: 552,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "totalLiabilitiesOutsideBusiness",
      type: "text",
      label: "totalLiabilitiesOutsideBusiness",

      disabled: true,
      x: 775,
      y: 640,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "grossWealth",
      type: "text",
      label: "grossWealth",

      disabled: true,
      x: 775,
      y: 658,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "businessCapitalAmount1",
      type: "text",
      label: "businessCapitalAmount1",

      disabled: true,
      x: 640,
      y: 747,
      width: 130,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "businessCapitalAmount2",
      type: "text",
      label: "businessCapitalAmount2",

      disabled: true,
      x: 775,
      y: 747,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "directorsShareholdingsInTheCompanies",
      type: "text",
      label: "directorsShareholdingsInTheCompanies",

      disabled: true,
      x: 775,
      y: 765,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "businessCapitalOfPartnershipFirm",
      type: "text",
      label: "businessCapitalOfPartnershipFirm",

      disabled: true,
      x: 775,
      y: 852,
      width: 160,
      height: 16,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "netWealthLastDate",
      type: "select",
      label: "Did you file a tax return last year?",
      placeholder: "Did you file a tax return last year?",
      options: NET_WEALTH_LAST_DATE.map((netWealthLastDate) => ({
        label: snakeToNormalText(netWealthLastDate),
        value: netWealthLastDate,
      })),
      x: 580,
      y: 445,
      width: 194,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "netWealthLastDateAmount",
      type: "text",
      label: "netWealthLastDateAmount",

      disabled:
        watch("netWealthLastDate") === "NO_I_AM_A_NEW_TAXPAYER" ? true : false,

      x: 772,
      y: 445,
      width: 168,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "giftExpense",
      type: "text",
      label: "giftExpense",

      x: 772,
      y: 515,
      width: 168,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "institutionalLiabilities",
      type: "text",
      label: "institutionalLiabilities",

      x: 772,
      y: 585,
      width: 168,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "nonInstitutionalLiabilities",
      type: "text",
      label: "nonInstitutionalLiabilities",

      x: 772,
      y: 605,
      width: 168,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "otherLiabilities",
      type: "text",
      label: "otherLiabilities",

      x: 772,
      y: 620,
      width: 168,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "totalAssetOfBusiness",
      type: "text",
      label: "totalAssetOfBusiness",

      x: 640,
      y: 710,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "lessBusinessLiabilities",
      type: "text",
      label: "lessBusinessLiabilities",

      x: 640,
      y: 728,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "companyName1",
      type: "text",
      label: "companyName1",

      x: 185,
      y: 800,
      width: 320,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "companyName2",
      type: "text",
      label: "companyName2",

      x: 185,
      y: 818,
      width: 320,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "companyName3",
      type: "text",
      label: "companyName3",

      x: 185,
      y: 834,
      width: 320,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "noOfShare1",
      type: "text",
      label: "noOfShare1",

      x: 505,
      y: 800,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "noOfShare2",
      type: "text",
      label: "noOfShare2",

      x: 505,
      y: 818,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "noOfShare3",
      type: "text",
      label: "noOfShare3",

      x: 505,
      y: 834,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "value1",
      type: "text",
      label: "value1",

      x: 640,
      y: 800,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "value2",
      type: "text",
      label: "value2",

      x: 640,
      y: 818,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "value3",
      type: "text",
      label: "value3",

      x: 640,
      y: 834,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "nameOfPartnershipFirm1",
      type: "text",
      label: "nameOfPartnershipFirm1",

      x: 185,
      y: 903,
      width: 320,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "nameOfPartnershipFirm2",
      type: "text",
      label: "nameOfPartnershipFirm2",

      x: 185,
      y: 922,
      width: 320,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "nameOfPartnershipFirm3",
      type: "text",
      label: "nameOfPartnershipFirm3",

      x: 185,
      y: 938,
      width: 320,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },

    {
      name: "shareOfProfit1",
      type: "text",
      label: "shareOfProfit1",

      x: 505,
      y: 903,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "shareOfProfit2",
      type: "text",
      label: "shareOfProfit2",

      x: 505,
      y: 922,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "shareOfProfit3",
      type: "text",
      label: "shareOfProfit3",

      x: 505,
      y: 938,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "capitalContributed1",
      type: "text",
      label: "capitalContributed1",

      x: 640,
      y: 903,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "capitalContributed2",
      type: "text",
      label: "capitalContributed2",

      x: 640,
      y: 922,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },
    {
      name: "capitalContributed3",
      type: "text",
      label: "capitalContributed3",

      x: 640,
      y: 938,
      width: 135,
      height: 18,
      imageIndex: 8,
      isVisible: true,
    },

    // Image 10
    // inputs 54

    {
      name: "nonAgriculturalPropertyLandHouseProperty",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 85,
      width: 160,
      height: 25,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "locationDescription1",
      type: "text",
      label: "",
      x: 185,
      y: 130,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "locationValue1",
      type: "text",
      label: "",
      x: 638,
      y: 130,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "locationDescription2",
      type: "text",
      label: "",
      x: 185,
      y: 148,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "locationValue2",
      type: "text",
      label: "",
      x: 638,
      y: 148,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "locationDescription3",
      type: "text",
      label: "",

      x: 185,
      y: 165,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "locationValue3",
      type: "text",
      label: "",
      x: 638,
      y: 166,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "locationDescription4",
      type: "text",
      label: "",
      x: 185,
      y: 183,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "locationValue4",
      type: "text",
      label: "",
      x: 638,
      y: 184,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "locationDescription5",
      type: "text",
      label: "",
      x: 185,
      y: 202,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "locationValue5",
      type: "text",
      label: "",
      x: 638,
      y: 202,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "agriculturalLocationAndDescription1",
      type: "text",
      label: "",
      x: 185,
      y: 272,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "agriculturalLocationValue1",
      type: "text",
      label: "",
      x: 638,
      y: 272,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "agriculturalLocationAndDescription2",
      type: "text",
      label: "",
      x: 185,
      y: 290,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "agriculturalLocationValue2",
      type: "text",
      label: "",
      x: 638,
      y: 290,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "agriculturalLocationAndDescription3",
      type: "text",
      label: "",
      x: 185,
      y: 308,
      width: 455,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "agriculturalLocationValue3",
      type: "text",
      label: "",
      x: 638,
      y: 308,
      width: 135,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "agriculturalProperty",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 237,
      width: 160,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "shareDebentureUnitCertificate",
      type: "text",
      label: "",
      x: 770,
      y: 360,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "bondsGovernment",
      type: "text",
      label: "bondsGovernment",
      x: 770,
      y: 378,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "sanchayapatraSavingsCertificate",
      type: "text",
      label: "sanchayapatraSavingsCertificate",
      x: 770,
      y: 396,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "depositPensionScheme",
      type: "text",
      label: "depositPensionScheme",
      x: 770,
      y: 414,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "loansGivenToOthers",
      type: "text",
      label: "loansGivenToOthers",
      x: 770,
      y: 432,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "name",
      type: "text",
      label: "name",
      x: 250,
      y: 450,
      width: 318,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "nid",
      type: "text",
      label: "nid",
      x: 625,
      y: 450,
      width: 145,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "nidValue",
      type: "text",
      label: "nidValue",
      x: 770,
      y: 450,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "savingDeposit",
      type: "text",
      label: "savingDeposit",
      x: 770,
      y: 468,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "providentFund",
      type: "text",
      label: "providentFund",
      x: 770,
      y: 484,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "otherInvestmentDesc",
      type: "text",
      label: "otherInvestment1",
      x: 370,
      y: 502,
      width: 402,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "otherInvestmentAmount",
      type: "text",
      label: "",
      x: 770,
      y: 502,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "totalFinancialAssets",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 521,
      width: 160,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },
    // border line

    {
      name: "motorVehiclesAmount",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 538,
      width: 160,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "typeOfMotorVehicle1",
      type: "text",
      label: "",
      x: 185,
      y: 573,
      width: 225,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "registrationNumber1",
      type: "text",
      label: "",
      x: 410,
      y: 573,
      width: 215,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "motorValue1",
      type: "text",
      label: "motorValue1",
      x: 625,
      y: 573,
      width: 150,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "typeOfMotorVehicle2",
      type: "text",
      label: "typeOfMotorVehicle2",
      x: 185,
      y: 590,
      width: 225,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "registrationNumber2",
      type: "text",
      label: "registrationNumber2",
      x: 410,
      y: 590,
      width: 215,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "motorValue2",
      type: "text",
      label: "motorValue2",
      x: 625,
      y: 590,
      width: 150,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "ornamentsDesc",
      type: "text",
      label: "",
      x: 420,
      y: 610,
      width: 355,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "ornamentsValue",
      type: "text",
      label: "",
      x: 770,
      y: 610,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "furnitureAndElectronic",
      type: "text",
      label: "furnitureAndElectronic",
      x: 770,
      y: 628,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "othersAssetsDesc",
      type: "text",
      label: "othersAssets1",
      x: 550,
      y: 645,
      width: 220,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "othersAssetsValue",
      type: "text",
      label: "othersAssets2",
      x: 770,
      y: 645,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "bankBalance",
      type: "text",
      label: "bankBalance",
      x: 620,
      y: 680,
      width: 155,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "cashInHand",
      type: "text",
      label: "cashInHand",
      x: 620,
      y: 698,
      width: 155,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },
    {
      name: "othersDesc",
      type: "text",
      label: "",
      x: 300,
      y: 715,
      width: 320,
      height: 18,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "othersValue",
      type: "text",
      label: "others2",
      x: 620,
      y: 715,
      width: 155,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "totalCashInHandsAndFundOutsideBusiness",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 733,
      width: 160,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "totalAssetslocatedInBangladesh",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 750,
      width: 160,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "assetOutsideBangladesh",
      type: "text",
      label: "assetOutsideBangladesh",
      x: 770,
      y: 768,
      disabled: false,
      width: 170,
      height: 18,
      imageIndex: 9,
      isVisible: true,
      onBlur() {
        calculateTotalAssetsInBangladeshAndOutside();
      },
    },

    {
      name: "totalAssetsInBangladeshAndOutsideBangladesh",
      type: "text",
      label: "",
      disabled: true,
      x: 775,
      y: 785,
      width: 160,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },

    {
      name: "signature",
      type: "signature",
      label: "Signature",
      x: 650,
      y: 850,
      width: 200,
      height: 40,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "taxpayerName",
      type: "text",
      label: "taxpayerName",
      disabled: true,
      x: 150,
      y: 905,
      width: 340,
      height: 16,
      imageIndex: 9,
      isVisible: true,
    },
    {
      name: "humanVarification",
      type: "text",
      label: "humanVarification",
      x: 480,
      y: 940,
      width: 50,
      height: 30,
      imageIndex: 9,
      isVisible: true,
    },

    // Image 11
    {
      name: "taxpayerName",
      type: "text",
      label: "taxpayerName",
      disabled: true,
      x: 355,
      y: 390,
      width: 530,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
    {
      name: "nationalId",
      type: "text",
      label: "",
      disabled: true,
      x: 555,
      y: 430,
      width: 335,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
    {
      name: "tin",
      type: "text",
      label: "tin",
      disabled: true,
      x: 555,
      y: 475,
      width: 335,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
    {
      name: "circle",
      type: "text",
      label: "",
      disabled: true,
      x: 170,
      y: 520,
      width: 225,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
    {
      name: "zone",
      type: "text",
      label: "",
      disabled: true,
      x: 555,
      y: 520,
      width: 330,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
    {
      name: "totalIncomeShown",
      type: "text",
      label: "",

      disabled: true,
      x: 410,
      y: 565,
      width: 300,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
    {
      name: "totalTaxPaid",
      type: "text",
      label: "",
      disabled: true,
      x: 410,
      y: 610,
      width: 300,
      height: 16,
      imageIndex: 10,
      isVisible: true,
    },
  ];

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && imageRefs.current["0"]) {
        const imageWidth = imageRefs.current["0"].offsetWidth;
        const newScale = imageWidth / 1000; // Assuming 1000px as base width
        setScale(newScale);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      imageRefs.current.forEach((ref, index) => {
        if (
          ref &&
          ref.offsetTop <= scrollPosition &&
          ref.offsetTop + ref.offsetHeight > scrollPosition
        ) {
          setCurrentImageIndex(index);
        }
      });
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit: SubmitHandler<IndividualTaxReturnFormInput> = (data) => {
    // Handle form submission
    startTransition(async () => {
      try {
        const createData = {
          ...data,
          userId: "xyz123456",
        };

        const result = await createIndividualTaxReturn(createData);

        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
            variant: "success",
          });
          router.push("/admin");
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const renderField = (field: FormField, imageIndex: number) => {
    if (field.imageIndex !== imageIndex) return null;

    const fieldStyle = {
      position: "absolute" as const,
      left: `${field.x / 10}%`,
      top: `${field.y / 10}%`,
      width: `${field.width / 10}%`,
      height: `${field.height / 10}%`,
    };

    const isRequired = isFieldRequired(individualTaxReturnSchema, field.name);

    // console.log(watch("tranportFacilityPrivateVehicleCC"));

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <>
            {field.isVisible && (
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <div
                      style={fieldStyle}
                      className="relative overflow-hidden"
                    >
                      <input
                        // onChange={(e) => {}}
                        defaultValue={value as string}
                        type={field.type}
                        className={`w-full h-full absolute border px-2 font-medium ${
                          !field.disabled
                            ? (errors as any)[field.name]
                              ? "border-red-500 bg-red-300/10 focus:border-red-700 focus:ring-0 focus:outline-0 focus:bg-red-300/20 hover:border-red-700"
                              : "border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
                            : "bg-[#F5F5F5] font-semibold text-[#948C91]"
                        }`}
                        style={{ fontSize: `${14 * scale}px` }}
                        disabled={field.disabled}
                        onBlur={(e) => {
                          let newValue = e.target.value;
                          onChange(newValue);
                          if (field?.onBlur) field.onBlur(e.target.value);
                        }}
                      />

                      {(errors as any)[field.name] && (
                        <p className="absolute bottom-0 left-0 text-red-500 text-xs mt-1">
                          {(errors as any)[field.name]?.message as string}
                        </p>
                      )}

                      {/* Conditional rendering for the required indicator */}
                      {isRequired && !field.disabled && (
                        <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
                          <span className="absolute text-white top-[23px] left-[17px] text-lg">
                            *
                          </span>
                        </span>
                      )}
                    </div>
                  );
                }}
              />
            )}
          </>
        );
      case "checkbox":
        return (
          <CustomCheckbox
            label={field.label}
            name={field.name}
            register={register as any}
            style={{
              position: "absolute",
              left: `${field.x / 10}%`,
              top: `${field.y / 10}%`,
            }}
            scale={scale}
            width={field.width}
            height={field.height}
            required={isFieldRequired(individualTaxReturnSchema, field.name)}
            onBlur={field.onBlur}
          />
        );
      case "radio":
        return (
          <RadioGroup
            control={control}
            name={field.name as any}
            options={field.options}
            scale={scale}
            disabled={field.disabled}
            resetFields={field.resetFields}
            required={isRequired}
            label={field.label}
            x={field.x}
            y={field.y}
          />
        );
      case "select":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name as any}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  options={field.options}
                  value={value as string}
                  onChange={onChange}
                  name={field.name}
                  scale={scale}
                  required={isRequired}
                  placeholder={field.placeholder}
                  onBlur={field.onBlur}
                  isVisible={field.isVisible}
                />
              )}
            />
          </div>
        );

      case "date":
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                onChange={(date) => {
                  onChange(date);
                }}
                name={field.name}
                dayPosition={field.dayPosition}
                monthPosition={field.monthPosition}
                yearPosition={field.yearPosition}
                scale={scale}
              />
            )}
          />
        );

      // case "signature":
      //   return (
      //     <div style={fieldStyle}>
      //       <Controller
      //         name="signature"
      //         control={control}
      //         render={({ field: { onChange, value } }) => (
      //           <SignatureField
      //             onChange={(signatureData) => {
      //               onChange(signatureData);
      //             }}
      //             width={field.width}
      //             height={field.height}
      //             value={value as string}
      //           />
      //         )}
      //       />
      //     </div>
      //   );
      case "textarea":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <textarea
              {...register(field.name as any)}
              className="w-full h-full absolute border px-2 border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
              style={{ fontSize: `${14 * scale}px` }}
            />
            {isRequired && (
              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
                <span className="absolute text-white top-[23px] left-[17px] text-lg">
                  *
                </span>
              </span>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const scrollToImage = (index: number) => {
    setCurrentImageIndex(index);
    imageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const setImageRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      imageRefs.current[index] = el;
    },
    []
  );

  const setFormContainerRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      formContainerRefs.current[index] = el;
    },
    []
  );

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif text-center">
          Online Tax Return Form
        </h1>
        <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Complete your tax return easily and securely. Our form is designed to
          guide you through the process step by step.
        </p>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative" ref={containerRef}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      ref={setImageRef(index)}
                      className="relative border-2 border-gray-200 rounded-lg mb-8"
                    >
                      <Image
                        src={image}
                        loading="lazy"
                        placeholder="blur"
                        alt={`Form Background ${index + 1}`}
                        layout="responsive"
                      />
                      <div
                        ref={setFormContainerRef(index)}
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        {formFields.map((field) => renderField(field, index))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scrollspy */}
                <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToImage(index)}
                      className={`block mb-2 w-8 h-8 rounded-full ${
                        currentImageIndex === index
                          ? "bg-primary text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
                  <div className="container mx-auto flex justify-between items-center py-3 px-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={currentImageIndex === 0}
                          title="Previous Page"
                          onClick={() => {
                            if (currentImageIndex > 0) {
                              setCurrentImageIndex(currentImageIndex - 1);
                              scrollToImage(currentImageIndex - 1);
                            }
                          }}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">
                          Page {currentImageIndex + 1} of {images.length}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={currentImageIndex === images.length - 1}
                          title="Next Page"
                          onClick={() => {
                            if (currentImageIndex < images.length - 1) {
                              setCurrentImageIndex(currentImageIndex + 1);
                              scrollToImage(currentImageIndex + 1);
                            }
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
                        <Button
                          onClick={() =>
                            setScale((prev) => Math.max(prev - 0.1, 0.5))
                          }
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          title="Zoom Out"
                        >
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">
                          {Math.round(scale * 100)}%
                        </span>
                        <Button
                          onClick={() =>
                            setScale((prev) => Math.min(prev + 0.1, 2))
                          }
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          title="Zoom In"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => console.log("Save for later")}
                        variant="outline"
                        className="px-4 py-2 text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-300 font-medium"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save for Later
                      </Button>
                      <Button
                        onClick={() => console.log("Save PDF")}
                        className="px-6 py-2 bg-primary text-white font-medium transition duration-300 hover:bg-primary-dark"
                        type="submit"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Save PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4 font-serif text-primary">
            Need Assistance?
          </h3>
          <p className="text-gray-700 mb-4">
            Our tax experts are here to help you with any questions or concerns.
          </p>
          <Button className="px-6 py-3 bg-secondary text-primary border-2 border-primary rounded-lg font-semibold text-lg transition duration-300 hover:bg-primary hover:text-white">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
export default IndividualTaxReturnForm;
