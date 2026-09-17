const { MEMBERS_BASE_PATH } = require("../../constants/routes");

const csrf = require("../../__mocks__/members/auth/csrf.json");

function registerAuthRoutes(server) {
  server.get(`${MEMBERS_BASE_PATH}/csrf`, (req, res) => {
    res.status(200).json(csrf);
  });
}

module.exports = registerAuthRoutes;
