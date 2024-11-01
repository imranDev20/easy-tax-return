"use server";

import prisma from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "@/app/(site)/individual-tax-return/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// Helper functions to create nested relations
async function createGovtPayScales(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput
) {
  // Basic Pay
  const basicPayGovt = await tx.govtPayScale.create({
    data: {
      amount: data.basicPayGovt?.amount || null,
      taxExempted: data.basicPayGovt?.taxExempted || null,
      taxable: data.basicPayGovt?.taxable || null,
    },
  });

  // Arrear Pay
  const arrearPayGovt = await tx.govtPayScale.create({
    data: {
      amount: data.arrearPayGovt?.amount || null,
      taxExempted: data.arrearPayGovt?.taxExempted || null,
      taxable: data.arrearPayGovt?.taxable || null,
    },
  });

  // Special Allowance
  const specialAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.specialAllowanceGovt?.amount || null,
      taxExempted: data.specialAllowanceGovt?.taxExempted || null,
      taxable: data.specialAllowanceGovt?.taxable || null,
    },
  });

  // House Rent Allowance
  const houseRentAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.houseRentAllowanceGovt?.amount || null,
      taxExempted: data.houseRentAllowanceGovt?.taxExempted || null,
      taxable: data.houseRentAllowanceGovt?.taxable || null,
    },
  });

  // Medical Allowance
  const medicalAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.medicalAllowanceGovt?.amount || null,
      taxExempted: data.medicalAllowanceGovt?.taxExempted || null,
      taxable: data.medicalAllowanceGovt?.taxable || null,
    },
  });

  // Conveyance Allowance
  const conveyanceAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.conveyanceAllowanceGovt?.amount || null,
      taxExempted: data.conveyanceAllowanceGovt?.taxExempted || null,
      taxable: data.conveyanceAllowanceGovt?.taxable || null,
    },
  });

  // Festival Allowance
  const festivalAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.festivalAllowanceGovt?.amount || null,
      taxExempted: data.festivalAllowanceGovt?.taxExempted || null,
      taxable: data.festivalAllowanceGovt?.taxable || null,
    },
  });

  // Allowance for Support Staff
  const allowanceForSupportStaffGovt = await tx.govtPayScale.create({
    data: {
      amount: data.allowanceForSupportStaffGovt?.amount || null,
      taxExempted: data.allowanceForSupportStaffGovt?.taxExempted || null,
      taxable: data.allowanceForSupportStaffGovt?.taxable || null,
    },
  });

  // Leave Allowance
  const leaveAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.leaveAllowanceGovt?.amount || null,
      taxExempted: data.leaveAllowanceGovt?.taxExempted || null,
      taxable: data.leaveAllowanceGovt?.taxable || null,
    },
  });

  // Honorarium Reward
  const honorariumRewardGovt = await tx.govtPayScale.create({
    data: {
      amount: data.honorariumRewardGovt?.amount || null,
      taxExempted: data.honorariumRewardGovt?.taxExempted || null,
      taxable: data.honorariumRewardGovt?.taxable || null,
    },
  });

  // Overtime Allowance
  const overtimeAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.overtimeAllowanceGovt?.amount || null,
      taxExempted: data.overtimeAllowanceGovt?.taxExempted || null,
      taxable: data.overtimeAllowanceGovt?.taxable || null,
    },
  });

  // Bangla Noboborsho Allowances
  const banglaNoboborshoAllowancesGovt = await tx.govtPayScale.create({
    data: {
      amount: data.banglaNoboborshoAllowancesGovt?.amount || null,
      taxExempted: data.banglaNoboborshoAllowancesGovt?.taxExempted || null,
      taxable: data.banglaNoboborshoAllowancesGovt?.taxable || null,
    },
  });

  // Interest Accrued Provident Fund
  const interestAccruedProvidentFundGovt = await tx.govtPayScale.create({
    data: {
      amount: data.interestAccruedProvidentFundGovt?.amount || null,
      taxExempted: data.interestAccruedProvidentFundGovt?.taxExempted || null,
      taxable: data.interestAccruedProvidentFundGovt?.taxable || null,
    },
  });

  // Lump Grant
  const lumpGrantGovt = await tx.govtPayScale.create({
    data: {
      amount: data.lumpGrantGovt?.amount || null,
      taxExempted: data.lumpGrantGovt?.taxExempted || null,
      taxable: data.lumpGrantGovt?.taxable || null,
    },
  });

  // Gratuity
  const gratuityGovt = await tx.govtPayScale.create({
    data: {
      amount: data.gratuityGovt?.amount || null,
      taxExempted: data.gratuityGovt?.taxExempted || null,
      taxable: data.gratuityGovt?.taxable || null,
    },
  });

  // Other Allowance
  const otherAllowanceGovt = await tx.govtPayScale.create({
    data: {
      amount: data.otherAllowanceGovt?.amount || null,
      taxExempted: data.otherAllowanceGovt?.taxExempted || null,
      taxable: data.otherAllowanceGovt?.taxable || null,
    },
  });

  // Total Govt
  const totalGovt = await tx.govtPayScale.create({
    data: {
      amount: data.totalGovt?.amount || null,
      taxExempted: data.totalGovt?.taxExempted || null,
      taxable: data.totalGovt?.taxable || null,
    },
  });

  return {
    basicPayGovtId: basicPayGovt.id,
    arrearPayGovtId: arrearPayGovt.id,
    specialAllowanceGovtId: specialAllowanceGovt.id,
    houseRentAllowanceGovtId: houseRentAllowanceGovt.id,
    medicalAllowanceGovtId: medicalAllowanceGovt.id,
    conveyanceAllowanceGovtId: conveyanceAllowanceGovt.id,
    festivalAllowanceGovtId: festivalAllowanceGovt.id,
    allowanceForSupportStaffGovtId: allowanceForSupportStaffGovt.id,
    leaveAllowanceGovtId: leaveAllowanceGovt.id,
    honorariumRewardGovtId: honorariumRewardGovt.id,
    overtimeAllowanceGovtId: overtimeAllowanceGovt.id,
    banglaNoboborshoAllowancesGovtId: banglaNoboborshoAllowancesGovt.id,
    interestAccruedProvidentFundGovtId: interestAccruedProvidentFundGovt.id,
    lumpGrantGovtId: lumpGrantGovt.id,
    gratuityGovtId: gratuityGovt.id,
    otherAllowanceGovtId: otherAllowanceGovt.id,
    totalGovtId: totalGovt.id,
  };
}

