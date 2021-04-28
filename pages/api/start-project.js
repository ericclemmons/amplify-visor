import { processes } from "../../utils/processes";

export default async function startProject(req, res) {
  try {
    res.status(200).send(processes.project());
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
