"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data for saved tax returns
const savedReturns = [
  {
    id: "return1",
    tin: "123456789012",
    assessmentYear: "2023-2024",
    lastModified: new Date("2023-12-20"),
    progress: 65,
  },
  {
    id: "return2",
    tin: "987654321098",
    assessmentYear: "2023-2024",
    lastModified: new Date("2023-12-15"),
    progress: 30,
  },
  {
    id: "return3",
    tin: "456789012345",
    assessmentYear: "2022-2023",
    lastModified: new Date("2023-11-28"),
    progress: 85,
  },
];

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function UserSavedTaxReturnsPage() {
  return (
    <div className="container mx-auto min-h-[500px]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Saved Tax Returns</h1>
        <Button asChild>
          <Link href="/tax-return/new">Start New Return</Link>
        </Button>
      </div>

      {savedReturns.length === 0 ? (
        <Card className="bg-muted">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground mb-2">
              No saved returns found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Start a new tax return to get started
            </p>
            <Button asChild>
              <Link href="/tax-return/new">Start New Return</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedReturns.map((taxReturn) => (
            <Link
              href={`/tax-return/${taxReturn.id}`}
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

                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${taxReturn.progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="text-sm text-muted-foreground">
                        Last modified: {formatDate(taxReturn.lastModified)}
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
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
