const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const currencies = require("../../__mocks__/clients/lookups/currencies.json");
const get_countries = require("../../__mocks__/clients/lookups/get_countries.json");
const services = require("../../__mocks__/clients/lookups/services.json");
const serviceFields = require("../../__mocks__/shared/serviceFields.json");
const linkServices = require("../../__mocks__/clients/lookups/link_services.json");
const search = require("../../__mocks__/clients/lookups/search.json");

function registerLookupRoutes(server) {
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
