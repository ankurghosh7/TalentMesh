import request from "supertest";
import { app } from "../src/app";

describe("Jobs API", () => {
  let token = "";
  let jobId = 0;

  beforeAll(async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@example.com", password: "pass1234" });
    token = login.body.token;
  });

  it("should create a job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Build website", description: "Need a landing page" });

    expect(res.status).toBe(200);
    jobId = res.body.id;
  });

  it("should list jobs", async () => {
    const res = await request(app).get("/api/jobs");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should apply to a job", async () => {
    const res = await request(app)
      .post(`/api/jobs/${jobId}/bid`)
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 5000, cover: "I can do it" });

    expect(res.status).toBe(200);
  });
});
