import Razorpay from "razorpay";

export class RazorpayService {
  client: Razorpay;
  constructor() {
    this.client = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  async createOrder(amountInRupees: number, receipt: string) {
    const order = await this.client.orders.create({
      amount: amountInRupees * 100,
      currency: "INR",
      receipt,
    });
    return order;
  }

  verifyPayment(order_id: string, payment_id: string, signature: string) {
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(order_id + "|" + payment_id);
    const digest = hmac.digest("hex");
    return digest === signature;
  }
}
