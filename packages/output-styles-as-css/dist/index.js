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
const utils_1 = require("./utils");
const fs = require("fs");
const path = require("path");
const makeDir = require("make-dir");
module.exports = ({ output, getFilename = () => '_variables', }) => {
    return (styles) => __awaiter(void 0, void 0, void 0, function* () {
        let text = '';
        styles.forEach((style) => {
            if (style.visible) {
                // eslint-disable-next-line default-case
                switch (style.styleType) {
                    case 'FILL': {
                        const value = style.fills
                            .filter((fill) => fill.visible)
                            .map((fill) => fill.value)
                            .join(', ');
                        if (value) {
                            text += utils_1.writeComment(style.comment);
                            text += utils_1.writeVariable(style.name, value);
                        }
                        break;
                    }
                    case 'EFFECT': {
                        const visibleEffects = style.effects.filter((effect) => effect.visible);
                        const boxShadowValue = visibleEffects
                            .filter((effect) => effect.type === 'INNER_SHADOW' || effect.type === 'DROP_SHADOW')
                            .map((effect) => effect.value)
                            .join(', ');
                        const filterBlurValue = visibleEffects
                            .filter((effect) => effect.type === 'LAYER_BLUR')
                            .map((effect) => effect.value)
                            .join(', ');
                        // Shadow and Blur effects cannot be combined together since they use two different CSS properties.
                        const value = boxShadowValue || filterBlurValue;
                        if (value) {
                            text += utils_1.writeComment(style.comment);
                            text += utils_1.writeVariable(style.name, value);
                        }
                        break;
                    }
                    case 'TEXT': {
                        text += utils_1.writeComment(style.comment);
                        text += utils_1.writeVariable(`${style.name}-font-family`, `"${style.style.fontFamily}"`);
                        text += utils_1.writeVariable(`${style.name}-font-size`, `${style.style.fontSize}px`);
                        text += utils_1.writeVariable(`${style.name}-font-style`, `${style.style.fontStyle}`);
                        text += utils_1.writeVariable(`${style.name}-font-variant`, `${style.style.fontVariant}`);
                        text += utils_1.writeVariable(`${style.name}-font-weight`, `${style.style.fontWeight}`);
                        text += utils_1.writeVariable(`${style.name}-letter-spacing`, `${style.style.letterSpacing}px`);
                        text += utils_1.writeVariable(`${style.name}-line-height`, `${style.style.lineHeight}px`);
                        text += utils_1.writeVariable(`${style.name}-text-align`, `${style.style.textAlign}`);
                        text += utils_1.writeVariable(`${style.name}-text-decoration`, `${style.style.textDecoration}`);
                        text += utils_1.writeVariable(`${style.name}-text-transform`, `${style.style.textTransform}`);
                        text += utils_1.writeVariable(`${style.name}-vertical-align`, `${style.style.verticalAlign}`);
                        break;
                    }
                }
            }
        });
        const filePath = makeDir.sync(path.resolve(output));
        fs.writeFileSync(path.resolve(filePath, `${getFilename()}.css`), utils_1.sanitizeText(`
            :root {
                ${text}
            }
        `));
    });
};
//# sourceMappingURL=index.js.map