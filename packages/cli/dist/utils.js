"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePackages = void 0;
const fs = require("fs");
const path = require("path");
const resolveNameOrPath = (nameOrPath) => {
    const absolutePath = path.resolve(nameOrPath);
    return fs.existsSync(absolutePath) ? absolutePath : nameOrPath;
};
// eslint-disable-next-line @typescript-eslint/ban-types
exports.requirePackages = (packages, baseOptions = {}) => {
    return packages.map((pkg) => {
        if (typeof pkg === 'function') {
            return pkg;
        }
        const pkgNameOrPath = resolveNameOrPath(pkg);
        // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
        return require(pkgNameOrPath)(baseOptions);
    });
};
//# sourceMappingURL=utils.js.map