module.exports = function getOriginalSymlinkTarget() {
  try {
    return fs.readlinkSync("yarn.lock").split(".").pop(); // returns either 'dev' or 'prod'
  } catch (error) {
    return null;
  }
}
