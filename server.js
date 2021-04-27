const { createServer } = require("http");
const next = require("next");
const open = require("open");
const { parse } = require("url");
const waitForLocalhost = require("wait-for-localhost");

const dir = __dirname;
// Test if we're in the monorepo
const dev =
  process.env.NODE_ENV === "production"
    ? false
    : __dirname.includes("dist")
    ? false
    : __dirname.includes("amplify-visor");

const { PORT = 1337 } = process.env;
const WHITE = "\u001b[37;1m";
const RESET = "\u001b[0m";
const app = next({ dev, dir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/api") {
        handle(req, res);
      } else {
        app.render(req, res, "/", query);
      }
    }).listen(PORT, async (err) => {
      if (err) throw err;

      // TODO Don't start automatically, but do this via an API call in the dashboard
      // console.log(
      //   `${WHITE}𝚫 Amplify Visor${RESET} waiting for http://localhost:3000/ to start...`
      // );
      // await waitForLocalhost({ port: 3000 });

      const url = `http://localhost:${PORT}`;

      console.log(`${WHITE}𝚫 Amplify Visor${RESET} started on ${url}`);
      open(url, { url: true });
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
