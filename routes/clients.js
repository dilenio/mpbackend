const fs = require("fs");
const path = require("path");

const invoicesDir = path.join(__dirname, "..", "__mocks__", "invoices");
const getUser = require("../__mocks__/getUser.json");
const dashboardData = require("../__mocks__/dashboard_data.json");
const getTransactionsHistory = require("../__mocks__/getTransactionsHistory.json");
const getPayeeProfile = require("../__mocks__/getPayeeProfile.json");
const getPayees = require("../__mocks__/payees.json");
const getLedger = require("../__mocks__/ledger.json");
const getLedgerStatement = require("../__mocks__/ledgerStatement.json");
const getApikeys = require("../__mocks__/apikeys.json");
const { CLIENTS_BASE_PATH } = require("../constants/routes");

function registerClientRoutes(server) {
  server.post(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "API Key created successfully!",
        apiKey: "1234567890abcdef",
      });
    }, 2000);
  });
  server.put(`${CLIENTS_BASE_PATH}/api/apikeys/revoke/:key`, (req, res) => {
    const { key } = req.params;
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "API Key revoked!",
        apiKey: key,
      });
    }, 2000);
  });

  server.put(`${CLIENTS_BASE_PATH}/payee_profile`, (req, res) => {
    setTimeout(() => {
      res.status(400).json({
        status: "failed",
        message: "Payee profile updated FAILED!",
      });
    }, 3000);
  });

  server.get(`${CLIENTS_BASE_PATH}/get_user/:user_token`, (req, res) => {
    const { user_token } = req.params;
    console.log("User token:", user_token);
    res.status(200).json(getUser);
  });

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/transactions`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      res.status(200).json(getTransactionsHistory);
    }
  );

  server.get(
    `${CLIENTS_BASE_PATH}/transactions/invoice/:transaction_id`,
    (req, res) => {
      const { transaction_id } = req.params;
      const filePath = path.join(invoicesDir, `invoice.pdf`);

      fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) {
          return res.status(404).json({
            status: "error",
            message: `Invoice ${transaction_id} not found`,
          });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=invoice.pdf`
        );
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      });
    }
  );

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/:payout_token/confirmation`,
    (req, res) => {
      const { user_token, payout_token } = req.params;
      const filePath = path.join(invoicesDir, `confirmation.pdf`);

      fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) {
          return res.status(404).json({
            status: "error",
            message: `Invoice ${user_token} ${payout_token} not found`,
          });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=confirmation.pdf`
        );
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      });
    }
  );

  server.get(`${CLIENTS_BASE_PATH}/api/customer/:user_token`, (req, res) => {
    const { user_token } = req.params;
    console.log("User token:", user_token);
    res.status(200).json(getPayeeProfile);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_data`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(dashboardData);
    }, 1000);
  });

  server.put(
    `${CLIENTS_BASE_PATH}/transactions/forcestatusupdate/:transaction_id`,
    (req, res) => {
      const { transaction_id } = req.params;
      setTimeout(() => {
        res.status(200).json({
          status: "success",
          message: "Force status update completed successfully!",
          transaction_id: transaction_id,
        });
      }, 3000);
    }
  );

  server.post(
    `${CLIENTS_BASE_PATH}/transactions/issuerefund/:transaction_id`,
    (req, res) => {
      const { transaction_id } = req.params;
      setTimeout(() => {
        res.status(201).json({
          status: "success",
          message: "Issue refund completed successfully!",
          transaction_id: transaction_id,
        });
      }, 3000);
    }
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/link`,
    (req, res) => {
      const { user_token } = req.params;
      const { email } = req.body;
      console.log("User token:", user_token, "Email:", email);
      setTimeout(() => {
        res.status(201).json({
          status: "success",
          message: "Payee linked successfully!",
          user_token: user_token,
          email,
        });
      }, 3000);
    }
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/generate_file_upload`,
    (req, res) => {
      const { user_token } = req.params;
      const { file_types, hold_payouts } = req.body;
      console.log(
        "User token:",
        user_token,
        "File Types:",
        file_types,
        "hold_payouts:",
        hold_payouts
      );
      setTimeout(() => {
        res.status(201).json({
          status: "success",
          message: "Link Generated successfully!",
          user_token: user_token,
        });
      }, 2000);
    }
  );

  server.get(`${CLIENTS_BASE_PATH}/api/payees`, (req, res) => {
    res.status(200).json(getPayees);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/ledger`, (req, res) => {
    res.status(200).json(getLedger);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/ledger_statement`, (req, res) => {
    res.status(200).json(getLedgerStatement);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    res.status(200).json(getApikeys);
  });
}

module.exports = registerClientRoutes;
