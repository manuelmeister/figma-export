import * as Figma from 'figma-js';
export declare type ComponentExtras = {
    dirname: string;
    basename: string;
};
export interface ComponentNode extends Figma.Component {
    figmaExport: ComponentExtras;
    svg: string;
}
export interface PageNode extends Figma.Canvas {
    components: ComponentNode[];
}
export declare type StringTransformer = (str: string) => Promise<string>;
export declare type ComponentOutputter = (pages: PageNode[]) => Promise<void>;
export declare type ComponentOutputterParamOption = {
    componentName: string;
    pageName: string;
} & ComponentExtras;
export declare type StyleNode = Figma.Style & Figma.Node;
//# sourceMappingURL=global.d.ts.map