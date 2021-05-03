import { Parser } from "../../types";

export const booleanParser: Parser<boolean> = (value: boolean) => value ? 'true' : 'false';