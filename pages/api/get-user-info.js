import crypto from "crypto";
import execa from "execa";

export default async function startProject(req, res) {
  try {
    const { stdout: name } = await execa("git", ["config", "user.name"]);
    const { stdout: email } = await execa("git", ["config", "user.email"]);
    const emailHash = crypto.createHash("md5").update(email).digest("hex");
    const userInfo = {
      name,
      email,
      imageUrl: `https://www.gravatar.com/avatar/${emailHash}?d=https%3A%2F%2Fgithub.com%2Fidenticons%2F${name}.png`,
    };
    res.status(200).send(userInfo);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
