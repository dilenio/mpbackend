const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const currencies = require("../../__mocks__/clients/lookups/currencies.json");
const get_countries = require("../../__mocks__/clients/lookups/get_countries.json");
const services = require("../../__mocks__/clients/lookups/services.json");
const serviceFields = require("../../__mocks__/shared/serviceFields.json");
const linkServices = require("../../__mocks__/clients/lookups/link_services.json");
const search = require("../../__mocks__/clients/lookups/search.json");
const accounts = require("../../__mocks__/clients/lookups/accounts.json");
const receivers = require("../../__mocks__/clients/lookups/receivers.json");
const payers = require("../../__mocks__/clients/lookups/payers.json");
const industry = require("../../__mocks__/clients/lookups/industry.json");
const legalStructure = require("../../__mocks__/clients/lookups/legal_structure.json");
const provider = require("../../__mocks__/clients/lookups/provider.json");
const deliveryMethods = require("../../__mocks__/clients/lookups/delivery_methods.json");
const noteCategories = require("../../__mocks__/clients/lookups/note_categories.json");
const taxYearOptions = require("../../__mocks__/clients/lookups/tax_year_options.json");
const countries2 = require("../../__mocks__/clients/lookups/countries2.json");
const clientList = require("../../__mocks__/clients/lookups/client_list.json");
const assignment = require("../../__mocks__/clients/lookups/assignment.json");
const recent = require("../../__mocks__/clients/lookups/recent.json");

function registerLookupRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/accounts`, (req, res) => {
    res.status(200).json(accounts);
  });

  server.get(`${CLIENTS_BASE_PATH}/receivers`, (req, res) => {
    res.status(200).json(receivers);
  });

  server.get(`${CLIENTS_BASE_PATH}/payers`, (req, res) => {
    res.status(200).json(payers);
  });

  server.get(`${CLIENTS_BASE_PATH}/industry`, (req, res) => {
    res.status(200).json(industry);
  });

  server.get(`${CLIENTS_BASE_PATH}/legal_structure`, (req, res) => {
    res.status(200).json(legalStructure);
  });

  server.get(`${CLIENTS_BASE_PATH}/provider`, (req, res) => {
    res.status(200).json(provider);
  });

  server.get(`${CLIENTS_BASE_PATH}/delivery_methods`, (req, res) => {
    res.status(200).json(deliveryMethods);
  });

  server.get(`${CLIENTS_BASE_PATH}/note_categories`, (req, res) => {
    res.status(200).json(noteCategories);
  });

  server.get(`${CLIENTS_BASE_PATH}/tax_year_options`, (req, res) => {
    res.status(200).json(taxYearOptions);
  });

  server.get(`${CLIENTS_BASE_PATH}/countries2`, (req, res) => {
    res.status(200).json(countries2);
  });

  server.get(`${CLIENTS_BASE_PATH}/client_list`, (req, res) => {
    res.status(200).json(clientList);
  });

  server.get(`${CLIENTS_BASE_PATH}/assignment`, (req, res) => {
    res.status(200).json(assignment);
  });

  server.get(`${CLIENTS_BASE_PATH}/recent`, (req, res) => {
    res.status(200).json(recent);
  });

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
    res.status(200).json(search);
  });
}

module.exports = registerLookupRoutes;
