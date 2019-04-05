import { exec } from "child_process";
import { join } from "path";
import { readFile } from "fs-extra";
import { safeLoad } from "js-yaml";

export const execute = (command: string) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) return reject(error || stderr);
      resolve(stdout);
    });
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
  await execute(config[command].deploy);
  const message = `Successfully deployed ${config[command].name}`;
  return message;
};

deploy("agastya-development")
  .then(message => console.log("Done!", message))
  .catch(error => console.log("got error", error));
