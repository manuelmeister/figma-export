"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVariable = void 0;
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
// eslint-disable-next-line consistent-return
const createVariable = (name, value, extension) => {
    // eslint-disable-next-line default-case
    switch (extension) {
        case 'SCSS':
            return `$${name}: ${value};`;
        case 'SASS':
            return `$${name}: ${value.replace(/\n/g, ' ').replace(/\s\s+/g, ' ')}`;
    }
};
exports.writeVariable = (comment, name, value, extension) => {
    if (value) {
        return sanitizeText(`
            ${writeComment(comment)}
            ${createVariable(name, value, extension)}
        `);
    }
    return '';
};
//# sourceMappingURL=utils.js.map