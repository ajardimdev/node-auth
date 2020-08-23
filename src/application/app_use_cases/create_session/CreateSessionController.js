const createSession = require("./CreateSession");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  try {
    const session = await createSession(email, password);
    if (!session) {
      return res.status(401).json({ message: "user or password is incorrect" });
    }

    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json({
      errors: { unexpected: err.message },
      message: "unexpected error",
    });
  }
};
