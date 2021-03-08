import * as Figma from 'figma-js';
import * as FigmaExport from '@figma-export/types';
declare type NodeWithChildren = FigmaExport.ComponentNode | Figma.Group | Figma.Frame | Figma.Instance | Figma.BooleanGroup;
declare const getComponents: (children?: readonly NodeWithChildren[]) => FigmaExport.ComponentNode[];
declare type GetPagesOptions = {
    only?: string | string[];
};
declare const getPages: (document: Figma.Document, options?: GetPagesOptions) => FigmaExport.PageNode[];
declare const getIdsFromPages: (pages: FigmaExport.PageNode[]) => string[];
declare const getClient: (token: string) => Figma.ClientInterface;
declare const fileImages: (client: Figma.ClientInterface, fileId: string, ids: string[]) => Promise<{
    readonly [key: string]: string;
}>;
declare type FigmaExportFileSvg = {
    [key: string]: string;
};
declare type FileSvgOptions = {
    transformers?: FigmaExport.StringTransformer[];
    concurrency?: number;
    onFetchCompleted?: (data: {
        index: number;
        total: number;
    }) => void;
};
declare const fileSvgs: (client: Figma.ClientInterface, fileId: string, ids: string[], { concurrency, transformers, onFetchCompleted, }?: FileSvgOptions) => Promise<FigmaExportFileSvg>;
declare const enrichPagesWithSvg: (client: Figma.ClientInterface, fileId: string, pages: FigmaExport.PageNode[], svgOptions?: FileSvgOptions | undefined) => Promise<FigmaExport.PageNode[]>;
export { getComponents, getPages, getIdsFromPages, getClient, fileImages, fileSvgs, enrichPagesWithSvg, };
//# sourceMappingURL=figma.d.ts.map