import React from "react";
import { Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const isOtpSent = watch("otp") !== undefined;

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    if (!isOtpSent) {
      console.log("Sending OTP to:", data.phoneNumber);
      setValue("otp", "");
    } else {
      console.log("Verifying OTP:", data.otp);
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
                type="tel"
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
