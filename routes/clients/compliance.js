const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const compliance = require("../../__mocks__/clients/compliance/compliance.json");

function registerComplianceRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/api/compliance`, (req, res) => {
    res.status(200).json(compliance);
  });
}

module.exports = registerComplianceRoutes;
