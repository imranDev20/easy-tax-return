import TableEmpty from "@/components/table-empty";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/types/pagination";
import { Prisma } from "@prisma/client";
import OrderTableRow from "./order-table-row";

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: { user: true; individualTaxes: true };
}>;

export default function OrdersList({
  orders,
  pagination,
}: {
  orders: OrderWithRelations[];
  pagination: Pagination;
}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="p-0">
        <div className="overflow-auto h-[calc(100vh-315px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <div className="flex justify-center items-center">
                    <Checkbox />
                  </div>
                </TableHead>
                <TableHead className="w-[25%]">User</TableHead>
                <TableHead className="hidden md:table-cell">TIN</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead className="hidden md:table-cell">Amount</TableHead>
                <TableHead className="hidden md:table-cell w-[17%]">
                  Created at
                </TableHead>
                <TableHead className="w-10">
                  <p className="sr-only">Actions</p>
                </TableHead>
              </TableRow>
            </TableHeader>

            {orders.length > 0 ? (
              <TableBody>
                {orders.map((order) => (
                  <OrderTableRow key={order.id} order={order} />
                ))}
              </TableBody>
            ) : (
              <TableEmpty colSpan={7} />
            )}
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
