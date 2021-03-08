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
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const figmaExport = __importStar(require("@figma-export/core"));
const utils_1 = require("../utils");
const ora = require("ora");
const spinner = ora({});
class StylesCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const { args: { fileId, }, flags: { output, outputter = [], }, } = this.parse(StylesCommand);
            spinner.info(`Exporting ${fileId} as [${outputter.join(', ')}]`);
            spinner.start();
            figmaExport.styles({
                fileId,
                token: process.env.FIGMA_TOKEN || '',
                outputters: utils_1.requirePackages(outputter, { output }),
                log: (message) => { spinner.text = message; },
            }).then(() => {
                spinner.succeed('done');
            }).catch((error) => {
                spinner.fail();
                // eslint-disable-next-line no-console
                console.log(error);
            });
        });
    }
}
StylesCommand.description = `export styles from a Figma file
`;
StylesCommand.args = [
    {
        name: 'fileId',
        required: true,
    },
];
StylesCommand.flags = {
    output: command_1.flags.string({
        char: 'o',
        description: 'Output directory',
        default: 'output',
        multiple: false,
    }),
    outputter: command_1.flags.string({
        char: 'O',
        description: 'Outputter module or path',
        multiple: true,
    }),
};
module.exports = StylesCommand;
//# sourceMappingURL=styles.js.map