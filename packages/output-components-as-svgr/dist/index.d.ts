import * as FigmaExport from '@proxy-figma-export/types';
import { Config } from './svgr';
declare type Options = {
    output: string;
    getDirname?: (options: FigmaExport.ComponentOutputterParamOption) => string;
    getComponentName?: (options: FigmaExport.ComponentOutputterParamOption) => string;
    getFileExtension?: (options: FigmaExport.ComponentOutputterParamOption) => string;
    /**
     * SVGR ships with a handful of customizable options, usable in both the CLI and API.
     * https://react-svgr.com/docs/options/
     */
    getSvgrConfig?: (options: FigmaExport.ComponentOutputterParamOption) => Config;
};
declare const _default: ({ output, getDirname, getComponentName, getFileExtension, getSvgrConfig, }: Options) => FigmaExport.ComponentOutputter;
export = _default;
//# sourceMappingURL=index.d.ts.map