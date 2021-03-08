"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const utils_1 = require("../utils");
const paintStyle_1 = require("./paintStyle");
const createEffectStyle = (effect) => {
    // eslint-disable-next-line default-case
    switch (effect.type) {
        case 'INNER_SHADOW':
        case 'DROP_SHADOW': {
            const color = paintStyle_1.extractColor(effect);
            const spreadRadius = 0;
            const inset = effect.type === 'INNER_SHADOW';
            if (color && effect.offset) {
                return {
                    type: effect.type,
                    visible: effect.visible,
                    color,
                    inset,
                    offset: effect.offset,
                    blurRadius: effect.radius,
                    spreadRadius,
                    // eslint-disable-next-line max-len
                    value: `${inset ? 'inset ' : ''}${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${spreadRadius}px ${color.rgba}`,
                };
            }
            break;
        }
        case 'LAYER_BLUR': {
            return {
                type: effect.type,
                visible: effect.visible,
                blurRadius: effect.radius,
                value: `blur(${effect.radius}px)`,
            };
        }
    }
    return undefined;
};
const parse = (node) => {
    if (node.styleType === 'EFFECT' && node.type === 'RECTANGLE') {
        return {
            styleType: 'EFFECT',
            effects: Array.from(node.effects)
                .reverse()
                .map(createEffectStyle)
                .filter(utils_1.notEmpty),
        };
    }
    return undefined;
};
exports.parse = parse;
//# sourceMappingURL=effectStyle.js.map