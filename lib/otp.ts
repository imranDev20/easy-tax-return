// lib/otp.ts
import crypto from "crypto";
import prisma from "./prisma";

export async function generateOTP(phone: string): Promise<string> {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await prisma.otp.create({
    data: {
      phone,
      otp,
      expiresAt,
    },
  });

  return otp;
}

export async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  const storedOTP = await prisma.otp.findFirst({
    where: {
      phone,
      otp,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (storedOTP) {
    await prisma.otp.delete({
      where: { id: storedOTP.id },
    });
    return true;
  }

  return false;
}
