const fs = require("fs");
const path = require("path");

const DevPortalCommand = require("./commands/dev-portal");
const syncEnvs = require("./lib/syncEnvs");

const cwd = process.cwd();
if (
  !fs.existsSync(path.join(cwd, "yarn.lock")) &&
  fs.existsSync(path.join(cwd, "yarn.lock.prod"))
) {
  fs.symlinkSync("yarn.lock.prod", "yarn.lock");
}
if (
  !fs.existsSync(path.join(cwd, "package.json")) &&
  fs.existsSync(path.join(cwd, "package.json.prod"))
) {
  fs.symlinkSync("package.json.prod", "package.json");
}

module.exports = {
  commands: [DevPortalCommand],
  hooks: {
    afterAllInstalled: async (_project) => {
      if (process.env.INSIDE_YARN_DEV_PORTAL === "true") {
        return;
      }
      syncEnvs(null);
    },
  },
};
