const registerUser = require("./RegisterUser");

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await registerUser(name, email, password);
    if (result.errors) {
      return res.status(400).json({
        errors: result.errors,
        message: "could not registrate your user, check the data and retry",
      });
    }

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({
      errors: { unexpected: err.message },
      message: "unexpected error",
    });
  }
};
