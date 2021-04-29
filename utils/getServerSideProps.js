import { readFile } from "fs/promises";

export async function getServerSideProps(context) {
  let awsExports = null;
  let awsConfig = null;
  let pkg = null;

  try {
    // This may or may not have valid JSON inside
    awsExports = await readFile("src/aws-exports.js", "utf8");

    const [, start] = awsExports.split("const awsmobile =");
    const [rawConfig] = start.split(";\n\n");

    // Valid JSON!
    awsConfig = JSON.parse(rawConfig.trim());
  } catch (error) {}

  try {
    pkg = JSON.parse(await readFile("package.json", "utf8"));
  } catch (error) {}

  return {
    props: {
      awsConfig,
      awsExports,
      cwd: process.cwd(),
      pkg,
    },
  };
}
