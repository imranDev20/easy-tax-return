import dayjs from "dayjs";
import z from "zod";

// Define the Zod schema
export const individualTaxReturnSchema = z.object({
  taxpayerName: z.string().min(1, "Name is required"),
  nationalId: z.string().min(1, "National ID or Passport number is required"),
  tin: z.string().min(1, "TIN is required"),
  circle: z.string().min(1, "Circle is required"),
  zone: z.string().min(1, "Zone is required"),
  residentialStatus: z.enum(["Resident", "Non-resident"]),

  specialBenefits: z
    .enum([
      "None",
      "GazettedWarWoundedFreedomFighter",
      "Female",
      "ThirdGender",
      "DisabledPerson",
      "Aged65OrMore",
    ])
    .optional(),

  isParentOfDisabledPerson: z.boolean().optional(),
  dateOfBirth: z
    .string()
    .refine((date) => dayjs(date, "DD-MM-YYYY", true).isValid(), {
      message: "Invalid date format. Use DD-MM-YYYY",
    }),

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

  specialFarmingIncome: z.boolean(),

  partnersMembersAssociation1: z.string().optional(),
  partnersMembersAssociation2: z.string().optional(),
  incomeYearEndedOn: z.string().date().optional(),
  incomeFishFarming: z.boolean().optional(),
  incomeFishFarmingAmount: z.string().optional(),
  shareOfIncomeFromAOP: z.string().optional(),
  incomeOfMinor: z.string().optional(),
  taxableIncomeFromAbroad: z.string().optional(),
  minimumTax: z.enum([
    "Dhaka/ChattogramCityCorporationArea",
    "OtherCityCorporationArea",
    "OtherArea",
  ]),
  netWealthSurcharge: z.enum(["Yes", "No"]),
  environmentalSurcharge: z.string().optional(),
  delayInterest: z.string().optional(),
  calculate: z.enum(["Calculate", "Re-Calculate"]),
  advanceTaxPaidAmount: z.string().optional(),
  adjustmentOfTaxRefund: z.string().optional(),
  taxPaidWithThisReturn: z.string(),
  listOfDocumentsFurnishedWithThisReturn1: z.string().optional(),
  listOfDocumentsFurnishedWithThisReturn2: z.string().optional(),
  fatherOrHusband: z.string(),
  placeOfSignature: z.string().optional(),
  signature: z.string().optional(),
  dateOfSignature: z
    .string()
    .refine((date) => dayjs(date, "DD-MM-YYYY", true).isValid(), {
      message: "Invalid date format. Use DD-MM-YYYY",
    }),
  incomeFromEmployment: z.enum(["YES", "NO"]),
  privateOrganization: z.string(),
  government: z.string(),
  taxDeductedSourceIncomeFromEmployment: z.string(),

  locationDescriptionOwnershipProportionOfProperty: z.string().optional(),
  rentReceivedOrAnnualValue: z.string().optional(),
  advanceRentReceived: z.string().optional(),
  valueOfAnyBenefit: z.string().optional(),
  adjustedAdvanceRent: z.string().optional(),
  vacancyAllowance: z.string().optional(),
  repairCollection: z
    .enum([
      "Commercial property",
      "Non-commercial",
      "Residential property",
      "Mixed property",
    ])
    .optional(),
  municipalOrLocalTax: z.string().optional(),
  landRevenue: z.string().optional(),
  interestMortgageCapitalCharge: z.string().optional(),
  insurancePremiumPaid: z.string().optional(),
  others: z.string().optional(),
  TaxpayersShare: z.string(),
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

  SelfAndEmployersContribution: z.string().optional(),

  contributionToSuperAnnuationFund: z.string().optional(),

  contributionToBenevolentFund: z.string().optional(),

  contributionToZakatFund1: z.string().optional(),
  contributionToZakatFund2: z.string().optional(),

  OthersIf1: z.string().optional(),
  OthersIf2: z.string().optional(),

  ExpensesForFoodAmount: z.string().optional(),
  ExpensesForFoodComment: z.string().optional(),

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
  netWealthLastDate: z.enum(["YES", "NO_I_AM_A_NEW_TAXPAYER"]),

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
});

export type IndividualTaxReturnFormInput = z.infer<
  typeof individualTaxReturnSchema
>;
