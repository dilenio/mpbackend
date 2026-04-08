const fs = require("fs");
const path = require("path");
const multer = require("multer");

const invoicesDir = path.join(__dirname, "..", "__mocks__", "invoices");
const getUser = require("../__mocks__/getUser.json");
const dashboardData = require("../__mocks__/dashboard_data.json");
const dashboardDataWidgets = require("../__mocks__/dashboard_data_widgets.json");
const dashboardDataVolume = require("../__mocks__/dashboard_data_volume.json");
const dashboardDataDistribution = require("../__mocks__/dashboard_data_distribution.json");
const dashboardDataTransactions = require("../__mocks__/dashboard_data_transactions.json");
const getTransactionsHistory = require("../__mocks__/getTransactionsHistory.json");
const getTransactions = require("../__mocks__/getTransactions.json");
const getPayeeProfile = require("../__mocks__/getPayeeProfile.json");
const getPayees = require("../__mocks__/payees.json");
const getLedger = require("../__mocks__/ledger.json");
const getLedgerStatement = require("../__mocks__/ledgerStatement.json");
const getApikeys = require("../__mocks__/apikeys.json");
const getWebhooks = require("../__mocks__/webhooks.json");
const compliance = require("../__mocks__/compliance.json");
const getNotes = require("../__mocks__/notes.json");
const getLoggedInUser = require("../__mocks__/getLoggedInUser.json");
const getBatchesTemplates = require("../__mocks__/batchesTemplates.json");
const getBatches = require("../__mocks__/getBatches.json");
const toppayees = require("../__mocks__/toppayees.json");
const getManageUsers = require("../__mocks__/manageUsers.json");
const updatePermissions = require("../__mocks__/updatePermissions.json");
const getClientsList = require("../__mocks__/getClientsList.json");
const get_transaction_data = require("../__mocks__/get_transaction_data.json");
const getDashboardWallets = require("../__mocks__/dashboard_wallets.json");
const getDashboardChart = require("../__mocks__/dashboard_chart.json");
const getDashboardSidebar = require("../__mocks__/dashboard_sidebar.json");
const getRegisterCountries = require("../__mocks__/getRegisterCountries.json");
const search = require("../__mocks__/search.json");
const getPricingRules = require("../__mocks__/adminPricingRules.json");
const adminBalance = require("../__mocks__/adminBalance.json");
const banks = require("../__mocks__/banks.json");
const bankAccounts = require("../__mocks__/bankAccounts.json");
const { CLIENTS_BASE_PATH } = require("../constants/routes");

const formDataParser = multer();

function registerClientRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/pricing_rules`, (req, res) => {
    res.status(200).json(getPricingRules);
  });

  server.post(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    setTimeout(() => {
      res.status(200).json({});
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

  server.get(`${CLIENTS_BASE_PATH}/register/testUserName`, (req, res) => {
    // res.status(429).json({
    //   success: false,
    //   errors: [
    //     "Too many requests. Please try again later."
    //   ]
    // });
    setTimeout(() => {
      res.status(200).json({ success: true });
    }, 5000);
  });

  server.get(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/transactions`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
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

  server.get(`${CLIENTS_BASE_PATH}/register/countries`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getRegisterCountries);
    }, 5000);
  });

  server.post(
    `${CLIENTS_BASE_PATH}/register`,
    formDataParser.any(),
    (req, res) => {
      const registrationData = req.body;
      console.log("Registration data:", registrationData);
      setTimeout(() => {
        res.status(401).json({});
      }, 2000);
    },
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
          `attachment; filename=invoice.pdf`,
        );
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      });
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

  server.get(`${CLIENTS_BASE_PATH}/get_transaction_data/:id`, (req, res) => {
    const { id } = req.params;
    console.log("Transaction ID:", id);
    setTimeout(() => {
      res.status(200).json(get_transaction_data);
    }, 3000);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/compliance`, (req, res) => {
    res.status(200).json(compliance);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_data`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(dashboardData);
    }, 1000);
  });
  // server.get(`${CLIENTS_BASE_PATH}/dashboard_data_main`, (req, res) => {
  //   setTimeout(() => {
  //     res.status(200).json(dashboardDataMain);
  //   }, 2000);
  // });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_widgets`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(dashboardDataWidgets);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_volume`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(dashboardDataVolume);
    }, 3000);
  });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_distribution`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(dashboardDataDistribution);
    }, 2000);
  });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_transactions`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(dashboardDataTransactions);
    }, 3000);
  });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_wallets`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getDashboardWallets);
    }, 3000);
  });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_chart`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getDashboardChart);
    }, 3000);
  });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_sidebar`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getDashboardSidebar);
    }, 3000);
  });
  server.get(`${CLIENTS_BASE_PATH}/search/:limit`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(search);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/keep-alive`, (req, res) => {
    res.status(200).json({
      success: true,
    });
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
    },
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
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/:payout_token`,
    (req, res) => {
      const { user_token } = req.params;
      const { email } = req.body;
      console.log("User token:", user_token, "Email:", email);
      setTimeout(() => {
        res.status(200).json({
          status: "success",
          message: "Status updated!",
          user_token: user_token,
          email,
        });
      }, 3000);
    },
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
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/spendback`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      setTimeout(() => {
        res.status(201).json({
          status: "success",
          message: "Spendedback successfully!",
        });
      }, 4000);
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/note`,
    (req, res) => {
      const { user_token } = req.params;
      console.log("User token:", user_token);
      setTimeout(() => {
        res.status(201).json({
          status: "success",
          message: "Spendedback successfully!",
        });
      }, 4000);
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
      setTimeout(() => {
        res.status(201).json({
          success: true,
          url: "https://mockstorage.example.com/upload/abcd1234",
        });
      }, 2000);
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/manage_users/permission/:username_hash`,
    (req, res) => {
      const { username_hash } = req.params;
      setTimeout(() => {
        res.status(200).json(updatePermissions);
      }, 2000);
    },
  );

  server.put(`${CLIENTS_BASE_PATH}/security`, (req, res) => {
    const { user_token } = req.params;
    const { file_type } = req.body;
    console.log("User token:", user_token, "File Type:", file_type);
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "File upload notified successfully!",
      });
    }, 2000);
  });

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

  server.get(`${CLIENTS_BASE_PATH}/api/webhooks`, (req, res) => {
    res.status(200).json(getWebhooks);
  });

  server.get(`${CLIENTS_BASE_PATH}/getLoggedInUser`, (req, res) => {
    // res.status(401).json({ failed: "not logged in" });
    res.status(200).json(getLoggedInUser);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/batchesTemplates`, (req, res) => {
    res.status(200).json(getBatchesTemplates);
  });
  server.get(`${CLIENTS_BASE_PATH}/api/batches`, (req, res) => {
    res.status(200).json(getBatches);
  });

  server.get(`${CLIENTS_BASE_PATH}/toppayees`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(toppayees);
    }, 4000);
  });
  server.get(`${CLIENTS_BASE_PATH}/get_transactions`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getTransactions);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/manage_users`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getManageUsers);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/getClientsList`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getClientsList);
    }, 5000);
  });

  server.get(`${CLIENTS_BASE_PATH}/userprofile/mfa_code`, (req, res) => {
    res.status(200).json({
      url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth%3A%2F%2Ftotp%2FMassPay%2520Inc%3Adilenio.enderle%40luby.software%3Fsecret%3DIZATCZLCMJSWEOJUMJRGIMJYMNSTQNRXGY2DINJVGMZTMYZQMJRDSYRV%26issuer%3DMassPay%2520Inc&ecc=M",
    });
  });
  server.get(`${CLIENTS_BASE_PATH}/:client_id`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(client_id);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/admin/balance`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(adminBalance);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/admin/banks`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(banks);
    }, 1000);
  });
  server.get(`${CLIENTS_BASE_PATH}/admin/bank_accounts`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(bankAccounts);
    }, 1000);
  });
}

module.exports = registerClientRoutes;
