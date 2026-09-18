const { CLIENTS_BASE_PATH } = require("../../constants/routes");

/*
 * Fallback de client_id numerico.
 *
 * O parametro e restrito a \d+ de proposito: sem a restricao ele casava com
 * QUALQUER rota de um segmento (ex.: /dashboard_data_volume) e devolvia 200 com
 * o proprio nome do endpoint no corpo. Com ETag do Express, a segunda chamada
 * virava 304 e o app renderizava a string cacheada - endpoint removido ou
 * comentado nunca chegava a dar 404.
 */
function registerCatchAllRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/:client_id(\\d+)`, (req, res) => {
    const { client_id } = req.params;
    res.status(200).json(client_id);
  });
}

module.exports = registerCatchAllRoutes;
