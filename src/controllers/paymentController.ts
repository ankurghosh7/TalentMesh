import { Request, Response } from "express";
import { RazorpayService } from "../services/razorpayService.js";

const rp = new RazorpayService();

export class PaymentController {
  async createOrder(req: Request & { user?: any }, res: Response) {
    const { amount } = req.body; // amount in rupees
    const order = await rp.createOrder(amount, req.user.id.toString());
    res.json(order);
  }

  async verifyPayment(req: Request & { user?: any }, res: Response) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const ok = await rp.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (ok) {
      // grant credits - implement user credits increment here
      res.json({ success: true });
    } else res.status(400).json({ success: false });
  }
}
