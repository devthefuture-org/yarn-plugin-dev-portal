const { BaseCommand } = require("@yarnpkg/cli");
const { Command, Option } = require("clipanion");

const syncEnvs = require("../lib/syncEnvs");

module.exports = class FetchCommand extends BaseCommand {
  static paths = [["dev-portal"]];
  static usage = Command.Usage({
    description: `produce two yarn.lock to seamlessly link to external local libraries you're developing using yarn portal`,
    details: `
      upgrade both version, dev and prod, of yarn.lock and package.json, and switch between them
    `,
    examples: [
      [`yarn dev-portal`, `yarn dev-portal prod`, `yarn dev-portal dev`],
    ],
  });
  args = Option.Proxy();

  async execute() {
    const [yarnEnv="dev"] = this.args;
    syncEnvs(yarnEnv);
  }
};
