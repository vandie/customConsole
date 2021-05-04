import { Parser } from "./parser.type";
import { TypeCheck } from "./type-check.type";

export type LogOptions = {
  includeTimestamp?: boolean,
  stringifyObjects?: boolean,
  separator?: string,
  customTypeChecker?: TypeCheck,
  customParsers?: {
    [key: string]: Parser<any>
  },
  // Allows for custom options passed to custom parsers 
  [key: string]: any
};