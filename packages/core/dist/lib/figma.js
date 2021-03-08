"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.enrichPagesWithSvg = exports.fileSvgs = exports.fileImages = exports.getClient = exports.getIdsFromPages = exports.getPages = exports.getComponents = void 0;
const Figma = __importStar(require("figma-js"));
const path_1 = require("path");
const p_limit_1 = __importDefault(require("p-limit"));
const utils_1 = require("./utils");
const getComponents = (children = []) => {
    let components = [];
    children.forEach((component) => {
        if (component.type === 'COMPONENT') {
            components.push(Object.assign(Object.assign({}, component), { figmaExport: {
                    dirname: path_1.dirname(component.name),
                    basename: path_1.basename(component.name),
                } }));
            return;
        }
        components = [
            ...components,
            ...getComponents(component.children),
        ];
    });
    return components;
};
exports.getComponents = getComponents;
const filterPagesByName = (pages, pageNames = []) => {
    const only = utils_1.toArray(pageNames).filter((p) => p.length);
    return pages.filter((page) => only.length === 0 || only.includes(page.name));
};
const getPages = (document, options = {}) => {
    const pages = filterPagesByName(document.children, options.only);
    return pages.map((page) => (Object.assign(Object.assign({}, page), { components: getComponents(page.children) })));
};
exports.getPages = getPages;
const getIdsFromPages = (pages) => pages.reduce((ids, page) => [
    ...ids,
    ...page.components.map((component) => component.id),
], []);
exports.getIdsFromPages = getIdsFromPages;
const getClient = (token) => {
    if (!token) {
        throw new Error('\'Access Token\' is missing. https://www.figma.com/developers/docs#authentication');
    }
    return Figma.Client({ personalAccessToken: token });
};
exports.getClient = getClient;
const fileImages = (client, fileId, ids) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.fileImages(fileId, {
        ids,
        format: 'svg',
        svg_include_id: true,
    }).catch((error) => {
        throw new Error(`while fetching fileImages: ${error.message}`);
    });
    return response.data.images;
});
exports.fileImages = fileImages;
const fileSvgs = (client, fileId, ids, { concurrency = 30, transformers = [], 
// eslint-disable-next-line @typescript-eslint/no-empty-function
onFetchCompleted = () => { }, } = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const images = yield fileImages(client, fileId, ids);
    const limit = p_limit_1.default(concurrency);
    let index = 0;
    const svgPromises = Object.entries(images).map(([id, url]) => __awaiter(void 0, void 0, void 0, function* () {
        const svg = yield limit(() => utils_1.fetchAsSvgXml(url));
        const svgTransformed = yield utils_1.promiseSequentially(transformers, svg);
        onFetchCompleted({
            index: index += 1,
            total: ids.length,
        });
        return [id, svgTransformed];
    }));
    const svgs = yield Promise.all(svgPromises);
    return utils_1.fromEntries(svgs);
});
exports.fileSvgs = fileSvgs;
const enrichPagesWithSvg = (client, fileId, pages, svgOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const componentIds = getIdsFromPages(pages);
    if (componentIds.length === 0) {
        throw new Error('No components found');
    }
    const svgs = yield fileSvgs(client, fileId, componentIds, svgOptions);
    return pages.map((page) => (Object.assign(Object.assign({}, page), { components: page.components.map((component) => (Object.assign(Object.assign({}, component), { svg: svgs[component.id] }))) })));
});
exports.enrichPagesWithSvg = enrichPagesWithSvg;
//# sourceMappingURL=figma.js.map