import * as FigmaExport from '@proxy-figma-export/types';

import { getClient, getPages, enrichPagesWithSvg } from './figma';

type Options = FigmaExport.BaseCommandOptions & FigmaExport.ComponentsCommandOptions;

export const components = async ({
    token,
    fileId,
    onlyFromPages = [],
    transformers = [],
    outputters = [],
    concurrency = 30,
    log = (msg): void => {
        // eslint-disable-next-line no-console
        console.log(msg);
    },
}: Options): Promise<FigmaExport.PageNode[]> => {
    const client = getClient(token);

    log('fetching document');
    const { data: { document = null } = {} } = await client.file(fileId).catch((error: Error) => {
        throw new Error(`while fetching file "${fileId}": ${error.message}`);
    });

    if (!document) {
        throw new Error('\'document\' is missing.');
    }

    const pages = getPages((document), { only: onlyFromPages });

    log('preparing components');
    const pagesWithSvg = await enrichPagesWithSvg(client, fileId, pages, {
        transformers,
        concurrency,
        onFetchCompleted: ({ index, total }) => {
            log(`fetching components ${index}/${total}`);
        },
    });

    await Promise.all(outputters.map((outputter) => outputter(pagesWithSvg)));

    return pagesWithSvg;
};
