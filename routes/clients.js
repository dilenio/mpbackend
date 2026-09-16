const fs = require("fs");
const path = require("path");
const multer = require("multer");

const { CLIENTS_BASE_PATH } = require("../constants/routes");

const invoicesDir = path.join(__dirname, "..", "__mocks__", "invoices");

/* -------------------------------------------------------------------------- */
/* MOCKS                                                                      */
/* -------------------------------------------------------------------------- */

// Auth / Session
const csrf = require("../__mocks__/csrf.json");
const googleLoginUrl = require("../__mocks__/googleLoginUrl.json");
const getLoggedInUser = require("../__mocks__/getLoggedInUser.json");
const getRegisterCountries = require("../__mocks__/getRegisterCountries.json");
const logins = require("../__mocks__/logins.json");

// Reference data / Lookups
const currencies = require("../__mocks__/currencies.json");
const get_countries = require("../__mocks__/get_countries.json");
const services = require("../__mocks__/services.json");
const serviceFields = require("../__mocks__/serviceFields.json");
const linkServices = require("../__mocks__/link_services.json");
const search = require("../__mocks__/search.json");

// Dashboard
const dashboardData = require("../__mocks__/dashboard_data.json");
const dashboardDataWidgets = require("../__mocks__/dashboard_data_widgets.json");
const dashboardDataVolume = require("../__mocks__/dashboard_data_volume.json");
const dashboardDataDistribution = require("../__mocks__/dashboard_data_distribution.json");
const dashboardDataTransactions = require("../__mocks__/dashboard_data_transactions.json");
const getDashboardWallets = require("../__mocks__/dashboard_wallets.json");
const getDashboardChart = require("../__mocks__/dashboard_chart.json");
const getDashboardSidebar = require("../__mocks__/dashboard_sidebar.json");
const toppayees = require("../__mocks__/toppayees.json");
const getWalletsSummary = require("../__mocks__/getWalletsSummary.json");
const getWalletActionsSummaryByDateRange = require("../__mocks__/getWalletActionsSummaryByDateRange.json");

// Transactions
const getTransactions = require("../__mocks__/getTransactions.json");
const getTransactionsHistory = require("../__mocks__/getTransactionsHistory.json");
const getTransactionsClientId = require("../__mocks__/getTransactionsClientId.json");
const getTransactionsIds = require("../__mocks__/getTransactionsIds.json");
const get_transaction_data = require("../__mocks__/get_transaction_data.json");

// Payees / Customers
const getPayees = require("../__mocks__/payees.json");
const getPayeeProfile = require("../__mocks__/getPayeeProfile.json");
const getUser = require("../__mocks__/getUser.json");
const getNotes = require("../__mocks__/notes.json");
const getFileUploads = require("../__mocks__/getFileUploads.json");
const FileUploadsRequests = require("../__mocks__/FileUploadsRequests.json");
const payins = require("../__mocks__/payins.json");
const payindeposits = require("../__mocks__/payindeposits.json");

// Ledger
const getLedger = require("../__mocks__/ledger.json");
const getLedgerStatement = require("../__mocks__/ledgerStatement.json");

// Batches
const getBatchesTemplates = require("../__mocks__/batchesTemplates.json");
const getBatches = require("../__mocks__/getBatches.json");

// API Keys / Webhooks
const getApikeys = require("../__mocks__/apikeys.json");
const newApiKey = require("../__mocks__/newApiKey.json");
const getWebhooks = require("../__mocks__/webhooks.json");

// Manage Users
const getManageUsers = require("../__mocks__/manageUsers.json");
const updatePermissions = require("../__mocks__/updatePermissions.json");

// Compliance
const compliance = require("../__mocks__/compliance.json");

