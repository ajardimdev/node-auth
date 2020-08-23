const authMiddleware = require("./middlewares/auth");
const CheckAuthorizationController = require("./app_use_cases/check_authorization/CheckAuthorizationController");

module.exports = (routes) => {
  routes.use(authMiddleware);
  routes.get("/check-auth", CheckAuthorizationController);
};
