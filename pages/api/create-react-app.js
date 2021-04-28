import { spawn } from "child_process";

export default async function createReactApp(req, res) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.send(400).json({ e });
  }

  const { project_name, project_location } = body;

  if (!project_name) {
    res.status(400);
    return;
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
      res.status(400);
      return;
    }

    // Switch to this new directory for the next commands, as if `amplify-visor` was ran in this directory
    process.chdir(`${project_location}/${project_name}`);

    res.end();
  });

  createReactApp.on("disconnect", () => {
    console.log("create-react-app disconnected");
    res.end();
  });
}
