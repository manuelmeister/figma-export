"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalCase = exports.camelCase = void 0;
const upperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const lowerFirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);
const camelCase = (str) => {
    const words = str.match(/((\b|)[^\W_]+(\b|))/g) || [];
    return words.reduce((accumulator, word, index) => {
        return `${accumulator}${index === 0 ? lowerFirst(word) : upperFirst(word)}`;
    }, '');
};
exports.camelCase = camelCase;
const pascalCase = (str) => upperFirst(camelCase(str));
exports.pascalCase = pascalCase;
//# sourceMappingURL=index.js.map