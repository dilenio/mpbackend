const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();

const routerClients = jsonServer.router(path.join(__dirname, "clients.json"));
const routerMembers = jsonServer.router(path.join(__dirname, "members.json"));

const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use("/api/clients", routerClients);
server.use("/api/members", routerMembers);

// PORT MUST BE 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on PORT: ${PORT}`);
});
