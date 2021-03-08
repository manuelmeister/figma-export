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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStyles = exports.fetchStyles = void 0;
const utils_1 = require("../utils");
const paintStyle_1 = require("./paintStyle");
const effectStyle_1 = require("./effectStyle");
const textStyle_1 = require("./textStyle");
// import { parse as parseGridStyle } from './gridStyle';
const fetchStyles = (client, fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { styles = null } = {} } = yield client.file(fileId).catch((error) => {
        throw new Error(`while fetching file "${fileId}": ${error.message}`);
    });
    if (!styles) {
        throw new Error('\'styles\' are missing.');
    }
    const { data: { nodes } } = yield client.fileNodes(fileId, { ids: Object.keys(styles) }).catch((error) => {
        throw new Error(`while fetching fileNodes: ${error.message}`);
    });
    const styleNodes = Object.values(nodes).map((node) => node === null || node === void 0 ? void 0 : node.document);
    return styleNodes.map((node) => (Object.assign(Object.assign({}, (node ? styles[node.id] : {})), node)));
});
exports.fetchStyles = fetchStyles;
const parseStyles = (styleNodes) => {
    return styleNodes.map((node) => {
        const parsedStyles = undefined
            || paintStyle_1.parse(node)
            || effectStyle_1.parse(node)
            || textStyle_1.parse(node);
        // || parseGridStyle(node)
        if (!parsedStyles) {
            return undefined;
        }
        return Object.assign({ name: node.name, comment: node.description, visible: node.visible !== false, originalNode: node }, parsedStyles);
    }).filter(utils_1.notEmpty);
};
exports.parseStyles = parseStyles;
//# sourceMappingURL=index.js.map