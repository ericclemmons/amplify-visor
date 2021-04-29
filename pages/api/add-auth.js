// import { spawn } from "child_process";
import { nspawn as spawn } from "../../utils/nexpect";
export const KEY_UP_ARROW = "\x1b[A";
export const KEY_DOWN_ARROW = "\x1b[B";

export default async function addAuth(req, res) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.send(400).json({ e });
  }

  const {
    cwd,
    userNameSignIn,
    emailOrPhoneNumberSignIn,
    emailSignIn,
    phoneNumberSignIn,
  } = body;

  const signIn = [
    {
      enabled: userNameSignIn,
      selection: 0,
    },
    { selection: 1, enabled: emailSignIn },
    { selection: 2, enabled: phoneNumberSignIn },
    { selection: 3, enabled: emailOrPhoneNumberSignIn },
  ].filter((en) => en.enabled === "true");

  res.write("Adding auth to your app...\n");

  // default
  spawn("amplify", ["add", "auth"], {
    cwd,
    stripColors: true,
    stdio: "inherit",
  })
    .wait("Do you want to use the default authentication")
    .sendCarriageReturn()
    .wait("How do you want users to be able to sign in")
    .send(KEY_DOWN_ARROW, signIn[0].selection)
    .sendCarriageReturn()
    .wait("Do you want to configure advanced settings?")
    .sendCarriageReturn()
    .sendEof()
    .run((err) => {
      if (!err) {
        console.log("success");
        res.write("Succesfuly added auth to your app...");
      } else {
        res.write("error", err);
      }
      console.log("Auth Created Finished disconnected");
      res.end();
    });
}
