import { LogCallback, LogFunction, LogOptions, Parser } from "../types";
import * as inbuiltParsers from './parsers';

export const createLog = (output: LogCallback, options: LogOptions = {}): LogFunction => {
  const parsers: {[type: string]: Parser<any>} = options.customParsers ? {
    ...inbuiltParsers,
    ...options.customParsers
  } : inbuiltParsers;

  return (...args: any) => {
    let prefixs = '';
    let text = args.map((value: any) => {
      const type: string = options.customTypeChecker ? options.customTypeChecker(value) : typeof value;
      const parser = parsers[type];
      return parser ? parser(value, options) : `[unrecognisedType ${type}]`;
    }).join(options.separator || '\n');
    
    if(options.includeTimestamp) prefixs = ` ${Date.now()}`;

    output(prefixs.length ? `${prefixs.trim()}: ${text}`: text);
  };
}