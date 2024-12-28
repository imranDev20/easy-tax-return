import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import SectionSubtitle from "@/components/custom/section-subtitle";
import SectionTitle from "@/components/custom/section-title";

interface ServiceItem {
  title: string;
  description: string;
  bgColor: string;
  checkColor: string;
  items: string[];
}

const incomeTaxServiceData: ServiceItem[] = [
  {
    title: "Tax Planning and Strategy",
    description:
      "Minimize tax liabilities while ensuring compliance with laws.",
    bgColor: "bg-blue-50",
    checkColor: "text-blue-600",
    items: [
      "Tax-efficient structuring of business operations",
      "Deductions and credits maximization",
      "Timing of income and expenses",
    ],
  },
  {
    title: "Tax Compliance",
    description: "Ensure timely and accurate filing of tax returns.",
    bgColor: "bg-purple-50",
    checkColor: "text-purple-600",
    items: [
      "Preparation and filing of corporate tax returns, Withholding tax return and others relevant return",
      "Deductions and credits maximization",
      "Timing of income and expenses",
    ],
  },
  {
    title: "Tax Advisory",
    description: "Provide ongoing advice to adapt to changing tax laws.",
    bgColor: "bg-indigo-50",
    checkColor: "text-indigo-600",
    items: [
      "Guidance on mergers, acquisitions, and other business transactions",
      "Advice on international taxation if your business operates globally",
      "Risk management related to tax matters",
    ],
  },
];

const wealthManagementData: ServiceItem[] = [
  {
    title: "Investment Management",
    description: "Strategic portfolio management and investment guidance.",
    bgColor: "bg-amber-50",
    checkColor: "text-amber-600",
    items: [
      "Portfolio diversification and asset allocation",
      "Regular monitoring and rebalancing of investments",
      "Risk management strategies",
    ],
  },
  {
    title: "Financial Planning",
    description: "Comprehensive financial planning for your future.",
    bgColor: "bg-rose-50",
    checkColor: "text-rose-600",
    items: [
      "Setting short-term and long-term financial goals",
      "Retirement planning and savings optimization",
      "Budgeting and cash flow management",
    ],
  },
  {
    title: "Tax Optimization",
    description: "Strategic tax planning to maximize your wealth.",
    bgColor: "bg-violet-50",
    checkColor: "text-violet-600",
    items: [
      "Tax-efficient investment strategies",
      "Minimizing tax liabilities through deductions, credits, and deferrments",
    ],
  },
  {
    title: "Estate and Succession Planning",
    description: "Secure your legacy and family's financial future.",
    bgColor: "bg-teal-50",
    checkColor: "text-teal-600",
    items: [
      "Creating wills and trusts",
      "Ensuring smooth intergenerational wealth transfer",
      "Minimizing estate taxes",
    ],
  },
  {
    title: "Risk Management and Insurance",
    description: "Protect your assets and financial security.",
    bgColor: "bg-fuchsia-50",
    checkColor: "text-fuchsia-600",
    items: [
      "Identifying risks to financial assets",
      "Recommending insurance policies (life, property, and health)",
    ],
  },
  {
    title: "Alternative Investments",
    description: "Diversify your portfolio with alternative assets.",
    bgColor: "bg-lime-50",
    checkColor: "text-lime-600",
    items: [
      "Exposure to non-traditional investments like real estate, private equity, or hedge funds",
      "Assessing risk-reward dynamics of alternative assets",
    ],
  },
];

const vatServiceData: ServiceItem[] = [
  {
    title: "VAT Registration",
    description: "To legally collect and remit VAT.",
    bgColor: "bg-emerald-50",
    checkColor: "text-emerald-600",
    items: [
      "Assessing whether your business needs to register for VAT",
      "Completing and submitting VAT registration applications",
      "Handling registration for multiple jurisdictions, if necessary",
    ],
  },
  {
    title: "VAT Compliance",
    description:
      "To ensure that all VAT obligations are met accurately and on time.",
    bgColor: "bg-cyan-50",
    checkColor: "text-cyan-600",
    items: [
      "Preparation and submission of VAT returns",
      "Ensuring correct VAT rates are applied to transactions",
      "Maintaining accurate records of VAT invoices and receipts",
      "Managing VAT payments and reclaiming VAT on expenses",
    ],
  },
  {
    title: "Tax Advisory",
    description: "Provide ongoing advice to adapt to changing tax laws.",
    bgColor: "bg-sky-50",
    checkColor: "text-sky-600",
    items: [
      "Guidance on mergers, acquisitions, and other business transactions",
      "Advice on international taxation if your business operates globally",
      "Risk management related to tax matters",
    ],
  },
];

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  className = "",
}) => (
  <Card
    className={`text-left shadow-none ${service.bgColor} ${className} transition-all duration-300 hover:shadow-lg`}
  >
    <CardHeader>
      <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <ul className="space-y-2">
        {service.items.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start">
            <CheckIcon
              className={`h-5 w-5 ${service.checkColor} mr-2 mt-1 flex-shrink-0`}
            />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="w-full py-12">
      <div className="text-center container max-w-7xl mx-auto px-4">
        <SectionSubtitle subtitle="Our Services" />

        <div id="company-income-tax">
          <SectionTitle title="Company Income Tax Services" />
          <p className="text-gray-600 mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            If you&apos;re looking for company income tax services, here are
            some key aspects to consider
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {incomeTaxServiceData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        <div id="vat-related-services">
          <SectionTitle title="VAT Related Services" />
          <p className="text-gray-600 mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            VAT (Value Added Tax) services are crucial for businesses to ensure
            compliance, optimize tax efficiency, and avoid penalties.
            Here&apos;s a breakdown of key VAT-related services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vatServiceData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        <div id="wealth-management" className="mt-16">
          <SectionTitle title="Personal Wealth/Assets Management Service" />
          <p className="text-gray-600 mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            Comprehensive wealth management services to help you grow, protect,
            and optimize your financial assets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wealthManagementData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
