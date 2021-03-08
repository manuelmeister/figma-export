import * as FigmaExport from '@figma-export/types';
import { Extension } from './types';
declare type Options = {
    output: string;
    getExtension?: () => Extension;
    getFilename?: () => string;
};
declare const _default: ({ output, getExtension, getFilename, }: Options) => FigmaExport.StyleOutputter;
export = _default;
//# sourceMappingURL=index.d.ts.map