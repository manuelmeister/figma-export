import { Command } from '@oclif/command';

import * as figmaExport from '@proxy-figma-export/core';

import fs = require('fs');
import path = require('path');
import ora = require('ora');

type FigmaExportCommand = [
    string,
    Record<string, unknown>
];

const spinner = ora({});

class UseConfigCommand extends Command {
    async run(): Promise<void> {
        const {
            args: {
                config,
            },
        } = this.parse(UseConfigCommand);

        const configPath = path.resolve(config);

        // eslint-disable-next-line import/no-dynamic-require, global-require
        const { commands = [] } = fs.existsSync(configPath) ? require(configPath) : {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const runExport = (figmaExporter: (options: any) => Promise<any>, options: Record<string, unknown>) => figmaExporter({
            token: process.env.FIGMA_TOKEN || '',
            fileId: '',
            ...options,
            log: (message: string) => { spinner.text = message; },
        }).then((any) => {
            spinner.succeed().start();
            return any;
        });

        const commandPromises: (() => Promise<any>)[] = commands.map((command: FigmaExportCommand) => {
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
        }).catch((error: Error) => {
            spinner.fail();

            // eslint-disable-next-line no-console
            console.error(error);
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
