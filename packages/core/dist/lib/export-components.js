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
exports.components = void 0;
const figma_1 = require("./figma");
exports.components = ({ token, fileId, onlyFromPages = [], transformers = [], outputters = [], concurrency = 30, log = (msg) => {
    // eslint-disable-next-line no-console
    console.log(msg);
}, }) => __awaiter(void 0, void 0, void 0, function* () {
    const client = figma_1.getClient(token);
    log('fetching document');
    const { data: { document = null } = {} } = yield client.file(fileId).catch((error) => {
        throw new Error(`while fetching file "${fileId}": ${error.message}`);
    });
    if (!document) {
        throw new Error('\'document\' is missing.');
    }
    const pages = figma_1.getPages((document), { only: onlyFromPages });
    log('preparing components');
    const pagesWithSvg = yield figma_1.enrichPagesWithSvg(client, fileId, pages, {
        transformers,
        concurrency,
        onFetchCompleted: ({ index, total }) => {
            log(`fetching components ${index}/${total}`);
        },
    });
    yield Promise.all(outputters.map((outputter) => outputter(pagesWithSvg)));
    return pagesWithSvg;
});
//# sourceMappingURL=export-components.js.map