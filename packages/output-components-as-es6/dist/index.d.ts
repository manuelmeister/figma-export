import * as FigmaExport from '@figma-export/types';
declare type Options = {
    output: string;
    useBase64?: boolean;
    useDataUrl?: boolean;
    getVariableName?: (options: FigmaExport.ComponentOutputterParamOption) => string;
};
declare const _default: ({ output, getVariableName, useBase64, useDataUrl, }: Options) => FigmaExport.ComponentOutputter;
export = _default;
//# sourceMappingURL=index.d.ts.map