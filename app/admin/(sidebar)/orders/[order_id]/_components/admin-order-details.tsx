"use client";

import React, { useEffect, useTransition } from "react";
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
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Loader2, User, Mail, Phone, CreditCard } from "lucide-react";
import { PAYMENT_STATUS_OPTIONS } from "@/lib/constants";
import DynamicBreadcrumb from "@/components/custom/dynamic-breadcrumb";
import { ContentLayout } from "../../../_components/content-layout";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { updatePaymentInfo } from "../../actions";
import { OrderUpdateForm, orderUpdateSchema } from "../schema";

const paymentMethodColors = {
  BKASH: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-100",
  NAGAD: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
  ROCKET: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  UPAY: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  SURECASH:
    "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-100",
  MKASH: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  BANK_TRANSFER:
    "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  OTHERS: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
} as const;

type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    user: true;
  };
}>;

interface Props {
  taxReturnOrder: OrderWithRelation;
}

export default function AdminOrderDetails({ taxReturnOrder }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<OrderUpdateForm>({
    resolver: zodResolver(orderUpdateSchema),
    defaultValues: {
      paymentStatus: undefined,
      transactionID: "",
      phoneNumberUsed: "",
    },
  });

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    { label: `#${taxReturnOrder.invoiceId}`, isCurrentPage: true },
  ];

  useEffect(() => {
    if (taxReturnOrder) {
      form.reset({
        paymentStatus: taxReturnOrder.paymentStatus,
        transactionID: taxReturnOrder.transactionID || "",
        phoneNumberUsed: taxReturnOrder.phoneNumberUsed || "",
      });
    }
  }, [form, taxReturnOrder]);

  const onSubmit = async (data: OrderUpdateForm) => {
    startTransition(async () => {
      try {
        const result = await updatePaymentInfo(
          {
            paymentStatus: data.paymentStatus,
            transactionID: data.transactionID,
            phoneNumberUsed: data.phoneNumberUsed,
          },
          taxReturnOrder.id
        );

        if (result.success) {
          toast({
            title: "Success",
            description: "Order payment status updated successfully.",
            variant: "success",
          });
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to update payment status",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <ContentLayout title={taxReturnOrder.invoiceId}>
      <div className="mb-6">
        <DynamicBreadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  Order #{taxReturnOrder.id}
                </CardTitle>
                <CardDescription>
                  Submitted on {format(taxReturnOrder.createdAt, "PPP")}
                </CardDescription>
              </div>

              {taxReturnOrder.paymentMethod && (
                <Badge
                  variant="outline"
                  className={`text-base px-4 py-1 ${
                    paymentMethodColors[taxReturnOrder.paymentMethod]
                  }`}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {taxReturnOrder.paymentMethod}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">
                          Payment Status
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              if (value) {
                                field.onChange(value);
                              }
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {PAYMENT_STATUS_OPTIONS.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transactionID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">
                          Transaction ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter transaction ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumberUsed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">
                          Phone Number Used
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter phone number used"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Amount
                    </label>
                    <div className="text-2xl font-semibold text-primary">
                      ৳{taxReturnOrder.amount?.toLocaleString()}
                    </div>
                  </div>
                </div>

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
                            {taxReturnOrder.user.name}
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
                            {taxReturnOrder.user.email}
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
                            {taxReturnOrder.user.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isPending || !form.formState.isDirty}
                    className="w-32"
                  >
                    {isPending ? (
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
