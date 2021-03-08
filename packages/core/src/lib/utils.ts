import axios, {AxiosRequestConfig} from 'axios';
const HttpsProxyAgent = require("https-proxy-agent");

const toArray = <T extends unknown>(any: T): T[] => (Array.isArray(any) ? any : [any]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromEntries = (iterable: any[][]): { [key: string]: any } => {
    return [...iterable].reduce((obj: { [key: string]: unknown }, [key, val]) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = val;
        return obj;
    }, {});
};

// eslint-disable-next-line @typescript-eslint/ban-types
const promiseSequentially = (promiseFactories: Function[], initialValue: unknown): Promise<unknown> => {
    const promise = promiseFactories.reduce((previousPromise, promiseFactory) => {
        return previousPromise.then((value) => promiseFactory(value));
    }, Promise.resolve(initialValue));

    return promise;
};

const fetchAsSvgXml = (url: string): Promise<string> => {
    if (!/https?:\/\/.*/.test(url)) {
        throw new TypeError('Only absolute URLs are supported');
    }

    let config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'images/svg+xml',
        }
    }

    if (!!process.env.https_proxy) {
        config.httpsAgent = new HttpsProxyAgent(process.env.https_proxy);
        config.proxy = false;
    }

    return axios.get(url, config).then((response) => {
        return response.data;
    }).catch((error: Error) => {
        throw new Error(`while fetching svg "${url}": ${error.message}`);
    });
};

const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
    return value !== null && value !== undefined;
};

export {
    toArray,
    fromEntries,
    promiseSequentially,
    fetchAsSvgXml,
    notEmpty,
};
