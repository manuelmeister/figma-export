"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const utils_1 = require("@figma-export/utils");
const core_1 = __importDefault(require("@svgr/core"));
const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");
module.exports = ({ output, getDirname = (options) => `${options.pageName}${path.sep}${options.dirname}`, getComponentName = (options) => `${utils_1.pascalCase(options.basename)}`, getFileExtension = () => '.jsx', getSvgrConfig = () => ({}), }) => {
    makeDir.sync(output);
    const indexJs = {};
    return (pages) => __awaiter(void 0, void 0, void 0, function* () {
        pages.forEach(({ name: pageName, components }) => {
            components.forEach(({ name: componentName, svg, figmaExport }) => {
                const options = Object.assign({ pageName,
                    componentName }, figmaExport);
                const reactComponentName = getComponentName(options);
                const basename = `${reactComponentName}${getFileExtension(options)}`;
                const filePath = makeDir.sync(path.resolve(output, getDirname(options)));
                indexJs[filePath] = indexJs[filePath] || [];
                indexJs[filePath].push(`export { default as ${reactComponentName} } from './${basename}';`);
                const svgrConfig = getSvgrConfig(options);
                const svgrState = { componentName: reactComponentName };
                const jsCode = core_1.default.sync(svg, svgrConfig, svgrState);
                fs.writeFileSync(path.resolve(filePath, basename), jsCode);
            });
            Object.entries(indexJs).forEach(([filePath, exports]) => {
                fs.writeFileSync(path.resolve(filePath, 'index.js'), exports.join('\n'));
            });
        });
    });
};
//# sourceMappingURL=index.js.map