import { nspawn } from "../../utils/nexpect";
import Convert from "ansi-to-html";

const convert = new Convert({
  fg: "#eee",
  bg: "#222",
  newline: false,
  escapeXML: true,
  stream: true,
});

const defaultSettings = {
  name: "\r",
  envName: "dev",
  editor: "\r",
  appType: "\r",
  framework: "\r",
  srcDir: "\r",
  distDir: "\r",
  buildCmd: "\r",
  startCmd: "\r",
  useProfile: "\r",
  profileName: "\r",
  region: "us-east-1",
  local: false,
  disableAmplifyAppCreation: true,
};

export default function amplifyInit(req, res) {
  const s = {
    ...defaultSettings,
    ...req.body,
  };

  // NOTE! The Amplify CLI regularly ships updates that can **EASILY BREAK THIS SCRIPTING**
  // https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-e2e-core/src/init/initProjectHelper.ts
  const chain = nspawn("amplify", ["init"], { stripColors: true });

  chain
    .wait("Enter a name for the project")
    .sendLine(s.name)
    .wait("Initialize the project with the above configuration?")
    .sendLine("n")
    .wait("Enter a name for the environment")
    .sendLine(s.envName)
    .wait("Choose your default editor:")
    .sendLine(s.editor)
    .wait("Choose the type of app that you're building")
    .sendLine(s.appType)
    .wait("What javascript framework are you using")
    .sendLine(s.framework)
    .wait("Source Directory Path:")
    .sendLine(s.srcDir)
    .wait("Distribution Directory Path:")
    .sendLine(s.distDir)
    .wait("Build Command:")
    .sendLine(s.buildCmd)
    .wait("Start Command:")
    .sendLine(s.startCmd)

    .wait("Using default provider  awscloudformation")
    .wait("Select the authentication method you want to use:")
    .sendCarriageReturn()
    .wait("Please choose the profile you want to use")
    .sendLine(s.profileName)

    .wait(
      'Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything'
    )
    .run((err) => {
      res.status(err ? 500 : 200);
      res.end();
    });

  chain.context.process.addOnDataHandler((content) =>
    res.write(convert.toHtml(content))
  );
}
