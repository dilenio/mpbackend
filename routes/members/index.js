const registerAuthRoutes = require("./auth");
const registerLookupRoutes = require("./lookups");
const registerDashboardRoutes = require("./dashboard");
const registerCardRoutes = require("./cards");
const registerUserProfileRoutes = require("./userProfile");
const registerConfirmationRoutes = require("./confirmations");
const registerTransferRoutes = require("./transfers");
const registerFileUploadRoutes = require("./fileUpload");
const registerCommissionRoutes = require("./commissions");

/*
 * ORDEM DOS MODULOS
 *
 * Cada arquivo agrupa as rotas de um assunto/pagina e, dentro dele, ficam
 * ordenadas por metodo (GET -> POST -> PUT). Regra que vale acima do
 * agrupamento: rota mais especifica sempre antes da rota com parametro que a
 * cobriria.
 *
 * Hoje a unica rota com parametro e GET /file_upload/:token/init (3 segmentos,
 * sufixo literal), entao nao ha sombreamento entre os modulos. Nao existe
 * catch-all aqui - se um /:algo for adicionado, ele precisa ser registrado
 * por ultimo.
 */
function registerMemberRoutes(server) {
  registerAuthRoutes(server);
  registerLookupRoutes(server);
  registerDashboardRoutes(server);
  registerCardRoutes(server);
  registerUserProfileRoutes(server);
  registerConfirmationRoutes(server);
  registerTransferRoutes(server);
  registerFileUploadRoutes(server);
  registerCommissionRoutes(server);
}

module.exports = registerMemberRoutes;
