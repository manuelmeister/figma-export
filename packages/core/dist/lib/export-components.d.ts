import * as FigmaExport from '@proxy-figma-export/types';
declare type Options = FigmaExport.BaseCommandOptions & FigmaExport.ComponentsCommandOptions;
export declare const components: ({ token, fileId, onlyFromPages, transformers, outputters, concurrency, log, }: Options) => Promise<FigmaExport.PageNode[]>;
export {};
//# sourceMappingURL=export-components.d.ts.map