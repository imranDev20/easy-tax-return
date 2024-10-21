import prisma from "@/lib/prisma";
import { Prisma, PaymentStatus } from "@prisma/client";

export async function getTaxReturnOrders(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc",
  filterPaymentStatus?: PaymentStatus
) {
  const skip = (page - 1) * pageSize;

  let whereClause: Prisma.OrderWhereInput = {};

  if (search) {
    whereClause = {
      OR: [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { individualTaxes: { tin: { contains: search, mode: "insensitive" } } },
        {
          individualTaxes: {
            taxpayerName: { contains: search, mode: "insensitive" },
          },
        },
      ],
    };
  }

  if (filterPaymentStatus) {
    whereClause.paymentStatus = filterPaymentStatus;
  }

  let orderBy: Prisma.OrderOrderByWithRelationInput = {};
  if (sortBy) {
    orderBy[sortBy as keyof Prisma.OrderOrderByWithRelationInput] =
      sortOrder || "asc";
  } else {
    orderBy = { createdAt: "desc" };
  }

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
      where: whereClause,
      orderBy,
      skip,
      take: pageSize,
      include: {
        user: true,
        individualTaxes: true,
      },
    }),
    prisma.order.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    orders,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      totalCount,
    },
  };
}
export async function deleteOrder(taxReturnId: string) {
  try {
    // Assume the user is already authenticated and authorized as an admin

    // Delete the order associated with the tax return
    const deletedOrder = await prisma.order.delete({
      where: { individualTaxesId: taxReturnId },
    });

    // The associated IndividualTaxes record will be automatically deleted due to the cascade delete

    return {
      success: true,
      message: "Tax return and associated order deleted successfully",
      data: deletedOrder,
    };
  } catch (error) {
    console.error("Error deleting tax return:", error);
    return {
      success: false,
      message: "Failed to delete tax return. Please try again.",
    };
  }
}
