import {
  createPayment,
  findByReference,
  getMemberPayments,
} from "../models/payment.js";
import { getPaymentStatus, updatePaymentStatus } from "../models/member.js";

import { verifyPayment } from "../services/payment.service.js";

export const verifyAndSavePayment = async (req, res) => {
  try {
    const { memberRasId, reference, suffix = "", provider = "" } = req.body;

    // 1. Validation
    if (!memberRasId || !reference) {
      return res.status(400).json({
        success: false,
        message: "Member ID and reference are required.",
      });
    }

    // 2. Prevent duplicate receipts (Idempotency)
    const existingPayment = await findByReference(reference);
    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: "This receipt has already been processed.",
      });
    }

    // 3. Ensure they haven't paid for this billing cycle/month yet
    const hasPaidCurrentMonth = await getPaymentStatus(memberRasId);
    console.log(hasPaidCurrentMonth);
    if (hasPaidCurrentMonth) {
      return res.status(409).json({
        success: false,
        message: "This member has already paid for this billing cycle.",
      });
    }

    // 4. Construct payload dynamically (Do not send empty strings for suffix if not CBE)
    const verificationPayload = { reference };
    if (provider === "cbe" && suffix) {
      verificationPayload.suffix = suffix;
    }

    // Verify payment with external gateway
    const payment = await verifyPayment(verificationPayload);

    // 5. Save verified payment to database
    await createPayment({
      memberRasId,
      provider: payment.provider || provider, // Fallback if API response doesn't return it
      reference: payment.reference || reference,
      payerName: payment.payerName,
      amount: payment.amount,
      paymentDate: payment.paymentDate || new Date(),
    });

    // 6. Set member's subscription/active status to 1 (paid)
    await updatePaymentStatus(memberRasId, 1);

    return res.status(201).json({
      success: true,
      message: "Payment verified and credited successfully.",
    });
  } catch (error) {
    console.error("Verification error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal payment verification gateway error.",
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const { memberRasId } = req.params;

    const payments = await getMemberPayments(memberRasId);

    return res.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments.",
    });
  }
};
