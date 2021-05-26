import { optimize, OptimizeOptions } from 'svgo';

import * as FigmaExport from '@proxy-figma-export/types';

export = (options: OptimizeOptions): FigmaExport.StringTransformer => {
    return async (svg): Promise<string> => optimize(svg, options).data;
};
