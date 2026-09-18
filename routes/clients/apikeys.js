const multer = require("multer");

const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const getApikeys = require("../../__mocks__/clients/apikeys/apikeys.json");
const newApiKey = require("../../__mocks__/clients/apikeys/newApiKey.json");
const getWebhooks = require("../../__mocks__/clients/apikeys/webhooks.json");
const webhooksEvents = require("../../__mocks__/clients/apikeys/webhooks_events.json");

const formDataParser = multer();

function registerApiKeyRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/webhooks_events`, (req, res) => {
    res.status(200).json(webhooksEvents);
  });

  server.get(`${CLIENTS_BASE_PATH}/webhooks`, (req, res) => {
    res.status(200).json(getWebhooks);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    res.status(200).json(getApikeys);
  });

  server.post(`${CLIENTS_BASE_PATH}/api/apikeys`, (req, res) => {
    res.status(200).json(newApiKey);
  });

  // Recebe FormData (o app anexa mp_csrf_name / mp_csrf_value), por isso multer.
  server.post(
    `${CLIENTS_BASE_PATH}/webhooks`,
    formDataParser.any(),
    (req, res) => {
      console.log("New webhook:", req.body);
      res.status(200).json({ status: "success" });
    },
  );

  server.put(`${CLIENTS_BASE_PATH}/api/apikeys/revoke/:key`, (req, res) => {
    const { key } = req.params;
    res.status(200).json({
      status: "success",
      message: "API Key revoked!",
      apiKey: key,
    });
  });

  server.put(`${CLIENTS_BASE_PATH}/webhooks/revoke/:key`, (req, res) => {
    const { key } = req.params;
    res.status(200).json({
      status: "success",
      message: "Webhook revoked!",
      key,
    });
  });
}

module.exports = registerApiKeyRoutes;
