import {
  CalculationType,
  MinimumTax,
  NetWealthLastDate,
  RepairCollection,
  EmploymentType,
  IncomeFromEmployment,
  TransportCCType,
} from "@prisma/client";

import z from "zod";

const incomeItemSchema = z.object({
  particulars: z.string().optional(),
  amountOfIncome: z.string().nullable().optional(),
  deductionsExpensesExemptedIncome: z.string().optional(),
  netTaxableIncome: z.string().nullable().optional(),
  taxDeductedAtSource: z.string().nullable().optional(),
});

const govtPayScaleSchema = z.object({
  amount: z.string().nullable().optional(),
  taxExempted: z.string().nullable().optional(),
  taxable: z.string().nullable().optional(),
});

const personalExpenseSchema = z.object({
  amount: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
});

const incomeFromCapitalGainsSchema = z.object({
  description: z.string().optional(),
  capitalGain: z.string().nullable().optional(),
  exemptedAmount: z.string().nullable().optional(),
  taxableAmount: z.string().nullable().optional(),
});

const financialAssetsSchema = z.object({
  description: z.string().optional(),
  balance: z.string().nullable().optional(),
  interestProfit: z.string().nullable().optional(),
  sourceTax: z.string().nullable().optional(),
});

const calculationOfRebateAmount = z.object({
  totalAmount: z.string().nullable().optional(),
  rebate: z.string().nullable().optional(),
});

