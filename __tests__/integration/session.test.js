const request = require("supertest");

const app = require("../../src/application/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Integration Authentication Tests", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(201);
  });

  it("should not authenticate with invalid password", async () => {
    const user = await factory.create("User", {
      password: "123123123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "12312312",
    });

    expect(response.status).toBe(401);
  });

  it("should not authenticate with invalid email", async () => {
    const user = await factory.create("User", {
      email: "email@certo.com",
    });

    const response = await request(app).post("/sessions").send({
      email: "errado@test.com",
      password: user.password,
    });

    expect(response.status).toBe(401);
  });

  it("should return JWT token after authenticate", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private route when authenticated", async () => {
    const user = await factory.create("User");
    const token = user.generateToken();
    const response = await request(app)
      .get("/check-auth")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).not.toBe(401);
  });

  it("should not be able to access private route without token", async () => {
    const user = await factory.create("User");

    const response = await request(app).get("/check-auth");

    expect(response.status).toBe(401);
  });

  it("should not be able to access private route with invalid token", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/check-auth")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
