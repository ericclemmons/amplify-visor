import { writeFile } from "fs/promises";

import { KEY_DOWN_ARROW, nspawn } from "../../utils/nexpect";
import Convert from "ansi-to-html";

const convert = new Convert({
  fg: "#eee",
  bg: "#222",
  newline: false,
  escapeXML: true,
  stream: true,
});

const required = (arg) => {
  throw new Error(`Missing ${arg}`);
};

export default async function saveSchema(req, res) {
  const { appId = required("appId") } = req.body;
  const url = `https://e7auv6no3g.execute-api.us-east-1.amazonaws.com/wave3Prod/AppState/${appId}`;

  const response = await fetch(url, { method: "GET" });
  const json = await response.json();
  const { schema } = json;
  const schemaPath = `/tmp/${appId}.schema`;

  res.write(`Saving schema to ${schemaPath}...`);
  await writeFile(schemaPath, schema, "utf8");

  const chain = nspawn("amplify", ["add", "api"]);

  chain
    .wait("Please select from one of the below mentioned services:")
    .sendCarriageReturn()
    .wait("Provide API name:")
    .sendCarriageReturn()
    .wait(/.*Choose the default authorization type for the API.*/)
    .sendCarriageReturn()
    .wait(/.*Enter a description for the API key.*/)
    .sendCarriageReturn()
    .wait(/.*After how many days from now the API key should expire.*/)
    .sendCarriageReturn()
    .wait(/.*Do you want to configure advanced settings for the GraphQL API.*/)
    .sendLine(KEY_DOWN_ARROW) // Down
    .wait(/.*Configure additional auth types.*/)
    .sendLine("n")
    .wait(/.*Enable conflict detection.*/)
    .sendLine("y")
    .wait(/.*Select the default resolution strategy.*/)
    .sendCarriageReturn()
    .wait(/.*Do you have an annotated GraphQL schema.*/)
    .sendLine("y")
    .wait("Provide your schema file path:")
    .sendLine(schemaPath)
    .wait(
      '"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud'
    )
    .run((err) => {
      res.status(err ? 500 : 200);
      res.end();
    });

  chain.context.process.addOnDataHandler((content) =>
    res.write(convert.toHtml(content))
  );
}
