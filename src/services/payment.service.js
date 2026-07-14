import axios from "axios";

const api = axios.create({
  baseURL: "https://verifyapi.leulzenebe.pro",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function verifyPayment({ reference, suffix }) {

  const { data } = await api.post(
    `/verify?apiKey=${process.env.VERIFIER_API_KEY}`,
    {
      reference,
      suffix,
    },
  );

  if (!data.success) {
    console.error(data);

    throw new Error(data.message || "Payment verification failed.");
  }

  // Telebirr response
  if (data.provider === "telebirr") {
    return {
      provider: "telebirr",
      reference: data.receiptNo,
      payerName: data.payerName,
      amount: Number(String(data.totalPaidAmount).replace(/[^\d.]/g, "")),
      paymentDate: data.paymentDate,
      receiver: data.receiver,
    };
  }

  // CBE response
  return {
    provider: "cbe",
    reference: data.reference,
    payerName: data.payer,
    amount: Number(String(data.amount).replace(/[^\d.]/g, "")),
    paymentDate: data.date,
    receiver: data.receiver,
  };
}