// Admin
const getPricingRules = require("../__mocks__/adminPricingRules.json");
const adminBalance = require("../__mocks__/adminBalance.json");
const getNodeList = require("../__mocks__/getNodeList.json");
const bankAccounts = require("../__mocks__/bankAccounts.json");
const banks = require("../__mocks__/banks.json");
const clientsBankViewFortress = require("../__mocks__/clientsBankView-fortress.json");
const clientsBankViewIbanera = require("../__mocks__/clientsBankView-ibanera.json");
const clientsBankViewBraid = require("../__mocks__/clientsBankView-braid.json");
const clientsBankViewCrb = require("../__mocks__/clientsBankView-crb.json");
const clientsBankViewJustWallet = require("../__mocks__/clientsBankView-justwallet.json");
const clientsBankViewMcb = require("../__mocks__/clientsBankView-mcb.json");
const clientsBankViewMyeupay = require("../__mocks__/clientsBankView-myeupay.json");
const clientsBankViewStride = require("../__mocks__/clientsBankView-stride.json");
const wireInstructions = require("../__mocks__/wireinstructions.json");
const wireTemplates = require("../__mocks__/wiretemplates.json");
const clients = require("../__mocks__/clients.json");
const getClientsList = require("../__mocks__/getClientsList.json");
const getLinks = require("../__mocks__/getLinks.json");

const formDataParser = multer();

/*
 * ORDEM DAS ROTAS
 *
 * As rotas estao agrupadas por assunto/pagina e, dentro de cada grupo, por
 * metodo (GET -> POST -> PUT). A regra que vale acima do agrupamento:
 * rota mais especifica sempre vem antes da rota com parametro que a cobriria.
 *
 * Conflitos que a ordem abaixo resolve:
 *  - POST /api/customer/:user_token/:payout_token cobre /status, /link,
 *    /spendback, /note e /generate_file_upload -> fica por ultimo no grupo.
 *  - GET /api/customer/:client_id/:user_token cobre /files, /payins,
 *    /payindeposits, /FileUploadRequests, /transactions, /notes e /logins ->
 *    fica depois de todas elas.
 *  - GET /:client_id cobre qualquer rota de um unico segmento -> fica por
 *    ultimo no arquivo inteiro.
 */
