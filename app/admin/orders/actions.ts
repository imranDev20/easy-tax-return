import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma, PaymentStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

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
export async function deleteTaxReturn(taxReturnId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, message: "Not authenticated" };
    }

    // Check if the user is an admin
    if (session.user.role !== "ADMIN") {
      return { success: false, message: "Not authorized" };
    }

    // Use a transaction to delete both the tax return and its associated order
    const result = await prisma.$transaction(async (prisma) => {
      // Delete the associated order first
      await prisma.order.deleteMany({
        where: { individualTaxesId: taxReturnId },
      });

      // Then delete the tax return
      const deletedTaxReturn = await prisma.individualTaxes.delete({
        where: { id: taxReturnId },
      });

      return deletedTaxReturn;
    });

    return {
      success: true,
      message: "Tax return and associated order deleted successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error deleting tax return:", error);
    return {
      success: false,
      message: "Failed to delete tax return. Please try again.",
    };
  }
}
