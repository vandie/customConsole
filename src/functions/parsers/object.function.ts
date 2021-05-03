import { Parser, ParserOptions } from "../../types";

export const objectParser: Parser<object> = (value: object, options: ParserOptions = {}) => options.stringifyObjects ? JSON.stringify(value, null, 2) : value.toString();