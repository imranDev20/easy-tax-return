"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

type UpdateUserData = {
  phone?: string;
  // Add more updateable fields here in the future
};

export async function updateUser(data: UpdateUserData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data,
      select: {
        phone: true,
        // Add more fields here as they become updateable
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}
