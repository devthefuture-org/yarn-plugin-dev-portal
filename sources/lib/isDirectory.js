const fs = require("fs");

module.exports = function isDirectory(source) {
  if (fs.existsSync(source)) {
    const stats = fs.lstatSync(source);
    if (stats.isSymbolicLink()) {
      const realPath = fs.realpathSync(source);
      return fs.statSync(realPath).isDirectory();
    }
    return stats.isDirectory();
  }
  return false;
};
