export declare type Options = {
    cleanDefs?: boolean | string[];
    cleanSymbols?: boolean | string[];
    svgAttrs?: boolean | {
        [key: string]: unknown;
    };
    symbolAttrs?: boolean | {
        [key: string]: unknown;
    };
    copyAttrs?: boolean | string[];
    renameDefs?: boolean;
};
declare type ToStringOptions = {
    inline?: boolean;
};
export interface SvgStore {
    add: (id: string, svg: string, options?: Options) => SvgStore;
    toString: (options: ToStringOptions) => string;
}
export {};
//# sourceMappingURL=svgstore.d.ts.map