import { spawn } from "child_process";

export default async function addAuth(req, res) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.send(400).json({ e });
  }

  res.write("Got Response");
  res.write(JSON.stringify(body));

  console.log("Auth Created Finished disconnected");
  res.end();
}
