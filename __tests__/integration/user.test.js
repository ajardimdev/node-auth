const request = require("supertest");

const app = require("../../src/application/app");
const truncate = require("../utils/truncate");
const faker = require("faker");
const factory = require("../factories");

describe("Integration User Tests", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should register user with correct data", async () => {
    const req = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };
    const response = await request(app).post("/register").send(req);

    expect(response.status).toBe(201);
  });

  it("should not register user without name", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(8),
      });

    expect(response.status).toBe(400);
  });

  it("should not register user without full name", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
      });

    expect(response.status).toBe(400);
  });

  it("should not register user without email", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        password: faker.internet.password(8),
      });

    expect(response.status).toBe(400);
  });

  it("should not register user with invalid email", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: "invalidemail",
        password: faker.internet.password(8),
      });

    expect(response.status).toBe(400);
  });

  it("should not register user without password", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
      });

    expect(response.status).toBe(400);
  });

  it("should not register user with short password", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(2),
      });

    expect(response.status).toBe(400);
  });

  it("should not register user with spaces on password", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: "invalid password",
      });

    expect(response.status).toBe(400);
  });

  it("should return token when register new user", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(8),
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should not register new user with duplicated email", async () => {
    const user = await factory.create("User");
    const response = await request(app)
      .post("/register")
      .send({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: user.email,
        password: faker.internet.password(8),
      });

    expect(response.status).not.toBe(201);
  });
});
