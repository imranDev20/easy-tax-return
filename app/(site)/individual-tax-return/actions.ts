"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "./schema";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export async function createIndividualTaxReturn(data: IndividualTaxReturnFormInput) {
  try {
    const validatedData = individualTaxReturnSchema.parse(data);

    const result = await prisma.$transaction(async (prisma) => {
      // Step 1: Create the individual tax return
      const createIndividualTaxReturn = await prisma.individualTaxes.create({
        data: {
          userId: data.userId ??"",
          taxpayerName: data.taxpayerName,
          nationalId: data.nationalId,
          tin: data.tin,
          circle: data.circle,
          zone: data.zone,
          residentialStatus: data.residentialStatus,
          specialBenefits: data.specialBenefits,
          isParentOfDisabledPerson: data.isParentOfDisabledPerson,
          dateOfBirth: data.dateOfBirth.toISOString(),
          spouseName: data.spouseName,
          spouseTin: data.spouseTin,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          telephone: data.telephone,
          mobile: data.mobile,
          email: data.email,
          employerName: data.employerName,
          businessName: data.businessName,
          bin: data.bin,
          partnersInfo: data.partnersInfo,
        
          partnersMembersAssociation1: data.partnersMembersAssociation1,
          partnersMembersAssociation2: data.partnersMembersAssociation2,
          incomeFishFarming: data.incomeFishFarming,
          incomeFishFarmingAmount: data.incomeFishFarmingAmount,
          shareOfIncomeFromAOP: data.shareOfIncomeFromAOP,
          incomeOfMinor: data.incomeOfMinor,
          taxableIncomeFromAbroad: data.taxableIncomeFromAbroad,
          minimumTax: data.minimumTax,
          netWealthSurcharge: data.netWealthSurcharge,
          environmentalSurcharge: data.environmentalSurcharge,
          delayInterest: data.delayInterest,
          calculate: data.calculate,
          advanceTaxPaidAmount: data.advanceTaxPaidAmount,
          adjustmentOfTaxRefund: data.adjustmentOfTaxRefund,
          taxPaidWithThisReturn: data.taxPaidWithThisReturn,
          listOfDocumentsFurnishedWithThisReturn1: data.listOfDocumentsFurnishedWithThisReturn1,
          listOfDocumentsFurnishedWithThisReturn2: data.listOfDocumentsFurnishedWithThisReturn2,
          fatherOrHusband: data.fatherOrHusband,
          placeOfSignature: data.placeOfSignature,
          signature: data.signature,
          dateOfSignature: data.dateOfSignature.toISOString(),     
          locationDescriptionOwnershipProportionOfProperty: data.locationDescriptionOwnershipProportionOfProperty,
          rentReceivedOrAnnualValue: data.rentReceivedOrAnnualValue,
          advanceRentReceived: data.advanceRentReceived,
          valueOfAnyBenefit: data.valueOfAnyBenefit,
          adjustedAdvanceRent: data.adjustedAdvanceRent,
          vacancyAllowance: data.vacancyAllowance,
          repairCollection: data.repairCollection,
          municipalOrLocalTax: data.municipalOrLocalTax,
          landRevenue: data.landRevenue,
          interestMortgageCapitalCharge: data.interestMortgageCapitalCharge,
          insurancePremiumPaid: data.insurancePremiumPaid,
          others: data.others,
          taxpayersShare: data.taxpayersShare,
          taxDeductedSourceFromIncomeRent: data.taxDeductedSourceFromIncomeRent,
          salesTurnoverReceipt: data.salesTurnoverReceipt,
          grossProfit: data.grossProfit,
          generalExpensesSellingExpenses: data.generalExpensesSellingExpenses,
          nameOfBusiness: data.nameOfBusiness,
          natureOfBusiness: data.natureOfBusiness,
          addressOfBusiness: data.addressOfBusiness,
          salesTurnoverReceipts: data.salesTurnoverReceipt,
          grossProfitAmount: data.grossProfitAmount,
          generalAdministrativeSellingExpenses: data.generalAdministrativeSellingExpenses,
          badDebtExpense: data.badDebtExpense,
          inventories: data.inventories,
          fixedAssets: data.fixedAssets,
          otherAssets: data.otherAssets,
          openingCapital: data.openingCapital,
          withdrawalsInTheIncomeYear: data.withdrawalsInTheIncomeYear,
          liabilities: data.liabilities,
          interestProfitFromBankFIAmount: data.interestProfitFromBankFIAmount,
          interestProfitFromBankFIDeductions: data.interestProfitFromBankFIDeductions,
          interestProfitFromBankFITax: data.interestProfitFromBankFITax,
          incomeFromSavingCertificatesAmount: data.incomeFromSavingCertificatesAmount,
          incomeFromSavingCertificatesDeductions: data.incomeFromBusinessDeductions,
          incomeFromSavingCertificatesTax: data.incomeFromSavingCertificatesTax,
          incomeFromSecuritiesDebenturesAmount: data.incomeFromSecuritiesDebenturesAmount,
          incomeFromSecuritiesDebenturesDeductions: data.incomeFromSecuritiesDebenturesDeductions,
          incomeFromSecuritiesDebenturesTax: data.incomeFromSecuritiesDebenturesTax,
          incomeFromFinancialProductSchemeAmount: data.incomeFromFinancialProductSchemeAmount,
          incomeFromFinancialProductSchemeDeductions: data.incomeFromFinancialProductSchemeDeductions,
          incomeFromFinancialProductSchemeTax: data.incomeFromFinancialProductSchemeTax,
          dividendIncomeAmount: data.dividendIncomeAmount,
          dividendIncomeDeductions: data.dividendIncomeDeductions,
          dividendIncomeTax: data.dividendIncomeTax,
          capitalGainFromTransferOfPropertyAmount: data.capitalGainFromTransferOfPropertyAmount,
          capitalGainFromTransferOfPropertyDeductions: data.capitalGainFromTransferOfPropertyDeductions,
          capitalGainFromTransferOfPropertyTax: data.capitalGainFromTransferOfPropertyTax,
          incomeFromBusinessAmount: data.incomeFromBusinessAmount,
          incomeFromBusinessDeductions: data.incomeFromBusinessDeductions,
          incomeFromBusinessTax: data.incomeFromBusinessTax,
          workersParticipationFundAmount: data.workersParticipationFundAmount,
          workersParticipationFundDeductions: data.workersParticipationFundDeductions,
          workersParticipationFundTax: data.workersParticipationFundTax,
          incomeFromOtherSourcesAmount: data.incomeFromOtherSourcesAmount,
          incomeFromOtherSourcesDeductions: data.incomeFromOtherSourcesDeductions,
          incomeFromOtherSourcesTax: data.incomeFromOtherSourcesTax,
          lifeInsurancePremium: data.lifeInsurancePremium,
          contributionToDeposit: data.contributionToDeposit,
          investmentInGovernmentSecurities1: data.investmentInGovernmentSecurities1,
          investmentInGovernmentSecurities2: data.investmentInGovernmentSecurities2,
          investmentInSecurities: data.investmentInSecurities,
          contributionToProvidentFund: data.contributionToProvidentFund,
          selfAndEmployersContribution: data.selfAndEmployersContribution,
          contributionToSuperAnnuationFund: data.contributionToSuperAnnuationFund,
          contributionToBenevolentFund: data.contributionToBenevolentFund,
          contributionToZakatFund1: data.contributionToZakatFund1,
          contributionToZakatFund2: data.contributionToZakatFund2,
          othersIf1: data.othersIf1,
          othersIf2: data.othersIf2,
          expensesForFoodAmount: data.expensesForFoodAmount,
          expensesForFoodComment: data.expensesForFoodComment,
          housingExpenseAmount: data.housingExpenseAmount,
          housingExpenseComment: data.housingExpenseComment,
          personalTransportationExpensesAmount: data.personalTransportationExpensesAmount,
          personalTransportationExpensesAmountComment: data.personalTransportationExpensesAmountComment,
          utilityExpenseAmount: data.utilityExpenseAmount,
          utilityExpenseComment: data.utilityExpenseComment,
          educationExpensesAmount: data.educationExpensesAmount,
          educationExpensesComment: data.educationExpensesComment,
          personalExpenseAmount: data.personalExpenseAmount,
          personalExpenseComment: data.personalExpenseComment,
          festivalExpenseAmount: data.festivalExpenseAmount,
          festivalExpenseComment: data.festivalExpenseComment,
          taxDeductedAmount: data.taxDeductedAmount,
          taxDeductedComment: data.taxDeductedComment,
          advanceTaxPaid2Amount: data.advanceTaxPaid2Amount,
          advanceTaxPaidComment: data.advanceTaxPaidComment,
          taxSurchargePaidAmount: data.taxSurchargePaidAmount,
          taxSurchargePaidComment: data.taxSurchargePaidComment,
          interestPaidAmount: data.interestPaidAmount,
          interestPaidComment: data.interestPaidComment,
          total: data.total,
          exemptedIncomeFromSalary: data.exemptedIncomeFromSalary,
          exemptedIncomeFromBusiness: data.exemptedIncomeFromBusiness,
          exemptedAgriculturalIncome: data.exemptedAgriculturalIncome,
          incomeFromProvidentFund: data.incomeFromProvidentFund,
          foreignRemittance: data.foreignRemittance,
          typeOfReceipts1: data.typeOfReceipts1,
          typeOfReceipts2: data.typeOfReceipts2,
          typeOfReceipts3: data.typeOfReceipts3,
          typeOfReceiptsAmount1: data.typeOfReceiptsAmount1,
          typeOfReceiptsAmount2: data.typeOfReceiptsAmount2,
          typeOfReceiptsAmount3: data.typeOfReceiptsAmount3,
          netWealthLastDate: data.netWealthLastDate,
          netWealthLastDateAmount: data.netWealthLastDateAmount,
          giftExpense: data.giftExpense,
          institutionalLiabilities: data.institutionalLiabilities,
          nonInstitutionalLiabilities: data.nonInstitutionalLiabilities,
          otherLiabilities: data.otherLiabilities,
          totalAssetOfBusiness: data.totalAssetOfBusiness,
          lessBusinessLiabilities: data.lessBusinessLiabilities,
          companyName1: data.companyName1,
          companyName2: data.companyName2,
          companyName3: data.companyName3,
          noOfShare1: data.noOfShare1,
          noOfShare2: data.noOfShare2,
          noOfShare3: data.noOfShare3,
          value1: data.value1,
          value2: data.value2,
          value3: data.value3,
          nameOfPartnershipFirm1: data.nameOfPartnershipFirm1,
          nameOfPartnershipFirm2: data.nameOfPartnershipFirm2,
          nameOfPartnershipFirm3: data.nameOfPartnershipFirm3,
          shareOfProfit1: data.shareOfProfit1,
          shareOfProfit2: data.shareOfProfit2,
          shareOfProfit3: data.shareOfProfit3,
          capitalContributed1: data.capitalContributed1,
          capitalContributed2: data.capitalContributed2,
          capitalContributed3: data.capitalContributed3,
          locationDescription1: data.locationDescription1,
          locationDescription2: data.locationDescription2,
          locationDescription3: data.locationDescription3,
          locationDescription4: data.locationDescription4,
          locationDescription5: data.locationDescription5,
          locationValue1: data.locationValue1,
          locationValue2: data.locationValue2,
          locationValue3: data.locationValue3,
          locationValue4: data.locationValue4,
          locationValue5: data.locationValue4,
          agriculturalLocationAndDescription1: data.agriculturalLocationAndDescription1,
          agriculturalLocationAndDescription2: data.agriculturalLocationAndDescription2,
          agriculturalLocationAndDescription3: data.agriculturalLocationAndDescription3,
          agriculturalLocationValue1: data.agriculturalLocationValue1,
          agriculturalLocationValue2: data.agriculturalLocationValue2,
          agriculturalLocationValue3: data.agriculturalLocationValue3,
          shareDebentureUnitCertificate: data.shareDebentureUnitCertificate,
          bondsGovernment: data.bondsGovernment,
          sanchayapatraSavingsCertificate: data.sanchayapatraSavingsCertificate,
          depositPensionScheme: data.depositPensionScheme,
          loansGivenToOthers: data.loansGivenToOthers,
          name: data.name,
          nid: data.nid,
          nidValue: data.nidValue,
          savingDeposit: data.savingDeposit,
          providentFund: data.providentFund,
          otherInvestment1: data.otherInvestment1,
          otherInvestment2: data.otherInvestment2,
          typeOfMotorVehicle1: data.typeOfMotorVehicle1,
          typeOfMotorVehicle2: data.typeOfMotorVehicle2,
          registrationNumber1: data.registrationNumber1,
          registrationNumber2: data.registrationNumber2,
          motorValue1: data.motorValue1,
          motorValue2: data.motorValue2,
          ornaments1: data.ornaments1,
          ornaments2: data.ornaments2,
          furnitureAndElectronic: data.furnitureAndElectronic,
          othersAssets1: data.othersAssets1,
          othersAssets2: data.othersAssets2,
          bankBalance: data.bankBalance,
          cashInHand: data.cashInHand,
          others1: data.others1,
          others2: data.others2,
          assetOutsideBangladesh: data.assetOutsideBangladesh,
        },
      });

      // Step 2: Create the payment
      const paymentResult = await createPayment(data.total ?? "50", data.userId);

      return {
        createIndividualTaxReturn,
        paymentResult,
      };
    });

    return {
      message: "Individual tax return and payment processed successfully",
      data: result,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while submitting individual tax return and processing payment.",
      success: false,
    };
  }
}



