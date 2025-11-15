import request from "supertest";
import { app } from "../src/app";

describe("Payments API (Razorpay Mock)", () => {
  let token = "";

  beforeAll(async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "pass1234" });
    token = login.body.token;
  });

  it("should create razorpay order", async () => {
    const res = await request(app)
      .post("/api/payments/create-order")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 100 });

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
  });
});
