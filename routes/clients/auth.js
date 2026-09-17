const multer = require("multer");

const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const csrf = require("../../__mocks__/shared/csrf.json");
const googleLoginUrl = require("../../__mocks__/shared/googleLoginUrl.json");
const getLoggedInUser = require("../../__mocks__/clients/auth/getLoggedInUser.json");
const getRegisterCountries = require("../../__mocks__/clients/auth/getRegisterCountries.json");

const formDataParser = multer();

function registerAuthRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/csrf`, (req, res) => {
    res.status(200).json(csrf);
  });

  server.get(`${CLIENTS_BASE_PATH}/getLoggedInUser`, (req, res) => {
    res.status(200).json(getLoggedInUser);
  });

  server.get(`${CLIENTS_BASE_PATH}/keep-alive`, (req, res) => {
    res.status(200).json({
      success: true,
    });
  });

  server.get(`${CLIENTS_BASE_PATH}/login/google_login_url`, (req, res) => {
    res.status(200).json(googleLoginUrl);
  });

  server.get(`${CLIENTS_BASE_PATH}/register/countries`, (req, res) => {
    res.status(200).json(getRegisterCountries);
  });

  server.get(`${CLIENTS_BASE_PATH}/register/testUserName`, (req, res) => {
    // res.status(429).json({
    //   success: false,
    //   errors: [
    //     "Too many requests. Please try again later."
    //   ]
    // });
    res.status(200).json({ success: true });
  });

  server.post(
    `${CLIENTS_BASE_PATH}/register`,
    formDataParser.any(),
    (req, res) => {
      const registrationData = req.body;
      console.log("Registration data:", registrationData);
      res.status(401).json({});
    },
  );
}

module.exports = registerAuthRoutes;
