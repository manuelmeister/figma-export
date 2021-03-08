import { StringTransformer, ComponentOutputter } from './global';
import { StyleOutputter } from './styles';
export declare type BaseCommandOptions = {
    token: string;
    log?: (msg: string) => void;
};
export declare type ComponentsCommandOptions = {
    fileId: string;
    onlyFromPages?: string[];
    transformers?: StringTransformer[];
    outputters?: ComponentOutputter[];
    concurrency?: number;
};
export declare type StylesCommandOptions = {
    fileId: string;
    outputters?: StyleOutputter[];
};
export declare type FigmaExportRC = {
    commands: (['styles', StylesCommandOptions] | ['components', ComponentsCommandOptions])[];
};
//# sourceMappingURL=commands.d.ts.map