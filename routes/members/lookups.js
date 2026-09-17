const { MEMBERS_BASE_PATH } = require("../../constants/routes");

const serviceFields = require("../../__mocks__/shared/serviceFields.json");

function registerLookupRoutes(server) {
  server.get(`${MEMBERS_BASE_PATH}/countries`, (req, res) => {
    res.status(200).json([
      {
        name: "United States",
        code2: "US",
        code3: "USA",
        numeric: 840,
        flag: "https://www.worldometers.info/img/flags/us-flag.gif",
        id: "32d2",
      },
      {
        name: "Albania",
        code2: "AL",
        code3: "ALB",
        numeric: 8,
        flag: "https://www.worldometers.info/img/flags/al-flag.gif",
        id: "0d56",
      },
      {
        name: "Algeria",
        code2: "DZ",
        code3: "DZA",
        numeric: 12,
        flag: "https://www.worldometers.info/img/flags/ag-flag.gif",
        id: "8ec5",
      },
    ]);
  });

  server.get(`${MEMBERS_BASE_PATH}/service_fields`, (req, res) => {
    res.status(200).json(serviceFields);
  });
}

module.exports = registerLookupRoutes;
