const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const { MEMBERS_BASE_PATH } = require("../../constants/routes");

const exportsDir = path.join(__dirname, "..", "..", "__mocks__", "exports");

const commissions = require("../../__mocks__/members/commissions/commissions.json");
const commissionsSummary = require("../../__mocks__/members/commissions/commissions_summary.json");

function registerCommissionRoutes(server) {
  server.get(`${MEMBERS_BASE_PATH}/commissions`, (req, res) => {
    res.status(200).json(commissions);
  });

  server.get(`${MEMBERS_BASE_PATH}/commissions_summary`, (req, res) => {
    res.status(200).json(commissionsSummary);
  });

  server.get(`${MEMBERS_BASE_PATH}/commissions_download`, (req, res) => {
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }
    const filePath = path.join(exportsDir, "commissions.xlsx");

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        return res.status(404).json({
          status: "error",
          message: "Commissions file not found",
        });
      }

      const mimeType =
        mime.lookup(filePath) ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      res.setHeader("Content-Type", mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=commissions.xlsx`,
      );
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

      const stream = fs.createReadStream(filePath);
      stream.on("error", () => res.sendStatus(500));
      stream.pipe(res);
    });
  });
}

module.exports = registerCommissionRoutes;
