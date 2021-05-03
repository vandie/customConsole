import { Parser } from "../../types";

export const undefinedParser: Parser<undefined> = (value: undefined) => 'undefined';