const switchTo = require("./switchTo");
const getOriginalSymlinkTarget = require("./getOriginalSymlinkTarget");

let log = require("./log");

module.exports = function syncEnvs(yarnEnv, options = {}) {
  if(!yarnEnv){
    yarnEnv = getOriginalSymlinkTarget() || "dev";
  }
  
  if (!["dev", "prod"].includes(yarnEnv)) {
    throw new Error(
      `Invalid yarn dev-portal env ${yarnEnv}, allowed values are "dev" or "prod"`
    );
  }
  
  yarnEnvOther = yarnEnv === "prod" ? "dev" : "prod";

  log(`setting env ${yarnEnv}`);

  switchTo(yarnEnvOther, { ...options, makeLink: false });
  
  switchTo(yarnEnv, { ...options });

  log(`env ${yarnEnv} ready`);
};
