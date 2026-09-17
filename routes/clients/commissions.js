const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const commissions = require("../../__mocks__/clients/commissions/commissions.json");
const summary = require("../../__mocks__/clients/commissions/summary.json");

function registerCommissionRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/commissions`, (req, res) => {
    res.status(200).json(commissions);
  });

  server.get(`${CLIENTS_BASE_PATH}/summary`, (req, res) => {
    res.status(200).json(summary);
  });
}

module.exports = registerCommissionRoutes;