// Define the Zod schema
export const individualTaxReturnSchema = z.object({
  userId: z.string().optional(),

  // Image 1
  taxpayerName: z.string().min(1, "Name is required"),
  nationalId: z.string().min(1, "National ID or Passport number is required"),
  tin: z.string().min(1, "TIN is required"),
  circle: z.string().min(1, "Circle is required"),
  zone: z.string().min(1, "Zone is required"),
  assessmentYear: z.string(),
  residentialStatus: z.enum(["RESIDENT", "NON_RESIDENT"]),
  assesseeStatus: z.enum([
    "INDIVIDUAL",
    "FIRM",
    "HINDU_UNDEVIDED_FAMILY",
    "OTHERS",
  ]),
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
  partnersMembersAssociation1: z.string().optional(),
  partnersMembersAssociation2: z.string().optional(),

  // Image 2
  statementOfIncomeYearEndedOn: z.date(),
  incomeFromEmployment: z.string().optional(),
  incomeFromRent: z.string().optional(),
  incomeFromAgriculture: z.string().optional(),
  incomeFromBusiness: z.string().optional(),
  incomeFromCapitalGains: z.string().optional(),
  incomeFromFinancialAssets: z.string().optional(),
  incomeFromOtherSources: z.string().optional(),
  totalIncome: z.string().optional(),
  totalAmountPayable: z.string().optional(),
  shareOfIncomeFromAOP: z.string().optional(),
  incomeOfMinor: z.string().optional(),
  taxableIncomeFromAbroad: z.string().optional(),
  minimumTax: z.nativeEnum(MinimumTax),
  netWealthSurcharge: z.string().optional(),
  taxPayable: z.string().optional(),
  environmentalSurcharge: z.string().optional(),
  delayInterest: z.string().optional(),

  grossTaxOnTaxableIncome: z.string().optional(),
  taxRebate: z.string().optional(),
  netTaxRebate: z.string().optional(),
  minimumTaxAmount: z.string().optional(),

  // Image 3
  taxDeductedOrCollected: z.string().optional(),
  totalTaxPaidAndAdjusted: z.string().optional(),
  excessPayment: z.string().optional(),
  taxExemptedTaxFreeIncome: z.string().optional(),
  advanceTaxPaidAmount: z.string().optional(),
  adjustmentOfTaxRefund: z.string().optional(),
  taxPaidWithThisReturn: z.string(),
  listOfDocumentsFurnishedWithThisReturn1: z.string().optional(),
  listOfDocumentsFurnishedWithThisReturn2: z.string().optional(),
  fatherOrHusband: z.string(),
  placeOfSignature: z.string().optional(),
  signature: z.string().optional(),
  dateOfSignature: z.date(),

  // Image 4 -
  // govt
  isIncomeFromEmployment: z.nativeEnum(IncomeFromEmployment),
  typeOfEmployment: z.nativeEnum(EmploymentType).nullable(),

  basicPayGovtEmployment: govtPayScaleSchema,
  arrearPayGovtEmployment: govtPayScaleSchema,
  specialAllowanceGovtEmployment: govtPayScaleSchema,
  houseRentAllowanceGovtEmployment: govtPayScaleSchema,
  medicalAllowanceGovtEmployment: govtPayScaleSchema,
  conveyanceAllowanceGovtEmployment: govtPayScaleSchema,
  festivalAllowanceGovtEmployment: govtPayScaleSchema,
  allowanceForSupportStaffGovtEmployment: govtPayScaleSchema,
  leaveAllowanceGovtEmployment: govtPayScaleSchema,
  honorariumRewardGovtEmployment: govtPayScaleSchema,
  overtimeAllowanceGovtEmployment: govtPayScaleSchema,
  banglaNoboborshoAllowancesGovtEmployment: govtPayScaleSchema,
  interestAccruedProvidentFundGovtEmployment: govtPayScaleSchema,
  lumpGrantGovtEmployment: govtPayScaleSchema,
  gratuityGovtEmployment: govtPayScaleSchema,
  otherAllowanceGovtEmployment: govtPayScaleSchema,
  totalGovtEmployment: govtPayScaleSchema,

  // image 3 // private
  basicPayPrivateEmployment: z.string().nullable().optional(),
  allowancesPrivateEmployment: z.string().nullable().optional(),
  advanceArrearSalaryPrivateEmployment: z.string().nullable().optional(),
  gratuityAnnuityPensionOrSimilarBenefitPrivateEmployment: z
    .string()
    .nullable()
    .optional(),
  perquisitesPrivateEmployment: z.string().nullable().optional(),
  receiptInLieuOfOrInAdditionToSalaryOrWagesPrivateEmployment: z
    .string()
    .nullable()
    .optional(),
  incomeFromEmployeeShareSchemePrivateEmployment: z
    .string()
    .nullable()
    .optional(),
  accommodationFacilityPrivateEmployment: z.string().nullable().optional(),
  transportFacilityPrivateEmployment: z.string().nullable().optional(),
  transporFacilityPrivateCheck: z.boolean().optional(),
  tranportFacilityPrivateVehicleCC: z.nativeEnum(TransportCCType).optional(),
  anyOtherFacilityProvidedByEmployerPrivateEmployment: z
    .string()
    .nullable()
    .optional(),
  employerContributionToProvidentFundPrivateEmployment: z
    .string()
    .nullable()
    .optional(),
  otherIncomePrivateEmployment: z.string().nullable().optional(),
  totalSalaryReceivedPrivateEmployment: z.string().nullable().optional(),
  exemptedAmountPrivateEmployment: z.string().nullable().optional(),
  totalIncomeFromSalaryPrivateEmployment: z.string().nullable().optional(),

  // Image 5
  locationDescriptionOwnershipProportionOfProperty: z.string().optional(),

  rentReceivedOrAnnualValue: z.string().optional(),
  advanceRentReceived: z.string().optional(),
  valueOfAnyBenefit: z.string().optional(),
  adjustedAdvanceRent: z.string().optional(),
  vacancyAllowance: z.string().optional(),
  totalRentValue: z.string().optional(),
  repairCollectionProperty: z.nativeEnum(RepairCollection).optional(),
  repairCollectionAmount: z.string().optional(),
  municipalOrLocalTax: z.string().optional(),
  landRevenue: z.string().optional(),
  interestMortgageCapitalCharge: z.string().optional(),
  insurancePremiumPaid: z.string().optional(),
  otherAllowableDeduction: z.string().optional(),
  taxpayersSharePercentage: z.string(),
  taxpayersShareAmount: z.string().nullable().optional(),
  salesTurnoverReceiptAgriculture: z.string().optional(),
  grossProfitFromAgriculture: z.string().optional(),
  generalExpensesSellingExpenses: z.string().optional(),
  totalAdmissibleDeduction: z.string().optional(),
  netIncomeFromRent: z.string().optional(),
  netProfitFromAgriculture: z.string().optional(),

  // image 6
  // 62 inputs
  nameOfBusiness: z.string().optional(),
  natureOfBusiness: z.string().optional(),
  addressOfBusiness: z.string().optional(),

  // summary of income
  salesTurnoverReceipts: z.string().optional(),
  purchase: z.string().optional(),
  grossProfitFromBusiness: z.string().optional(),
  generalAdministrativeSellingExpenses: z.string().optional(),
  badDebtExpense: z.string().optional(),
  netProfitFromBusinessIncome: z.string().optional(),

  // balance sheet
  cashInHandAtBank: z.string().optional(),
  inventories: z.string().optional(),
  fixedAssets: z.string().optional(),
  otherAssets: z.string().optional(),
  totalAssets: z.string().optional(),
  openingCapital: z.string().optional(),
  netProfitFromBusinessBalance: z.string().optional(),
  withdrawalsInTheIncomeYear: z.string().optional(),
  closingCapital: z.string().optional(),
  liabilities: z.string().optional(),
  totalCapitalsAndLiabilities: z.string().optional(),

  incomeFromShareTransferListedCompany: incomeFromCapitalGainsSchema,
  incomeFromCapitalGain2: incomeFromCapitalGainsSchema,
  incomeFromCapitalGain3: incomeFromCapitalGainsSchema,
  incomeFromCapitalGain4: incomeFromCapitalGainsSchema,
  incomeFromCapitalGain5: incomeFromCapitalGainsSchema,
  incomeFromCapitaGainsTotal: incomeFromCapitalGainsSchema,

  interestProfitFromBankFI: incomeItemSchema,
  incomeFromSavingCertificates: incomeItemSchema,
  incomeFromSecuritiesDebentures: incomeItemSchema,
  incomeFromFinancialProductScheme: incomeItemSchema,
  dividendIncome: incomeItemSchema,
  capitalGainFromTransferOfProperty: incomeItemSchema,
  incomeFromBusinessMinTax: incomeItemSchema,
  workersParticipationFund: incomeItemSchema,
  incomeFromOtherSourcesMinTax: incomeItemSchema,
  otherSubjectToMinTax: incomeItemSchema,

  // Image 7
  shonchoyparta: financialAssetsSchema,
  profitFromShoychoyparta2: financialAssetsSchema,
  profitFromShoychoyparta3: financialAssetsSchema,
  profitFromShoychoyparta4: financialAssetsSchema,
  profitFromShoychoyparta5: financialAssetsSchema,
  profitFromShoychoyparta6: financialAssetsSchema,
  profitFromShoychoyparta7: financialAssetsSchema,
  profitFromShoychoyparta8: financialAssetsSchema,
  profitFromShoychoyparta9: financialAssetsSchema,
  profitFromShoychoyparta10: financialAssetsSchema,
  profitFromShoychoypartaTotal: financialAssetsSchema,

  interestFromSecurities: financialAssetsSchema,
  profitInterestFromGovtSecurities2: financialAssetsSchema,
  profitInterestFromGovtSecurities3: financialAssetsSchema,
  profitInterestFromGovtSecurities4: financialAssetsSchema,
  profitInterestFromGovtSecurities5: financialAssetsSchema,
  profitInterestFromGovtSecurities6: financialAssetsSchema,
  profitInterestFromGovtSecurities7: financialAssetsSchema,
  profitInterestFromGovtSecurities8: financialAssetsSchema,
  profitInterestFromGovtSecurities9: financialAssetsSchema,
  profitInterestFromGovtSecurities10: financialAssetsSchema,
  profitInterestFromGovtSecuritiesTotal: financialAssetsSchema,

  // Image 8
  lifeInsurancePremium: z.string().optional(),
  contributionToDeposit: z.string().optional(),
  investmentInGovernmentSecurities: z.string().optional(),
  investmentInSecuritiesStock: z.string().optional(),
  contributionToProvidentFund: z.string().optional(),
  selfAndEmployersContribution: z.string().optional(),
  contributionToSuperAnnuationFund: z.string().optional(),
  contributionToBenevolentFund: z.string().optional(),
  contributionToZakatFundDetails: z.string().optional(),
  contributionToZakatFund: z.string().optional(),
  otherRebatableInvestmentContribution: z.string().optional(),
  amountOfTaxRebate: z.string().optional(),

  totalAllowableInvestmentContribution: z.string().optional(),
  taxOnIncomeFromPoultryHatcheriesFishFarming: z.string().optional(),

  totalIncomeRebateTable: calculationOfRebateAmount,
  totalAllowableInvestmentRebateTable: calculationOfRebateAmount,
  taka1000000: calculationOfRebateAmount,
  applicableRebate: z.string().optional(),

  // Image 9
  expensesForFood: personalExpenseSchema,
  housingExpense: personalExpenseSchema,
  personalTransportationExpenses: personalExpenseSchema,
  utilityExpense: personalExpenseSchema,
  educationExpenses: personalExpenseSchema,
  personalExpenseForLocalForeignTravel: personalExpenseSchema,
  festivalExpense: personalExpenseSchema,
  taxDeductedCollectedAtSource: personalExpenseSchema,
  advanceTaxPaid: personalExpenseSchema,
  taxSurchargePaid: personalExpenseSchema,
  interestPaid: personalExpenseSchema,
  totalExpenseIndividualPerson: personalExpenseSchema,

  // Image 9
  netWealthLastDate: z.nativeEnum(NetWealthLastDate),
  netWealthLastDateAmount: z.string().optional(),
  giftExpense: z.string().optional(),
  institutionalLiabilities: z.string().optional(),
  nonInstitutionalLiabilities: z.string().optional(),
  otherLiabilities: z.string().optional(),
  totalAssetOfBusiness: z.string().optional(),
  lessBusinessLiabilities: z.string().optional(),
  directorsShareholdingCompanyName1: z.string().optional(),
  directorsShareholdingCompanyName2: z.string().optional(),
  directorsShareholdingCompanyName3: z.string().optional(),
  directorsShareholdingNoOfShare1: z.string().optional(),
  directorsShareholdingNoOfShare2: z.string().optional(),
  directorsShareholdingNoOfShare3: z.string().optional(),
  directorsShareholdingCompanyValue1: z.string().optional(),
  directorsShareholdingCompanyValue2: z.string().optional(),
  directorsShareholdingCompanyValue3: z.string().optional(),

  nameOfPartnershipFirm1: z.string().optional(),
  nameOfPartnershipFirm2: z.string().optional(),
  nameOfPartnershipFirm3: z.string().optional(),
  shareOfProfit1: z.string().optional(),
  shareOfProfit2: z.string().optional(),
  shareOfProfit3: z.string().optional(),
  capitalContributed1: z.string().optional(),
  capitalContributed2: z.string().optional(),
  capitalContributed3: z.string().optional(),
  totalIncomeShownInTheReturn: z.string().optional(),
  taxExemptedIncomeAndAllowance: z.string().optional(),
  receiptOfGiftOtherReceipts: z.string().optional(),
  totalSourceOfFund: z.string().optional(),
  sumOfSourceOfFundAndPreviousYearsNetWealth: z.string().optional(),
  expenseRelatingToLifestyle: z.string().optional(),
  totalExpensesAndLoss: z.string().optional(),
  netWealthAtTheLastDateOfThisFinancialYear: z.string().optional(),
  totalLiabilitiesOutsideBusiness: z.string().optional(),
  grossWealth: z.string().optional(),
  businessCapitalAmount1: z.string().optional(),
  directorsShareholdingsInTheCompanies: z.string().optional(),
  businessCapitalOfPartnershipFirm: z.string().optional(),

  // Image 10
  nonAgriculturalPropertyLandHouseProperty: z.string().optional(),

  nonAgriculturalLocationDescription1: z.string().optional(),
  nonAgriculturalLocationDescription2: z.string().optional(),
  nonAgriculturalLocationDescription3: z.string().optional(),
  nonAgriculturalLocationDescription4: z.string().optional(),
  nonAgriculturalLocationDescription5: z.string().optional(),
  nonAgriculturalValue1: z.string().optional(),
  nonAgriculturalValue2: z.string().optional(),
  nonAgriculturalValue3: z.string().optional(),
  nonAgriculturalValue4: z.string().optional(),
  nonAgriculturalValue5: z.string().optional(),

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
  otherInvestmentDesc: z.string().optional(),
  otherInvestmentAmount: z.string().optional(),

  typeOfMotorVehicle1: z.string().optional(),
  typeOfMotorVehicle2: z.string().optional(),
  registrationNumber1: z.string().optional(),
  registrationNumber2: z.string().optional(),
  motorValue1: z.string().optional(),
  motorValue2: z.string().optional(),
  ornamentsDesc: z.string().optional(),
  ornamentsValue: z.string().optional(),
  furnitureAndElectronic: z.string().optional(),
  othersAssetsDesc: z.string().optional(),
  othersAssetsValue: z.string().optional(),
  bankBalance: z.string().optional(),
  cashInHand: z.string().optional(),
  othersDesc: z.string().optional(),
  othersValue: z.string().optional(),
  assetOutsideBangladesh: z.string().optional(),
  agriculturalProperty: z.string().optional(),
  totalFinancialAssets: z.string().optional(),
  motorVehiclesAmount: z.string().optional(),
  totalAssetslocatedInBangladesh: z.string().optional(),
  totalCashInHandsAndFundOutsideBusiness: z.string().optional(),
  totalAssetsInBangladeshAndOutsideBangladesh: z.string().optional(),
  humanVarification: z.string(),

  // Image 11
  totalIncomeShown: z.string().optional(),
  totalTaxPaid: z.string().optional(),
});

export type IndividualTaxReturnFormInput = z.infer<
  typeof individualTaxReturnSchema
>;