// bkash actions
async function getBkashHeaders() {
  const tokenResponse = await axios.post(process.env.BKASH_GRANT_TOKEN_URL as string, {
    app_key: process.env.BKASH_API_KEY,
    app_secret: process.env.BKASH_SECRET_KEY,
  }, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      username: process.env.BKASH_USERNAME,
      password: process.env.BKASH_PASSWORD,
    }
  });

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: tokenResponse.data.id_token,
    'x-app-key': process.env.BKASH_API_KEY,
  };
}
interface PaymentResponse {
  bkashURL: string;
}

export async function createPayment(amount: string, userId = "123545"): Promise<PaymentResponse | Error> {
  try {
    const headers = await getBkashHeaders();
    const { data } = await axios.post(process.env.BKASH_CREATE_PAYMENT_URL as string, {
      mode: '0011',
      payerReference: " ",
      callbackURL: `${process.env.NEXT_PUBLIC_API_URL}/api/bkash/payment/callback`,
      amount: amount,
      currency: "BDT",
      intent: 'sale',
      merchantInvoiceNumber: 'Inv' + uuidv4().substring(0, 5)
    }, { headers });
    
    return { bkashURL: data.bkashURL };
  } catch (error) {
    return error as Error;
  }
}


// export async function handleCallback(paymentID, status) {
//   if (status === 'cancel' || status === 'failure') {
//     return { redirect: `/error?message=${status}` };
//   }
  
