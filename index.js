const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const fs = require("fs");
const mime = require("mime");
const invoicesDir = path.join(__dirname, "__mocks__", "invoices");

const server = jsonServer.create();

const routerClients = jsonServer.router(path.join(__dirname, "clients.json"));
const routerMembers = jsonServer.router(path.join(__dirname, "members.json"));

const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post("/api/clients/apikeys", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      status: "success",
      message: "API Key created successfully!",
      apiKey: "1234567890abcdef",
    });
  }, 5000);
});

server.put(
  "/api/clients/transactions/forcestatusupdate/:transaction_id",
  (req, res) => {
    const { transaction_id } = req.params;
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: "Force status update completed successfully!",
        transaction_id: transaction_id,
      });
    }, 3000);
  }
);

server.post(
  "/api/clients/transactions/issuerefund/:transaction_id",
  (req, res) => {
    const { transaction_id } = req.params;
    setTimeout(() => {
      res.status(201).json({
        status: "success",
        message: "Issue refund completed successfully!",
        transaction_id: transaction_id,
      });
    }, 3000);
  }
);

server.post("/api/members/validate_transfer", (req, res) => {
  const { transaction_id } = req.params;
  setTimeout(() => {
    res.status(200).json({
      full_name: "Dilenio Enderle IT",
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

server.post("/api/members/transfer", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      confirmation_code: "24818250525979162772",
    });
  }, 2000);
});

server.get("/api/clients/transactions/invoice/:transaction_id", (req, res) => {
  const { transaction_id } = req.params;
  const filePath = path.join(invoicesDir, `invoice.pdf`);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      return res.status(404).json({
        status: "error",
        message: `Invoice ${transaction_id} not found`,
      });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice.pdf`);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.use("/api/clients", routerClients);
server.use("/api/members", routerMembers);

// PORT MUST BE 3000
const PORT = process.env.PORT || 3335;

server.listen(PORT, () => {
  console.log(`JSON Server is running on PORT: ${PORT}`);
});
