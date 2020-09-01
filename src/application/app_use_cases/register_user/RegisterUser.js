const { User } = require("../../../domain/models");
const ValidateUser = require("../../../domain/models/rules/Users/ValidateUser");

module.exports = async (name, email, password) => {
  const errors = await ValidateUser(name, email, password);
  if (errors) {
    return { errors };
  }

  const user = await User.create({ name, email, password }).catch((err) => {
    console.debug("err", err);
    throw new Error("error trying register a new user.");
  });

  if (!user) {
    return null;
  }

  const token = user.generateToken();
  user.password = undefined;
  user.password_hash = undefined;

  return { user, token };
};
