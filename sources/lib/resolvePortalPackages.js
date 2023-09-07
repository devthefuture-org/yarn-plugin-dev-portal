const path = require("path");
const fs = require("fs");

const isDirectory = require("./isDirectory");
const log = require("./log");

module.exports = function resolvePortalPackages(portalRoot) {
  const portalPaths = [];

  if (!isDirectory(portalRoot)) {
    return portalPaths;
  }

  const packages = fs.readdirSync(portalRoot);
  const addResolution = (name, dirPath) => {
    portalPaths.push({
      name: name,
      path: dirPath,
    });
    log(`found package ${name} that will resolve to portal "${dirPath}"`);
  };

  for (let pkg of packages) {
    const pkgPath = path.join(portalRoot, pkg);
    if (pkg.startsWith("@")) {
      const scopedPackages = fs.readdirSync(pkgPath);
      for (let scopedPkg of scopedPackages) {
        const scopedPkgPath = path.join(pkgPath, scopedPkg);
        if (isDirectory(scopedPkgPath)) {
          addResolution(`${pkg}/${scopedPkg}`, scopedPkgPath)
        }
      }
    } else if (isDirectory(pkgPath)) {
      addResolution(pkg, pkgPath)
    }
  }

  return portalPaths;
};
