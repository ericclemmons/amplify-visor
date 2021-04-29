const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");
const waitForLocalhost = require("wait-for-localhost");

const { processes } = require("./utils/processes");

const dev = true; // process.env.NODE_ENV !== "production";
const dir = __dirname;
const { PORT = 1337 } = process.env;

const app = next({ dev, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    let messageId = parseInt(req.headers["Last-Event-ID"], 10) || 0;

    if (pathname === "/events") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      const refreshRate = 10000;

      setInterval(() => {
        res.write(
          `retry: ${refreshRate}\nid:${++messageId}\ndata: ${JSON.stringify(
            "❤️"
          )}\n\n`
        );
      }, refreshRate);

      return res.write(
        `retry: ${refreshRate}\nid:${++messageId}\ndata: ${JSON.stringify(
          "✅"
        )}\n\n`
      );
    }

    if (pathname === "/some-custom-path") {
      return handle(req, res);
    }

    return handle(req, res, parsedUrl);
  });

  server.listen(PORT, async (err) => {
    if (err) throw err;

    const { port } = server.address();
    const url = `http://localhost:${port}`;
    const WHITE = "\u001b[37;1m";
    const RESET = "\u001b[0m";
    const BLUE = "\u001b[34;1m";

    console.log(
      `${WHITE}𝚫 Amplify Visor${RESET} started on ${BLUE}${url}${RESET}. Opening...`
    );

    await waitForLocalhost({ port });
    await processes.visor({ port });
  });
});
