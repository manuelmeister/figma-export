import * as Figma from 'proxy-figma-js';

export type ComponentExtras = {
    dirname: string;
    basename: string;
}
export interface ComponentNode extends Figma.Component {
    figmaExport: ComponentExtras;
    svg: string;
}

export interface PageNode extends Figma.Canvas {
    components: ComponentNode[];
}

export type StringTransformer = (str: string) => Promise<string>

export type ComponentOutputter = (pages: PageNode[]) => Promise<void>

export type ComponentOutputterParamOption = {
    componentName: string;
    pageName: string;
} & ComponentExtras;

export type StyleNode = Figma.Style & Figma.Node
