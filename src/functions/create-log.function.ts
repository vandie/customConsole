import { LogCallback, LogFunction, LogOptions, Parser } from "../types";
import * as inbuiltParsers from './parsers';

export const createLog = (output: LogCallback, options: LogOptions = {}): LogFunction => {
  const parsers = options.customParsers ? {
    ...inbuiltParsers,
    ...options.customParsers
  } : inbuiltParsers;

  return (...args: any) => {
    let prefixs = '';
    let text = args.map((value: any) => {
      const type = typeof value;
      const parser: Parser<typeof value> = parsers[type];
      if(parser) return parser(value, options);
      else return `[unrecognisedType ${type}]`;
    }).join(options.separator || '\n');
    
    if(options.includeTimestamp) prefixs = ` ${Date.now()}`;

    output(prefixs.length ? `${prefixs.trim()}: ${text}`: text);
  };
}