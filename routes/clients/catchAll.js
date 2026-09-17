const { CLIENTS_BASE_PATH } = require("../../constants/routes");

function registerCatchAllRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/:client_id`, (req, res) => {
    const { client_id } = req.params;
    res.status(200).json(client_id);
  });
}

module.exports = registerCatchAllRoutes;
