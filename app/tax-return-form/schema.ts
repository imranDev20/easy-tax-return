import dayjs from "dayjs";
import z from "zod";

// Define the Zod schema
export const taxReturnFormSchema = z.object({
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
  minimumTax: z.enum(["DHAKA_/_CHATTOGRAM_CITY_CORPORATION_AREA","OTHER_CITY_CORPORATION_AREA","OTHER_AREA"]),
  netWealthSurcharge: z.enum(["YES", "NO"]),
  environmentalSurcharge: z.string().optional(),
  delayInterest: z.string().optional(),
  calculate: z.string(),
  advanceTaxPaidAmount: z.string().optional(),
  adjustmentOfTaxRefund: z.string().optional(),
  taxPaidWithThisReturn :  z.string(),
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
    repairCollection: z.enum(["COMMERCIAL_PROPERTY",  "NON_-COMMERCIAL", "RESIDENTIAL_PROPERTY", "MIXED_PROPERTY"]).optional(),
    municipalOrLocalTax: z.string().optional(),
    landRevenue: z.string().optional(),
    interestMortgageCapitalCharge: z.string().optional(),
    insurancePremiumPaid: z.string().optional(),
    others: z.string().optional(),
    TaxpayersShare: z.string(),
    taxDeductedSourceFromIncomeRent: z.string().optional(),
    salesTurnoverReceipt: z.string().optional(),
    grossProfit : z.string().optional(),
    generalExpensesSellingExpenses:z.string().optional(),
    nameOfBusiness:z.string().optional(),
    natureOfBusiness:z.string().optional(),
    addressOfBusiness:z.string().optional(),
    salesTurnoverReceipts:z.string().optional(),
    grossProfitAmount:z.string().optional(),
    generalAdministrativeSellingExpenses:z.string().optional(),
    badDebtExpense:z.string().optional(),
    inventories:z.string().optional(),
    fixedAssets:z.string().optional(),
    otherAssets:z.string().optional(),
    openingCapital:z.string().optional(),
    withdrawalsInTheIncomeYear:z.string().optional(),
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


});

export type TaxReturnFormInput = z.infer<typeof taxReturnFormSchema>;
