"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, ArrowRight, Receipt } from "lucide-react";
import Link from "next/link";

type PaymentMethod =
  | "BKASH"
  | "NAGAD"
  | "UPAY"
  | "SURECASH"
  | "MKASH"
  | "ROCKET"
  | "BANK_TRANSFER";
type PaymentStatus = "PENDING" | "PAID" | "FAILED";

// Mock data for submitted tax returns
const submittedReturns = [
  {
    id: "return1",
    tin: "123456789012",
    assessmentYear: "2023-2024",
    submittedDate: new Date("2023-12-20"),
    paymentMethod: "BKASH" as PaymentMethod,
    paymentStatus: "PAID" as PaymentStatus,
    transactionId: "BKH123456789",
  },
  {
    id: "return2",
    tin: "987654321098",
    assessmentYear: "2023-2024",
    submittedDate: new Date("2023-12-15"),
    paymentMethod: "NAGAD" as PaymentMethod,
    paymentStatus: "PENDING" as PaymentStatus,
    transactionId: "NGD987654321",
  },
  {
    id: "return3",
    tin: "456789012345",
    assessmentYear: "2022-2023",
    submittedDate: new Date("2023-11-28"),
    paymentMethod: "ROCKET" as PaymentMethod,
    paymentStatus: "PAID" as PaymentStatus,
    transactionId: "RKT456789012",
  },
];

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "PAID":
      return "bg-green-500";
    case "PENDING":
      return "bg-yellow-500";
    case "FAILED":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const formatPaymentMethod = (method: PaymentMethod) => {
  return (
    method.charAt(0).toUpperCase() +
    method.slice(1).toLowerCase().replace("_", " ")
  );
};

export default function UserSubmittedTaxReturnsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Submitted Tax Returns
        </h1>
        <Button asChild>
          <Link href="/tax-return/new">Start New Return</Link>
        </Button>
      </div>

      {submittedReturns.length === 0 ? (
        <Card className="bg-muted">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground mb-2">
              No submitted returns found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Submit a tax return to see it here
            </p>
            <Button asChild>
              <Link href="/tax-return/new">Start New Return</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submittedReturns.map((taxReturn) => (
            <Link
              href={`/tax-return/submitted/${taxReturn.id}`}
              key={taxReturn.id}
              className="block group"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <span>TIN: {taxReturn.tin}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Assessment Year: {taxReturn.assessmentYear}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-muted-foreground">
                          {formatPaymentMethod(taxReturn.paymentMethod)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({taxReturn.transactionId})
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getPaymentStatusColor(
                            taxReturn.paymentStatus
                          )}`}
                        />
                        <span className="text-sm capitalize">
                          {taxReturn.paymentStatus.toLowerCase()}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Submitted on: {formatDate(taxReturn.submittedDate)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
