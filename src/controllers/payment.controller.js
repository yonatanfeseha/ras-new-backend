import {
  createPayment,
  findByReference,
  getMemberPayments,
} from "../models/payment.js";

import { verifyPayment } from "../services/payment.service.js";

export const verifyAndSavePayment = async (req, res) => {
  try {
    const { memberRasId, reference, phoneNumber = "" } = req.body;

    if (!memberRasId || !reference) {
      return res.status(400).json({
        success: false,
        message: "Member ID and reference are required.",
      });
    }

    // Prevent duplicate receipts
    const existingPayment = await findByReference(reference);

    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: "This receipt has already been used.",
      });
    }

    // Verify payment
    const payment = await verifyPayment({
      reference,
      phoneNumber,
    });

    // Save payment
    await createPayment({
      memberRasId,
      provider: payment.provider,
      reference: payment.reference,
      payerName: payment.payerName,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
    });

    return res.status(201).json({
      success: true,
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
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
