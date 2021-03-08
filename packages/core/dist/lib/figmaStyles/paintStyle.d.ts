import * as FigmaExport from '@proxy-figma-export/types';
declare const extractColor: ({ color, opacity }: FigmaExport.ExtractableColor) => (FigmaExport.Color | undefined);
declare const parse: (node: FigmaExport.StyleNode) => FigmaExport.StyleTypeFill | undefined;
export { parse, extractColor, };
//# sourceMappingURL=paintStyle.d.ts.map