import { Parser } from "../../types";

export const bigIntParser: Parser<bigint> = (value: bigint) => value.toString();