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
module.exports = ({ output, getExtension = () => 'SCSS', getFilename = () => '_variables', }) => {
    return (styles) => __awaiter(void 0, void 0, void 0, function* () {
        const extension = getExtension();
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
                        text += utils_1.writeVariable(style.comment, style.name, value, extension);
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
                        text += utils_1.writeVariable(style.comment, style.name, boxShadowValue || filterBlurValue, extension);
                        break;
                    }
                    case 'TEXT': {
                        const value = `(
                            "font-family": "${style.style.fontFamily}",
                            "font-size": ${style.style.fontSize}px,
                            "font-style": ${style.style.fontStyle},
                            "font-variant": ${style.style.fontVariant},
                            "font-weight": ${style.style.fontWeight},
                            "letter-spacing": ${style.style.letterSpacing}px,
                            "line-height": ${style.style.lineHeight}px,
                            "text-align": ${style.style.textAlign},
                            "text-decoration": ${style.style.textDecoration},
                            "text-transform": ${style.style.textTransform},
                            "vertical-align": ${style.style.verticalAlign}
                        )`;
                        text += utils_1.writeVariable(style.comment, style.name, value, extension);
                        break;
                    }
                }
            }
        });
        const filePath = makeDir.sync(path.resolve(output));
        fs.writeFileSync(path.resolve(filePath, `${getFilename()}.${extension.toLowerCase()}`), text);
    });
};
//# sourceMappingURL=index.js.map