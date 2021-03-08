"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notEmpty = exports.fetchAsSvgXml = exports.promiseSequentially = exports.fromEntries = exports.toArray = void 0;
const axios_1 = __importDefault(require("axios"));
const HttpsProxyAgent = require("https-proxy-agent");
const toArray = (any) => (Array.isArray(any) ? any : [any]);
exports.toArray = toArray;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromEntries = (iterable) => {
    return [...iterable].reduce((obj, [key, val]) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = val;
        return obj;
    }, {});
};
exports.fromEntries = fromEntries;
// eslint-disable-next-line @typescript-eslint/ban-types
const promiseSequentially = (promiseFactories, initialValue) => {
    const promise = promiseFactories.reduce((previousPromise, promiseFactory) => {
        return previousPromise.then((value) => promiseFactory(value));
    }, Promise.resolve(initialValue));
    return promise;
};
exports.promiseSequentially = promiseSequentially;
const fetchAsSvgXml = (url) => {
    if (!/https?:\/\/.*/.test(url)) {
        throw new TypeError('Only absolute URLs are supported');
    }
    let config = {
        headers: {
            'Content-Type': 'images/svg+xml',
        }
    };
    if (!!process.env.https_proxy) {
        config.httpsAgent = new HttpsProxyAgent(process.env.https_proxy);
        config.proxy = false;
    }
    return axios_1.default.get(url, config).then((response) => {
        return response.data;
    }).catch((error) => {
        throw new Error(`while fetching svg "${url}": ${error.message}`);
    });
};
exports.fetchAsSvgXml = fetchAsSvgXml;
const notEmpty = (value) => {
    return value !== null && value !== undefined;
};
exports.notEmpty = notEmpty;
//# sourceMappingURL=utils.js.map