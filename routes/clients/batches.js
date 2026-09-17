const multer = require("multer");

const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const getBatchesTemplates = require("../../__mocks__/clients/batches/batchesTemplates.json");
const getBatches = require("../../__mocks__/clients/batches/getBatches.json");

const formDataParser = multer();

function registerBatchRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/api/batchesTemplates`, (req, res) => {
    res.status(200).json(getBatchesTemplates);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/batches`, (req, res) => {
    res.status(200).json(getBatches);
  });

  server.get(`${CLIENTS_BASE_PATH}/batch_templates/:template_id`, (req, res) => {
    const { template_id } = req.params;
    res.status(200).json({ template_id });
  });

  server.post(
    `${CLIENTS_BASE_PATH}/api/batches/upload`,
    formDataParser.any(),
    (req, res) => {
      const registrationData = req.body;
      console.log("Registration data:", registrationData);
      res.status(200).json({ complete: true });
    },
  );
}

module.exports = registerBatchRoutes;
