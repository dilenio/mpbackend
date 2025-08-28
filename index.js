const express = require("express");
const app = express();
const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");
const mime = require("mime-types");
const fs = require("fs");
const invoicesDir = path.join(__dirname, "__mocks__", "invoices");

const server = jsonServer.create();

const routerClients = jsonServer.router(path.join(__dirname, "clients.json"));
const routerMembers = jsonServer.router(path.join(__dirname, "members.json"));

const middlewares = jsonServer.defaults();

// window.customLogoUrl = 'http://localhost:3335/logos/logo1.png';
//       window.has_commissions = 'true';
//       window.require_2fa = 'true';
//       window.logout_url = '{{$logout_url}}';
//       window.st_enabled = 'true';
//       window.design = {
//         colors: {
//           primary1: '#523ae4',
//           primary2: '#0c0b31',
//           secondary1: '#0c0b31',
//           secondary2: '#523ae4',
//           white: '#ffffff',
//         },
//         fonts: {
//           fontName: 'SofiaPro',
//         },
//         background_image: true,
//         custom_icon_url: 'http://localhost:3335/logos/logo2.png',
//       };

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
app.use(cors());

app.use("/logos", express.static(path.join(__dirname, "__mocks__", "logos")));

server.get("/api/logo1", (req, res) => {
  const logoPath = path.join(__dirname, "__mocks__", "logos", "logo1.png");

  fs.stat(logoPath, (err, stat) => {
    if (err || !stat.isFile()) {
      return res.status(404).json({ error: "Logo not found" });
    }

    // aqui usamos lookup, não getType
    const mimeType = mime.lookup(logoPath) || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);

    const stream = fs.createReadStream(logoPath);
    stream.on("error", () => res.sendStatus(500));
    stream.pipe(res);
  });
});

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

server.get("/api/members/userprofile/mfa_code", (req, res) => {
  res.status(200).json({
    url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth%3A%2F%2Ftotp%2FMassPay%2520Inc%3Adilenio.enderle%40luby.software%3Fsecret%3DIZATCZLCMJSWEOJUMJRGIMJYMNSTQNRXGY2DINJVGMZTMYZQMJRDSYRV%26issuer%3DMassPay%2520Inc&ecc=M",
  });
});

server.post("/api/members/validate_wallet_transfer", (req, res) => {
  const { transaction_id } = req.params;
  setTimeout(() => {
    res.status(200).json({
      status: "success",
      reason:
        "Compliance review required. Please provide a recent bank statement using the secure link provided. https://l.maspay.io/jfoH5",
      confirmation_code: "ABC24818250525979162772",
    });
  }, 1000);
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

server.post("/api/members/phone_confirmation", (req, res) => {
  const { code } = req.body;
  setTimeout(() => {
    res.status(200).json({
      status: "success",
      message: "Phone number confirmation susscessfully!",
    });
  }, 1000);
});

server.post("/api/members/phone_resend_code", (req, res) => {
  const { code } = req.body;
  setTimeout(() => {
    res.status(200).json({
      status: "success",
      message: "Phone number confirmation code sent successfully!",
    });
  }, 1000);
});

server.use("/api/clients", routerClients);
server.use("/api/members", routerMembers);

// PORT MUST BE 3000
const PORT = process.env.PORT || 3335;

app.use(server);

app.listen(PORT, () => {
  console.log(`JSON Server is running on PORT: ${PORT}`);
});
