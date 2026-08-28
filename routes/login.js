const multer = require("multer");

const LOGIN_BASE_PATH = "/api/login";

/* -------------------------------------------------------------------------- */
/* MOCKS                                                                      */
/* -------------------------------------------------------------------------- */

// Session / CSRF
const csrf = require("../__mocks__/csrf.json");

// Login
const googleLoginUrl = require("../__mocks__/googleLoginUrl.json");
const login = require("../__mocks__/login.json");

// Account
const activate = require("../__mocks__/activate.json");
const resetPassword = require("../__mocks__/resetPassword.json");

const formDataParser = multer();

/*
 * ORDEM DAS ROTAS
 *
 * Agrupadas por assunto e, dentro de cada grupo, por metodo (GET -> POST).
 * Todas as rotas aqui sao literais (sem parametros), entao nenhuma sombreia
 * a outra. Ao adicionar rota com parametro (ex: /:token), declare-a depois
 * das literais do mesmo grupo.
 */
function registerLoginRoutes(server) {
  /* ------------------------------------------------------------------------ */
  /* SESSION / CSRF                                                           */
  /* ------------------------------------------------------------------------ */

  server.get(`${LOGIN_BASE_PATH}/csrf`, (req, res) => {
    res.status(200).json(csrf);
  });

  /* ------------------------------------------------------------------------ */
  /* LOGIN                                                                    */
  /* ------------------------------------------------------------------------ */

  server.get(`${LOGIN_BASE_PATH}/google_login_url`, (req, res) => {
    res.status(200).json(googleLoginUrl);
  });

  server.post(`${LOGIN_BASE_PATH}/login`, formDataParser.any(), (req, res) => {
    if (req.body.mfa_code && req.body.mfa_code !== "") {
      setTimeout(() => {
        res.status(200).json(login);
      }, 3000);
    } else {
      setTimeout(() => {
        res.status(200).json({ status: "mfa" });
      }, 2000);
    }
  });

  /* ------------------------------------------------------------------------ */
  /* ACCOUNT                                                                  */
  /* ------------------------------------------------------------------------ */

  server.post(
    `${LOGIN_BASE_PATH}/activate`,
    formDataParser.any(),
    (req, res) => {
      res.status(200).json(activate);
    },
  );

  server.post(
    `${LOGIN_BASE_PATH}/reset_password`,
    formDataParser.any(),
    (req, res) => {
      res.status(200).json(resetPassword);
    },
  );
}

module.exports = registerLoginRoutes;