function registerClientRoutes(server) {
  /* ------------------------------------------------------------------------ */
  /* AUTH / SESSION                                                           */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/csrf`, (req, res) => {
    res.status(200).json(csrf);
  });

  server.get(`${CLIENTS_BASE_PATH}/getLoggedInUser`, (req, res) => {
    res.status(200).json(getLoggedInUser);
  });

  server.get(`${CLIENTS_BASE_PATH}/keep-alive`, (req, res) => {
    res.status(200).json({
      success: true,
    });
  });

  server.get(`${CLIENTS_BASE_PATH}/login/google_login_url`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(googleLoginUrl);
    }, 3000);
  });

  server.get(`${CLIENTS_BASE_PATH}/register/countries`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getRegisterCountries);
    }, 5000);
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

  /* ------------------------------------------------------------------------ */
  /* REFERENCE DATA / LOOKUPS                                                 */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/currencies`, (req, res) => {
    res.status(200).json(currencies);
  });

  server.get(`${CLIENTS_BASE_PATH}/get_countries`, (req, res) => {
    res.status(200).json(get_countries);
  });

  server.get(`${CLIENTS_BASE_PATH}/services`, (req, res) => {
    res.status(200).json(services);
  });

  server.get(`${CLIENTS_BASE_PATH}/service_fields`, (req, res) => {
    res.status(200).json(serviceFields);
  });

  server.get(`${CLIENTS_BASE_PATH}/link_services`, (req, res) => {
    res.status(200).json(linkServices);
  });

  server.get(`${CLIENTS_BASE_PATH}/search/:limit`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(search);
    }, 3000);
  });

  /* ------------------------------------------------------------------------ */
  /* DASHBOARD                                                                */
  /* ------------------------------------------------------------------------ */

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

  server.get(`${CLIENTS_BASE_PATH}/toppayees`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(toppayees);
    }, 4000);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/getWalletsSummary`, (req, res) => {
    res.status(200).json(getWalletsSummary);
  });

  server.get(
    `${CLIENTS_BASE_PATH}/api/getWalletActionsSummaryByDateRange`,
    (req, res) => {
      res.status(200).json(getWalletActionsSummaryByDateRange);
    },
  );

  /* ------------------------------------------------------------------------ */
  /* TRANSACTIONS                                                             */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/get_transactions`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getTransactions);
    }, 1000);
  });

  server.get(`${CLIENTS_BASE_PATH}/get_transaction_data/:id`, (req, res) => {
    const { id } = req.params;
    console.log("Transaction ID:", id);
    setTimeout(() => {
      res.status(200).json(get_transaction_data);
    }, 3000);
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
      setTimeout(() => {
        res.status(201).json({
          status: "success",
          message: "Issue refund completed successfully!",
          transaction_id: transaction_id,
        });
      }, 3000);
    },
  );

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

  /* ------------------------------------------------------------------------ */
  /* PAYEES / CUSTOMERS                                                       */
  /* ------------------------------------------------------------------------ */

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
    setTimeout(() => {
      res.status(200).json(getFileUploads);
    }, 3000);
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
        return setTimeout(() => {
          res.status(200).json(getTransactionsClientId);
        }, 2000);
      }

      if (ids) {
        return setTimeout(() => {
          res.status(200).json(getTransactionsIds);
        }, 2000);
      }

      setTimeout(() => {
        res.status(200).json(getTransactionsHistory);
      }, 2000);
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
      setTimeout(() => {
        res.status(200).json(logins);
      }, 2000);
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
      setTimeout(() => {
        res.status(200).json({
          status: "success",
          message: "Status updated!"
        });
      }, 3000);
    },
  );

  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/link`,
    (req, res) => {
      const { user_token } = req.params;
      const { email } = req.body;
      setTimeout(() => {
        res.status(200).json({
          status: "success",
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
      setTimeout(() => {
        res.status(200).json({
          success: true,
        });
      }, 2000);
    },
  );

  // Curinga de 2 segmentos: precisa vir depois de todos os sufixos literais acima.
  server.post(
    `${CLIENTS_BASE_PATH}/api/customer/:user_token/:payout_token`,
    (req, res) => {
      const { user_token } = req.params;
      const { email } = req.body;
      console.log("User token:", user_token, "Email:", email);
      setTimeout(() => {
        res.status(200).json({
          success: true,
          status: "EXPIRED",
          message: "Status updated!",
          user_token: user_token,
          email,
        });
      }, 3000);
    },
  );

  server.put(`${CLIENTS_BASE_PATH}/payee_profile`, (req, res) => {
    setTimeout(() => {
      res.status(400).json({
        status: "failed",
        message: "Payee profile updated FAILED!",
      });
    }, 3000);
  });

  /* ------------------------------------------------------------------------ */
  /* LEDGER                                                                   */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/api/ledger`, (req, res) => {
    res.status(200).json(getLedger);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/ledger_statement`, (req, res) => {
    res.status(200).json(getLedgerStatement);
  });

  /* ------------------------------------------------------------------------ */
  /* BATCHES                                                                  */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/api/batchesTemplates`, (req, res) => {
    res.status(200).json(getBatchesTemplates);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/batches`, (req, res) => {
    res.status(200).json(getBatches);
  });

  server.get(`${CLIENTS_BASE_PATH}/batch_templates/:template_id`, (req, res) => {
    const { template_id } = req.params;
    setTimeout(() => {
      res.status(200).json({ template_id });
    }, 5000);
  });

  server.post(
    `${CLIENTS_BASE_PATH}/api/batches/upload`,
    formDataParser.any(),
    (req, res) => {
      const registrationData = req.body;
      console.log("Registration data:", registrationData);
      setTimeout(() => {
        res.status(200).json({ complete: true });
      }, 5000);
    },
  );

  /* ------------------------------------------------------------------------ */
  /* API KEYS / WEBHOOKS                                                      */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getApikeys);
    }, 3000);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/webhooks`, (req, res) => {
    res.status(200).json(getWebhooks);
  });

  server.post(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(newApiKey);
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

  /* ------------------------------------------------------------------------ */
  /* MANAGE USERS                                                             */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/manage_users`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getManageUsers);
    }, 1000);
  });

  server.post(`${CLIENTS_BASE_PATH}/manage_users/add`, (req, res) => {
    setTimeout(() => {
      res.status(200).json({status: "success", message: "User added successfully!"});
    }, 2000);
  });

  server.post(
    `${CLIENTS_BASE_PATH}/manage_users/permission/:username_hash`,
    (req, res) => {
      const { username_hash } = req.params;
      setTimeout(() => {
        res.status(200).json(updatePermissions);
      }, 2000);
    },
  );

  /* ------------------------------------------------------------------------ */
  /* USER PROFILE / SECURITY                                                  */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/userprofile/mfa_code`, (req, res) => {
    res.status(200).json({
      url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth%3A%2F%2Ftotp%2FMassPay%2520Inc%3Adilenio.enderle%40luby.software%3Fsecret%3DIZATCZLCMJSWEOJUMJRGIMJYMNSTQNRXGY2DINJVGMZTMYZQMJRDSYRV%26issuer%3DMassPay%2520Inc&ecc=M",
    });
  });

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

  /* ------------------------------------------------------------------------ */
  /* COMPLIANCE                                                               */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/api/compliance`, (req, res) => {
    res.status(200).json(compliance);
  });

  /* ------------------------------------------------------------------------ */
  /* ADMIN                                                                    */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/pricing_rules`, (req, res) => {
    res.status(200).json(getPricingRules);
  });

  server.get(`${CLIENTS_BASE_PATH}/clients`, (req, res) => {
    res.status(200).json(clients);
  });

  server.get(`${CLIENTS_BASE_PATH}/getClientsList`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getClientsList);
    }, 5000);
  });

  server.get(`${CLIENTS_BASE_PATH}/links`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getLinks);
    }, 5000);
  });

  server.get(`${CLIENTS_BASE_PATH}/admin/balance/get_node_list`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(getNodeList);
    }, 5000);
  });

  server.get(`${CLIENTS_BASE_PATH}/admin/balance`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(adminBalance);
    }, 1000);
  });

  server.get(`${CLIENTS_BASE_PATH}/admin/clients/bankList`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(banks);
    }, 2000);
  });

  server.get(
    `${CLIENTS_BASE_PATH}/admin/clients/banks/:bank_id/view`,
    (req, res) => {
      const { bank_id } = req.params;
      let payload = {};
      switch (bank_id) {
        case "fortress":
          payload = clientsBankViewFortress;
          break;
        case "ibanera":
          payload = clientsBankViewIbanera;
          break;
        case "braid":
          payload = clientsBankViewBraid;
          break;
        case "crb":
          payload = clientsBankViewCrb;
          break;
        case "justwallet":
          payload = clientsBankViewJustWallet;
          break;
        case "mcb":
          payload = clientsBankViewMcb;
          break;
        case "myeupay":
          payload = clientsBankViewMyeupay;
          break;
        case "stride":
          payload = clientsBankViewStride;
          break;
        default:
          payload = {};
      }
      setTimeout(() => {
        res.status(200).json(payload);
      }, 1000);
    },
  );

  server.get(
    `${CLIENTS_BASE_PATH}/admin/clients/banks/transfer/:bank/:account/wireinstructions`,
    (req, res) => {
      res.status(200).json(wireInstructions);
    },
  );

  server.get(
    `${CLIENTS_BASE_PATH}/admin/clients/banks/transfer/:bank/:account/wiretemplates`,
    (req, res) => {
      res.status(200).json(wireTemplates);
    },
  );

  server.get(`${CLIENTS_BASE_PATH}/admin/bank_accounts`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(bankAccounts);
    }, 1000);
  });

  /* ------------------------------------------------------------------------ */
  /* CATCH-ALL - SEMPRE POR ULTIMO                                            */
  /* Casa com qualquer rota de 1 segmento; qualquer rota nova de 1 segmento   */
  /* precisa ser declarada acima deste bloco.                                 */
  /* ------------------------------------------------------------------------ */

  server.get(`${CLIENTS_BASE_PATH}/:client_id`, (req, res) => {
    const { client_id } = req.params;
    setTimeout(() => {
      res.status(200).json(client_id);
    }, 1000);
  });
}

module.exports = registerClientRoutes;
