import { ParserOptions } from "./parser-options.type";
export declare type Parser<T> = (value: T, options?: ParserOptions) => string;
