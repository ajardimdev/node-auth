const { User } = require("../../../domain/models");

module.exports = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  }).catch((err) => {
    throw new Error("error trying find user by e-mail");
  });

  if (!user) {
    return null;
  }

  const validPassword = await user.checkPassword(password);
  if (!validPassword) {
    return null;
  }

  const token = await user.generateToken();
  user.password = undefined;
  user.password_hash = undefined;

  return { user, token };
};
