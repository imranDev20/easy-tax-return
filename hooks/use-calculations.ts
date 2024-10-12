import {
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { IndividualTaxReturnFormInput } from "@/app/(site)/individual-tax-return/schema";
import { RepairCollection } from "@prisma/client";
import { useCallback } from "react";

export const useCalculations = (
  watch: UseFormWatch<IndividualTaxReturnFormInput>,
  setValue: UseFormSetValue<IndividualTaxReturnFormInput>,
  getValues: UseFormGetValues<IndividualTaxReturnFormInput>
) => {
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
    setValue("expenseRelatingToLifestyle", safeTotal.toFixed(2));
    calculateTotalExpenseAndLoss();
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
    setValue("incomeFromBusiness", netProfit.toFixed(2));
    calculateTotalIncome();
    return Math.max(netProfit, 0);
  };

  // Image 8 statement of assests
  const calculateGrossWealth = useCallback(() => {
    const fields = [
      "netWealthAtTheLastDateOfThisFinancialYear",
      "totalLiabilitiesOutsideBusiness",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("grossWealth", total.toFixed(2));
    return total;
  }, [setValue, watch]);

  const calculateNetWealthLastDateOfThisFinancialYear = useCallback(() => {
    const sumOfSourceOfFundPreviousYear = getValues(
      "sumOfSourceOfFundAndPreviousYearsNetWealth"
    );
    const totalExpenseAndLoss = getValues("totalExpensesAndLoss");

    const result =
      parseFloat(sumOfSourceOfFundPreviousYear?.toString() || "0") -
      parseFloat(totalExpenseAndLoss?.toString() || "0");

    setValue("netWealthAtTheLastDateOfThisFinancialYear", result.toFixed(2));
    calculateGrossWealth();
  }, [getValues, setValue, calculateGrossWealth]);

  const calculateSumOfSourceOfFund = useCallback(() => {
    const fields = ["totalSourceOfFund", "netWealthLastDateAmount"];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("sumOfSourceOfFundAndPreviousYearsNetWealth", total.toFixed(2));
    calculateNetWealthLastDateOfThisFinancialYear();
    return total;
  }, [setValue, watch, calculateNetWealthLastDateOfThisFinancialYear]);

  const calculateTotalSourceOfFunds = useCallback(() => {
    const fields = [
      "totalIncomeShownInTheReturn",
      "taxExemptedIncomeAndAllowance",
      "receiptOfGiftOtherReceipts",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalSourceOfFund", total.toFixed(2));
    calculateSumOfSourceOfFund();
    return total;
  }, [setValue, watch, calculateSumOfSourceOfFund]);

  const calculateTotalExpenseAndLoss = () => {
    const fields = ["expenseRelatingToLifestyle", "giftExpense"];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalExpensesAndLoss", total.toFixed(2));
    calculateNetWealthLastDateOfThisFinancialYear();
    return total;
  };

  const calculateLiabilitiesOutSideBusiness = () => {
    const fields = [
      "institutionalLiabilities",
      "nonInstitutionalLiabilities",
      "otherLiabilities",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalLiabilitiesOutsideBusiness", total.toFixed(2));
    calculateGrossWealth();
    return total;
  };

  const calculateNetTaxableIncome = () => {
    const interestProfitFromBankFIAmount = getValues(
      "interestProfitFromBankFI.amountOfIncome"
    );
    const interestProfitFromBankFIDedction = getValues(
      "interestProfitFromBankFI.deductionsExpensesExemptedIncome"
    );
    const interestProfitFromBankFINetTaxable =
      parseFloat(interestProfitFromBankFIAmount?.toString() || "0") -
      parseFloat(interestProfitFromBankFIDedction?.toString() || "0");
    setValue(
      "interestProfitFromBankFI.netTaxableIncome",
      interestProfitFromBankFINetTaxable.toFixed(2)
    );

    const incomeFromSavingCertificatesAmount = getValues(
      "incomeFromSavingCertificates.amountOfIncome"
    );
    const incomeFromSavingCertificatesDedction = getValues(
      "incomeFromSavingCertificates.deductionsExpensesExemptedIncome"
    );
    const incomeFromSavingCertificatesNetTaxable =
      parseFloat(incomeFromSavingCertificatesAmount?.toString() || "0") -
      parseFloat(incomeFromSavingCertificatesDedction?.toString() || "0");
    setValue(
      "incomeFromSavingCertificates.netTaxableIncome",
      incomeFromSavingCertificatesNetTaxable.toFixed(2)
    );

    const incomeFromSecuritiesDebenturesAmount = getValues(
      "incomeFromSecuritiesDebentures.amountOfIncome"
    );
    const incomeFromSecuritiesDebenturesDedction = getValues(
      "incomeFromSecuritiesDebentures.deductionsExpensesExemptedIncome"
    );
    const incomeFromSecuritiesDebenturesNetTaxable =
      parseFloat(incomeFromSecuritiesDebenturesAmount?.toString() || "0") -
      parseFloat(incomeFromSecuritiesDebenturesDedction?.toString() || "0");
    setValue(
      "incomeFromSecuritiesDebentures.netTaxableIncome",
      incomeFromSecuritiesDebenturesNetTaxable.toFixed(2)
    );

    const incomeFromFinancialProductSchemeAmount = getValues(
      "incomeFromFinancialProductScheme.amountOfIncome"
    );
    const incomeFromFinancialProductSchemeDedction = getValues(
      "incomeFromFinancialProductScheme.deductionsExpensesExemptedIncome"
    );
    const incomeFromFinancialProductSchemeNetTaxable =
      parseFloat(incomeFromFinancialProductSchemeAmount?.toString() || "0") -
      parseFloat(incomeFromFinancialProductSchemeDedction?.toString() || "0");
    setValue(
      "incomeFromFinancialProductScheme.netTaxableIncome",
      incomeFromFinancialProductSchemeNetTaxable.toFixed(2)
    );

    const dividendIncomeAmount = getValues("dividendIncome.amountOfIncome");
    const dividendIncomeDedction = getValues(
      "dividendIncome.deductionsExpensesExemptedIncome"
    );
    const dividendIncomeNetTaxable =
      parseFloat(dividendIncomeAmount?.toString() || "0") -
      parseFloat(dividendIncomeDedction?.toString() || "0");
    setValue(
      "dividendIncome.netTaxableIncome",
      dividendIncomeNetTaxable.toFixed(2)
    );

    const incomeFromFinancialAssets =
      interestProfitFromBankFINetTaxable +
      incomeFromSavingCertificatesNetTaxable +
      incomeFromSecuritiesDebenturesNetTaxable +
      incomeFromFinancialProductSchemeNetTaxable +
      dividendIncomeNetTaxable;

    setValue("incomeFromFinancialAssets", incomeFromFinancialAssets.toFixed(2));

    const capitalGainFromTransferOfPropertyAmount = getValues(
      "capitalGainFromTransferOfProperty.amountOfIncome"
    );
    const capitalGainFromTransferOfPropertyDedction = getValues(
      "capitalGainFromTransferOfProperty.deductionsExpensesExemptedIncome"
    );
    const capitalGainFromTransferOfPropertyNetTaxable =
      parseFloat(capitalGainFromTransferOfPropertyAmount?.toString() || "0") -
      parseFloat(capitalGainFromTransferOfPropertyDedction?.toString() || "0");

    setValue(
      "capitalGainFromTransferOfProperty.netTaxableIncome",
      capitalGainFromTransferOfPropertyNetTaxable.toFixed(2)
    );
    setValue(
      "incomeFromCapitalGains",
      capitalGainFromTransferOfPropertyNetTaxable.toFixed(2)
    );

    const incomeFromBusinessMinTaxAmount = getValues(
      "incomeFromBusinessMinTax.amountOfIncome"
    );
    const incomeFromBusinessMinTaxDedction = getValues(
      "incomeFromBusinessMinTax.deductionsExpensesExemptedIncome"
    );
    const incomeFromBusinessMinTaxNetTaxable =
      parseFloat(incomeFromBusinessMinTaxAmount?.toString() || "0") -
      parseFloat(incomeFromBusinessMinTaxDedction?.toString() || "0");

    setValue(
      "incomeFromBusinessMinTax.netTaxableIncome",
      incomeFromBusinessMinTaxNetTaxable.toFixed(2)
    );
    setValue(
      "incomeFromBusinessMinimum",
      incomeFromBusinessMinTaxNetTaxable.toFixed(2)
    );

    const workersParticipationFundAmount = getValues(
      "workersParticipationFund.amountOfIncome"
    );
    const workersParticipationFundDedction = getValues(
      "workersParticipationFund.deductionsExpensesExemptedIncome"
    );
    const workersParticipationFundNetTaxable =
      parseFloat(workersParticipationFundAmount?.toString() || "0") -
      parseFloat(workersParticipationFundDedction?.toString() || "0");

    setValue(
      "workersParticipationFund.netTaxableIncome",
      workersParticipationFundNetTaxable.toFixed(2)
    );

    const incomeFromOtherSourcesMinTaxAmount = getValues(
      "incomeFromOtherSourcesMinTax.amountOfIncome"
    );
    const incomeFromOtherSourcesMinTaxDedction = getValues(
      "incomeFromOtherSourcesMinTax.deductionsExpensesExemptedIncome"
    );
    const incomeFromOtherSourcesMinTaxNetTaxable =
      parseFloat(incomeFromOtherSourcesMinTaxAmount?.toString() || "0") -
      parseFloat(incomeFromOtherSourcesMinTaxDedction?.toString() || "0");

    setValue(
      "incomeFromOtherSourcesMinTax.netTaxableIncome",
      incomeFromOtherSourcesMinTaxNetTaxable.toFixed(2)
    );

    const otherSubjectToMinTaxAmount = getValues(
      "otherSubjectToMinTax.amountOfIncome"
    );
    const otherSubjectToMinTaxDedction = getValues(
      "otherSubjectToMinTax.deductionsExpensesExemptedIncome"
    );
    const otherSubjectToMinTaxNetTaxable =
      parseFloat(otherSubjectToMinTaxAmount?.toString() || "0") -
      parseFloat(otherSubjectToMinTaxDedction?.toString() || "0");

    setValue(
      "otherSubjectToMinTax.netTaxableIncome",
      otherSubjectToMinTaxNetTaxable.toFixed(2)
    );

    const incomeFromOtherSources =
      workersParticipationFundNetTaxable +
      incomeFromOtherSourcesMinTaxNetTaxable +
      otherSubjectToMinTaxNetTaxable;
    setValue("incomeFromOtherSources", incomeFromOtherSources.toFixed(2));

    calculateTotalIncome();
  };

  const calculateTotalIncome = useCallback(() => {
    const fields = [
      "incomeFromEmployment",
      "taxpayersShareAmount",
      "netProfitFromAgriculture",
      "incomeFishFarmingAmount",
      "incomeFromBusiness",
      "incomeFromBusinessMinimum",
      "incomeFromCapitalGains",
      "incomeFromFinancialAssets",
      "incomeFromOtherSources",
      "shareOfIncomeFromAOP",
      "incomeOfMinor",
      "taxableIncomeFromAbroad",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalIncome", total.toFixed(2));
    setValue("totalIncomeShown", total.toFixed(2));
    setValue("totalIncomeShownInTheReturn", total.toFixed(2));

    return total;
  }, [setValue, watch]);

  const calculateTaxDeductedCollectedAtSource = () => {
    const fields = [
      "interestProfitFromBankFI.taxDeductedAtSource",
      "incomeFromSavingCertificates.taxDeductedAtSource",
      "incomeFromSecuritiesDebentures.taxDeductedAtSource",
      "incomeFromFinancialProductScheme.taxDeductedAtSource",
      "dividendIncome.taxDeductedAtSource",
      "capitalGainFromTransferOfProperty.taxDeductedAtSource",
      "incomeFromBusinessMinTax.taxDeductedAtSource",
      "workersParticipationFund.taxDeductedAtSource",
      "incomeFromOtherSourcesMinTax.taxDeductedAtSource",
      "otherSubjectToMinTax.taxDeductedAtSource",
    ];
    // particulars
    // amountOfIncome:
    // deductionsExpensesExemptedIncome:
    // netTaxableIncome:
    // taxDeductedAtSource:

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("taxDeductedCollectedAtSource.amount", total.toFixed(2));
    return total;
  };

  // Schedule 1
  const calculateTaxExemptedIncomeAndAllowance = useCallback(() => {
    const fields = [
      "exemptedIncomeFromSalary",
      "exemptedIncomeFromBusiness",
      "exemptedAgriculturalIncome",
      "incomeFromProvidentFund",
      "foreignRemittance",
      "typeOfTaxExemptedTaxFreeIncomeAmount6",
      "typeOfTaxExemptedTaxFreeIncomeAmount7",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalAmount2", total.toFixed(2));
    setValue("taxExemptedIncomeAndAllowance", total.toFixed(2));
    return total;
  }, [setValue, watch]);
  const calculateReceiptOfGiftOtherReceipts = () => {
    const fields = [
      "typeOfReceiptsAmount1",
      "typeOfReceiptsAmount2",
      "typeOfReceiptsAmount3",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalAmount3", total.toFixed(2));
    setValue("receiptOfGiftOtherReceipts", total.toFixed(2));
    return total;
  };

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
    setValue("exemptedIncomeFromSalary", totalExempted.toFixed(2));
    setValue("totalSalaryReceivedPrivateEmployment", totalIncome.toFixed(2));
    setValue(
      "totalIncomeFromSalaryPrivateEmployment",
      totalIncomeFromSalary.toFixed(2)
    );

    setValue("incomeFromEmployment", totalIncomeFromSalary.toFixed(2)); // for the second page

    calculateTotalSourceOfFunds();
    calculateTaxExemptedIncomeAndAllowance();
    calculateTotalIncome();

    return {
      totalIncome: isNaN(totalIncome) ? 0 : totalIncome,
    };
  }, [
    watch,
    setValue,
    calculateTotalSourceOfFunds,
    calculateTaxExemptedIncomeAndAllowance,
    calculateTotalIncome,
  ]);

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
    setValue("exemptedIncomeFromSalary", totalTaxExempted.toFixed(2));
    setValue("totalGovtEmployment.taxable", totalTaxable.toFixed(2));
    setValue("incomeFromEmployment", totalTaxable.toFixed(2)); // for second page

    calculateTotalSourceOfFunds();
    calculateTaxExemptedIncomeAndAllowance();
    calculateTotalIncome();

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
    calculateTotalIncome();
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
    calculateTotalIncome();
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

  const calculateBusinessCapitalDifference = () => {
    const totalAssetOfBusiness = getValues("totalAssetOfBusiness");
    const lessBusinessLiabilities = getValues("lessBusinessLiabilities");
    const businessCapitalAmount =
      parseFloat(totalAssetOfBusiness?.toString() || "0") -
      parseFloat(lessBusinessLiabilities?.toString() || "0");
    setValue("businessCapitalAmount1", businessCapitalAmount.toFixed(2));
  };

  const calculateDirectorsShareholdingsInTheCompanies = () => {
    const fields = ["value1", "value2", "value3"];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("directorsShareholdingsInTheCompanies", total.toFixed(2));
    return total;
  };

  const calculateBusinessCapitalOfPartnershipFirm = () => {
    const fields = [
      "capitalContributed1",
      "capitalContributed2",
      "capitalContributed3",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("businessCapitalOfPartnershipFirm", total.toFixed(2));
    return total;
  };

  return {
    calculateTotalAssetsInBangladeshAndOutside,
    calculateTotalCashInHandAndFund,
    calculateTotalMotorValue,
    calculateTotalFinancialAssets,
    calculateTotalAgriculturalAssets,
    calculateTotalNonAgriculturalAssets,
    calculateTotalExpenseIndividualPerson,
    calculateTotalAllowableInvestmentContribution,
    calculateSummaryOfBalanceSheet,
    calculateNetProfitFromBusinessIncome,
    calculateGrossWealth,
    calculateNetWealthLastDateOfThisFinancialYear,
    calculateSumOfSourceOfFund,
    calculateTotalSourceOfFunds,
    calculateTotalExpenseAndLoss,
    calculateLiabilitiesOutSideBusiness,
    calculateNetTaxableIncome,
    calculateTotalIncome,
    calculateTaxDeductedCollectedAtSource,
    calculateTaxExemptedIncomeAndAllowance,
    calculateReceiptOfGiftOtherReceipts,
    calculatePrivateEmploymentTotals,
    calcualateScheduleOneOtherAllowanceGovtTaxable,
    calculateScheduleOneGovtTotals,
    calculateScheduleThreeNetProfit,
    calculateTaxPayersShare,
    calculateScheduleOneNetIncome,
    calculateTotalAdmissibleDeduction,
    calculateRepairCollectionAmount,
    calculateTotalRentValue,
    calculateBusinessCapitalDifference,
    calculateDirectorsShareholdingsInTheCompanies,
    calculateBusinessCapitalOfPartnershipFirm,
  };
};
