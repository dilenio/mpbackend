const registerAuthRoutes = require("./auth");
const registerLookupRoutes = require("./lookups");
const registerDashboardRoutes = require("./dashboard");
const registerTransactionRoutes = require("./transactions");
const registerCustomerRoutes = require("./customers");
const registerLedgerRoutes = require("./ledger");
const registerBatchRoutes = require("./batches");
const registerApiKeyRoutes = require("./apikeys");
const registerManageUserRoutes = require("./manageUsers");
const registerUserProfileRoutes = require("./userProfile");
const registerComplianceRoutes = require("./compliance");
const registerAdminRoutes = require("./admin");
const registerCommissionRoutes = require("./commissions");
const registerCatchAllRoutes = require("./catchAll");

/*
 * ORDEM DOS MODULOS
 *
 * Cada arquivo agrupa as rotas de um assunto/pagina e, dentro dele, ficam
 * ordenadas por metodo (GET -> POST -> PUT). A regra que vale acima do
 * agrupamento: rota mais especifica sempre vem antes da rota com parametro
 * que a cobriria - vale dentro de cada arquivo E na ordem de registro abaixo.
 *
 * Conflitos que esta ordem resolve:
 *  - customers.js: POST /api/customer/:user_token/:payout_token cobre /status,
 *    /link, /spendback, /note e /generate_file_upload -> fica por ultimo no
 *    grupo. GET /api/customer/:client_id/:user_token cobre /files, /payins,
 *    /payindeposits, /FileUploadRequests, /transactions, /notes e /logins ->
 *    fica depois de todas elas.
 *  - catchAll.js: GET /:client_id casa apenas com id numerico (\d+) e fica
 *    registrado por ultimo. Como o parametro e restrito, rota nova de 1
 *    segmento com nome literal NAO e mais sombreada por ele.
 */
function registerClientRoutes(server) {
  registerAuthRoutes(server);
  registerLookupRoutes(server);
  registerDashboardRoutes(server);
  registerTransactionRoutes(server);
  registerCustomerRoutes(server);
  registerLedgerRoutes(server);
  registerBatchRoutes(server);
  registerApiKeyRoutes(server);
  registerManageUserRoutes(server);
  registerUserProfileRoutes(server);
  registerComplianceRoutes(server);
  registerAdminRoutes(server);
  registerCommissionRoutes(server);

  // SEMPRE POR ULTIMO
  registerCatchAllRoutes(server);
}

module.exports = registerClientRoutes;
