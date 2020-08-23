const { isEmail } = require("validator");

module.exports = async (name, email, password) => {
  let errors = {};
  if (!name) {
    errors = { ...errors, name: "name is required" };
  } else if (name.indexOf(" ") === -1) {
    errors = { ...errors, name: "we need your full name" };
  }

  if (!email) {
    errors = { ...errors, email: "email is required" };
  } else if (!isEmail(email)) {
    errors = { ...errors, email: "email is invalid" };
  }

  if (!password) {
    errors = { ...errors, password: "password is required" };
  } else if (password.length < 8) {
    errors = { ...errors, password: "minimum size of password is 8" };
  } else if (password.indexOf(" ") !== -1) {
    errors = { ...errors, password: "space is not allowed to password" };
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return null;
};
