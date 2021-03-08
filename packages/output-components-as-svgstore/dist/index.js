"use strict";
/* eslint-disable import/order */
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
const svgstore_1 = __importDefault(require("svgstore"));
const fs = require("fs");
const path = require("path");
module.exports = ({ output, getIconId = (options) => `${options.pageName}/${options.componentName}`, svgstoreConfig = {}, }) => {
    make_dir_1.default.sync(output);
    return (pages) => __awaiter(void 0, void 0, void 0, function* () {
        pages.forEach(({ name: pageName, components }) => {
            const sprites = svgstore_1.default(svgstoreConfig);
            components.forEach(({ name: componentName, svg, figmaExport }) => {
                const options = Object.assign({ pageName,
                    componentName }, figmaExport);
                sprites.add(getIconId(options), svg);
            });
            const filePath = path.resolve(output, `${pageName}.svg`);
            fs.writeFileSync(filePath, sprites.toString({}));
        });
    });
};
//# sourceMappingURL=index.js.map