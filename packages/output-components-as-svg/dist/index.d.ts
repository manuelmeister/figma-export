import * as FigmaExport from '@proxy-figma-export/types';
declare type Options = {
    output: string;
    getDirname?: (options: FigmaExport.ComponentOutputterParamOption) => string;
    getBasename?: (options: FigmaExport.ComponentOutputterParamOption) => string;
};
declare const _default: ({ output, getDirname, getBasename, }: Options) => FigmaExport.ComponentOutputter;
export = _default;
//# sourceMappingURL=index.d.ts.map