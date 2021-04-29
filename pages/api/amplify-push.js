// import { nspawn as spawn } from "../../utils/nexpect";
import Convert from "ansi-to-html";
import { spawn } from "child_process";

export default async function addAuth(req, res) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.send(400).json({ e });
  }

  const { cwd } = body;

  res.write("Pushing your changes to the cloud...\n");
  res.write("This may take a few minutes...\n");

  //   spawn("amplify", ["push", "-y"], {
  //     cwd,
  //     stripColors: true,
  //     stdio: "inherit",
  //   })
  //     .wait("All resources are updated in the cloud")
  //     .sendEof()
  //     .run((err) => {
  //       if (!err) {
  //         console.log("success");
  //         res.write("Succesfuly pushed changes to the cloud!");
  //       } else {
  //         res.write("Error!", err);
  //         res.write("error", err);
  //       }
  //       res.end();
  //     });
  res.write("amplify push -y\n");
  const pushChanges = spawn("amplify", ["push", "-y"], {
    cwd,
  });

  pushChanges.stdout.on("data", (data) => {
    const convert = new Convert({
      fg: "#eee",
      bg: "#222",
      newline: false,
      escapeXML: true,
      stream: true,
    });

    res.write(convert.toHtml(String(data)));
  });

  pushChanges.on("close", (code) => {
    console.log(`push amplify process closed with code ${code}`);

    if (code !== 0) {
      res.end();
      return;
    }

    res.write("🚀 Push Completed!");
    res.end();
  });
}
