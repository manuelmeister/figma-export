"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMap = exports.writeVariable = void 0;
const sanitizeText = (text) => {
    return text
        .replace(/^[^\S\r\n]+/gm, '')
        .replace(/^\*/gm, ' *')
        .replace(/^"/gm, '  "');
};
const writeComment = (message) => {
    return message && `/**
                        * ${message.replace(/\*\//g, '').split('\n').join('\n  * ')}
                        */`;
};
exports.writeVariable = (comment, name, value) => {
    if (value) {
        return sanitizeText(`
            ${writeComment(comment)}
            @${name}: ${value};
        `);
    }
    return '';
};
exports.writeMap = (comment, name, value) => {
    if (value) {
        return sanitizeText(`
            ${writeComment(comment)}
            #${name}() ${value};
        `);
    }
    return '';
};
//# sourceMappingURL=utils.js.map