const express = require("express");
const cors = require("cors");
const path = require("path");
const mime = require("mime-types");
const fs = require("fs");
const registerClientRoutes = require("./routes/clients");
const registerMemberRoutes = require("./routes/members");
const registerLoginRoutes = require("./routes/login");
const multer = require("multer");
const { get } = require("http");

const server = express();

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
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/logos", express.static(path.join(__dirname, "__mocks__", "logos")));
server.use(
  "/invoices",
  express.static(path.join(__dirname, "__mocks__", "invoices")),
);

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
server.get("/api/logo2", (req, res) => {
  const logoPath = path.join(__dirname, "__mocks__", "logos", "logo2.png");

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
server.get("/api/masspay", (req, res) => {
  const logoPath = path.join(__dirname, "__mocks__", "logos", "masspay.png");

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

registerClientRoutes(server);
registerMemberRoutes(server);
registerLoginRoutes(server);

// PORT MUST BE 3000
const PORT = process.env.PORT || 3335;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`API rodando em http://0.0.0.0:${PORT}`);
});
