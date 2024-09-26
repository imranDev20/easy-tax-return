"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "./schema";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function createIndividualTaxReturn(
  data: IndividualTaxReturnFormInput
) {
  try {
    const validatedData = individualTaxReturnSchema.parse(data);

    return {
      message: "Individual tax return and payment processed successfully",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        "An error occurred while submitting individual tax return and processing payment.",
      success: false,
    };
  }
}

// bkash actions
async function getBkashHeaders() {
  const tokenResponse = await axios.post(
    process.env.BKASH_GRANT_TOKEN_URL as string,
    {
      app_key: process.env.BKASH_API_KEY,
      app_secret: process.env.BKASH_SECRET_KEY,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: process.env.BKASH_USERNAME,
        password: process.env.BKASH_PASSWORD,
      },
    }
  );

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: tokenResponse.data.id_token,
    "x-app-key": process.env.BKASH_API_KEY,
  };
}
interface PaymentResponse {
  bkashURL: string;
}

export async function createPayment(
  amount: string,
  userId = "123545"
): Promise<PaymentResponse | Error> {
  try {
    const headers = await getBkashHeaders();
    const { data } = await axios.post(
      process.env.BKASH_CREATE_PAYMENT_URL as string,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `${process.env.NEXT_PUBLIC_API_URL}/api/bkash/payment/callback`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
      },
      { headers }
    );

    return { bkashURL: data.bkashURL };
  } catch (error) {
    return error as Error;
  }
}

// export async function handleCallback(paymentID, status) {
//   if (status === 'cancel' || status === 'failure') {
//     return { redirect: `/error?message=${status}` };
//   }

//   if (status === 'success') {
//     try {
//       const headers = await getBkashHeaders();
//       const { data } = await axios.post(process.env.BKASH_EXECUTE_PAYMENT_URL as string, { paymentID }, { headers });

//       if (data && data.statusCode === '0000') {
//         await prisma.payment.create({
//           data: {
//             userId: Math.floor(Math.random() * 10) + 1,
//             paymentID,
//             trxID: data.trxID,
//             date: data.paymentExecuteTime,
//             amount: parseInt(data.amount)
//           }
//         });
//         return { redirect: '/success' };
//       } else {
//         return { redirect: `/error?message=${data.statusMessage}` };
//       }
//     } catch (error) {
//       console.error(error);
//       return { redirect: `/error?message=${error.message}` };
//     }
//   }
// }

// export async function refundPayment(trxID) {
//   try {
//     const payment = await prisma.payment.findFirst({ where: { trxID } });
//     if (!payment) {
//       throw new Error('Payment not found');
//     }

//     const headers = await getBkashHeaders();
//     const { data } = await axios.post(process.env.BKASH_REFUND_TRANSACTION_URL as string, {
//       paymentID: payment.paymentID,
//       amount: payment.amount,
//       trxID,
//       sku: 'payment',
//       reason: 'cashback'
//     }, { headers });

//     if (data && data.statusCode === '0000') {
//       return { message: 'refund success' };
//     } else {
//       throw new Error('refund failed');
//     }
//   } catch (error) {
//     throw new Error('refund failed: ' + error.message);
//   }
// }
