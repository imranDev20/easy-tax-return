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
import auth from "@/firebase"; // Ensure auth is imported correctly

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Lock, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Phone number regex for Bangladesh (supports +880 and 01 format)
const phoneRegex = /^(\+?880|0)1[3-9]\d{8}$/;
const otpRegex = /^\d{6}$/;

// Zod schema for form validation
const loginSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  otp: z.string().regex(otpRegex, "OTP must be 6 digits").optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginForm({ isOpen, onClose }: LoginFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [isPending, startTransition] = useTransition();
  const isOtpSent = Boolean(confirmationResult);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    setRecaptchaVerifier(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  // Function to ensure phone number is in E.164 format
  const formatPhoneNumber = (phoneNumber: string): string => {
    // Add country code +880 if not provided
    if (!phoneNumber.startsWith("+880")) {
      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+880" + phoneNumber.slice(1); // Replace leading 0 with +880
      } else {
        return phoneNumber; // Assume user entered in correct E.164 format
      }
    }
    return phoneNumber;
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const formattedPhoneNumber = formatPhoneNumber(data.phoneNumber);

    if (!isOtpSent) {
      // Sending OTP
      startTransition(async () => {
        if (!recaptchaVerifier) {
          setError("phoneNumber", {
            type: "manual",
            message: "RecaptchaVerifier is not initialized.",
          });
          return;
        }

        try {
          const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
          setConfirmationResult(result); // OTP sent successfully
          setValue("otp", ""); // Reset OTP field for input
        } catch (error: any) {
          console.error(error);
          setError("phoneNumber", {
            type: "manual",
            message: "Failed to send OTP. Please check the phone number and try again.",
          });
        }
      });
    } else {
      // Verifying OTP
      startTransition(async () => {
        if (!confirmationResult) {
          setError("otp", {
            type: "manual",
            message: "Please request OTP first.",
          });
          return;
        }

        try {
          if (data.otp) {
            await confirmationResult.confirm(data.otp); // Verifying OTP
            router.push("/"); // Navigate to the next page after success
          }
        } catch (error: any) {
          setError("otp", {
            type: "manual",
            message: "Invalid OTP. Please try again.",
          });
        }
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-center">Login</DialogTitle>
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
                disabled={isOtpSent} // Disable phone number input if OTP is sent
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
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
              {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-2 bg-primary hover:bg-primary-dark transition-colors"
            disabled={isSubmitting || isPending}
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </form>
      </DialogContent>
      <div id="recaptcha-container" />
    </Dialog>
  );
}
