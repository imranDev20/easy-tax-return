import {
  CalculationType,
  MinimumTax,
  NetWealthLastDate,
  RepairCollection,
  EmploymentType,
} from "@prisma/client";

import z from "zod";

// Define the Zod schema
export const individualTaxReturnSchema = z.object({
  userId: z.string().optional(),

  // Image 1
  taxpayerName: z.string().min(1, "Name is required"),
  nationalId: z.string().min(1, "National ID or Passport number is required"),
  tin: z.string().min(1, "TIN is required"),
  circle: z.string().min(1, "Circle is required"),
  zone: z.string().min(1, "Zone is required"),
  residentialStatus: z.enum(["RESIDENT", "NON_RESIDENT"]),
  specialBenefits: z
    .enum([
      "NONE",
      "GAZETTED_WAR_WOUNDED_FREEDOM_FIGHTER",
      "FEMALE",
      "THIRD_GENDER",
      "DISABLED_PERSON",
      "AGED_65_OR_MORE",
    ])
    .optional(),
  isParentOfDisabledPerson: z.boolean().optional(),
  dateOfBirth: z.date(),
  statementOfIncomeYearEndedOn: z.date(),
  spouseName: z.string().optional(),
  spouseTin: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  telephone: z.string().optional(),
  mobile: z.string(),
  email: z.string().email(),
  employerName: z.string().optional(),
  businessName: z.string().optional(),
  bin: z.string().optional(),
  partnersInfo: z.string().optional(),
  partnersMembersAssociation1: z.string().optional(),
  partnersMembersAssociation2: z.string().optional(),

  // Image 2
  incomeFromEmployment: z.number().optional(),
  incomeFromRent: z.number().optional(),
  incomeFromAgriculture: z.number().optional(),
  incomeFishFarming: z.boolean().optional(),
  incomeFishFarmingAmount: z.string().optional(),
  incomeFromBusiness: z.number().optional(),
  incomeFromBusinessMinimum: z.number().optional(),
  incomeFromCapitalGains: z.number().optional(),
  incomeFromFinancialAssets: z.number().optional(),
  incomeFromOtherSources: z.number().optional(),
  totalIncome: z.number().optional(),
  totalAmountPayable: z.number().optional(),
  taxDeductedOrCollected: z.number().optional(),
  totalTaxPaidAndAdjusted: z.number().optional(),
  excessPayment: z.number().optional(),
  taxExemptedTaxFreeIncome: z.number().optional(),
  shareOfIncomeFromAOP: z.string(),
  shareOfIncomeFromAOPAmount: z.string().optional(),
  incomeOfMinor: z.string().optional(),
  taxableIncomeFromAbroad: z.string().optional(),
  minimumTax: z.nativeEnum(MinimumTax),
  netWealthSurcharge: z.enum(["YES", "NO"]),
  taxPayable: z.string().optional(),
  netWealthSurchargeAmount: z.string().optional(),
  environmentalSurcharge: z.string().optional(),
  delayInterest: z.string().optional(),
  calculate: z.nativeEnum(CalculationType),

  // Image 3
  advanceTaxPaidAmount: z.string().optional(),
  adjustmentOfTaxRefund: z.string().optional(),
  taxPaidWithThisReturn: z.string(),
  listOfDocumentsFurnishedWithThisReturn1: z.string().optional(),
  listOfDocumentsFurnishedWithThisReturn2: z.string().optional(),
  fatherOrHusband: z.string(),
  placeOfSignature: z.string().optional(),
  signature: z.string().optional(),
  dateOfSignature: z.date(),

  // Image 4

  isIncomeFromEmployment: z.boolean(),
  typeOfEmployment: z.nativeEnum(EmploymentType),

  // image 5
  locationDescriptionOwnershipProportionOfProperty: z.string().optional(),
  rentReceivedOrAnnualValue: z.string().optional(),
  advanceRentReceived: z.string().optional(),
  valueOfAnyBenefit: z.string().optional(),
  adjustedAdvanceRent: z.string().optional(),
  vacancyAllowance: z.string().optional(),
  repairCollection: z.nativeEnum(RepairCollection).optional(),
  repairCollectionAmount: z.string().optional(),
  municipalOrLocalTax: z.string().optional(),
  landRevenue: z.string().optional(),
  interestMortgageCapitalCharge: z.string().optional(),
  insurancePremiumPaid: z.string().optional(),
  others: z.string().optional(),
  taxpayersShare: z.string(),
  taxDeductedSourceFromIncomeRent: z.string().optional(),
  salesTurnoverReceipt: z.string().optional(),
  grossProfit: z.string().optional(),
  generalExpensesSellingExpenses: z.string().optional(),
  nameOfBusiness: z.string().optional(),
  natureOfBusiness: z.string().optional(),
  addressOfBusiness: z.string().optional(),
  salesTurnoverReceipts: z.string().optional(),
  grossProfitAmount: z.string().optional(),
  generalAdministrativeSellingExpenses: z.string().optional(),
  badDebtExpense: z.string().optional(),
  inventories: z.string().optional(),
  fixedAssets: z.string().optional(),
  otherAssets: z.string().optional(),
  openingCapital: z.string().optional(),
  withdrawalsInTheIncomeYear: z.string().optional(),
  liabilities: z.string().optional(),

  interestProfitFromBankFIAmount: z.string().optional(),
  interestProfitFromBankFIDeductions: z.string().optional(),
  interestProfitFromBankFITax: z.string().optional(),

  incomeFromSavingCertificatesAmount: z.string().optional(),
  incomeFromSavingCertificatesDeductions: z.string().optional(),
  incomeFromSavingCertificatesTax: z.string().optional(),

  incomeFromSecuritiesDebenturesAmount: z.string().optional(),
  incomeFromSecuritiesDebenturesDeductions: z.string().optional(),
  incomeFromSecuritiesDebenturesTax: z.string().optional(),

  incomeFromFinancialProductSchemeAmount: z.string().optional(),
  incomeFromFinancialProductSchemeDeductions: z.string().optional(),
  incomeFromFinancialProductSchemeTax: z.string().optional(),

  dividendIncomeAmount: z.string().optional(),
  dividendIncomeDeductions: z.string().optional(),
  dividendIncomeTax: z.string().optional(),

  capitalGainFromTransferOfPropertyAmount: z.string().optional(),
  capitalGainFromTransferOfPropertyDeductions: z.string().optional(),
  capitalGainFromTransferOfPropertyTax: z.string().optional(),

  incomeFromBusinessAmount: z.string().optional(),
  incomeFromBusinessDeductions: z.string().optional(),
  incomeFromBusinessTax: z.string().optional(),

  workersParticipationFundAmount: z.string().optional(),
  workersParticipationFundDeductions: z.string().optional(),
  workersParticipationFundTax: z.string().optional(),

  incomeFromOtherSourcesAmount: z.string().optional(),
  incomeFromOtherSourcesDeductions: z.string().optional(),
  incomeFromOtherSourcesTax: z.string().optional(),

  lifeInsurancePremium: z.string().optional(),

  contributionToDeposit: z.string().optional(),

  investmentInGovernmentSecurities1: z.string().optional(),
  investmentInGovernmentSecurities2: z.string().optional(),

  investmentInSecurities: z.string().optional(),

  contributionToProvidentFund: z.string().optional(),

  selfAndEmployersContribution: z.string().optional(),

  contributionToSuperAnnuationFund: z.string().optional(),

  contributionToBenevolentFund: z.string().optional(),

  contributionToZakatFund1: z.string().optional(),
  contributionToZakatFund2: z.string().optional(),

  othersIf1: z.string().optional(),
  othersIf2: z.string().optional(),

  expensesForFoodAmount: z.string().optional(),
  expensesForFoodComment: z.string().optional(),

  housingExpenseAmount: z.string().optional(),
  housingExpenseComment: z.string().optional(),

  personalTransportationExpensesAmount: z.string().optional(),
  personalTransportationExpensesAmountComment: z.string().optional(),

  utilityExpenseAmount: z.string().optional(),
  utilityExpenseComment: z.string().optional(),

  educationExpensesAmount: z.string().optional(),
  educationExpensesComment: z.string().optional(),

  personalExpenseAmount: z.string().optional(),
  personalExpenseComment: z.string().optional(),

  festivalExpenseAmount: z.string().optional(),
  festivalExpenseComment: z.string().optional(),

  taxDeductedAmount: z.string().optional(),
  taxDeductedComment: z.string().optional(),

  advanceTaxPaid2Amount: z.string().optional(),
  advanceTaxPaidComment: z.string().optional(),

  taxSurchargePaidAmount: z.string().optional(),
  taxSurchargePaidComment: z.string().optional(),

  interestPaidAmount: z.string().optional(),
  interestPaidComment: z.string().optional(),

  total: z.string().optional(),

  exemptedIncomeFromSalary: z.string().optional(),
  exemptedIncomeFromBusiness: z.string().optional(),

  exemptedAgriculturalIncome: z.string().optional(),

  incomeFromProvidentFund: z.string().optional(),

  foreignRemittance: z.string().optional(),

  typeOfReceipts1: z.string().optional(),
  typeOfReceipts2: z.string().optional(),
  typeOfReceipts3: z.string().optional(),
  typeOfReceiptsAmount1: z.string().optional(),
  typeOfReceiptsAmount2: z.string().optional(),
  typeOfReceiptsAmount3: z.string().optional(),
  netWealthLastDate: z.nativeEnum(NetWealthLastDate),
  netWealthLastDateAmount: z.string().optional(),

  giftExpense: z.string().optional(),
  institutionalLiabilities: z.string().optional(),
  nonInstitutionalLiabilities: z.string().optional(),
  otherLiabilities: z.string().optional(),
  totalAssetOfBusiness: z.string().optional(),
  lessBusinessLiabilities: z.string().optional(),

  companyName1: z.string().optional(),
  companyName2: z.string().optional(),
  companyName3: z.string().optional(),

  noOfShare1: z.string().optional(),
  noOfShare2: z.string().optional(),
  noOfShare3: z.string().optional(),

  value1: z.string().optional(),
  value2: z.string().optional(),
  value3: z.string().optional(),

  nameOfPartnershipFirm1: z.string().optional(),
  nameOfPartnershipFirm2: z.string().optional(),
  nameOfPartnershipFirm3: z.string().optional(),

  shareOfProfit1: z.string().optional(),
  shareOfProfit2: z.string().optional(),
  shareOfProfit3: z.string().optional(),

  capitalContributed1: z.string().optional(),
  capitalContributed2: z.string().optional(),
  capitalContributed3: z.string().optional(),

  locationDescription1: z.string().optional(),
  locationDescription2: z.string().optional(),
  locationDescription3: z.string().optional(),
  locationDescription4: z.string().optional(),
  locationDescription5: z.string().optional(),

  locationValue1: z.string().optional(),
  locationValue2: z.string().optional(),
  locationValue3: z.string().optional(),
  locationValue4: z.string().optional(),
  locationValue5: z.string().optional(),

  agriculturalLocationAndDescription1: z.string().optional(),
  agriculturalLocationAndDescription2: z.string().optional(),
  agriculturalLocationAndDescription3: z.string().optional(),

  agriculturalLocationValue1: z.string().optional(),
  agriculturalLocationValue2: z.string().optional(),
  agriculturalLocationValue3: z.string().optional(),

  shareDebentureUnitCertificate: z.string().optional(),

  bondsGovernment: z.string().optional(),
  sanchayapatraSavingsCertificate: z.string().optional(),

  depositPensionScheme: z.string().optional(),
  loansGivenToOthers: z.string().optional(),

  name: z.string().optional(),
  nid: z.string().optional(),
  nidValue: z.string().optional(),

  savingDeposit: z.string().optional(),
  providentFund: z.string().optional(),
  otherInvestment1: z.string().optional(),
  otherInvestment2: z.string().optional(),

  typeOfMotorVehicle1: z.string().optional(),
  typeOfMotorVehicle2: z.string().optional(),

  registrationNumber1: z.string().optional(),
  registrationNumber2: z.string().optional(),

  motorValue1: z.string().optional(),
  motorValue2: z.string().optional(),

  ornaments1: z.string().optional(),
  ornaments2: z.string().optional(),
  furnitureAndElectronic: z.string().optional(),

  othersAssets1: z.string().optional(),
  othersAssets2: z.string().optional(),

  bankBalance: z.string().optional(),
  cashInHand: z.string().optional(),

  others1: z.string().optional(),
  others2: z.string().optional(),
  assetOutsideBangladesh: z.string().optional(),
  totalRentValue: z.number().optional(),
  totalAdmissibleDeduction: z.number().optional(),
  netIncome: z.number().optional(),
  netProfit: z.number().optional(),
  netProfit2: z.number().optional(),
  cashInHandAtBank: z.number().optional(),
  totalAssets: z.number().optional(),
  netProfit3: z.number().optional(),
  closingCpital: z.number().optional(),
  totalCapitalsAndLiabilities: z.number().optional(),
  interestProfitFromBankFINetTaxableIncome: z.number().optional(),
  incomeFromSavingCertificatesNetTaxableIncome: z.number().optional(),
  incomeFromSecuritiesDebenturesNetTaxableIncome: z.number().optional(),
  incomeFromFinancialProductSchemeNetTaxableIncome: z.number().optional(),
  dividendIncomeNetTaxableIncome: z.number().optional(),
  capitalGainFromTransferofPropertyNetTaxableIncome: z.number().optional(),
  incomeFromBusinessNetTaxableIncome: z.number().optional(),
  workersParticinationFundNetTaxableIncome: z.number().optional(),
  incomeFromOtherSourcesNetTaxableIncome: z.number().optional(),
  totalAllowableInvestmentContribution: z.number().optional(),
  taxDeductedCollectedAtSourceAmount: z.number().optional(),
  advanceTaxPaidAmountTaka: z.number().optional(),
  totalAmount: z.number().optional(),
  totalAmount2: z.number().optional(),
  totalAmount3: z.number().optional(),
  taxOnIncomeFromPoultryHatcheriesFishFarming: z.string().optional(),
  typeOfTaxExemptedTaxFreeIncome6: z.string().optional(),
  typeOfTaxExemptedTaxFreeIncome7: z.string().optional(),
  typeOfTaxExemptedTaxFreeIncomeAmount6: z.string().optional(),
  typeOfTaxExemptedTaxFreeIncomeAmount7: z.string().optional(),
  totalIncomeShownInTheReturn: z.number().optional(),
  taxExemptedIncomeAndAllowance: z.number().optional(),
  receiptOfGiftOtherReceipts: z.number().optional(),
  totalSourceOfFund: z.number().optional(),
  sumOfSourceOfFundAndPreviousYearsNetWealth: z.number().optional(),
  expenseRelatingToLifestyle: z.number().optional(),
  totalExpensesAndLoss: z.number().optional(),
  netWealthAtTheLastDateOfThisFinancialYear: z.number().optional(),
  totalLiabilitiesOutsideBusiness: z.number().optional(),
  grossWealth: z.number().optional(),
  businessCapitalAmount1: z.number().optional(),
  businessCapitalAmount2: z.number().optional(),
  directorsShareholdingsInTheCompanies: z.number().optional(),
  businessCapitalOfPartnershipFirm: z.number().optional(),
  nonAgriculturalPropertyLandHouseProperty: z.number().optional(),
  agriculturalProperty: z.number().optional(),
  totalFinancialAssets: z.number().optional(),
  motorVehiclesAmount: z.number().optional(),
  totalAssetslocatedInBangladesh: z.number().optional(),
  totalCashInHandsAndFundOutsideBusiness: z.number().optional(),
  totalAssetsInBangladeshAndOutsideBangladesh: z.number().optional(),
  totalIncomeShown: z.string().optional(),
  totalTaxPaid: z.string().optional(),
});

export type IndividualTaxReturnFormInput = z.infer<
  typeof individualTaxReturnSchema
>;
