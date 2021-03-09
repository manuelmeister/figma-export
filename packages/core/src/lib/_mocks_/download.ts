import axios, {AxiosRequestConfig} from 'axios';
import * as Figma from 'proxy-figma-js';
import { writeFileSync } from 'fs';
import { sep } from 'path';
const HttpsProxyAgent = require("https-proxy-agent");

(async () => {
    let config: AxiosRequestConfig = {
        headers: { 'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN },
    }

    if (!!process.env.https_proxy) {
        config.httpsAgent = new HttpsProxyAgent(process.env.https_proxy);
    }

    const fetch = async (url: string) => (await axios.get(url, config)).data;

    const figmaFiles: Figma.FileResponse = await fetch(
        'https://api.figma.com/v1/files/fzYhvQpqwhZDUImRz431Qo',
    );

    const nodes = Object.keys(figmaFiles.styles);

    const figmaFileNodes: Figma.FileNodesResponse = await fetch(
        `https://api.figma.com/v1/files/fzYhvQpqwhZDUImRz431Qo/nodes?ids=${nodes.join(',')}`,
    );

    writeFileSync(`${__dirname}${sep}figma.files.json`, JSON.stringify(figmaFiles, undefined, 4));
    writeFileSync(`${__dirname}${sep}figma.fileNodes.json`, JSON.stringify(figmaFileNodes, undefined, 4));
})();
