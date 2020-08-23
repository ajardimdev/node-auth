const CreateSessionController = require("./app_use_cases/create_session/CreateSessionController");
const RegisterUserController = require("./app_use_cases/register_user/RegisterUserController");

module.exports = (routes) => {
  routes.get("/", (req, res) => res.status(200).json({ HELLO: "WORLD" }));
  routes.post("/sessions", CreateSessionController);
  routes.post("/register", RegisterUserController);
};
