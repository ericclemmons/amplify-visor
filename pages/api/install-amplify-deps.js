import { spawn } from "child_process";

export default async function installAmplifyDeps(req, res) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.send(400).json({ e });
  }

  const { project_name, project_location } = body;

  res.write("yarn add aws-amplify @aws-amplify/ui-react");
  const installAmplifyPackages = spawn(
    "yarn",
    ["add", "aws-amplify", "@aws-amplify/ui-react"],
    {
      cwd: `${project_location}/${project_name}`,
    }
  );

  installAmplifyPackages.stdout.on("data", (data) => {
    res.write(data);
  });

  installAmplifyPackages.on("close", (code) => {
    console.log(`install amplify process closed with code ${code}`);

    if (code !== 0) {
      res.end();
      return;
    }

    res.write("🚀 Created project!");
    res.end();
  });
}
