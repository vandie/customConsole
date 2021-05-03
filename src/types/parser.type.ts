import { ParserOptions } from "./parser-options.type";

export type Parser<T> = (value: T, options?: ParserOptions) => string;