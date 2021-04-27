const required = (arg) => {
  throw new Error(`Missing ${arg}`);
};

export default async function saveSchema(req, res) {
  console.log(typeof req.body, req.body);
  const { appId = required("appId") } = req.body;
  const url = `https://e7auv6no3g.execute-api.us-east-1.amazonaws.com/wave3Prod/AppState/${appId}`;

  const response = await fetch(url, { method: "GET" });
  const json = await response.json();
  const { schema } = json;

  res.status(200).json(json);
}
