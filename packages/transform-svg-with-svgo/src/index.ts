import SVGO from 'svgo';

import * as FigmaExport from '@proxy-figma-export/types';

export = (options: SVGO.Options): FigmaExport.StringTransformer => {
    const svgo = new SVGO(options);
    return async (svg): Promise<string> => (await svgo.optimize(svg)).data;
};
