import { processes } from "../../utils/processes";

export default async function stopProject(req, res) {
  try {
    const child = await processes.kill("project");
    res.status(200).send(child);
  } catch (error) {
    res.status(202).send({ message: error.message });
  }

  // Now that the response has been sent, that window can close.
  // Next, kill this process & any lingering processes
  require("tree-kill")(process.pid);
}