//   if (status === 'success') {
//     try {
//       const headers = await getBkashHeaders();
//       const { data } = await axios.post(process.env.BKASH_EXECUTE_PAYMENT_URL as string, { paymentID }, { headers });
      
//       if (data && data.statusCode === '0000') {
//         await prisma.payment.create({
//           data: {
//             userId: Math.floor(Math.random() * 10) + 1,
//             paymentID,
//             trxID: data.trxID,
//             date: data.paymentExecuteTime,
//             amount: parseInt(data.amount)
//           }
//         });
//         return { redirect: '/success' };
//       } else {
//         return { redirect: `/error?message=${data.statusMessage}` };
//       }
//     } catch (error) {
//       console.error(error);
//       return { redirect: `/error?message=${error.message}` };
//     }
//   }
// }

// export async function refundPayment(trxID) {
//   try {
//     const payment = await prisma.payment.findFirst({ where: { trxID } });
//     if (!payment) {
//       throw new Error('Payment not found');
//     }

//     const headers = await getBkashHeaders();
//     const { data } = await axios.post(process.env.BKASH_REFUND_TRANSACTION_URL as string, {
//       paymentID: payment.paymentID,
//       amount: payment.amount,
//       trxID,
//       sku: 'payment',
//       reason: 'cashback'
//     }, { headers });

//     if (data && data.statusCode === '0000') {
//       return { message: 'refund success' };
//     } else {
//       throw new Error('refund failed');
//     }
//   } catch (error) {
//     throw new Error('refund failed: ' + error.message);
//   }
// }