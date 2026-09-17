const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const getLedger = require("../../__mocks__/clients/ledger/ledger.json");
const getLedgerStatement = require("../../__mocks__/clients/ledger/ledgerStatement.json");

function registerLedgerRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/api/ledger`, (req, res) => {
    res.status(200).json(getLedger);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/ledger_statement`, (req, res) => {
    res.status(200).json(getLedgerStatement);
  });
}

module.exports = registerLedgerRoutes;
