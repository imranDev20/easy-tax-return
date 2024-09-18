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
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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
import ImageTwelve from "@/public/images/12.png";
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

interface BaseFormField {
  name: keyof IndividualTaxReturnFormInput;
  type: FieldType;
  label: string;
  x: number;
  y: number;
  disabled?: boolean;
  value?: string;
  width: number;
  height: number;
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
  ImageTwelve,
];

const IndividualTaxReturnForm: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    
    formState: { errors, isDirty },
  } = useForm<IndividualTaxReturnFormInput>({
    resolver: zodResolver(individualTaxReturnSchema),
    defaultValues: {
      taxpayerName: "",
      nationalId: "",
      tin: "",
      circle: "",
      zone: "",
      residentialStatus: "RESIDENT",
      specialBenefits: "NONE",
      isParentOfDisabledPerson: undefined,
      dateOfBirth: undefined,
      statementOfIncomeYearEndedOn: undefined,
      spouseName: "",
      spouseTin: "",
      addressLine1: "",
      addressLine2: "",
      telephone: "",
      mobile: "",
      email: "",
      employerName: "",
      businessName: "",
      bin: "",
      partnersInfo: "",
      partnersMembersAssociation1: "",
      partnersMembersAssociation2: "",
      incomeFishFarming: false,
      incomeFishFarmingAmount: "",
      shareOfIncomeFromAOP: "",
      shareOfIncomeFromAOPAmount: "",
      incomeOfMinor: "",
      taxableIncomeFromAbroad: "",
      minimumTax: undefined,
      netWealthSurcharge: undefined,
      taxPayable: "0.00",
      netWealthSurchargeAmount: "",
      environmentalSurcharge: "",
      delayInterest: "",
      calculate: undefined,
      advanceTaxPaidAmount: "",
      adjustmentOfTaxRefund: "",
      taxPaidWithThisReturn: "",
      listOfDocumentsFurnishedWithThisReturn1: "",
      listOfDocumentsFurnishedWithThisReturn2: "",
      fatherOrHusband: "",
      placeOfSignature: "",
      signature: "",
      dateOfSignature: undefined,
      locationDescriptionOwnershipProportionOfProperty: "",
      rentReceivedOrAnnualValue: "",
      advanceRentReceived: "",
      valueOfAnyBenefit: "",
      adjustedAdvanceRent: "",
      vacancyAllowance: "",
      repairCollection: undefined,
      repairCollectionAmount: "",
      municipalOrLocalTax: "",
      landRevenue: "",
      interestMortgageCapitalCharge: "",
      insurancePremiumPaid: "",
      others: "",
      taxpayersShare: "100",
      taxDeductedSourceFromIncomeRent: "",
      salesTurnoverReceipt: "",
      grossProfit: "",
      generalExpensesSellingExpenses: "",
      nameOfBusiness: "",
      natureOfBusiness: "",
      addressOfBusiness: "",
      salesTurnoverReceipts: "",
      grossProfitAmount: "",
      generalAdministrativeSellingExpenses: "",
      badDebtExpense: "",
      inventories: "",
      fixedAssets: "",
      otherAssets: "",
      openingCapital: "",
      withdrawalsInTheIncomeYear: "",
      liabilities: "",
      interestProfitFromBankFIAmount: "",
      interestProfitFromBankFIDeductions: "",
      interestProfitFromBankFITax: "",
      incomeFromSavingCertificatesAmount: "",
      incomeFromSavingCertificatesDeductions: "",
      incomeFromSavingCertificatesTax: "",
      incomeFromSecuritiesDebenturesAmount: "",
      incomeFromSecuritiesDebenturesDeductions: "",
      incomeFromSecuritiesDebenturesTax: "",
      incomeFromFinancialProductSchemeAmount: "",
      incomeFromFinancialProductSchemeDeductions: "",
      incomeFromFinancialProductSchemeTax: "",
      dividendIncomeAmount: "",
      dividendIncomeDeductions: "",
      dividendIncomeTax: "",
      capitalGainFromTransferOfPropertyAmount: "",
      capitalGainFromTransferOfPropertyDeductions: "",
      capitalGainFromTransferOfPropertyTax: "",
      incomeFromBusinessAmount: "",
      incomeFromBusinessDeductions: "",
      incomeFromBusinessTax: "",
      workersParticipationFundAmount: "",
      workersParticipationFundDeductions: "",
      workersParticipationFundTax: "",
      incomeFromOtherSourcesAmount: "",
      incomeFromOtherSourcesDeductions: "",
      incomeFromOtherSourcesTax: "",
      lifeInsurancePremium: "",
      contributionToDeposit: "",
      investmentInGovernmentSecurities1: "",
      investmentInGovernmentSecurities2: "",
      investmentInSecurities: "",
      contributionToProvidentFund: "",
      selfAndEmployersContribution: "",
      contributionToSuperAnnuationFund: "",
      contributionToBenevolentFund: "",
      contributionToZakatFund1: "",
      contributionToZakatFund2: "",
      othersIf1: "",
      othersIf2: "",
      expensesForFoodAmount: "",
      expensesForFoodComment: "",
      housingExpenseAmount: "",
      housingExpenseComment: "",
      personalTransportationExpensesAmount: "",
      personalTransportationExpensesAmountComment: "",
      utilityExpenseAmount: "",
      utilityExpenseComment: "",
      educationExpensesAmount: "",
      educationExpensesComment: "",
      personalExpenseAmount: "",
      personalExpenseComment: "",
      festivalExpenseAmount: "",
      festivalExpenseComment: "",
      taxDeductedAmount: "",
      taxDeductedComment: "",
      advanceTaxPaid2Amount: "",
      advanceTaxPaidComment: "",
      taxSurchargePaidAmount: "",
      taxSurchargePaidComment: "",
      interestPaidAmount: "",
      interestPaidComment: "",
      total: "",
      exemptedIncomeFromSalary: "",
      exemptedIncomeFromBusiness: "",
      exemptedAgriculturalIncome: "",
      incomeFromProvidentFund: "",
      foreignRemittance: "",
      typeOfReceipts1: "",
      typeOfReceipts2: "",
      typeOfReceipts3: "",
      typeOfReceiptsAmount1: "",
      typeOfReceiptsAmount2: "",
      typeOfReceiptsAmount3: "",
      netWealthLastDate: undefined,
      netWealthLastDateAmount: "",
      giftExpense: "",
      institutionalLiabilities: "",
      nonInstitutionalLiabilities: "",
      otherLiabilities: "",
      totalAssetOfBusiness: "",
      lessBusinessLiabilities: "",
      companyName1: "",
      companyName2: "",
      companyName3: "",
      noOfShare1: "",
      noOfShare2: "",
      noOfShare3: "",
      value1: "",
      value2: "",
      value3: "",
      nameOfPartnershipFirm1: "",
      nameOfPartnershipFirm2: "",
      nameOfPartnershipFirm3: "",
      shareOfProfit1: "",
      shareOfProfit2: "",
      shareOfProfit3: "",
      capitalContributed1: "",
      capitalContributed2: "",
      capitalContributed3: "",
      locationDescription1: "",
      locationDescription2: "",
      locationDescription3: "",
      locationDescription4: "",
      locationDescription5: "",
      locationValue1: "",
      locationValue2: "",
      locationValue3: "",
      locationValue4: "",
      locationValue5: "",
      agriculturalLocationAndDescription1: "",
      agriculturalLocationAndDescription2: "",
      agriculturalLocationAndDescription3: "",
      agriculturalLocationValue1: "",
      agriculturalLocationValue2: "",
      agriculturalLocationValue3: "",
      shareDebentureUnitCertificate: "",
      bondsGovernment: "",
      sanchayapatraSavingsCertificate: "",
      depositPensionScheme: "",
      loansGivenToOthers: "",
      name: "",
      nid: "",
      nidValue: "",
      savingDeposit: "",
      providentFund: "",
      otherInvestment1: "",
      otherInvestment2: "",
      typeOfMotorVehicle1: "",
      typeOfMotorVehicle2: "",
      registrationNumber1: "",
      registrationNumber2: "",
      motorValue1: "",
      motorValue2: "",
      ornaments1: "",
      ornaments2: "",
      furnitureAndElectronic: "",
      othersAssets1: "",
      othersAssets2: "",
      bankBalance: "",
      cashInHand: "",
      others1: "",
      others2: "",
      assetOutsideBangladesh: "",
      incomeFromRent: "0.00",
      incomeFromAgriculture: "0.00",
      incomeFromBusiness: "0.00",
      incomeFromBusinessMinimum: "0.00",
      incomeFromCapitalGains: "0.00",
      incomeFromFinancialAssets: "0.00",
      incomeFromOtherSources: "0.00",
      totalIncome: "0.00",
      totalAmountPayable: "0.00",
      taxDeductedOrCollected: "0.00",
      totalTaxPaidAndAdjusted: "0.00",
      excessPayment: "0.00",
      taxExemptedTaxFreeIncome: "0.00",
      totalRentValue: "0.00",
      totalAdmissibleDeduction: "0.00",
      netIncome: "0.00",
      netProfit: "0.00",
      netProfit2: "0.00",
      cashInHandAtBank: "0.00",
      totalAssets: "0.00",
      netProfit3: "0.00",
      closingCpital: "0.00",
      totalCapitalsAndLiabilities: "0.00",
      interestProfitFromBankFINetTaxableIncome: "0.00",
      incomeFromSavingCertificatesNetTaxableIncome: "0.00",
      incomeFromSecuritiesDebenturesNetTaxableIncome: "0.00",
      incomeFromFinancialProductSchemeNetTaxableIncome: "0.00",
      dividendIncomeNetTaxableIncome: "0.00",
      capitalGainFromTransferofPropertyNetTaxableIncome: "0.00",
      incomeFromBusinessNetTaxableIncome: "0.00",
      workersParticinationFundNetTaxableIncome: "0.00",
      incomeFromOtherSourcesNetTaxableIncome: "0.00",
      totalAllowableInvestmentContribution: "0.00",
      taxDeductedCollectedAtSourceAmount: "0.00",
      advanceTaxPaidAmountTaka: "0.00",
      totalAmount: "0.00",
      totalAmount2: "0.00",
      totalAmount3: "0.00",
      taxOnIncomeFromPoultryHatcheriesFishFarming: "",
      typeOfTaxExemptedTaxFreeIncome6: "",
      typeOfTaxExemptedTaxFreeIncome7: "",
      typeOfTaxExemptedTaxFreeIncomeAmount6: "",
      typeOfTaxExemptedTaxFreeIncomeAmount7: "",
      totalIncomeShownInTheReturn: "0.00",
      taxExemptedIncomeAndAllowance: "0.00",
      receiptOfGiftOtherReceipts: "0.00",
      totalSourceOfFund: "0.00",
      sumOfSourceOfFundAndPreviousYearsNetWealth: "0.00",
      expenseRelatingToLifestyle: "0.00",
      totalExpensesAndLoss: "0.00",
      netWealthAtTheLastDateOfThisFinancialYear: "0.00",
      totalLiabilitiesOutsideBusiness: "0.00",
      grossWealth: "0.00",
      businessCapitalAmount1: "0.00",
      businessCapitalAmount2: "0.00",
      directorsShareholdingsInTheCompanies: "0.00",
      businessCapitalOfPartnershipFirm: "0.00",
      nonAgriculturalPropertyLandHouseProperty: "0.00",
      agriculturalProperty: "0.00",
      totalFinancialAssets: "0.00",
      motorVehiclesAmount: "0.00",
      totalAssetslocatedInBangladesh: "0.00",
      totalCashInHandsAndFundOutsideBusiness:"0.00",
      totalAssetsInBangladeshAndOutsideBangladesh: "0.00",
      totalIncomeShown: "",
      totalTaxPaid: "",
    },
  });
  console.log(getValues().incomeFromRent);
  // console.log(watch("taxpayerName"));

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "netWealthSurcharge") {
        if (value.netWealthSurcharge === "YES") {
          setValue("netWealthSurchargeAmount", "0.00")
        } else {
          setValue("netWealthSurchargeAmount", undefined)
        }
      }
      if(name === "repairCollection") {
        if(value.repairCollection) {
          setValue("repairCollectionAmount", "0.00")
        } else {
          setValue("repairCollectionAmount", undefined)
        }
      }
      if(name === "netWealthLastDate") {
        if(value.netWealthLastDate === "NO_I_AM_A_NEW_TAXPAYER") {
          setValue("netWealthLastDateAmount", "0.00")
        } else {
          setValue("netWealthLastDateAmount", "")
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, setValue])
  const formFields: FormField[] = [
    {
      name: "taxpayerName",
      type: "text",
      label: "Tax payer name",
      x: 341,
      y: 275,
      width: 594,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "taxpayerName",
      type: "text",
      label: "Tax payer name",
      x: 92,
      y: 112,
      disabled: true,
      width: 570,
      height: 22,
      imageIndex: 1,
    },
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
    },
    {
      name: "nationalId",
      type: "text",
      label: "National ID No / Passport No.",
      x: 538,
      y: 306,
      width: 397,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "tin",
      type: "text",
      label: "TIN",

      x: 538,
      y: 337,
      width: 397,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "tin",
      type: "text",
      label: "TIN",
      disabled: true,
      x: 668,
      y: 113,
      width: 265,
      height: 20,
      imageIndex: 1,
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
    },
    {
      name: "circle",
      type: "text",
      label: "Circle",

      x: 252,
      y: 367,
      width: 285,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "zone",
      type: "text",
      label: "Zone",

      x: 685,
      y: 367,
      width: 250,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "residentialStatus",
      type: "radio",
      label: "Choose an option",
      options: [
        {
          label: "Option 1",
          value: "RESIDENT",
          x: 712,
          y: 416,
          width: 45,
          height: 32,
        },
        {
          label: "Option 2",
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
    },
    {
      name: "specialBenefits",
      type: "radio",
      label: "Choose an option",
      options: [
        {
          label: "Option 1",
          value: "GAZETTED_WAR_WOUNDED_FREEDOM_FIGHTER",
          x: 490,
          y: 470,
          width: 49,
          height: 35,
        },
        {
          label: "Option 2",
          value: "FEMALE",
          x: 888,
          y: 470,
          width: 49,
          height: 35,
        },
        {
          label: "Option 3",
          value: "THIRD_GENDER",
          x: 490,
          y: 505,
          width: 49,
          height: 35,
        },
        {
          label: "Option 4",
          value: "DISABLED_PERSON",
          x: 888,
          y: 505,
          width: 49,
          height: 35,
        },

        {
          label: "Option 5",
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
    },
    {
      name: "isParentOfDisabledPerson",
      type: "radio",
      label: "Choose an option",
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
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "Date of Birth",

      x: 538,
      y: 475,
      width: 397,
      height: 29,
      imageIndex: 0,
      dayPosition: { x: 150, y: 620, width: 60, height: 29 },
      monthPosition: { x: 220, y: 620, width: 60, height: 29 },
      yearPosition: { x: 290, y: 620, width: 100, height: 29 },
    },
    {
      name: "spouseName",
      type: "text",
      label: "spouse name",

      x: 650,
      y: 577,
      width: 287,
      height: 34,
      imageIndex: 0,
    },
    {
      name: "spouseTin",
      type: "text",
      label: "Spouse Tin",

      x: 650,
      y: 612,
      width: 287,
      height: 39,
      imageIndex: 0,
    },
    {
      name: "addressLine1",
      type: "text",
      label: "addressLine1",

      x: 223,
      y: 651,
      width: 712,
      height: 32,
      imageIndex: 0,
    },
    {
      name: "addressLine2",
      type: "text",
      label: "addressLine2",

      x: 223,
      y: 682,
      width: 712,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "telephone",
      type: "text",
      label: "Telephone",
      x: 130,
      y: 732,
      width: 267,
      height: 31,
      imageIndex: 0,
    },
    {
      name: "mobile",
      type: "text",
      label: "Mobile",
      x: 396,
      y: 732,
      width: 281,
      height: 31,
      imageIndex: 0,
    },
    {
      name: "email",
      type: "email",
      label: "Email",

      x: 678,
      y: 731,
      width: 259,
      height: 31,
      imageIndex: 0,
    },
    {
      name: "employerName",
      type: "text",
      label: "Employer Name",

      x: 130,
      y: 782,
      width: 805,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "businessName",
      type: "text",
      label: "Business Name",

      x: 488,
      y: 812,
      width: 449,
      height: 31,
      imageIndex: 0,
    },
    {
      name: "bin",
      type: "text",
      label: "BIN",
      x: 488,
      y: 843,
      width: 449,
      height: 31,
      imageIndex: 0,
    },
    {
      name: "partnersMembersAssociation1",
      type: "text",
      label: "Partner Name",
      x: 130,
      y: 893,
      width: 807,
      height: 30,
      imageIndex: 0,
    },
    {
      name: "partnersMembersAssociation2",
      type: "text",
      label: "Partner Name",
      x: 130,
      y: 923,
      width: 807,
      height: 30,
      imageIndex: 0,
    },

    {
      name: "statementOfIncomeYearEndedOn",
      type: "date",
      label: "statementOfIncomeYearEndedOn",

      x: 100,
      y: 100,
      width: 397,
      height: 29,
      imageIndex: 1,
      dayPosition: { x: 720, y: 40, width: 60, height: 29 },
      monthPosition: { x: 785, y: 40, width: 60, height: 29 },
      yearPosition: { x: 850, y: 40, width: 100, height: 29 },
    },
    {
      name: "incomeFishFarming",
      type: "checkbox",
      label: "",
      x: 720,
      y: 280,
      width: 1000,
      height: 1000,
      imageIndex: 1,
    },
    {
      name: "incomeFishFarmingAmount",
      type: "text",
      label: "Fish farming amount",
      disabled: watch("incomeFishFarming") ? false : true,
      x: 772,
      y: 263,
      width: 166,
      height: 33,
      imageIndex: 1,
    },
    {
      name: "shareOfIncomeFromAOP",
      type: "text",
      label: "shareOfIncomeFromAOP",

      x: 600,
      y: 450,
      width: 100,
      height: 29,
      imageIndex: 1,
    },
    {
      name: "shareOfIncomeFromAOPAmount",
      type: "text",
      label: "shareOfIncomeFromAOPAmount",

      x: 770,
      y: 450,
      width: 168,
      height: 29,
      imageIndex: 1,
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
    },
    {
      name: "incomeFromRent",
      type: "text",
      label: "incomeFromRent",
      disabled: true,
      x: 774,
      y: 210,
      width: 160,
      height: 25,
      imageIndex: 1,
    },
    {
      name: "incomeFromAgriculture",
      type: "text",
      label: "incomeFromAgriculture",

      disabled: true,
      x: 774,
      y: 238,
      width: 160,
      height: 25,
      imageIndex: 1,
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
    },
    {
      name: "totalIncome",
      type: "text",
      label: "totalIncome",

      disabled: true,
      x: 774,
      y: 538,
      width: 160,
      height: 25,
      imageIndex: 1,
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
    },
    {
      name: "taxPayable",
      type: "text",
      label: "taxPayable",

      disabled: true,
      x: 774,
      y: 740,
      width: 160,
      height: 25,
      imageIndex: 1,
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
    },

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
    },

    {
      name: "advanceTaxPaidAmount",
      type: "text",
      label: "Advance Tax PaidAmount",

      x: 770,
      y: 137,
      width: 170,
      height: 29,
      imageIndex: 2,
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
    },
    {
      name: "totalRentValue",
      type: "text",
      label: "totalRentValue",

      disabled: true,
      x: 845,
      y: 338,
      width: 90,
      height: 20,
      imageIndex: 4,
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
    },
    {
      name: "netProfit",
      type: "text",
      label: "netProfit",

      disabled: true,
      x: 845,
      y: 840,
      width: 90,
      height: 15,
      imageIndex: 4,
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
    },
    {
      name: "rentReceivedOrAnnualValue",
      type: "text",
      label: "rentReceivedOrAnnualValue",

      x: 750,
      y: 227,
      width: 95,
      height: 34,
      imageIndex: 4,
    },
    {
      name: "advanceRentReceived",
      type: "text",
      label: "advanceRentReceived",

      x: 750,
      y: 260,
      width: 95,
      height: 20,
      imageIndex: 4,
    },
    {
      name: "valueOfAnyBenefit",
      type: "text",
      label: "valueOfAnyBenefit",

      x: 750,
      y: 280,
      width: 95,
      height: 20,
      imageIndex: 4,
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
    },
    {
      name: "repairCollection",
      type: "select",
      label: "Choose One",
      placeholder: "Choose One",
      options: REPAIR_COLLECTION_OPTIONS.map((repairCollection) => ({
        label: snakeToNormalText(repairCollection),
        value: repairCollection,
      })),
      x: 640,
      y: 376,
      width: 110,
      height: 20,
      imageIndex: 4,
    },
    {
      name: "repairCollectionAmount",
      label: "repairCollectionAmount",
      type: "text",
      disabled:true,
      x: 751,
      y: 376,
      width: 95,
      height: 20,
      imageIndex: 4,
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
    },
    {
      name: "taxpayersShare",
      type: "text",
      label: "taxpayersShare",

      x: 655,
      y: 546,
      width: 60,
      height: 19,
      imageIndex: 4,
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
    },
    {
      name: "salesTurnoverReceipt",
      type: "text",
      label: "salesTurnoverReceipt",

      x: 844,
      y: 765,
      width: 95,
      height: 20,
      imageIndex: 4,
    },
    {
      name: "grossProfit",
      type: "text",
      label: "grossProfit",

      x: 844,
      y: 785,
      width: 95,
      height: 20,
      imageIndex: 4,
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
    },
    {
      name: "grossProfitAmount",
      type: "text",
      label: "grossProfitAmount",

      x: 703,
      y: 303,
      width: 205,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "generalAdministrativeSellingExpenses",
      type: "text",
      label: "generalAdministrativeSellingExpenses",

      x: 703,
      y: 320,
      width: 205,
      height: 18,
      imageIndex: 5,
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
    },
    {
      name: "netProfit2",
      type: "text",
      label: "netProfit2",

      disabled: true,
      x: 702,
      y: 358,
      width: 205,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "cashInHandAtBank",
      type: "text",
      label: "cashInHandAtBank",

      disabled: true,
      x: 702,
      y: 425,
      width: 200,
      height: 15,
      imageIndex: 5,
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
    },
    {
      name: "netProfit3",
      type: "text",
      label: "netProfit3",

      disabled: true,
      x: 702,
      y: 530,
      width: 200,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "closingCpital",
      type: "text",
      label: "closingCpital",

      disabled: true,
      x: 702,
      y: 565,
      width: 200,
      height: 15,
      imageIndex: 5,
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
    },
    {
      name: "interestProfitFromBankFINetTaxableIncome",
      type: "text",
      label: "interestProfitFromBankFINetTaxableIncome",

      disabled: true,
      x: 720,
      y: 732,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "incomeFromSavingCertificatesNetTaxableIncome",
      type: "text",
      label: "incomeFromSavingCertificatesNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 750,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "incomeFromSavingCertificatesNetTaxableIncome",
      type: "text",
      label: "incomeFromSavingCertificatesNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 768,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "incomeFromFinancialProductSchemeNetTaxableIncome",
      type: "text",
      label: "incomeFromFinancialProductSchemeNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 785,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "dividendIncomeNetTaxableIncome",
      type: "text",
      label: "dividendIncomeNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 803,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "capitalGainFromTransferofPropertyNetTaxableIncome",
      type: "text",
      label: "capitalGainFromTransferofPropertyNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 820,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "incomeFromBusinessNetTaxableIncome",
      type: "text",
      label: "incomeFromBusinessNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 840,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "workersParticinationFundNetTaxableIncome",
      type: "text",
      label: "workersParticinationFundNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 856,
      width: 105,
      height: 15,
      imageIndex: 5,
    },
    {
      name: "incomeFromOtherSourcesNetTaxableIncome",
      type: "text",
      label: "incomeFromOtherSourcesNetTaxableIncome",

      disabled: true,
      x: 720,
      y: 875,
      width: 105,
      height: 15,
      imageIndex: 5,
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
    },
    {
      name: "interestProfitFromBankFIAmount",
      type: "text",
      label: "interestProfitFromBankFIAmount",

      x: 490,
      y: 730,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromSavingCertificatesAmount",
      type: "text",
      label: "incomeFromSavingCertificatesAmount",

      x: 490,
      y: 750,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromSecuritiesDebenturesAmount",
      type: "text",
      label: "incomeFromSecuritiesDebenturesAmount",

      x: 490,
      y: 765,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromFinancialProductSchemeAmount",
      type: "text",
      label: "incomeFromFinancialProductSchemeAmount",

      x: 490,
      y: 785,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "dividendIncomeAmount",
      type: "text",
      label: "dividendIncomeAmount",

      x: 490,
      y: 800,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "capitalGainFromTransferOfPropertyAmount",
      type: "text",
      label: "capitalGainFromTransferOfPropertyAmount",

      x: 490,
      y: 820,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromBusinessAmount",
      type: "text",
      label: "incomeFromBusinessAmount",

      x: 490,
      y: 838,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "workersParticipationFundAmount",
      type: "text",
      label: "workersParticipationFundAmount",

      x: 490,
      y: 856,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromOtherSourcesAmount",
      type: "text",
      label: "incomeFromOtherSourcesAmount",

      x: 490,
      y: 873,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "interestProfitFromBankFIDeductions",
      type: "text",
      label: "interestProfitFromBankFIDeductions",

      x: 605,
      y: 730,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromSavingCertificatesDeductions",
      type: "text",
      label: "incomeFromSavingCertificatesDeductions",

      x: 605,
      y: 748,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromSecuritiesDebenturesDeductions",
      type: "text",
      label: "incomeFromSecuritiesDebenturesDeductions",

      x: 605,
      y: 766,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromFinancialProductSchemeDeductions",
      type: "text",
      label: "incomeFromFinancialProductSchemeDeductions",

      x: 605,
      y: 784,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "dividendIncomeDeductions",
      type: "text",
      label: "dividendIncomeDeductions",

      x: 605,
      y: 802,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "capitalGainFromTransferOfPropertyDeductions",
      type: "text",
      label: "capitalGainFromTransferOfPropertyDeductions",

      x: 605,
      y: 820,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromBusinessDeductions",
      type: "text",
      label: "incomeFromBusinessDeductions",

      x: 605,
      y: 838,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "workersParticipationFundDeductions",
      type: "text",
      label: "workersParticipationFundDeductions",

      x: 605,
      y: 856,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromOtherSourcesDeductions",
      type: "text",
      label: "incomeFromOtherSourcesDeductions",

      x: 605,
      y: 872,
      width: 115,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "interestProfitFromBankFITax",
      type: "text",
      label: "interestProfitFromBankFITax",

      x: 828,
      y: 730,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromSavingCertificatesTax",
      type: "text",
      label: "incomeFromSavingCertificatesTax",

      x: 828,
      y: 748,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromSecuritiesDebenturesTax",
      type: "text",
      label: "incomeFromSecuritiesDebenturesTax",

      x: 828,
      y: 766,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromFinancialProductSchemeTax",
      type: "text",
      label: "incomeFromFinancialProductSchemeTax",

      x: 828,
      y: 784,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "dividendIncomeTax",
      type: "text",
      label: "dividendIncomeTax",

      x: 828,
      y: 800,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "capitalGainFromTransferOfPropertyTax",
      type: "text",
      label: "capitalGainFromTransferOfPropertyTax",

      x: 828,
      y: 820,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromBusinessTax",
      type: "text",
      label: "incomeFromBusinessTax",

      x: 828,
      y: 838,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "workersParticipationFundTax",
      type: "text",
      label: "workersParticipationFundTax",

      x: 828,
      y: 856,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
    {
      name: "incomeFromOtherSourcesTax",
      type: "text",
      label: "incomeFromOtherSourcesTax",

      x: 828,
      y: 874,
      width: 112,
      height: 18,
      imageIndex: 5,
    },
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
    },
    {
      name: "investmentInGovernmentSecurities1",
      type: "text",
      label: "investmentInGovernmentSecurities1",

      x: 490,
      y: 248,
      width: 305,
      height: 18,
      imageIndex: 6,
    },
    {
      name: "investmentInGovernmentSecurities2",
      type: "text",
      label: "investmentInGovernmentSecurities2",

      x: 795,
      y: 232,
      width: 145,
      height: 35,
      imageIndex: 6,
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
    },
    {
      name: "contributionToZakatFund1",
      type: "text",
      label: "contributionToZakatFund1",

      x: 380,
      y: 364,
      width: 415,
      height: 20,
      imageIndex: 6,
    },

    {
      name: "contributionToZakatFund2",
      type: "text",
      label: "contributionToZakatFund2",

      x: 795,
      y: 364,
      width: 145,
      height: 20,
      imageIndex: 6,
    },
    {
      name: "othersIf1",
      type: "text",
      label: "othersIf1",

      x: 395,
      y: 382,
      width: 400,
      height: 20,
      imageIndex: 6,
    },

    {
      name: "othersIf2",
      type: "text",
      label: "othersIf2",

      x: 795,
      y: 382,
      width: 145,
      height: 20,
      imageIndex: 6,
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
    },
    {
      name: "taxOnIncomeFromPoultryHatcheriesFishFarming",
      type: "text",
      label: "taxOnIncomeFromPoultryHatcheriesFishFarming",
      disabled: true,
      x: 735,
      y: 915,
      width: 200,
      height: 18,
      imageIndex: 6,
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
    },
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
    },
    {
      name: "expensesForFoodAmount",
      type: "text",
      label: "expensesForFoodAmount",

      x: 598,
      y: 205,
      width: 135,
      height: 20,
      imageIndex: 7,
    },
    {
      name: "taxDeductedCollectedAtSourceAmount",
      type: "text",
      label: "taxDeductedCollectedAtSourceAmount",

      disabled: true,
      x: 598,
      y: 360,
      width: 135,
      height: 30,
      imageIndex: 7,
    },
    {
      name: "advanceTaxPaidAmountTaka",
      type: "text",
      label: "advanceTaxPaidAmountTaka",

      disabled: true,
      x: 598,
      y: 395,
      width: 135,
      height: 18,
      imageIndex: 7,
    },
    {
      name: "totalAmount",
      type: "text",
      label: "totalAmount",

      disabled: true,
      x: 598,
      y: 478,
      width: 135,
      height: 18,
      imageIndex: 7,
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
    },
    {
      name: "expensesForFoodComment",
      type: "text",
      label: "expensesForFoodComment",

      x: 732,
      y: 205,
      width: 208,
      height: 20,
      imageIndex: 7,
    },
    {
      name: "housingExpenseAmount",
      type: "text",
      label: "housingExpenseAmount",

      x: 598,
      y: 225,
      width: 135,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "housingExpenseComment",
      type: "text",
      label: "housingExpenseComment",

      x: 732,
      y: 225,
      width: 208,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "personalTransportationExpensesAmount",
      type: "text",
      label: "personalTransportationExpensesAmount",

      x: 598,
      y: 242,
      width: 135,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "personalTransportationExpensesAmountComment",
      type: "text",
      label: "personalTransportationExpensesAmountComment",

      x: 732,
      y: 242,
      width: 208,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "utilityExpenseAmount",
      type: "text",
      label: "utilityExpenseAmount",

      x: 598,
      y: 260,
      width: 135,
      height: 32,
      imageIndex: 7,
    },
    {
      name: "signature",
      type: "signature",
      label: "Signature",
      x: 650,
      y: 550,
      width: 500,
      height: 200,
      imageIndex: 7,
    },
    {
      name: "utilityExpenseComment",
      type: "text",
      label: "utilityExpenseComment",

      x: 732,
      y: 260,
      width: 208,
      height: 32,
      imageIndex: 7,
    },
    {
      name: "educationExpensesAmount",
      type: "text",
      label: "educationExpensesAmount",

      x: 598,
      y: 292,
      width: 135,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "educationExpensesComment",
      type: "text",
      label: "educationExpensesComment",

      x: 732,
      y: 292,
      width: 208,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "personalExpenseAmount",
      type: "text",
      label: "personalExpenseAmount",

      x: 598,
      y: 311,
      width: 135,
      height: 32,
      imageIndex: 7,
    },
    {
      name: "personalExpenseComment",
      type: "text",
      label: "personalExpenseComment",

      x: 732,
      y: 311,
      width: 208,
      height: 32,
      imageIndex: 7,
    },
    {
      name: "festivalExpenseAmount",
      type: "text",
      label: "festivalExpenseAmount",

      x: 598,
      y: 345,
      width: 135,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "festivalExpenseComment",
      type: "text",
      label: "festivalExpenseComment",

      x: 732,
      y: 345,
      width: 208,
      height: 17,
      imageIndex: 7,
    },
    {
      name: "taxDeductedComment",
      type: "text",
      label: "taxDeductedComment",

      x: 732,
      y: 360,
      width: 208,
      height: 35,
      imageIndex: 7,
    },
    {
      name: "advanceTaxPaidComment",
      type: "text",
      label: "advanceTaxPaidComment",

      x: 732,
      y: 395,
      width: 208,
      height: 19,
      imageIndex: 7,
    },
    {
      name: "taxSurchargePaidAmount",
      type: "text",
      label: "taxSurchargePaidAmount",

      x: 596,
      y: 412,
      width: 138,
      height: 35,
      imageIndex: 7,
    },
    {
      name: "taxSurchargePaidComment",
      type: "text",
      label: "taxSurchargePaidComment",

      x: 732,
      y: 412,
      width: 208,
      height: 35,
      imageIndex: 7,
    },
    {
      name: "interestPaidAmount",
      type: "text",
      label: "interestPaidAmount",

      x: 596,
      y: 445,
      width: 138,
      height: 35,
      imageIndex: 7,
    },
    {
      name: "interestPaidComment",
      type: "text",
      label: "interestPaidComment",

      x: 732,
      y: 445,
      width: 208,
      height: 35,
      imageIndex: 7,
    },
    {
      name: "total",
      type: "text",
      label: "total",

      x: 732,
      y: 480,
      width: 208,
      height: 19,
      imageIndex: 7,
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
    },
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
    },
    {
      name: "nonAgriculturalPropertyLandHouseProperty",
      type: "text",
      label: "nonAgriculturalPropertyLandHouseProperty",

      disabled: true,
      x: 775,
      y: 85,
      width: 160,
      height: 25,
      imageIndex: 9,
    },
    {
      name: "agriculturalProperty",
      type: "text",
      label: "agriculturalProperty",

      disabled: true,
      x: 775,
      y: 237,
      width: 160,
      height: 16,
      imageIndex: 9,
    },
    {
      name: "totalFinancialAssets",
      type: "text",
      label: "totalFinancialAssets",

      disabled: true,
      x: 775,
      y: 521,
      width: 160,
      height: 16,
      imageIndex: 9,
    },
    {
      name: "motorVehiclesAmount",
      type: "text",
      label: "motorVehiclesAmount",

      disabled: true,
      x: 775,
      y: 538,
      width: 160,
      height: 16,
      imageIndex: 9,
    },
    {
      name: "totalCashInHandsAndFundOutsideBusiness",
      type: "text",
      label: "totalCashInHandsAndFundOutsideBusiness",

      disabled: true,
      x: 775,
      y: 733,
      width: 160,
      height: 16,
      imageIndex: 9,
    },
    {
      name: "totalAssetslocatedInBangladesh",
      type: "text",
      label: "totalAssetslocatedInBangladesh",

      disabled: true,
      x: 775,
      y: 750,
      width: 160,
      height: 16,
      imageIndex: 9,
    },
    {
      name: "totalAssetsInBangladeshAndOutsideBangladesh",
      type: "text",
      label: "totalAssetsInBangladeshAndOutsideBangladesh",

      disabled: true,
      x: 775,
      y: 785,
      width: 160,
      height: 16,
      imageIndex: 9,
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
    },
    {
      name: "locationDescription1",
      type: "text",
      label: "locationDescription1",

      x: 185,
      y: 130,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationDescription2",
      type: "text",
      label: "locationDescription2",

      x: 185,
      y: 148,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationDescription3",
      type: "text",
      label: "locationDescription3",

      x: 185,
      y: 165,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationDescription4",
      type: "text",
      label: "locationDescription4",

      x: 185,
      y: 183,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationDescription5",
      type: "text",
      label: "locationDescription5",

      x: 185,
      y: 202,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationValue1",
      type: "text",
      label: "locationValue1",

      x: 638,
      y: 130,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationValue2",
      type: "text",
      label: "locationValue2",

      x: 638,
      y: 148,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationValue3",
      type: "text",
      label: "locationValue3",

      x: 638,
      y: 166,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationValue4",
      type: "text",
      label: "locationValue4",

      x: 638,
      y: 184,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "locationValue5",
      type: "text",
      label: "locationValue5",

      x: 638,
      y: 202,
      width: 135,
      height: 18,
      imageIndex: 9,
    },

    {
      name: "agriculturalLocationAndDescription1",
      type: "text",
      label: "agriculturalLocationAndDescription1",

      x: 185,
      y: 272,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "agriculturalLocationAndDescription2",
      type: "text",
      label: "agriculturalLocationAndDescription2",

      x: 185,
      y: 290,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "agriculturalLocationAndDescription3",
      type: "text",
      label: "agriculturalLocationAndDescription3",

      x: 185,
      y: 308,
      width: 455,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "agriculturalLocationValue1",
      type: "text",
      label: "agriculturalLocationValue1",

      x: 638,
      y: 272,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "agriculturalLocationValue2",
      type: "text",
      label: "agriculturalLocationValue2",

      x: 638,
      y: 290,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "agriculturalLocationValue3",
      type: "text",
      label: "agriculturalLocationValue3",

      x: 638,
      y: 308,
      width: 135,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "shareDebentureUnitCertificate",
      type: "text",
      label: "shareDebentureUnitCertificate",

      x: 770,
      y: 360,
      width: 170,
      height: 18,
      imageIndex: 9,
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
    },
    {
      name: "otherInvestment1",
      type: "text",
      label: "otherInvestment1",

      x: 370,
      y: 502,
      width: 402,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "otherInvestment2",
      type: "text",
      label: "otherInvestment2",

      x: 770,
      y: 502,
      width: 170,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "typeOfMotorVehicle1",
      type: "text",
      label: "typeOfMotorVehicle1",

      x: 185,
      y: 573,
      width: 225,
      height: 18,
      imageIndex: 9,
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
    },
    {
      name: "registrationNumber1",
      type: "text",
      label: "registrationNumber1",

      x: 410,
      y: 573,
      width: 215,
      height: 18,
      imageIndex: 9,
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
    },
    {
      name: "ornaments1",
      type: "text",
      label: "ornaments1",

      x: 420,
      y: 610,
      width: 355,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "ornaments2",
      type: "text",
      label: "ornaments2",

      x: 770,
      y: 610,
      width: 170,
      height: 18,
      imageIndex: 9,
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
    },
    {
      name: "othersAssets2",
      type: "text",
      label: "othersAssets2",

      x: 770,
      y: 645,
      width: 170,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "othersAssets1",
      type: "text",
      label: "othersAssets1",

      x: 550,
      y: 645,
      width: 220,
      height: 18,
      imageIndex: 9,
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
    },
    {
      name: "others2",
      type: "text",
      label: "others2",

      x: 620,
      y: 715,
      width: 155,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "others1",
      type: "text",
      label: "others1",

      x: 300,
      y: 715,
      width: 320,
      height: 18,
      imageIndex: 9,
    },
    {
      name: "assetOutsideBangladesh",
      type: "text",
      label: "assetOutsideBangladesh",

      x: 770,
      y: 768,
      width: 170,
      height: 18,
      imageIndex: 9,
    },
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
    },
    {
      name: "nid",
      type: "text",
      label: "nid",

      disabled: true,
      x: 555,
      y: 430,
      width: 335,
      height: 16,
      imageIndex: 10,
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
    },
    {
      name: "circle",
      type: "text",
      label: "circle",

      disabled: true,
      x: 170,
      y: 520,
      width: 225,
      height: 16,
      imageIndex: 10,
    },
    {
      name: "zone",
      type: "text",
      label: "zone",

      disabled: true,
      x: 555,
      y: 520,
      width: 330,
      height: 16,
      imageIndex: 10,
    },
    {
      name: "totalIncomeShown",
      type: "text",
      label: "totalIncomeShown",

      disabled: true,
      x: 410,
      y: 565,
      width: 300,
      height: 16,
      imageIndex: 10,
    },
    {
      name: "totalTaxPaid",
      type: "text",
      label: "totalTaxPaid",

      disabled: true,
      x: 410,
      y: 610,
      width: 300,
      height: 16,
      imageIndex: 10,
    },
  ];
  console.log(`errors`, errors);
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && imageRefs.current[0]) {
        const containerWidth = containerRef.current.offsetWidth;
        const imageWidth = imageRefs.current[0].offsetWidth;
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
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<IndividualTaxReturnFormInput> = (data) => {
    console.log(data);
    // Handle form submission
    startTransition(async () => {
      try {
        const createData = {
          ...data,
          userId: "xyz123456",
        };
        const result = await createIndividualTaxReturn(createData);
        const response = await createPayment(createData.total ?? "50", createData.userId);
  
        // Check if the response is an error before accessing bkashURL
        if (response instanceof Error) {
          throw response; // Handle the error case
        }
  
        // Navigate to the response URL if available
        if (response.bkashURL) {
          window.location.href = response.bkashURL; // Fixed: Assigning URL to window.location.href
        }
  
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

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Controller
            name={field.name}
            control={control}           
            render={({ field: { onChange, value } }) => (
              <div style={fieldStyle} className="relative overflow-hidden">
                <input
                  // bind the value to the form state
                  onChange={onChange}  
                  value= {value as string}// bind the onChange handler
                  type={field.type}
                  className={`w-full h-full absolute border px-2 ${!field.disabled ? "border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500" : " bg-[#F5F5F5] font-bold text-[#948C91]"}  `}
                  style={{ fontSize: `${14 * scale}px` }}
                  disabled={field.disabled}
                />
        
                {/* Conditional rendering for the required indicator */}
                {isRequired && !field.disabled && (
                  <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
                    <span className="absolute text-white top-[23px] left-[17px] text-lg">
                      *
                    </span>
                  </span>
                )}
              </div>
            )}
          />
        );
      case "checkbox":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <input {...register(field.name)} type="checkbox" className="mr-2" />
            <label>{field.label}</label>
          </div>
        );
      case "radio":
        return (
          <RadioGroup
            control={control}
            name={field.name}
            options={field.options}
            scale={scale}
            required={isRequired}
          />
        );
      case "select":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name}
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
                />
              )}
            />
          </div>
        );

      case "date":
        return (
          <Controller
            name={field.name}
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

      case "signature":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SignatureField onChange={onChange} />
              )}
            />
          </div>
        );
      case "textarea":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <textarea
              {...register(field.name)}
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
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Save PDF
                    </Button>
                  </div>
                </div>
              </div>
            </form>
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
