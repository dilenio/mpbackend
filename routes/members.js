const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const { MEMBERS_BASE_PATH } = require("../constants/routes");

const exportsDir = path.join(__dirname, "..", "__mocks__", "exports");

/* -------------------------------------------------------------------------- */
/* MOCKS                                                                      */
/* -------------------------------------------------------------------------- */

// Reference data / Lookups
const serviceFields = require("../__mocks__/serviceFields.json");

/*
 * ORDEM DAS ROTAS
 *
 * Agrupadas por assunto/pagina e, dentro de cada grupo, por metodo
 * (GET -> POST -> PUT). Regra que vale acima do agrupamento: rota mais
 * especifica sempre antes da rota com parametro que a cobriria.
 *
 * Hoje a unica rota com parametro e GET /file_upload/:token/init (3 segmentos,
 * sufixo literal), entao nao ha sombreamento entre as rotas deste arquivo.
 * Nao existe catch-all aqui - se um /:algo for adicionado, ele precisa ficar
 * no fim do arquivo.
 */
function registerMemberRoutes(server) {
  /* ------------------------------------------------------------------------ */
  /* REFERENCE DATA / LOOKUPS                                                 */
  /* ------------------------------------------------------------------------ */

  server.get(`${MEMBERS_BASE_PATH}/countries`, (req, res) => {
    setTimeout(() => {
      res.status(200).json([
        {
          name: "Afghanistan",
          code2: "AF",
          code3: "AFG",
          numeric: 4,
          flag: "https://www.worldometers.info/img/flags/af-flag.gif",
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
    }, 1000);
  });

  server.get(`${MEMBERS_BASE_PATH}/service_fields`, (req, res) => {
    setTimeout(() => {
      res.status(200).json(serviceFields);
    }, 2000);
  });

  /* ------------------------------------------------------------------------ */
  /* USER PROFILE / SECURITY                                                  */
  /* ------------------------------------------------------------------------ */

  server.get(`${MEMBERS_BASE_PATH}/userprofile/mfa_code`, (req, res) => {
    res.status(200).json({
      url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth%3A%2F%2Ftotp%2FMassPay%2520Inc%3Adilenio.enderle%40luby.software%3Fsecret%3DIZATCZLCMJSWEOJUMJRGIMJYMNSTQNRXGY2DINJVGMZTMYZQMJRDSYRV%26issuer%3DMassPay%2520Inc&ecc=M",
    });
  });

  server.put(`${MEMBERS_BASE_PATH}/user_profile`, (req, res) => {
    res.status(200).json({
      status: "success",
      message: "User profile updated!",
    });
  });

  server.put(`${MEMBERS_BASE_PATH}/security`, (req, res) => {
    const { code } = req.body;
    setTimeout(() => {
      res.status(401).json({
        status: "fail",
        message: "Security updated successfully!",
      });
    }, 1000);
  });

  /* ------------------------------------------------------------------------ */
  /* CONFIRMATIONS (PHONE / EMAIL)                                            */
  /* ------------------------------------------------------------------------ */

  server.post(`${MEMBERS_BASE_PATH}/phone_confirmation`, (req, res) => {
    const { code } = req.body;
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "Phone number confirmation susscessfully!",
      });
    }, 1000);
  });

  server.post(`${MEMBERS_BASE_PATH}/phone_resend_code`, (req, res) => {
    const { code } = req.body;
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "Phone number confirmation code sent successfully!",
      });
    }, 1000);
  });

  server.post(`${MEMBERS_BASE_PATH}/email_confirmation`, (req, res) => {
    const { code } = req.body;
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "Email number confirmation susscessfully!",
      });
    }, 1000);
  });

  server.post(`${MEMBERS_BASE_PATH}/email_resend_code`, (req, res) => {
    const { code } = req.body;
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "Email confirmation code sent successfully!",
      });
    }, 1000);
  });

  /* ------------------------------------------------------------------------ */
  /* TRANSFERS                                                                */
  /* ------------------------------------------------------------------------ */

  server.post(`${MEMBERS_BASE_PATH}/validate_transfer`, (req, res) => {
    const { transaction_id } = req.params;
    setTimeout(() => {
      res.status(200).json({
        full_name: "Dilenio Enderle MASSPAY",
        payout_token: "zvm2rqh.qdj1wgw3DRT",
        amount: {
          value: 999,
          currency: "USD",
        },
        fee: {
          value: 1.0,
          currency: "USD",
        },
        exchange_rate: {
          value: 1.1233578238,
          currency: "USDT",
        },
      });
    }, 2000);
  });

  server.post(`${MEMBERS_BASE_PATH}/validate_wallet_transfer`, (req, res) => {
    const { transaction_id } = req.params;

    res.status(200).json({
      status: "success",
      message: "Wallet transfer validated successfully!",
      confirmation_code: "ABC24818250525979162772",
    });
  });

  server.post(`${MEMBERS_BASE_PATH}/transfer`, (req, res) => {
    setTimeout(() => {
      res.status(200).json({
        confirmation_code: "24818250525979162772",
      });
    }, 2000);
  });

  /* ------------------------------------------------------------------------ */
  /* FILE UPLOAD                                                              */
  /* ------------------------------------------------------------------------ */

  server.get(`${MEMBERS_BASE_PATH}/file_upload/:token/init`, (req, res) => {
    console.log("File upload init called with token:", req.params.token);
    res.status(200).json({
      name: "Dilenio Enderle",
      types: ["BASIC", "New One"],
    });
  });

  /* ------------------------------------------------------------------------ */
  /* COMMISSIONS / EXPORTS                                                    */
  /* ------------------------------------------------------------------------ */

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

module.exports = registerMemberRoutes;
