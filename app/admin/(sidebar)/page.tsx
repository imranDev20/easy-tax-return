"use client";

import { ContentLayout } from "./_components/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IncomeChart } from "./_components/income-chart";
import { MostOrderedServiceTypes } from "./_components/most-ordered-types-chart";
import { OrdersByShift } from "./_components/orders-by-shift-chart";

export default function AdminDashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <div className=""></div>
    </ContentLayout>
  );
}
