"use client";

import React from "react";
import { ContentLayout } from "../../_components/content-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PaymentStatus } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Loader2, User, Mail, Phone, CreditCard } from "lucide-react";
import { PAYMENT_STATUS_OPTIONS } from "@/lib/constants";
import DynamicBreadcrumb from "../../_components/dynamic-breadcrumb";

const paymentMethodColors = {
  BKASH: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-100",
  NAGAD: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
  ROCKET: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  UPAY: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  BANK_TRANSFER:
    "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  OTHERS: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
} as const;

export default function AdminOrderDetailsPage() {
  const [paymentStatus, setPaymentStatus] =
    React.useState<PaymentStatus>("PENDING");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState("TXN123456");
  const [isSaving, setIsSaving] = React.useState(false);

  // Mock data - replace with actual data fetching
  const orderDetails = {
    id: "order_123",
    amount: 5000,
    createdAt: new Date(),
    paymentMethod: "BKASH",
    user: {
      name: "John Doe",
      email: "john@example.com",
      mobile: "+880123456789",
    },
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    { label: `#${orderDetails.id}`, isCurrentPage: true },
  ];

  const handleStatusChange = async (newStatus: PaymentStatus) => {
    try {
      setIsUpdating(true);
      // Add API call to update status here
      setPaymentStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      // Add API call to save changes here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ContentLayout title={orderDetails.id}>
      <div className="mb-6">
        <DynamicBreadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  Order #{orderDetails.id}
                </CardTitle>
                <CardDescription>
                  Submitted on {format(orderDetails.createdAt, "PPP")}
                </CardDescription>
              </div>

              <Badge
                variant="outline"
                className={`text-base px-4 py-1 ${
                  paymentMethodColors[
                    orderDetails.paymentMethod as keyof typeof paymentMethodColors
                  ]
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {orderDetails.paymentMethod}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Payment Status
                  </label>
                  <Select
                    defaultValue={paymentStatus}
                    onValueChange={(value) =>
                      handleStatusChange(value as PaymentStatus)
                    }
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_STATUS_OPTIONS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Transaction ID
                  </label>
                  <Input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full"
                    placeholder="Enter transaction ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Amount
                  </label>
                  <div className="text-2xl font-semibold text-primary">
                    ৳{orderDetails.amount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Improved Taxpayer Information */}
              <div className="relative overflow-hidden rounded-lg border bg-gray-50">
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
                    Taxpayer Information
                  </h3>
                  <div className="grid gap-5">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100 shadow-sm transition-colors hover:border-gray-200">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-primary/5 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {orderDetails.user.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100 shadow-sm transition-colors hover:border-gray-200">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-primary/5 rounded-full">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {orderDetails.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border border-gray-100 shadow-sm transition-colors hover:border-gray-200">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-primary/5 rounded-full">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {orderDetails.user.mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="w-32"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
