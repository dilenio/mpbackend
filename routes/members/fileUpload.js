const { MEMBERS_BASE_PATH } = require("../../constants/routes");

function registerFileUploadRoutes(server) {
  server.get(`${MEMBERS_BASE_PATH}/file_upload/:token/init`, (req, res) => {
    console.log("File upload init called with token:", req.params.token);
    res.status(200).json({
      name: "Dilenio Enderle",
      types: ["BASIC", "New One"],
    });
  });
}

module.exports = registerFileUploadRoutes;
