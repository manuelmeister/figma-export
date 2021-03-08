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
const make_dir_1 = __importDefault(require("make-dir"));
const utils_1 = require("@figma-export/utils");
const fs = require("fs");
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgToMiniDataURI = require('mini-svg-data-uri');
module.exports = ({ output, getVariableName = (options) => utils_1.camelCase(options.componentName.trim()), useBase64 = false, useDataUrl = false, }) => {
    make_dir_1.default.sync(output);
    return (pages) => __awaiter(void 0, void 0, void 0, function* () {
        pages.forEach((page) => {
            const { name: pageName, components } = page;
            let jsCode = '';
            components.forEach((component) => {
                const { name: componentName, svg, figmaExport } = component;
                const options = Object.assign({ pageName,
                    componentName }, figmaExport);
                const variableName = getVariableName(options);
                let variableValue;
                if (/^[\d]+/.test(variableName)) {
                    throw new Error(`"${componentName.trim()}" thrown an error: component names cannot start with a number.`);
                }
                switch (true) {
                    case useBase64:
                        variableValue = Buffer.from(svg).toString('base64');
                        break;
                    case useDataUrl:
                        variableValue = svgToMiniDataURI(svg);
                        break;
                    default:
                        variableValue = svg;
                        break;
                }
                if (jsCode.includes(`export const ${variableName} =`)) {
                    throw new Error(`Component "${componentName}" has an error: two components cannot have a same name.`);
                }
                jsCode += `export const ${variableName} = \`${variableValue}\`;\n`;
            });
            const filePath = path.resolve(output, `${pageName}.js`);
            fs.writeFileSync(filePath, jsCode);
        });
    });
};
//# sourceMappingURL=index.js.map