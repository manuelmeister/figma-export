import * as FigmaExport from '@proxy-figma-export/types';
import { Options as SvgStoreOptions } from './svgstore';
declare type Options = {
    output: string;
    /** https://www.npmjs.com/package/svgstore#options */
    svgstoreConfig?: SvgStoreOptions;
    getIconId?: (options: FigmaExport.ComponentOutputterParamOption) => string;
};
declare const _default: ({ output, getIconId, svgstoreConfig, }: Options) => FigmaExport.ComponentOutputter;
export = _default;
//# sourceMappingURL=index.d.ts.map