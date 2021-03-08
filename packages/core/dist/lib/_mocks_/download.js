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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = require("path");
const HttpsProxyAgent = require("https-proxy-agent");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let config = {
        headers: { 'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN },
    };
    if (!!process.env.https_proxy) {
        config.httpsAgent = new HttpsProxyAgent(process.env.https_proxy);
    }
    const fetch = (url) => __awaiter(void 0, void 0, void 0, function* () { return (yield axios_1.default.get(url, config)).data; });
    const figmaFiles = yield fetch('https://api.figma.com/v1/files/fzYhvQpqwhZDUImRz431Qo');
    const nodes = Object.keys(figmaFiles.styles);
    const figmaFileNodes = yield fetch(`https://api.figma.com/v1/files/fzYhvQpqwhZDUImRz431Qo/nodes?ids=${nodes.join(',')}`);
    fs_1.writeFileSync(`${__dirname}${path_1.sep}figma.files.json`, JSON.stringify(figmaFiles, undefined, 4));
    fs_1.writeFileSync(`${__dirname}${path_1.sep}figma.fileNodes.json`, JSON.stringify(figmaFileNodes, undefined, 4));
}))();
//# sourceMappingURL=download.js.map