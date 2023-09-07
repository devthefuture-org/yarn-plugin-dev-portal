const path = require("path");
const fs = require("fs");
const os = require("os");
const { execSync } = require("child_process");

const resolvePortalPackages = require("./resolvePortalPackages");

const rootDir = process.cwd();
const portalDirName = ".yarn-dev-portal";

const log = require("./log");

module.exports = function switchTo(
  target,
  { makeLink = true, yarnInstallProcessEnv = {} } = {}
) {
  const packageJsonPath = path.join(rootDir, "package.json");
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, { encoding: "utf-8" })
  );

  // Load from user's home directory first
  const homePortalDir = path.join(os.homedir(), portalDirName);
  let portals = resolvePortalPackages(homePortalDir);

  // Load (or override) from local directory
  const localPortalDir = path.join(rootDir, portalDirName);
  portals = [...portals, ...resolvePortalPackages(localPortalDir)];

  if (target === "dev") {
    for (let portal of portals) {
      packageJson.resolutions[portal.name] = `portal:${portal.path}`;
    }
  } else {
    for(const resolutionName of Object.keys(packageJson.resolutions)){
      if (packageJson.resolutions[resolutionName].startsWith("portal:")) {
        delete packageJson.resolutions[resolutionName];
      }
    }
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  log(`installing ${target}`);
  execSync("yarn", {
    stdio: "inherit",
    env: {
      ...process.env,
      INSIDE_YARN_DEV_PORTAL: "true",
      ...yarnInstallProcessEnv,
    },
  });

  log(`creating ${target} files`);
  fs.copyFileSync("yarn.lock", `yarn.lock.${target}`);
  fs.copyFileSync("package.json", `package.json.${target}`);

  if (makeLink) {
    log(`linking to ${target} files`);
    if (fs.existsSync("package.json")) {
      fs.unlinkSync("package.json");
    }
    fs.symlinkSync(`package.json.${target}`, "package.json");

    if (fs.existsSync("yarn.lock")) {
      fs.unlinkSync("yarn.lock");
    }
    fs.symlinkSync(`yarn.lock.${target}`, "yarn.lock");
  }
};
