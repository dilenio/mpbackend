const { CLIENTS_BASE_PATH, MEMBERS_BASE_PATH } = require("../constants/routes");

const startedAt = new Date();

function uptime() {
  const total = Math.floor(process.uptime());
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function registerRootRoutes(server) {
  server.get("/", (req, res) => {
    res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MP Mock API</title>
    <style>
      :root { color-scheme: light dark; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
        background: #f6f7f9;
        color: #0c0b31;
      }
      .card {
        background: #fff;
        border-radius: 12px;
        padding: 32px 40px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        max-width: 420px;
      }
      h1 { font-size: 20px; margin: 0 0 4px; }
      .status { display: flex; align-items: center; gap: 8px; margin: 16px 0; font-weight: 600; }
      .dot { width: 10px; height: 10px; border-radius: 50%; background: #16a34a; }
      dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; margin: 0; font-size: 14px; }
      dt { color: #6b7280; }
      dd { margin: 0; font-family: ui-monospace, SFMono-Regular, monospace; }
      p { margin: 0; color: #6b7280; font-size: 14px; }
      @media (prefers-color-scheme: dark) {
        body { background: #0c0b31; color: #f6f7f9; }
        .card { background: #17163f; box-shadow: none; }
        dt, p { color: #a1a1aa; }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>MP Mock API</h1>
      <p>Mock server for the clients and members front-ends.</p>
      <div class="status"><span class="dot"></span> Up and running</div>
      <dl>
        <dt>Clients</dt><dd>${CLIENTS_BASE_PATH}</dd>
        <dt>Members</dt><dd>${MEMBERS_BASE_PATH}</dd>
        <dt>Started</dt><dd>${startedAt.toLocaleString("en-US")}</dd>
        <dt>Uptime</dt><dd>${uptime()}</dd>
      </dl>
    </div>
  </body>
</html>`);
  });

  server.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      started_at: startedAt.toISOString(),
      uptime: uptime(),
    });
  });
}

module.exports = registerRootRoutes;
