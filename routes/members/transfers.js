const { MEMBERS_BASE_PATH } = require("../../constants/routes");

function registerTransferRoutes(server) {
  server.post(`${MEMBERS_BASE_PATH}/validate_transfer`, (req, res) => {
    const { transaction_id } = req.params;
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
    res.status(200).json({
      confirmation_code: "24818250525979162772",
    });
  });
}

module.exports = registerTransferRoutes;
