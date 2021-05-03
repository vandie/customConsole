import { Parser } from "./parser.type";

export type LogOptions = {
  includeTimestamp?: boolean,
  stringifyObjects?: boolean,
  separator?: string,
  customParsers?: {
    [key: string]: Parser<any>
  },
  // Allows for custom options passed to custom parsers 
  [key: string]: any
};