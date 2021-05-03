import { Parser } from "../../types";

export const functionParser: Parser<Function> = (value: Function) => value.toString();