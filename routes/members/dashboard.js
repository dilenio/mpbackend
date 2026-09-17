const { MEMBERS_BASE_PATH } = require("../../constants/routes");

const dashboard = require("../../__mocks__/members/dashboard/dashboard.json");
const accountBalance = require("../../__mocks__/members/dashboard/account_balance.json");
const transactions = require("../../__mocks__/members/dashboard/transactions.json");

function registerDashboardRoutes(server) {
  server.get(`${MEMBERS_BASE_PATH}/dashboard`, (req, res) => {
    res.status(200).json(dashboard);
  });

  server.get(`${MEMBERS_BASE_PATH}/account_balance`, (req, res) => {
    res.status(200).json(accountBalance);
  });

  server.get(`${MEMBERS_BASE_PATH}/transactions`, (req, res) => {
    res.status(200).json(transactions);
  });
}

module.exports = registerDashboardRoutes;
