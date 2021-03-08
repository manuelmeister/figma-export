import * as Figma from 'figma-js';
import * as FigmaExport from '@figma-export/types';
declare const fetchStyles: (client: Figma.ClientInterface, fileId: string) => Promise<FigmaExport.StyleNode[]>;
declare const parseStyles: (styleNodes: FigmaExport.StyleNode[]) => FigmaExport.Style[];
export { fetchStyles, parseStyles, };
//# sourceMappingURL=index.d.ts.map