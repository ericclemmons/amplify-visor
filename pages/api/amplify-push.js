import { nspawn } from "../../utils/nexpect";
import Convert from "ansi-to-html";

const convert = new Convert({
  fg: "#eee",
  bg: "#222",
  newline: false,
  escapeXML: true,
  stream: true,
});

const pushTimeoutMS = 1000 * 60 * 20; // 20 minutes;

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-e2e-core/src/init/amplifyPush.ts
export default async function amplifyPush(req, res) {
  const chain = nspawn("amplify", ["push", "--force"], {
    noOutputTimeout: pushTimeoutMS,
  });

  chain
    .wait("Are you sure you want to continue?")
    .sendLine("y")
    .wait(/.*/)
    .run((err) => {
      res.status(err ? 500 : 200);
      res.end();
    });

  chain.context.process.addOnDataHandler((content) =>
    res.write(convert.toHtml(content))
  );
}
