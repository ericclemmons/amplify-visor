import { readFile, writeFile } from "fs/promises";

export default async function codemodAmplify(req, res) {
  const source = await readFile("src/index.js", "utf8");

  if (source.includes("Amplify.configure")) {
    return res.status(200).send("Amplify is already configured");
  }

  const index = source.indexOf("\n", source.lastIndexOf("\nimport") + 1) + 1;

  const updated = source
    .substr(0, index)
    .concat(
      `
// Auto-generated by Amplify Visor
import { Amplify } from "aws-amplify";
import awsConfig from "./aws-exports";
Amplify.configure(awsConfig);
`
    )
    .concat(source.substring(index));

  await writeFile("src/index.js", updated, "utf8");

  res.status(200).send(updated);
}
