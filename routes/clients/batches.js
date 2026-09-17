const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const multer = require("multer");

const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const getBatchesTemplates = require("../../__mocks__/clients/batches/batchesTemplates.json");
const getBatches = require("../../__mocks__/clients/batches/getBatches.json");

const exportsDir = path.join(__dirname, "..", "..", "__mocks__", "exports");

const formDataParser = multer();

function registerBatchRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/api/batchesTemplates`, (req, res) => {
    res.status(200).json(getBatchesTemplates);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/batches`, (req, res) => {
    res.status(200).json(getBatches);
  });

  server.get(`${CLIENTS_BASE_PATH}/api/batches/download/:file`, (req, res) => {
    const fileName = path.basename(req.params.file);
    const filePath = path.join(exportsDir, "batch.xlsx");

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        return res.status(404).json({
          status: "error",
          message: `Batch file ${fileName} not found`,
        });
      }

      const mimeType =
        mime.lookup(fileName) ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      res.setHeader("Content-Type", mimeType);
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

      const stream = fs.createReadStream(filePath);
      stream.on("error", () => res.sendStatus(500));
      stream.pipe(res);
    });
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
