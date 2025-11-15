import request from "supertest";
import { app } from "../src/app";

describe("Auth API", () => {
  const email = "testuser@example.com";
  const password = "pass1234";
  let token = "";

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test User", email, password });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(email);
  });

  it("should login the user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  it("should fetch current user via /me", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
