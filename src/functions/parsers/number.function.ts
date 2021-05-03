import { Parser } from "../../types";

export const numberParser: Parser<number> = (value: number) => value.toString();