const { CLIENTS_BASE_PATH } = require("../../constants/routes");

function registerUserProfileRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/userprofile/mfa_code`, (req, res) => {
    res.status(200).json({
      url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth%3A%2F%2Ftotp%2FMassPay%2520Inc%3Adilenio.enderle%40luby.software%3Fsecret%3DIZATCZLCMJSWEOJUMJRGIMJYMNSTQNRXGY2DINJVGMZTMYZQMJRDSYRV%26issuer%3DMassPay%2520Inc&ecc=M",
    });
  });

  server.put(`${CLIENTS_BASE_PATH}/security`, (req, res) => {
    const { user_token } = req.params;
    const { file_type } = req.body;
    console.log("User token:", user_token, "File Type:", file_type);
    res.status(200).json({
      status: "success",
      message: "File upload notified successfully!",
    });
  });
}

module.exports = registerUserProfileRoutes;
