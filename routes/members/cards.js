const { MEMBERS_BASE_PATH } = require("../../constants/routes");

const cards = require("../../__mocks__/members/cards/cards.json");
const cardInfo = require("../../__mocks__/members/cards/card_info.json");

function registerCardRoutes(server) {
  server.get(`${MEMBERS_BASE_PATH}/cards`, (req, res) => {
    res.status(200).json(cards);
  });

  server.get(`${MEMBERS_BASE_PATH}/card_info`, (req, res) => {
    res.status(200).json(cardInfo);
  });
}

module.exports = registerCardRoutes;
