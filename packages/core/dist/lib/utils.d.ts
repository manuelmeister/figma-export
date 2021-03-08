declare const toArray: <T extends unknown>(any: T) => T[];
declare const fromEntries: (iterable: any[][]) => {
    [key: string]: any;
};
declare const promiseSequentially: (promiseFactories: Function[], initialValue: unknown) => Promise<unknown>;
declare const fetchAsSvgXml: (url: string) => Promise<string>;
declare const notEmpty: <TValue>(value: TValue | null | undefined) => value is TValue;
export { toArray, fromEntries, promiseSequentially, fetchAsSvgXml, notEmpty, };
//# sourceMappingURL=utils.d.ts.map