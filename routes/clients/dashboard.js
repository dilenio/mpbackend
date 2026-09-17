const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const dashboardData = require("../../__mocks__/clients/dashboard/dashboard_data.json");
const dashboardDataWidgets = require("../../__mocks__/clients/dashboard/dashboard_data_widgets.json");
const dashboardDataVolume = require("../../__mocks__/clients/dashboard/dashboard_data_volume.json");
const dashboardDataDistribution = require("../../__mocks__/clients/dashboard/dashboard_data_distribution.json");
const dashboardDataTransactions = require("../../__mocks__/clients/dashboard/dashboard_data_transactions.json");
const getDashboardWallets = require("../../__mocks__/clients/dashboard/dashboard_wallets.json");
const getDashboardChart = require("../../__mocks__/clients/dashboard/dashboard_chart.json");
const getDashboardSidebar = require("../../__mocks__/clients/dashboard/dashboard_sidebar.json");
const toppayees = require("../../__mocks__/clients/dashboard/toppayees.json");
const getWalletsSummary = require("../../__mocks__/clients/dashboard/getWalletsSummary.json");
const getWalletActionsSummaryByDateRange = require("../../__mocks__/clients/dashboard/getWalletActionsSummaryByDateRange.json");

function registerDashboardRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/dashboard_data`, (req, res) => {
    res.status(200).json(dashboardData);
  });
  // server.get(`${CLIENTS_BASE_PATH}/dashboard_data_main`, (req, res) => {
  //   res.status(200).json(dashboardDataMain);
  // });
  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_widgets`, (req, res) => {
    res.status(200).json(dashboardDataWidgets);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_volume`, (req, res) => {
    res.status(200).json(dashboardDataVolume);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_distribution`, (req, res) => {
    res.status(200).json(dashboardDataDistribution);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_data_transactions`, (req, res) => {
    res.status(200).json(dashboardDataTransactions);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_wallets`, (req, res) => {
    res.status(200).json(getDashboardWallets);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_chart`, (req, res) => {
    res.status(200).json(getDashboardChart);
  });

  server.get(`${CLIENTS_BASE_PATH}/dashboard_sidebar`, (req, res) => {
    res.status(200).json(getDashboardSidebar);
  });

  server.get(`${CLIENTS_BASE_PATH}/toppayees`, (req, res) => {
    res.status(200).json(toppayees);
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
}

module.exports = registerDashboardRoutes;
