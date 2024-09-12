// app/actions/auth.ts

import { generateOTP, verifyOTP } from "@/lib/otp";

export async function sendOTP(phone: string) {
  try {
    const otp = await generateOTP(phone);
    // Here you would typically send the OTP via SMS
    // For development, we'll just log it
    console.log(`OTP for ${phone}: ${otp}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, error: "Failed to send OTP" };
  }
}

export async function verifyOTPAction(phone: string, otp: string) {
  try {
    const isValid = await verifyOTP(phone, otp);
    return { success: isValid };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "Failed to verify OTP" };
  }
}
