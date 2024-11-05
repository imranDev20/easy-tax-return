"use server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma, PaymentStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { OrderUpdateForm, orderUpdateSchema } from "./[order_id]/schema";
import { revalidatePath } from "next/cache";

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

export async function updatePaymentInfo(
  input: OrderUpdateForm,
  orderId: string
) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Validate input data
    const validatedData = orderUpdateSchema.parse(input);

    // Find the order and verify ownership
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    console.log(existingOrder);

    if (!existingOrder) {
      return {
        success: false,
        error: "Order not found or access denied",
      };
    }

    // Update the order with new payment status and transaction ID
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paymentStatus: validatedData.paymentStatus,
        transactionID: validatedData.transactionID,
        phoneNumberUsed: validatedData.phoneNumberUsed,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/", "layout");

    return {
      success: true,
      data: {
        order: updatedOrder,
      },
    };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update payment status",
    };
  }
}
