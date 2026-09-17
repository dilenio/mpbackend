const { MEMBERS_BASE_PATH } = require("../../constants/routes");

function registerConfirmationRoutes(server) {
  server.post(`${MEMBERS_BASE_PATH}/phone_confirmation`, (req, res) => {
    const { code } = req.body;
    res.status(200).json({
      status: "success",
      message: "Phone number confirmation susscessfully!",
    });
  });

  server.post(`${MEMBERS_BASE_PATH}/phone_resend_code`, (req, res) => {
    const { code } = req.body;
    res.status(200).json({
      status: "success",
      message: "Phone number confirmation code sent successfully!",
    });
  });

  server.post(`${MEMBERS_BASE_PATH}/email_confirmation`, (req, res) => {
    const { code } = req.body;
    res.status(200).json({
      status: "success",
      message: "Email number confirmation susscessfully!",
    });
  });

  server.post(`${MEMBERS_BASE_PATH}/email_resend_code`, (req, res) => {
    const { code } = req.body;
    res.status(200).json({
      status: "success",
      message: "Email confirmation code sent successfully!",
    });
  });
}

module.exports = registerConfirmationRoutes;
