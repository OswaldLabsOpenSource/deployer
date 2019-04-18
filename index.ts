import { config } from "dotenv";
config();

import { exec } from "child_process";
import { join } from "path";
import { readFile } from "fs-extra";
import { safeLoad } from "js-yaml";
import axios from "axios";

export const execute = (command: string) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) return reject(error || stderr);
      resolve(stdout);
    });
  });

export const message = async (channel: string, text: string) =>
  axios.post(<string>process.env.WEBHOOK_URL, {
    text,
    channel,
    username: "Deployer",
    icon_url: "https://public-cdn.oswaldlabs.com/icons/deployer.png"
  });

export const deploy = async (
  command:
    | "agastya-development"
    | "agastya-staging"
    | "agastya-production"
    | "platform"
    | "berkhan"
    | "a11yisimportant"
) => {
  const config = safeLoad(
    await readFile(join(__dirname, "..", "deployer.yml"), "utf8")
  );
  if (!config[command]) throw new Error(`Invalid command: ${command}`);
  await message(
    config[command].channel,
    `Deploying ${config[command].name}...`
  );
  await execute(config[command].deploy);
  if (command.includes("notify"))
    await message(
      config[command].channel,
      `✅ Successfully deployed ${config[command].name}${config[command].url ?
        (": " + config[command].url) : ""}`
    );
  return;
};
