const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const getPricingRules = require("../../__mocks__/clients/admin/adminPricingRules.json");
const adminBalance = require("../../__mocks__/clients/admin/adminBalance.json");
const getNodeList = require("../../__mocks__/clients/admin/getNodeList.json");
const bankAccounts = require("../../__mocks__/clients/admin/bankAccounts.json");
const banks = require("../../__mocks__/clients/admin/banks.json");
const clientsBankViewFortress = require("../../__mocks__/clients/admin/clientsBankView-fortress.json");
const clientsBankViewIbanera = require("../../__mocks__/clients/admin/clientsBankView-ibanera.json");
const clientsBankViewBraid = require("../../__mocks__/clients/admin/clientsBankView-braid.json");
const clientsBankViewCrb = require("../../__mocks__/clients/admin/clientsBankView-crb.json");
const clientsBankViewJustWallet = require("../../__mocks__/clients/admin/clientsBankView-justwallet.json");
const clientsBankViewMcb = require("../../__mocks__/clients/admin/clientsBankView-mcb.json");
const clientsBankViewMyeupay = require("../../__mocks__/clients/admin/clientsBankView-myeupay.json");
const clientsBankViewStride = require("../../__mocks__/clients/admin/clientsBankView-stride.json");
const wireInstructions = require("../../__mocks__/clients/admin/wireinstructions.json");
const wireTemplates = require("../../__mocks__/clients/admin/wiretemplates.json");
const clients = require("../../__mocks__/clients/admin/clients.json");
const getClientsList = require("../../__mocks__/clients/admin/getClientsList.json");
const getLinks = require("../../__mocks__/clients/admin/getLinks.json");

function registerAdminRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/pricing_rules`, (req, res) => {
    res.status(200).json(getPricingRules);
  });

  server.get(`${CLIENTS_BASE_PATH}/clients`, (req, res) => {
    res.status(200).json(clients);
  });

  server.get(`${CLIENTS_BASE_PATH}/getClientsList`, (req, res) => {
    res.status(200).json(getClientsList);
  });

  server.get(`${CLIENTS_BASE_PATH}/links`, (req, res) => {
    res.status(200).json(getLinks);
  });

  server.get(`${CLIENTS_BASE_PATH}/admin/balance/get_node_list`, (req, res) => {
    res.status(200).json(getNodeList);
  });

  server.get(`${CLIENTS_BASE_PATH}/admin/balance`, (req, res) => {
    const { client_id } = req.params;
    res.status(200).json(adminBalance);
  });

  server.get(`${CLIENTS_BASE_PATH}/admin/clients/bankList`, (req, res) => {
    const { client_id } = req.params;
    res.status(200).json(banks);
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
      res.status(200).json(payload);
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
    res.status(200).json(bankAccounts);
  });
}

module.exports = registerAdminRoutes;
