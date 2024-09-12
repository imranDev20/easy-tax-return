"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Phone } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { sendOTP, verifyOTPAction } from "../actions";

const phoneRegex = /^(\+?880|0)1[3-9]\d{8}$/;
const otpRegex = /^\d{6}$/;

const loginSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  otp: z.string().regex(otpRegex, "OTP must be 6 digits").optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginForm({
  isOpen,
  onClose,
}: LoginFormProps): JSX.Element {
  const [isOtpSent, setIsOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    if (!isOtpSent) {
      const result = await sendOTP(data.phoneNumber);
      if (result.success) {
        setIsOtpSent(true);
        setValue("otp", "");
      } else {
        setError("phoneNumber", { message: result.error });
      }
    } else {
      const result = await verifyOTPAction(data.phoneNumber, data.otp!);
      if (result.success) {
        const signInResult = await signIn("credentials", {
          phone: data.phoneNumber,
          otp: data.otp,
          redirect: false,
        });
        if (signInResult?.error) {
          setError("otp", { message: "Failed to sign in" });
        } else {
          onClose();
        }
      } else {
        setError("otp", { message: "Invalid OTP" });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Login
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mt-2">
            {isOtpSent
              ? "Enter the OTP sent to your phone"
              : "Enter your phone number to receive an OTP"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <Input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className="pl-10 py-2"
                disabled={isOtpSent}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {isOtpSent && (
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  {...register("otp")}
                  className="pl-10 py-2"
                />
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-2 bg-primary hover:bg-primary-dark transition-colors"
            disabled={isSubmitting}
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
