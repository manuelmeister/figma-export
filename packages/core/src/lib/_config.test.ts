/* eslint-disable @typescript-eslint/no-explicit-any */
import * as FigmaExport from '@proxy-figma-export/types';
import * as Figma from 'figma-js';

const svg = {
    domain: 'https://s3-us-west-2.amazonaws.com',
    path: '/figma-alpha-api/img/7d80/9a7f/49ce9d382e188bc37b1fa83f83ff7c3f',
    content: '<svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    get url(): string {
        return `${this.domain}${this.path}`;
    },
};

const componentWithNumber = {
    id: '12:3',
    name: '1-icon',
    type: 'COMPONENT',
};

const componentWithSlashedName = {
    id: '9:10',
    name: 'icon/eye',
    type: 'COMPONENT',
    svg: svg.content,
};

const component1: FigmaExport.ComponentNode = {
    ...({} as Figma.Component),
    id: '10:8',
    name: 'Figma-Logo',
    type: 'COMPONENT',
    svg: svg.content,
    figmaExport: {
        dirname: '.',
        basename: 'Figma-Logo',
    },
};

const component2: FigmaExport.ComponentNode = {
    ...({} as Figma.Component),
    id: '8:1',
    name: 'Search',
    type: 'COMPONENT',
    svg: svg.content,
    figmaExport: {
        dirname: '.',
        basename: 'Figma-Search',
    },
};

const component3: FigmaExport.ComponentNode = {
    ...({} as Figma.Component),
    id: '9:1',
    name: 'Login',
    type: 'COMPONENT',
    svg: svg.content,
    figmaExport: {
        dirname: '.',
        basename: 'Login',
    },
};

const group1: Figma.Group = {
    ...({} as Figma.Group),
    id: '26:0',
    name: 'A Group',
    type: 'GROUP',
    children: [component3],
};

const page1: Figma.Canvas = {
    ...({} as Figma.Canvas),
    id: '10:6',
    name: 'page1',
    type: 'CANVAS',
    children: [
        component1,
        component2,
    ],
};

const page2: Figma.Canvas = {
    ...({} as Figma.Canvas),
    id: '10:7',
    name: 'page2',
    type: 'CANVAS',
    children: [
        group1,
    ],
};

const pageWithoutComponents: Figma.Canvas = {
    ...({} as Figma.Canvas),
    id: '10:7',
    name: 'page2',
    type: 'CANVAS',
    children: [],
};

const createDocument = (props: any): Figma.Document => ({
    ...({} as Figma.Document),
    ...props,
});

const createPage = (children: any): Figma.Document => ({
    ...({} as Figma.Document),
    children: [{
        ...({} as Figma.Canvas),
        id: '10:8',
        name: 'fakePage',
        children,
    }],
});

export {
    componentWithNumber,
    componentWithSlashedName,
    component1,
    component2,
    component3,
    group1,
    page1,
    page2,
    pageWithoutComponents,
    svg,
    createPage,
    createDocument,
};
