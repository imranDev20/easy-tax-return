"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryString from "@/hooks/use-query-string";
import { PAYMENT_STATUS_OPTIONS } from "@/lib/constants";
import { kebabToNormal } from "@/lib/utils";
import {
  Download,
  Filter,
  Plus,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export default function OrdersTableHeader() {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearchValue = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";
  const filterStatus = searchParams.get("filter_status") ?? "";

  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const updateSearchQuery = useDebounce((value: string) => {
    router.push(
      `${pathname}?${createQueryString({
        search: value,
      })}`
    );
  }, 300);

  useEffect(() => {
    updateSearchQuery(searchValue);
  }, [searchValue, updateSearchQuery]);

  return (
    <div className="space-y-4 mt-7 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tax Returns</h1>
        <Link href="/admin/orders/new">
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            New Tax Return
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search tax returns..."
            className="pl-10 w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Select
          value={sortBy}
          onValueChange={(value) => {
            router.push(
              `${pathname}?${createQueryString({
                sort_by: value,
              })}`
            );
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SortAsc className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
            <SelectItem value="createdAt">Created At</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortOrder}
          onValueChange={(value) => {
            router.push(
              `${pathname}?${createQueryString({
                sort_order: value,
              })}`
            );
          }}
        >
          <SelectTrigger className="w-[160px]">
            {sortOrder === "asc" ? (
              <SortAsc className="mr-2 h-4 w-4" />
            ) : (
              <SortDesc className="mr-2 h-4 w-4" />
            )}
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filterStatus}
          onValueChange={(value) => {
            router.push(
              `${pathname}?${createQueryString({
                filter_status: value !== "ALL" ? value : "",
                page: "",
              })}`
            );
          }}
        >
          <SelectTrigger className="w-[160px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <SelectItem value={option} key={option}>
                {kebabToNormal(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
