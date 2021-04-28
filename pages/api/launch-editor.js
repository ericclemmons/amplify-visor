import launchEditor from "react-dev-utils/launchEditor";

export default async function launchEditorApi(req, res) {
  const { fileName = process.cwd(), lineNumber = 1, colNumber = 1 } = req.body;

  launchEditor(fileName, lineNumber, colNumber);

  res.status(200).end();
}
