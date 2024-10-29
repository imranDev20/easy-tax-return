"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

// Helper function to ensure consistent date formatting
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Mock user data
const user = {
  id: "clq1234567890",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date(),
  individualTax: {
    id: "tax123",
    tin: "123456789012",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-06-15"),
  },
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [tempPhone, setTempPhone] = useState(user.phone);

  const handleEdit = () => {
    setIsEditing(true);
    setTempPhone(phoneNumber);
  };

  const handleSave = () => {
    setPhoneNumber(tempPhone);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempPhone(phoneNumber);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto min-h-[500px]">
      <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>

      <div className="grid gap-6">
        {/* Basic Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback>
                {user.name?.charAt(0) || user.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        className="w-[200px]"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleSave}
                        className="h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleCancel}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{phoneNumber}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleEdit}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Member Since
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(user.createdAt)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Tax Returns Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Returns</CardTitle>
          </CardHeader>
          <CardContent>
            {user.individualTax ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">TIN</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.individualTax.tin}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Latest Filing
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(user.individualTax.updatedAt)}
                    </dd>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tax returns filed yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
