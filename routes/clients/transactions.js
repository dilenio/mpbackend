const fs = require("fs");
const path = require("path");

const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const invoicesDir = path.join(__dirname, "..", "..", "__mocks__", "invoices");

const getTransactions = require("../../__mocks__/clients/transactions/getTransactions.json");
const get_transaction_data = require("../../__mocks__/clients/transactions/get_transaction_data.json");

function registerTransactionRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/get_transactions`, (req, res) => {
    res.status(200).json(getTransactions);
  });

  server.get(`${CLIENTS_BASE_PATH}/get_transaction_data/:id`, (req, res) => {
    const { id } = req.params;
    console.log("Transaction ID:", id);
    res.status(200).json(get_transaction_data);
  });

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
          `attachment; filename=invoice.pdf`,
        );
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      });
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/transactions/issuerefund/:transaction_id`,
    (req, res) => {
      const { transaction_id } = req.params;
      res.status(201).json({
        status: "success",
        message: "Issue refund completed successfully!",
        transaction_id: transaction_id,
      });
    },
  );

  server.put(
    `${CLIENTS_BASE_PATH}/transactions/forcestatusupdate/:transaction_id`,
    (req, res) => {
      const { transaction_id } = req.params;
      res.status(200).json({
        status: "success",
        message: "Force status update completed successfully!",
        transaction_id: transaction_id,
      });
    },
  );
}

module.exports = registerTransactionRoutes;