async function createFinancialAssets(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput
) {
  // Shonchoypatra
  const shonchoypatra = await tx.financialAssets.create({
    data: {
      description: data.shonchoyparta?.description || null,
      balance: data.shonchoyparta?.balance || null,
      interestProfit: data.shonchoyparta?.interestProfit || null,
      sourceTax: data.shonchoyparta?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 2
  const profitFromShoychoyparta2 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta2?.description || null,
      balance: data.profitFromShoychoyparta2?.balance || null,
      interestProfit: data.profitFromShoychoyparta2?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta2?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 3
  const profitFromShoychoyparta3 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta3?.description || null,
      balance: data.profitFromShoychoyparta3?.balance || null,
      interestProfit: data.profitFromShoychoyparta3?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta3?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 4
  const profitFromShoychoyparta4 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta4?.description || null,
      balance: data.profitFromShoychoyparta4?.balance || null,
      interestProfit: data.profitFromShoychoyparta4?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta4?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 5
  const profitFromShoychoyparta5 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta5?.description || null,
      balance: data.profitFromShoychoyparta5?.balance || null,
      interestProfit: data.profitFromShoychoyparta5?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta5?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 6
  const profitFromShoychoyparta6 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta6?.description || null,
      balance: data.profitFromShoychoyparta6?.balance || null,
      interestProfit: data.profitFromShoychoyparta6?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta6?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 7
  const profitFromShoychoyparta7 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta7?.description || null,
      balance: data.profitFromShoychoyparta7?.balance || null,
      interestProfit: data.profitFromShoychoyparta7?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta7?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 8
  const profitFromShoychoyparta8 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta8?.description || null,
      balance: data.profitFromShoychoyparta8?.balance || null,
      interestProfit: data.profitFromShoychoyparta8?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta8?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 9
  const profitFromShoychoyparta9 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta9?.description || null,
      balance: data.profitFromShoychoyparta9?.balance || null,
      interestProfit: data.profitFromShoychoyparta9?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta9?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta 10
  const profitFromShoychoyparta10 = await tx.financialAssets.create({
    data: {
      description: data.profitFromShoychoyparta10?.description || null,
      balance: data.profitFromShoychoyparta10?.balance || null,
      interestProfit: data.profitFromShoychoyparta10?.interestProfit || null,
      sourceTax: data.profitFromShoychoyparta10?.sourceTax || null,
    },
  });

  // Profit From Shonchoyparta Total
  const profitFromShoychoypartaTotal = await tx.financialAssets.create({
    data: {
      balance: data.profitFromShoychoypartaTotal?.balance || null,
      interestProfit: data.profitFromShoychoypartaTotal?.interestProfit || null,
      sourceTax: data.profitFromShoychoypartaTotal?.sourceTax || null,
    },
  });

  // Interest From Securities
  const interestFromSecurities = await tx.financialAssets.create({
    data: {
      description: data.interestFromSecurities?.description || null,
      balance: data.interestFromSecurities?.balance || null,
      interestProfit: data.interestFromSecurities?.interestProfit || null,
      sourceTax: data.interestFromSecurities?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 2
  const profitInterestFromGovtSecurities2 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities2?.description || null,
      balance: data.profitInterestFromGovtSecurities2?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities2?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities2?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 3
  const profitInterestFromGovtSecurities3 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities3?.description || null,
      balance: data.profitInterestFromGovtSecurities3?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities3?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities3?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 4
  const profitInterestFromGovtSecurities4 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities4?.description || null,
      balance: data.profitInterestFromGovtSecurities4?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities4?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities4?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 5
  const profitInterestFromGovtSecurities5 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities5?.description || null,
      balance: data.profitInterestFromGovtSecurities5?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities5?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities5?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 6
  const profitInterestFromGovtSecurities6 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities6?.description || null,
      balance: data.profitInterestFromGovtSecurities6?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities6?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities6?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 7
  const profitInterestFromGovtSecurities7 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities7?.description || null,
      balance: data.profitInterestFromGovtSecurities7?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities7?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities7?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 8
  const profitInterestFromGovtSecurities8 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities8?.description || null,
      balance: data.profitInterestFromGovtSecurities8?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities8?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities8?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 9
  const profitInterestFromGovtSecurities9 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities9?.description || null,
      balance: data.profitInterestFromGovtSecurities9?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities9?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities9?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities 10
  const profitInterestFromGovtSecurities10 = await tx.financialAssets.create({
    data: {
      description: data.profitInterestFromGovtSecurities10?.description || null,
      balance: data.profitInterestFromGovtSecurities10?.balance || null,
      interestProfit:
        data.profitInterestFromGovtSecurities10?.interestProfit || null,
      sourceTax: data.profitInterestFromGovtSecurities10?.sourceTax || null,
    },
  });

  // Profit Interest From Govt Securities Total
  const profitInterestFromGovtSecuritiesTotal = await tx.financialAssets.create(
    {
      data: {
        balance: data.profitInterestFromGovtSecuritiesTotal?.balance || null,
        interestProfit:
          data.profitInterestFromGovtSecuritiesTotal?.interestProfit || null,
        sourceTax:
          data.profitInterestFromGovtSecuritiesTotal?.sourceTax || null,
      },
    }
  );

  return {
    shonchoypatraId: shonchoypatra.id,
    profitFromShoychoyparta2Id: profitFromShoychoyparta2.id,
    profitFromShoychoyparta3Id: profitFromShoychoyparta3.id,
    profitFromShoychoyparta4Id: profitFromShoychoyparta4.id,
    profitFromShoychoyparta5Id: profitFromShoychoyparta5.id,
    profitFromShoychoyparta6Id: profitFromShoychoyparta6.id,
    profitFromShoychoyparta7Id: profitFromShoychoyparta7.id,
    profitFromShoychoyparta8Id: profitFromShoychoyparta8.id,
    profitFromShoychoyparta9Id: profitFromShoychoyparta9.id,
    profitFromShoychoyparta10Id: profitFromShoychoyparta10.id,
    profitFromShoychoypartaTotalId: profitFromShoychoypartaTotal.id,
    // securities
    interestFromSecuritiesId: interestFromSecurities.id,
    profitInterestFromGovtSecurities2Id: profitInterestFromGovtSecurities2.id,
    profitInterestFromGovtSecurities3Id: profitInterestFromGovtSecurities3.id,
    profitInterestFromGovtSecurities4Id: profitInterestFromGovtSecurities4.id,
    profitInterestFromGovtSecurities5Id: profitInterestFromGovtSecurities5.id,
    profitInterestFromGovtSecurities6Id: profitInterestFromGovtSecurities6.id,
    profitInterestFromGovtSecurities7Id: profitInterestFromGovtSecurities7.id,
    profitInterestFromGovtSecurities8Id: profitInterestFromGovtSecurities8.id,
    profitInterestFromGovtSecurities9Id: profitInterestFromGovtSecurities9.id,
    profitInterestFromGovtSecurities10Id: profitInterestFromGovtSecurities10.id,
    profitInterestFromGovtSecuritiesTotalId:
      profitInterestFromGovtSecuritiesTotal.id,
  };
}

async function createCapitalGains(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput
) {
  // Share Transfer Listed Company
  const shareTransfer = await tx.incomeFromCapitalGains.create({
    data: {
      description:
        data.incomeFromShareTransferListedCompany?.description || null,
      capitalGain:
        data.incomeFromShareTransferListedCompany?.capitalGain || null,
      exemptedAmount:
        data.incomeFromShareTransferListedCompany?.exemptedAmount || null,
      taxableAmount:
        data.incomeFromShareTransferListedCompany?.taxableAmount || null,
    },
  });

  // Capital Gain 2
  const capitalGain2 = await tx.incomeFromCapitalGains.create({
    data: {
      description: data.incomeFromCapitalGain2?.description || null,
      capitalGain: data.incomeFromCapitalGain2?.capitalGain || null,
      exemptedAmount: data.incomeFromCapitalGain2?.exemptedAmount || null,
      taxableAmount: data.incomeFromCapitalGain2?.taxableAmount || null,
    },
  });

  // Capital Gain 3
  const capitalGain3 = await tx.incomeFromCapitalGains.create({
    data: {
      description: data.incomeFromCapitalGain3?.description || null,
      capitalGain: data.incomeFromCapitalGain3?.capitalGain || null,
      exemptedAmount: data.incomeFromCapitalGain3?.exemptedAmount || null,
      taxableAmount: data.incomeFromCapitalGain3?.taxableAmount || null,
    },
  });

  // Capital Gain 4
  const capitalGain4 = await tx.incomeFromCapitalGains.create({
    data: {
      description: data.incomeFromCapitalGain4?.description || null,
      capitalGain: data.incomeFromCapitalGain4?.capitalGain || null,
      exemptedAmount: data.incomeFromCapitalGain4?.exemptedAmount || null,
      taxableAmount: data.incomeFromCapitalGain4?.taxableAmount || null,
    },
  });

  // Capital Gain 5
  const capitalGain5 = await tx.incomeFromCapitalGains.create({
    data: {
      description: data.incomeFromCapitalGain5?.description || null,
      capitalGain: data.incomeFromCapitalGain5?.capitalGain || null,
      exemptedAmount: data.incomeFromCapitalGain5?.exemptedAmount || null,
      taxableAmount: data.incomeFromCapitalGain5?.taxableAmount || null,
    },
  });

  // Capital Gains Total
  const capitalGainsTotal = await tx.incomeFromCapitalGains.create({
    data: {
      capitalGain: data.incomeFromCapitaGainsTotal?.capitalGain || null,
      exemptedAmount: data.incomeFromCapitaGainsTotal?.exemptedAmount || null,
      taxableAmount: data.incomeFromCapitaGainsTotal?.taxableAmount || null,
    },
  });

  return {
    incomeFromShareTransferListedCompanyId: shareTransfer.id,
    incomeFromCapitalGain2Id: capitalGain2.id,
    incomeFromCapitalGain3Id: capitalGain3.id,
    incomeFromCapitalGain4Id: capitalGain4.id,
    incomeFromCapitalGain5Id: capitalGain5.id,
    incomeFromCapitalGainsTotalId: capitalGainsTotal.id,
  };
}

async function createPersonalExpenses(
  tx: Prisma.TransactionClient,
  data: IndividualTaxReturnFormInput
) {
  // Food Expenses
  const foodExpenses = await tx.personalExpense.create({
    data: {
      amount: data.expensesForFood?.amount || null,
      comment: data.expensesForFood?.comment || null,
    },
  });

  // Housing Expense
  const housingExpense = await tx.personalExpense.create({
    data: {
      amount: data.housingExpense?.amount || null,
      comment: data.housingExpense?.comment || null,
    },
  });

  // ... Create other personal expenses similarly

  return {
    expensesForFoodId: foodExpenses.id,
    housingExpenseId: housingExpense.id,
    // ... return other ids
  };
}

export async function createTaxReturnAndOrder(
  input: IndividualTaxReturnFormInput
) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Validate input data
    const validatedData = individualTaxReturnSchema.parse(input);

    // Use a transaction to ensure both tax return and order are created atomically
    const result = await prisma.$transaction(async (tx) => {
      // First, create all the nested relations
      const govtPayScales = await createGovtPayScales(tx, validatedData);
      const financialAssets = await createFinancialAssets(tx, validatedData);
      const capitalGains = await createCapitalGains(tx, validatedData);
      const personalExpenses = await createPersonalExpenses(tx, validatedData);

      // Create the individual tax return with all relations
      const taxReturn = await tx.individualTaxes.create({
        data: {
          userId: session.user.id,
          // Image 1
          taxpayerName: validatedData.taxpayerName,
          nationalId: validatedData.nationalId,
          tin: validatedData.tin,
          circle: validatedData.circle,
          zone: validatedData.zone,
          assessmentYear: validatedData.assessmentYear,
          residentialStatus: validatedData.residentialStatus,
          assesseeStatus: validatedData.assesseeStatus,
          specialBenefits: validatedData.specialBenefits || null,
          isParentOfDisabledPerson:
            validatedData.isParentOfDisabledPerson || false,
          dateOfBirth: validatedData.dateOfBirth,
          spouseName: validatedData.spouseName || null,
          spouseTin: validatedData.spouseTin || null,
          addressLine1: validatedData.addressLine1,
          addressLine2: validatedData.addressLine2 || null,
          telephone: validatedData.telephone || null,
          mobile: validatedData.mobile,
          email: validatedData.email,
          employerName: validatedData.employerName || null,
          businessName: validatedData.businessName || null,
          bin: validatedData.bin || null,
          partnersMembersAssociation1:
            validatedData.partnersMembersAssociation1 || null,
          partnersMembersAssociation2:
            validatedData.partnersMembersAssociation2 || null,

          // Image 2
          statementOfIncomeYearEndedOn:
            validatedData.statementOfIncomeYearEndedOn || null,
          incomeFromEmployment: validatedData.incomeFromEmployment || null,
          incomeFromRent: validatedData.incomeFromRent || null,
          incomeFromAgriculture: validatedData.incomeFromAgriculture || null,
          incomeFromBusiness: validatedData.incomeFromBusiness || null,
          incomeFromCapitalGains: validatedData.incomeFromCapitalGains || null,
          incomeFromFinancialAssets:
            validatedData.incomeFromFinancialAssets || null,
          incomeFromOtherSources: validatedData.incomeFromOtherSources || null,
          shareOfIncomeFromAOP: validatedData.shareOfIncomeFromAOP || null,
          incomeOfMinor: validatedData.incomeOfMinor || null,
          taxableIncomeFromAbroad:
            validatedData.taxableIncomeFromAbroad || null,
          totalIncome: validatedData.totalIncome || null,
          totalAmountPayable: validatedData.totalAmountPayable || null,
          minimumTax: validatedData.minimumTax || null,
          netWealthSurcharge: validatedData.netWealthSurcharge || null,
          taxPayable: validatedData.taxPayable || null,
          environmentalSurcharge: validatedData.environmentalSurcharge || null,
          totalSurcharge: validatedData.totalSurcharge || null,
          delayInterest: validatedData.delayInterest || null,
          grossTaxOnTaxableIncome:
            validatedData.grossTaxOnTaxableIncome || null,
          netTaxAfterRebate: validatedData.netTaxAfterRebate || null,
          minimumTaxAmount: validatedData.minimumTaxAmount || null,

          // Image 3
          taxDeductedOrCollected: validatedData.taxDeductedOrCollected || null,
          advanceTaxPaid: validatedData.advanceTaxPaid || null,
          adjustmentOfTaxRefund: validatedData.adjustmentOfTaxRefund || null,
          taxPaidWithThisReturn: validatedData.taxPaidWithThisReturn || null,
          totalTaxPaidAndAdjusted:
            validatedData.totalTaxPaidAndAdjusted || null,
          excessPayment: validatedData.excessPayment || null,
          taxExemptedTaxFreeIncome:
            validatedData.taxExemptedTaxFreeIncome || null,
          listOfDocumentsFurnishedWithThisReturn1:
            validatedData.listOfDocumentsFurnishedWithThisReturn1 || null,
          listOfDocumentsFurnishedWithThisReturn2:
            validatedData.listOfDocumentsFurnishedWithThisReturn2 || null,
          fatherOrHusband: validatedData.fatherOrHusband || null,
          placeOfSignature: validatedData.placeOfSignature || null,
          signature: validatedData.signature || null,
          dateOfSignature: new Date(), // or from validatedData

          // Image 4
          isIncomeFromEmployment: "NO", // or from validatedData, enum value
          typeOfEmployment: validatedData.typeOfEmployment || null,

          // Image 4 - Govt
          ...govtPayScales,

          // Image 4 - Private
          basicPayPrivate: validatedData.basicPayPrivate || null,
          allowancesPrivate: validatedData.allowancesPrivate || null,
          advanceArrearSalaryPrivate:
            validatedData.advanceArrearSalaryPrivate || null,
          gratuityAnnuityPensionOrSimilarBenefitPrivate:
            validatedData.gratuityAnnuityPensionOrSimilarBenefitPrivate || null,
          perquisitesPrivate: validatedData.perquisitesPrivate || null,
          receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate:
            validatedData.receiptInLieuOfOrInAdditionToSalaryOrWagesPrivate ||
            null,
          incomeFromEmployeeShareSchemePrivate:
            validatedData.incomeFromEmployeeShareSchemePrivate || null,
          accommodationFacilityPrivate:
            validatedData.accommodationFacilityPrivate || null,
          transportFacilityPrivate:
            validatedData.transportFacilityPrivate || null,
          transportFacilityPrivateCheck:
            validatedData.transportFacilityPrivateCheck || null,
          transportFacilityPrivateVehicleCC:
            validatedData.transportFacilityPrivateVehicleCC || null,
          anyOtherFacilityProvidedByEmployerPrivate:
            validatedData.anyOtherFacilityProvidedByEmployerPrivate || null,
          employerContributionToProvidentFundPrivate:
            validatedData.employerContributionToProvidentFundPrivate || null,
          otherIncomePrivate: validatedData.otherIncomePrivate || null,
          totalSalaryReceivedPrivate:
            validatedData.totalSalaryReceivedPrivate || null,
          exemptedAmountPrivate: validatedData.exemptedAmountPrivate || null,
          totalIncomeFromSalaryPrivate:
            validatedData.totalIncomeFromSalaryPrivate || null,

          // Image 5
          locationDescriptionOwnershipProportionOfProperty:
            validatedData.locationDescriptionOwnershipProportionOfProperty ||
            null,
          rentReceivedOrAnnualValue:
            validatedData.rentReceivedOrAnnualValue || null,
          advanceRentReceived: validatedData.advanceRentReceived || null,
          valueOfAnyBenefit: validatedData.valueOfAnyBenefit || null,
          adjustedAdvanceRent: validatedData.adjustedAdvanceRent || null,
          vacancyAllowance: validatedData.vacancyAllowance || null,
          totalRentValue: validatedData.totalRentValue || null,
          repairCollectionProperty:
            validatedData.repairCollectionProperty || null,
          repairCollectionAmount: validatedData.repairCollectionAmount || null,
          municipalOrLocalTax: validatedData.municipalOrLocalTax || null,
          landRevenue: validatedData.landRevenue || null,
          interestMortgageCapitalCharge:
            validatedData.interestMortgageCapitalCharge || null,
          insurancePremiumPaid: validatedData.insurancePremiumPaid || null,
          otherAllowableDeduction:
            validatedData.otherAllowableDeduction || null,
          taxpayersSharePercentage:
            validatedData.taxpayersSharePercentage || "0",
          taxpayersShareAmount: validatedData.taxpayersShareAmount || null,
          salesTurnoverReceiptAgriculture:
            validatedData.salesTurnoverReceiptAgriculture || null,
          grossProfitFromAgriculture:
            validatedData.grossProfitFromAgriculture || null,
          generalExpensesSellingExpenses:
            validatedData.generalExpensesSellingExpenses || null,
          totalAdmissibleDeduction:
            validatedData.totalAdmissibleDeduction || null,
          netIncomeFromRent: validatedData.netIncomeFromRent || null,
          netProfitFromAgriculture:
            validatedData.netProfitFromAgriculture || null,

          // Image 6
          nameOfBusiness: validatedData.nameOfBusiness || null,
          natureOfBusiness: validatedData.natureOfBusiness || null,
          addressOfBusiness: validatedData.addressOfBusiness || null,
          // Summary of income
          salesTurnoverReceiptsBusiness:
            validatedData.salesTurnoverReceiptsBusiness || null,
          purchase: validatedData.purchase || null,
          grossProfitFromBusiness:
            validatedData.grossProfitFromBusiness || null,
          generalAdministrativeSellingExpenses:
            validatedData.generalAdministrativeSellingExpenses || null,
          badDebtExpense: validatedData.badDebtExpense || null,
          netProfitFromBusinessIncome:
            validatedData.netProfitFromBusinessIncome || null,
          // Balance sheet
          cashInHandAtBank: validatedData.cashInHandAtBank || null,
          inventories: validatedData.inventories || null,
          fixedAssets: validatedData.fixedAssets || null,
          otherAssets: validatedData.otherAssets || null,
          totalAssets: validatedData.totalAssets || null,
          openingCapital: validatedData.openingCapital || null,
          netProfitFromBusinessBalance:
            validatedData.netProfitFromBusinessBalance || null,
          withdrawalsInTheIncomeYear:
            validatedData.withdrawalsInTheIncomeYear || null,
          closingCapital: validatedData.closingCapital || null,
          liabilities: validatedData.liabilities || null,
          totalCapitalsAndLiabilities:
            validatedData.totalCapitalsAndLiabilities || null,

          // Capital gains relations
          ...capitalGains,

          // Image 7
          ...financialAssets,

          // Image 8
          lifeInsurancePremium: validatedData.lifeInsurancePremium || null,
          contributionToDeposit: validatedData.contributionToDeposit || null,
          investmentInGovernmentSecurities:
            validatedData.investmentInGovernmentSecurities || null,
          investmentInSecuritiesStock:
            validatedData.investmentInSecuritiesStock || null,
          contributionToProvidentFund:
            validatedData.contributionToProvidentFund || null,
          selfAndEmployersContribution:
            validatedData.selfAndEmployersContribution || null,
          contributionToSuperAnnuationFund:
            validatedData.contributionToSuperAnnuationFund || null,
          contributionToBenevolentFund:
            validatedData.contributionToBenevolentFund || null,
          contributionToZakatFund:
            validatedData.contributionToZakatFund || null,
          otherRebatableInvestmentContribution:
            validatedData.otherRebatableInvestmentContribution || null,
          amountOfTaxRebate: validatedData.amountOfTaxRebate || null,
          totalAllowableInvestmentContribution:
            validatedData.totalAllowableInvestmentContribution || null,
          totalIncomeRebateTable: validatedData.totalIncomeRebateTable || null,
          totalAllowableInvestmentRebateTable:
            validatedData.totalAllowableInvestmentRebateTable || null,
          taka1000000: validatedData.taka1000000 || null,

          // Image 9

          // Add these required fields:
          netWealthLastDate: "NO_I_AM_A_NEW_TAXPAYER", // or from validatedData, enum value
        },
      });

      // Create the order linked to the tax return
      const order = await tx.order.create({
        data: {
          userId: session.user.id,
          individualTaxesId: taxReturn.id,
          amount: 1000, // Set your default amount or get from configuration
          paymentStatus: PaymentStatus.PENDING,
          // Add other order fields as needed
        },
      });

      return { taxReturn, order };
    });

    // Revalidate relevant paths
    revalidatePath("/orders");
    revalidatePath("/tax-returns");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error creating tax return and order:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create tax return and order",
    };
  }
}
