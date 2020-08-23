const faker = require("faker");
const { factory } = require("factory-girl");
const { User } = require("../src/domain/models");

factory.define("User", User, {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  password: faker.internet.password(10),
});

module.exports = factory;
