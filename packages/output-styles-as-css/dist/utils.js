"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVariable = exports.writeComment = exports.sanitizeText = void 0;
exports.sanitizeText = (text) => {
    return text
        .replace(/^[^\S\r\n]+/gm, '')
        .replace(/^\*/gm, ' *')
        .replace(/^"/gm, '  "');
};
exports.writeComment = (message) => {
    return exports.sanitizeText(`
        /**
         * ${message.replace(/\*\//g, '').split('\n').join('\n  * ')}
         */
    `);
};
exports.writeVariable = (name, value) => {
    return value && exports.sanitizeText(`--${name}: ${value};\n`);
};
//# sourceMappingURL=utils.js.map