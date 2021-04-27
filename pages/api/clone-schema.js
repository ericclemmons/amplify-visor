import puppeteer from "puppeteer-extra";

// Needed so headless works!
const args = [
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36"',
];

// Only disable headless when explicitly "false"
const headless = process.env.HEADLESS === "false" ? false : true;
const delay = 50;
const slowMo = 2 * delay;

export default async function cloneSchema(req, res) {
  const { appId = "d96b33a6-a2e8-41b8-8f01-322317f1f1d8" } = req.body;

  const browser = await puppeteer.launch({ args, headless, slowMo });
  const page = await browser.newPage();

  await page.goto(
    `https://sandbox.amplifyapp.com/schema-design/${appId}/clone`
  );

  await page.waitForNavigation();

  const url = await page.evaluate(() => {
    return window.location.href;
  });

  const clonedAppId = url.split("/").pop();

  await browser.close();

  res.status(200).json({ appId, clonedAppId, url });
}
