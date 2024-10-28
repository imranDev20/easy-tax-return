import {
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import { IndividualTaxReturnFormInput } from "@/app/(site)/individual-tax-return/schema";
import { RepairCollection } from "@prisma/client";
import { useCallback } from "react";
import { FormFieldName } from "@/types/tax-return-form";

export const useCalculations = (
  watch: UseFormWatch<IndividualTaxReturnFormInput>,
  setValue: UseFormSetValue<IndividualTaxReturnFormInput>,
  getValues: UseFormGetValues<IndividualTaxReturnFormInput>,
  setError: UseFormSetError<IndividualTaxReturnFormInput>,
  clearErrors: UseFormClearErrors<IndividualTaxReturnFormInput>
) => {
  const calculateTotalNonAgriculturalAssets = () => {
    const fields: FormFieldName[] = [
      "nonAgriculturalValue1",
      "nonAgriculturalValue2",
      "nonAgriculturalValue3",
      "nonAgriculturalValue4",
      "nonAgriculturalValue5",
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

  const calculateTotalAgriculturalAssets = () => {
    const fields: FormFieldName[] = [
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

  const calculateTotalFinancialAssets = () => {
    const fields: FormFieldName[] = [
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

  const calculateTotalMotorValue = () => {
    const fields: FormFieldName[] = ["motorValue1", "motorValue2"];

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

  const calculateTotalCashInHandAndFund = () => {
    const fields: FormFieldName[] = [
      "bankBalance",
      "cashInHand",
      "othersValue",
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

    // Assuming you have a field for the total cash in hand and fund outside business
    setValue("totalCashInHandsAndFundOutsideBusiness", safeTotal.toFixed(2));
    return safeTotal;
  };

  const calculateTotalAssetsInBangladeshAndOutside = () => {
    const nonAgriculturalProperty = calculateTotalNonAgriculturalAssets();
    const agriculturalProperty = calculateTotalAgriculturalAssets();
    const totalFinancialAssets = calculateTotalFinancialAssets();
    const totalMotorValue = calculateTotalMotorValue();
    const totalCashInHandAndFund = calculateTotalCashInHandAndFund();

    const fields: FormFieldName[] = [
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

  // individual person expense
  const calculateTotalExpenseIndividualPerson = () => {
    const fields: FormFieldName[] = [
      "expensesForFood",
      "housingExpense",
      "personalTransportationExpenses",
      "utilityExpense",
      "educationExpenses",
      "personalExpenseForLocalForeignTravel",
      "festivalExpense",
      "taxDeductedCollectedAtSource",
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

  const calculateTotalAmountPayable = useCallback(() => {
    const taxPayable = parseFloat(getValues("taxPayable") || "0");
    const netWealthSurcharge = parseFloat(
      getValues("netWealthSurcharge") || "0"
    );

    const environmentalSurcharge = parseFloat(
      getValues("environmentalSurcharge") || "0"
    );

    const totalSurcharge = netWealthSurcharge + environmentalSurcharge;
    setValue("totalSurcharge", totalSurcharge.toFixed(2));

    const delayInterest = parseFloat(getValues("delayInterest") || "0");

    // Calculate total using the returned tax payable value
    const totalAmountPayable =
      taxPayable + netWealthSurcharge + environmentalSurcharge + delayInterest;

    // Round to 2 decimal places
    const roundedTotal = Math.round(totalAmountPayable * 100) / 100;

    // Set the values
    setValue("totalAmountPayable", roundedTotal.toFixed(2));
    setValue("totalTaxPaid", roundedTotal.toFixed(2));

    return roundedTotal;
  }, [getValues, setValue]);

  const calculateTaxPayable = useCallback(() => {
    // Get minimum tax amount and net tax rebate
    const minimumTaxAmount = parseFloat(getValues("minimumTaxAmount") || "0");
    const netTaxAfterRebate = parseFloat(getValues("netTaxAfterRebate") || "0");

    // Take the maximum of minimumTaxAmount and netTaxAfterRebate
    const taxPayable = Math.max(minimumTaxAmount, netTaxAfterRebate);

    // Round to 2 decimal places
    const roundedTaxPayable = Math.round(taxPayable * 100) / 100;

    // Set the calculated value
    setValue("taxPayable", roundedTaxPayable.toFixed(2));

    // recalculate the total amount payable everytime tax payable is calculated
    calculateTotalAmountPayable();

    return roundedTaxPayable;
  }, [getValues, setValue, calculateTotalAmountPayable]);

  const calculateNetTaxRebate = useCallback(() => {
    // Get gross tax and tax rebate amounts
    const grossTaxOnTaxableIncome = parseFloat(
      getValues("grossTaxOnTaxableIncome") || "0"
    );
    const taxRebate = parseFloat(getValues("amountOfTaxRebate") || "0");

    // Calculate net tax rebate
    const netTaxAfterRebate = Math.max(0, grossTaxOnTaxableIncome - taxRebate);

    // Round to 2 decimal places
    const roundedNetTaxRebate = Math.round(netTaxAfterRebate * 100) / 100;

    // Set the calculated value
    setValue("netTaxAfterRebate", roundedNetTaxRebate.toFixed(2));

    // incase rebate changes, calculate the tax payable again
    calculateTaxPayable();

    return roundedNetTaxRebate;
  }, [getValues, setValue, calculateTaxPayable]);

  const calculateTaxRebate = useCallback(() => {
    const totalIncome = parseFloat(getValues("totalIncome") || "0");
    const totalAllowableInvestments = parseFloat(
      getValues("totalAllowableInvestmentContribution") || "0"
    );

    // Calculate percentages
    const threePercentOfIncome = totalIncome * 0.03;
    const fifteenPercentOfInvestments = totalAllowableInvestments * 0.15;
    const maxRebateCap = 1000000;

    setValue("totalIncomeRebateTable.rebate", threePercentOfIncome.toString());
    setValue(
      "totalAllowableInvestmentRebateTable.rebate",
      fifteenPercentOfInvestments.toString()
    );

    // Find minimum value
    const taxRebate = Math.min(
      threePercentOfIncome,
      fifteenPercentOfInvestments,
      maxRebateCap
    );

    // Round to 2 decimal places and set value
    const roundedRebate = Math.round(taxRebate * 100) / 100;
    setValue("amountOfTaxRebate", roundedRebate.toFixed(2));

    // // Calculate and set net tax rebate if needed
    calculateNetTaxRebate();

    return roundedRebate;
  }, [getValues, setValue, calculateNetTaxRebate]);

  const calculateTotalTaxPaidAdjustmentExcess = () => {
    // Get all required values with safe parsing
    const taxDeductedOrCollected = parseFloat(
      watch("taxDeductedOrCollected") || "0"
    );
    const advanceTaxPaid = parseFloat(watch("advanceTaxPaid") || "0");
    const adjustmentOfTaxRefund = parseFloat(
      watch("adjustmentOfTaxRefund") || "0"
    );
    const taxPaidWithThisReturn = parseFloat(
      watch("taxPaidWithThisReturn") || "0"
    );
    const totalAmountPayable = parseFloat(watch("totalAmountPayable") || "0");

    // Calculate total tax paid and adjusted
    const totalTaxPaidAndAdjusted =
      (isNaN(taxDeductedOrCollected) ? 0 : taxDeductedOrCollected) +
      (isNaN(advanceTaxPaid) ? 0 : advanceTaxPaid) +
      (isNaN(adjustmentOfTaxRefund) ? 0 : adjustmentOfTaxRefund) +
      (isNaN(taxPaidWithThisReturn) ? 0 : taxPaidWithThisReturn);

    // Set total tax paid and adjusted
    setValue("totalTaxPaidAndAdjusted", totalTaxPaidAndAdjusted.toFixed(2));

    // Calculate excess payment (total paid minus amount payable)
    const excessPayment =
      totalTaxPaidAndAdjusted -
      (isNaN(totalAmountPayable) ? 0 : totalAmountPayable);

    // Set excess payment
    setValue("excessPayment", excessPayment.toFixed(2));

    return {
      totalTaxPaidAndAdjusted,
      excessPayment,
    };
  };

  const calculateGrossTax = useCallback(() => {
    const totalIncome = parseFloat(getValues("totalIncome") || "0");
    const residentialStatus = watch("residentialStatus");
    const specialBenefits = watch("specialBenefits") || "NONE";
    const isParentOfDisabledPerson = watch("isParentOfDisabledPerson");

    // For non-residents, apply 30% flat rate
    if (residentialStatus === "NON_RESIDENT") {
      const tax = totalIncome * 0.3;
      setValue("grossTaxOnTaxableIncome", tax.toFixed(2));

      // recalculate the net tax rebate incase gross tax has changed after setting net tax
      // necessary otherwise values won't update
      calculateNetTaxRebate();
      return tax;
    }

    // Get the threshold based on category
    let threshold = 0;

    // Determine threshold based on category and special benefits
    if (specialBenefits === "NONE" && !isParentOfDisabledPerson) {
      // General resident (no special benefits)
      threshold = 350000;
    } else {
      // Apply special benefit thresholds
      switch (specialBenefits) {
        case "GAZETTED_WAR_WOUNDED_FREEDOM_FIGHTER":
          threshold = 500000;
          break;
        case "FEMALE":
        case "AGED_65_OR_MORE":
          threshold = 400000;
          break;
        case "THIRD_GENDER":
        case "DISABLED_PERSON":
          threshold = 475000;
          break;
        default:
          threshold = isParentOfDisabledPerson ? 500000 : 350000;
      }
    }

    let remainingIncome = Math.max(0, totalIncome - threshold);
    let totalTax = 0;

    // Apply progressive tax rates
    const taxSlabs = [
      { amount: 100000, rate: 0.05 }, // 5% on first 100,000
      { amount: 400000, rate: 0.1 }, // 10% on next 400,000
      { amount: 500000, rate: 0.15 }, // 15% on next 500,000
      { amount: 500000, rate: 0.2 }, // 20% on next 500,000
    ];

    // Calculate tax for each slab
    for (const slab of taxSlabs) {
      if (remainingIncome <= 0) break;

      const taxableInSlab = Math.min(remainingIncome, slab.amount);
      totalTax += taxableInSlab * slab.rate;
      remainingIncome -= slab.amount;
    }

    // Apply 25% on remaining income
    if (remainingIncome > 0) {
      totalTax += remainingIncome * 0.25;
    }

    // Round to 2 decimal places
    const roundedTax = Math.round(totalTax * 100) / 100;

    // Set the calculated gross tax
    setValue("grossTaxOnTaxableIncome", roundedTax.toFixed(2));

    // recalculate the net tax rebate incase gross tax has changed after setting net tax
    calculateNetTaxRebate();

    return roundedTax;
  }, [watch, getValues, setValue, calculateNetTaxRebate]);

  const calculateTotalIncome = useCallback(() => {
    const fields: FormFieldName[] = [
      "incomeFromEmployment",
      "netIncomeFromRent",
      "netProfitFromAgriculture",
      "incomeFromBusiness",
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

    calculateTaxRebate();
    calculateGrossTax();

    return total;
  }, [setValue, watch, calculateTaxRebate, calculateGrossTax]);

  const calculateTotalTaxDeductedOrCollected = () => {
    const securitiesSourceTax = parseFloat(
      watch("profitInterestFromGovtSecuritiesTotal.sourceTax") || "0"
    );
    const shonchoypatraSourceTax = parseFloat(
      watch("profitFromShoychoypartaTotal.sourceTax") || "0"
    );

    const totalTaxDeducted =
      (isNaN(securitiesSourceTax) ? 0 : securitiesSourceTax) +
      (isNaN(shonchoypatraSourceTax) ? 0 : shonchoypatraSourceTax);

    setValue("taxDeductedOrCollected", totalTaxDeducted.toFixed(2));

    // Recalculate total tax paid & adjusted and excess payment
    calculateTotalTaxPaidAdjustmentExcess();

    return totalTaxDeducted;
  };

  const calculateTotalIncomeFromSecurities = () => {
    const fields = [
      "interestFromSecurities",
      "profitInterestFromGovtSecurities2",
      "profitInterestFromGovtSecurities3",
      "profitInterestFromGovtSecurities4",
      "profitInterestFromGovtSecurities5",
      "profitInterestFromGovtSecurities6",
      "profitInterestFromGovtSecurities7",
      "profitInterestFromGovtSecurities8",
      "profitInterestFromGovtSecurities9",
      "profitInterestFromGovtSecurities10",
    ] as const;

    let totalBalance = 0;
    let totalInterestProfit = 0;
    let totalSourceTax = 0;

    // Calculate individual entries and running totals
    fields.forEach((field) => {
      const balance = parseFloat(watch(`${field}.balance`) || "0");
      const interestProfit = parseFloat(
        watch(`${field}.interestProfit`) || "0"
      );
      const sourceTax = parseFloat(watch(`${field}.sourceTax`) || "0");

      // Add to running totals (using safe values)
      totalBalance += isNaN(balance) ? 0 : balance;
      totalInterestProfit += isNaN(interestProfit) ? 0 : interestProfit;
      totalSourceTax += isNaN(sourceTax) ? 0 : sourceTax;
    });

    // Set the totals in the summary row
    setValue(
      "profitInterestFromGovtSecuritiesTotal.balance",
      totalBalance.toFixed(2)
    );
    setValue(
      "profitInterestFromGovtSecuritiesTotal.interestProfit",
      totalInterestProfit.toFixed(2)
    );
    setValue(
      "profitInterestFromGovtSecuritiesTotal.sourceTax",
      totalSourceTax.toFixed(2)
    );

    // Set this total to the main income from financial assets field that's used elsewhere
    setValue("incomeFromFinancialAssets", totalInterestProfit.toFixed(2));

    // Recalculate total income since financial assets income is a component
    calculateTotalIncome();

    // Recalculate total tax deducted or collected to update it
    calculateTotalTaxDeductedOrCollected();

    return {
      totalBalance,
      totalInterestProfit,
      totalSourceTax,
    };
  };

  const calculateTotalShonchoypatra = () => {
    const fields = [
      "shonchoyparta",
      "profitFromShoychoyparta2",
      "profitFromShoychoyparta3",
      "profitFromShoychoyparta4",
      "profitFromShoychoyparta5",
      "profitFromShoychoyparta6",
      "profitFromShoychoyparta7",
      "profitFromShoychoyparta8",
      "profitFromShoychoyparta9",
      "profitFromShoychoyparta10",
    ] as const;

    let totalBalance = 0;
    let totalInterestProfit = 0;
    let totalSourceTax = 0;

    // Calculate individual entries and running totals
    fields.forEach((field) => {
      const balance = parseFloat(watch(`${field}.balance`) || "0");
      const interestProfit = parseFloat(
        watch(`${field}.interestProfit`) || "0"
      );
      const sourceTax = parseFloat(watch(`${field}.sourceTax`) || "0");

      // Add to running totals (using safe values)
      totalBalance += isNaN(balance) ? 0 : balance;
      totalInterestProfit += isNaN(interestProfit) ? 0 : interestProfit;
      totalSourceTax += isNaN(sourceTax) ? 0 : sourceTax;
    });

    // Set the totals in the summary row
    setValue("profitFromShoychoypartaTotal.balance", totalBalance.toFixed(2));
    setValue(
      "profitFromShoychoypartaTotal.interestProfit",
      totalInterestProfit.toFixed(2)
    );
    setValue(
      "profitFromShoychoypartaTotal.sourceTax",
      totalSourceTax.toFixed(2)
    );

    // Recalculate the total tax deducted or collected
    calculateTotalTaxDeductedOrCollected();

    return {
      totalBalance,
      totalInterestProfit,
      totalSourceTax,
    };
  };

  const calculateTotalTaxableIncomeFromCapitalGains = () => {
    const fields = [
      "incomeFromShareTransferListedCompany",
      "incomeFromCapitalGain2",
      "incomeFromCapitalGain3",
      "incomeFromCapitalGain4",
      "incomeFromCapitalGain5",
    ] as const;

    let totalCapitalGains = 0;
    let totalExemptedAmount = 0;
    let totalTaxableAmount = 0;

    // Calculate individual taxable amounts and running totals
    fields.forEach((field) => {
      const capitalGain = parseFloat(watch(`${field}.capitalGain`) || "0");
      const exemptedAmount = parseFloat(
        watch(`${field}.exemptedAmount`) || "0"
      );

      // Add to running totals (using safe values)
      totalCapitalGains += isNaN(capitalGain) ? 0 : capitalGain;
      totalExemptedAmount += isNaN(exemptedAmount) ? 0 : exemptedAmount;

      // Calculate taxable amount (capitalGain - exemptedAmount)
      const taxableAmount = Math.max(0, capitalGain - exemptedAmount);
      totalTaxableAmount += taxableAmount;

      // Set the calculated taxable amount for this entry
      setValue(`${field}.taxableAmount`, taxableAmount.toFixed(2));
    });

    // Set the totals in the summary row
    setValue(
      "incomeFromCapitaGainsTotal.capitalGain",
      totalCapitalGains.toFixed(2)
    );
    setValue(
      "incomeFromCapitaGainsTotal.exemptedAmount",
      totalExemptedAmount.toFixed(2)
    );
    setValue(
      "incomeFromCapitaGainsTotal.taxableAmount",
      totalTaxableAmount.toFixed(2)
    );

    // Set this total to the main income from capital gains field that's used elsewhere
    setValue("incomeFromCapitalGains", totalTaxableAmount.toFixed(2));

    // Recalculate total income since capital gains is part of it
    calculateTotalIncome();

    return {
      totalCapitalGains,
      totalExemptedAmount,
      totalTaxableAmount,
    };
  };

  const calculateBusinessFinancials = () => {
    // Part 1: Calculate Net Profit
    const salesTurnover = parseFloat(
      watch("salesTurnoverReceiptsBusiness") || "0"
    );
    const purchase = parseFloat(watch("purchase") || "0");

    // Calculate gross profit
    const grossProfit = salesTurnover - purchase;
    setValue("grossProfitFromBusiness", grossProfit.toFixed(2));

    // Calculate net profit
    const expenses = parseFloat(
      watch("generalAdministrativeSellingExpenses") || "0"
    );
    const badDebt = parseFloat(watch("badDebtExpense") || "0");
    const netProfit = grossProfit - expenses - badDebt;
    setValue("netProfitFromBusinessIncome", netProfit.toFixed(2));

    // Part 2: Balance Sheet Calculations

    // Calculate Total Assets
    const cashInHand = parseFloat(watch("cashInHandAtBank") || "0");
    const inventories = parseFloat(watch("inventories") || "0");
    const fixedAssets = parseFloat(watch("fixedAssets") || "0");
    const otherAssets = parseFloat(watch("otherAssets") || "0");

    const totalAssets = cashInHand + inventories + fixedAssets + otherAssets;
    setValue("totalAssets", totalAssets.toFixed(2));

    // Calculate Closing Capital
    const openingCapital = parseFloat(watch("openingCapital") || "0");
    const withdrawals = parseFloat(watch("withdrawalsInTheIncomeYear") || "0");

    // Use the netProfit calculated above for the balance sheet
    setValue("netProfitFromBusinessBalance", netProfit.toFixed(2));

    const closingCapital = openingCapital + netProfit - withdrawals;
    setValue("closingCapital", closingCapital.toFixed(2));

    // Calculate Total Capital & Liabilities
    const liabilities = parseFloat(watch("liabilities") || "0");
    const totalCapitalAndLiabilities = closingCapital + liabilities;
    setValue(
      "totalCapitalsAndLiabilities",
      totalCapitalAndLiabilities.toFixed(2)
    );

    // Verify balance sheet equation: Total Assets = Total Capital & Liabilities
    if (totalAssets !== totalCapitalAndLiabilities) {
      console.warn("Balance sheet mismatch:", {
        totalAssets,
        totalCapitalAndLiabilities,
        difference: totalAssets - totalCapitalAndLiabilities,
      });
    }

    // Continue with income calculations if needed
    calculateTotalIncome();
  };

  const calculateLiabilitiesOutSideBusiness = () => {
    const fields: FormFieldName[] = [
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

  const calculateScheduleThreeNetProfit = () => {
    const grossProfitFromAgriculture = parseFloat(
      watch("salesTurnoverReceiptAgriculture") || "0"
    ); // same as gross profit

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

  const calculateTotalAdmissibleDeduction = () => {
    const fields: FormFieldName[] = [
      "repairCollectionAmount",
      "municipalOrLocalTax",
      "landRevenue",
      "interestMortgageCapitalCharge",
      "insurancePremiumPaid",
      "otherAllowableDeduction",
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
    const fields: FormFieldName[] = [
      "directorsShareholdingCompanyValue1",
      "directorsShareholdingCompanyValue2",
      "directorsShareholdingCompanyValue3",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("directorsShareholdingsInTheCompanies", total.toFixed(2));
    return total;
  };

  const calculateBusinessCapitalOfPartnershipFirm = () => {
    const fields: FormFieldName[] = [
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

  const calculateScheduleOneNetIncome = () => {
    const totalRentValue = parseFloat(watch("totalRentValue") || "0");
    const totalAdmissibleDeduction = parseFloat(
      watch("totalAdmissibleDeduction") || "0"
    );

    const netIncome = totalRentValue - totalAdmissibleDeduction;

    // Set the calculated net income in the form
    setValue("netIncomeFromRent", netIncome.toFixed(2));
    return netIncome;
  };

  const calculateTaxPayersShare = () => {
    const netIncome = parseFloat(watch("netIncomeFromRent") || "0");
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

  // Schedule 1
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

    // for second page
    setValue("incomeFromEmployment", totalTaxable.toFixed(2));

    calculateTotalSourceOfFunds(); // may need to delete this function
    calculateTotalIncome();

    return {
      totalIncome: isNaN(totalIncome) ? 0 : totalIncome,
      totalTaxExempted: isNaN(totalTaxExempted) ? 0 : totalTaxExempted,
      totalTaxable: isNaN(totalTaxable) ? 0 : totalTaxable,
    };
  };

  // Image 8 statement of assests
  const calculateGrossWealth = useCallback(() => {
    const fields: FormFieldName[] = [
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
    const fields: FormFieldName[] = [
      "totalSourceOfFund",
      "netWealthLastDateAmount",
    ];

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
    const fields: FormFieldName[] = [
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

  // rebate
  const calculateTotalAllowableInvestmentContribution = useCallback(() => {
    const fields: FormFieldName[] = [
      "lifeInsurancePremium",
      "contributionToDeposit",
      "investmentInGovernmentSecurities",
      "investmentInSecuritiesStock",
      "contributionToProvidentFund",
      "selfAndEmployersContribution",
      "contributionToSuperAnnuationFund",
      "contributionToBenevolentFund",
      "contributionToZakatFund",
      "otherRebatableInvestmentContribution",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalAllowableInvestmentContribution", total.toFixed(2));

    // set the tax rebate amount
    calculateTaxRebate();

    return total;
  }, [watch, setValue, calculateTaxRebate]); // Add dependencies used inside the callback

  const calculatePrivateEmploymentTotals = useCallback(() => {
    const fields: FormFieldName[] = [
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
      "employerContributionToProvidentFundPrivateEmployment",
      "otherIncomePrivateEmployment",
    ] as const;

    let totalIncome = 0;

    for (const field of fields) {
      const fieldValue = watch(field as keyof IndividualTaxReturnFormInput);

      console.log(fieldValue);
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

    calculateTotalSourceOfFunds();
    calculateTotalIncome();

    // Trigger rebate calculation after setting the value of self and employer's contribution
    // setting the value of self and employer's contribution in onBlur
    calculateTotalAllowableInvestmentContribution();

    return {
      totalIncome: isNaN(totalIncome) ? 0 : totalIncome,
    };
  }, [
    watch,
    setValue,
    calculateTotalSourceOfFunds,
    calculateTotalIncome,
    calculateTotalAllowableInvestmentContribution,
  ]);

  const calculateTotalExpenseAndLoss = () => {
    const fields: FormFieldName[] = [
      "expenseRelatingToLifestyle",
      "giftExpense",
    ];

    const total = fields.reduce((sum, field) => {
      const value = watch(field as keyof IndividualTaxReturnFormInput);
      const numberValue = parseFloat(value?.toString() || "0");
      return sum + (isNaN(numberValue) ? 0 : numberValue);
    }, 0);

    setValue("totalExpensesAndLoss", total.toFixed(2));
    calculateNetWealthLastDateOfThisFinancialYear();
    return total;
  };

  return {
    calculateTotalAssetsInBangladeshAndOutside,

    calculateTotalMotorValue,
    calculateTotalFinancialAssets,
    calculateTotalAgriculturalAssets,
    calculateTotalNonAgriculturalAssets,
    calculateTotalExpenseIndividualPerson,
    calculateTotalAllowableInvestmentContribution,
    calculateBusinessFinancials,
    calculateGrossWealth,
    calculateNetWealthLastDateOfThisFinancialYear,
    calculateSumOfSourceOfFund,
    calculateTotalSourceOfFunds,
    calculateTotalExpenseAndLoss,
    calculateLiabilitiesOutSideBusiness,
    calculateTotalIncome,
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
    calculateTotalTaxableIncomeFromCapitalGains,
    calculateTotalIncomeFromSecurities,
    calculateGrossTax,
    calculateTaxPayable,
    calculateTotalAmountPayable,
    calculateTotalShonchoypatra,
    calculateTotalTaxDeductedOrCollected,
    calculateTotalTaxPaidAdjustmentExcess,
  };
};
