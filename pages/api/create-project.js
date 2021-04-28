import { spawn } from "child_process";

export default async function createProject(req, res) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.send(400).json({ e });
  }

  const { project_name, project_location } = body;

  if (!project_name) {
    res.status(400);
  }

  res.write(`cd ${project_location} && npx create-react-app ${project_name}`);

  const createReactApp = spawn("npx", ["create-react-app", project_name], {
    cwd: project_location,
  });

  createReactApp.stdout.on("data", (data) => {
    res.write(data);
  });

  createReactApp.on("error", (error) => {
    console.error(error);
    res.write(error.message);
  });

  createReactApp.on("close", (code) => {
    console.log(`create-react-app process closed with code ${code}`);

    if (code !== 0) {
      res.end();
      return;
    }

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
  });

  createReactApp.on("disconnect", () => {
    console.log("create-react-app disconnected");
    res.end();
  });
}
