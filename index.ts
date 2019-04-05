import { exec } from "child_process";
import { join } from "path";
import { readFile } from "fs-extra";
import { safeLoad } from "js-yaml";

export const execute = (command: string) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(error);
      resolve(stdout);
    });
  });

export const deploy = async (command: string) => {
  const config = await readFile(join(__dirname, "deployer.yml"));
  return config;
}

deploy("");
