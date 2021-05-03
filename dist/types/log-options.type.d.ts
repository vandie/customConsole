import { Parser } from "./parser.type";
export declare type LogOptions = {
    includeTimestamp?: boolean;
    stringifyObjects?: boolean;
    separator?: string;
    customParsers?: {
        [key: string]: Parser<any>;
    };
    [key: string]: any;
};
