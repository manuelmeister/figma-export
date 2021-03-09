import sinon from 'sinon';
import { expect } from 'chai';

import * as Figma from 'proxy-figma-js';

import * as FigmaExport from './figma';

import { styles as exportStyles } from './export-styles';

import file from './_mocks_/figma.files.json';
import fileNodes from './_mocks_/figma.fileNodes.json';

const nodeIds = Object.keys(fileNodes.nodes);

describe('export-styles', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let logger: sinon.SinonSpy<any[], any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let outputter: sinon.SinonSpy<any[], any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let clientFileNodes: sinon.SinonStub<any[], any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let clientFile: sinon.SinonStub<any[], any>;

    let client: Figma.ClientInterface;

    beforeEach(() => {
        logger = sinon.spy();
        outputter = sinon.spy();

        clientFile = sinon.stub().resolves({ data: file });
        clientFileNodes = sinon.stub().resolves({ data: fileNodes });

        client = {
            ...({} as Figma.ClientInterface),
            file: clientFile,
            fileNodes: clientFileNodes,
        };

        sinon.stub(FigmaExport, 'getClient').returns(client);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should use outputter to export styles', async () => {
        const pagesWithSvg = await exportStyles({
            fileId: 'fileABCD',
            token: 'token1234',
            log: logger,
            outputters: [outputter],
        });

        expect(FigmaExport.getClient).to.have.been.calledOnceWithExactly('token1234');
        expect(clientFileNodes).to.have.been.calledOnceWith('fileABCD', { ids: nodeIds });
        expect(clientFile).to.have.been.calledOnceWithExactly('fileABCD');

        expect(logger).to.have.been.calledTwice;
        expect(logger.firstCall).to.have.been.calledWith('fetching styles');
        expect(logger.secondCall).to.have.been.calledWith('parsing styles');

        expect(outputter).to.have.been.calledOnceWithExactly(pagesWithSvg);
    });

    it('should use default "logger" if not defined', async () => {
        await exportStyles({
            fileId: 'fileABCD',
            token: 'token1234',
        });

        /* eslint-disable no-console */
        expect(console.log).to.have.been.calledTwice;
        expect((console.log as sinon.SinonSpy<unknown[], unknown>).firstCall).to.have.been.calledWith('fetching styles');
        expect((console.log as sinon.SinonSpy<unknown[], unknown>).secondCall).to.have.been.calledWith('parsing styles');
    });

    it('should throw an error when fetching file fails', async () => {
        clientFile.returns(Promise.reject(new Error('some error')));

        await expect(exportStyles({
            fileId: 'fileABCD',
            token: 'token1234',
        })).to.be.rejectedWith(Error, 'while fetching file "fileABCD": some error');
    });

    it('should throw an error if styles property is missing when fetching file', async () => {
        clientFile.returns(Promise.resolve({}));

        await expect(exportStyles({
            fileId: 'fileABCD',
            token: 'token1234',
        })).to.be.rejectedWith(Error, '\'styles\' are missing.');
    });

    it('should throw an error when fetching fileNodes fails', async () => {
        clientFileNodes.returns(Promise.reject(new Error('some error')));

        await expect(exportStyles({
            fileId: 'fileABCD',
            token: 'token1234',
        })).to.be.rejectedWith(Error, 'while fetching fileNodes: some error');
    });
});
