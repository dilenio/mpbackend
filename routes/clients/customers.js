const fs = require("fs");
const path = require("path");

const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const invoicesDir = path.join(__dirname, "..", "..", "__mocks__", "invoices");

const getPayees = require("../../__mocks__/clients/customers/payees.json");
const getPayeeProfile = require("../../__mocks__/clients/customers/getPayeeProfile.json");
const getUser = require("../../__mocks__/clients/customers/getUser.json");
const getNotes = require("../../__mocks__/clients/customers/notes.json");
const getFileUploads = require("../../__mocks__/clients/customers/getFileUploads.json");
const FileUploadsRequests = require("../../__mocks__/clients/customers/FileUploadsRequests.json");
const payins = require("../../__mocks__/clients/customers/payins.json");
const payindeposits = require("../../__mocks__/clients/customers/payinDeposits.json");
const logins = require("../../__mocks__/clients/customers/logins.json");
const getTransactionsHistory = require("../../__mocks__/clients/customers/getTransactionsHistory.json");
const getTransactionsClientId = require("../../__mocks__/clients/customers/getTransactionsClientId.json");
const getTransactionsIds = require("../../__mocks__/clients/customers/getTransactionsIds.json");
const user = require("../../__mocks__/clients/customers/user.json");
const userProfile = require("../../__mocks__/clients/customers/user_profile.json");
const attributes = require("../../__mocks__/clients/customers/attributes.json");
const events = require("../../__mocks__/clients/customers/events.json");
const idVerification = require("../../__mocks__/clients/customers/id_verification.json");
const loginHistory = require("../../__mocks__/clients/customers/login_history.json");
const fileUpload = require("../../__mocks__/clients/customers/file_upload.json");
const transactionsId = require("../../__mocks__/clients/customers/transactions_id.json");

function registerCustomerRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/user`, (req, res) => {
    res.status(200).json(user);
  });

  server.get(`${CLIENTS_BASE_PATH}/user_profile`, (req, res) => {
    res.status(200).json(userProfile);
  });

  server.get(`${CLIENTS_BASE_PATH}/attributes`, (req, res) => {
    res.status(200).json(attributes);
  });

  server.get(`${CLIENTS_BASE_PATH}/events`, (req, res) => {
    res.status(200).json(events);
  });

  server.get(`${CLIENTS_BASE_PATH}/id_verification`, (req, res) => {
    res.status(200).json(idVerification);
  });

  server.get(`${CLIENTS_BASE_PATH}/login_history`, (req, res) => {
    res.status(200).json(loginHistory);
  });

  server.get(`${CLIENTS_BASE_PATH}/file_upload`, (req, res) => {
    res.status(200).json(fileUpload);
  });

  server.get(`${CLIENTS_BASE_PATH}/transactions_id`, (req, res) => {
    res.status(200).json(transactionsId);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/payees`, (req, res) => {
    res.status(200).json(getPayees);
  });

  server.get(`${CLIENTS_BASE_PATH}/get_user/:user_token`, (req, res) => {
    const { user_token } = req.params;
    console.log("User token:", user_token);
    res.status(200).json(getUser);
  });

  // --- GET /api/customer/... (sufixo literal primeiro) ---

  server.get(`${CLIENTS_BASE_PATH}/api/customer/:user_token/files`, (req, res) => {
    const { user_token } = req.params;
    console.log("User token:", user_token);
    res.status(200).json(getFileUploads);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/customer/:user_token/payins`, (req, res) => {
    const { user_token } = req.params;
    console.log("User token:", user_token);
    res.status(200).json(payins);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/customer/:token/payindeposits`, (req, res) => {
    const { token } = req.params;
    console.log("User token:", token);
    res.status(200).json(payindeposits);
  });

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/FileUploadRequests`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      res.status(200).json(FileUploadsRequests);
    },
  );

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/transactions`,
    (req, res) => {
      const { user_token } = req.params;
      const { client_id, ids } = req.query || {};
      console.log("User token:", user_token, client_id ? `Client ID: ${client_id}` : "");

      if (client_id) {
        return res.status(200).json(getTransactionsClientId);
      }

      if (ids) {
        return res.status(200).json(getTransactionsIds);
      }

      res.status(200).json(getTransactionsHistory);
    },
  );

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/notes`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      res.status(200).json(getNotes);
    },
  );

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/logins`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      res.status(200).json(logins);
    },
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
          `attachment; filename=confirmation.pdf`,
        );
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      });
    },
  );

  // Curinga de 2 segmentos: precisa vir depois de todos os sufixos literais acima.
  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:client_id/:user_token`,
    (req, res) => {
      const { user_token, client_id } = req.params;
      console.log("Client ID:", client_id);
      console.log("User token:", user_token);
      res.status(200).json(getPayeeProfile);
    },
  );

  server.get(`${CLIENTS_BASE_PATH}/api/customer/:user_token`, (req, res) => {
    const { user_token } = req.params;
    console.log("User token:", user_token);
    res.status(200).json(getPayeeProfile);
  });

  // --- POST /api/customer/... (sufixo literal primeiro) ---

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/status`,
    (req, res) => {
      const { user_token } = req.params;
      const { status } = req.body;
      res.status(200).json({
        status: "success",
        message: "Status updated!"
      });
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/link`,
    (req, res) => {
      const { user_token } = req.params;
      const { email } = req.body;
      res.status(200).json({
        status: "success",
      });
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/spendback`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      res.status(201).json({
        status: "success",
        message: "Spendedback successfully!",
      });
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/note`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      res.status(201).json({
        status: "success",
        message: "Spendedback successfully!",
      });
    },
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
        hold_payouts,
      );
      res.status(201).json({
        success: true,
        url: "https://mockstorage.example.com/upload/abcd1234",
      });
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/file_upload/:request_token`,
    (req, res) => {
      const { user_token, request_token } = req.params;
      const { is_verified, is_required } = req.body;
      console.log(
        "User token:",
        user_token,
        "Request token:",
        request_token,
        "Is Verified:",
        is_verified,
        "Is Required:",
        is_required
      );
      res.status(200).json({
        success: true,
      });
    },
  );

  // Curinga de 2 segmentos: precisa vir depois de todos os sufixos literais acima.
  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/:payout_token`,
    (req, res) => {
      const { user_token } = req.params;
      const { email } = req.body;
      console.log("User token:", user_token, "Email:", email);
      res.status(200).json({
        success: true,
        status: "EXPIRED",
        message: "Status updated!",
        user_token: user_token,
        email,
      });
    },
  );

  server.put(`${CLIENTS_BASE_PATH}/payee_profile`, (req, res) => {
    res.status(400).json({
      status: "failed",
      message: "Payee profile updated FAILED!",
    });
  });
}

module.exports = registerCustomerRoutes;
