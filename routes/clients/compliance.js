const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const compliance = require("../../__mocks__/clients/compliance/compliance.json");
const compliance2 = require("../../__mocks__/clients/compliance/compliance2.json");
const allTransactions = require("../../__mocks__/clients/compliance/all_transactions.json");
const payeesUnderReview = require("../../__mocks__/clients/compliance/payees_under_review.json");
const pastDueTransactions = require("../../__mocks__/clients/compliance/past_due_transactions.json");
const getCancellations = require("../../__mocks__/clients/compliance/get_cancellations.json");

function registerComplianceRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/compliance2`, (req, res) => {
    res.status(200).json(compliance2);
  });

  server.get(`${CLIENTS_BASE_PATH}/all_transactions`, (req, res) => {
    res.status(200).json(allTransactions);
  });

  server.get(`${CLIENTS_BASE_PATH}/payees_under_review`, (req, res) => {
    res.status(200).json(payeesUnderReview);
  });

  server.get(`${CLIENTS_BASE_PATH}/past_due_transactions`, (req, res) => {
    res.status(200).json(pastDueTransactions);
  });

  server.get(`${CLIENTS_BASE_PATH}/get_cancellations`, (req, res) => {
    res.status(200).json(getCancellations);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/compliance`, (req, res) => {
    res.status(200).json(compliance);
  });
}

module.exports = registerComplianceRoutes;
