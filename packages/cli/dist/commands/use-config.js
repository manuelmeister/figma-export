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
const fs = require("fs");
const path = require("path");
const ora = require("ora");
const spinner = ora({});
class UseConfigCommand extends command_1.Command {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const { args: { config, }, } = this.parse(UseConfigCommand);
            const configPath = path.resolve(config);
            // eslint-disable-next-line import/no-dynamic-require, global-require
            const { commands = [] } = fs.existsSync(configPath) ? require(configPath) : {};
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const runExport = (figmaExporter, options) => figmaExporter(Object.assign(Object.assign({ token: process.env.FIGMA_TOKEN || '', fileId: '' }, options), { log: (message) => { spinner.text = message; } })).then((any) => {
                spinner.succeed().start();
                return any;
            });
            const commandPromises = commands.map((command) => {
                const [commandName, options] = command;
                switch (commandName) {
                    case 'components':
                        return () => runExport(figmaExport.components, options);
                    case 'styles':
                        return () => runExport(figmaExport.styles, options);
                    default:
                        throw new Error(`Command ${commandName} is not found.`);
                }
            });
            spinner.start();
            commandPromises.reduce((actualPromise, nextPromise) => {
                return actualPromise.then(nextPromise);
            }, Promise.resolve()).then(() => {
                spinner.succeed('done');
            }).catch((error) => {
                spinner.fail();
                // eslint-disable-next-line no-console
                console.error(error);
            });
        });
    }
}
UseConfigCommand.description = `export using a configuration file
`;
UseConfigCommand.args = [
    {
        name: 'config',
        default: '.figmaexportrc.js',
        required: true,
    },
];
module.exports = UseConfigCommand;
//# sourceMappingURL=use-config.js.map