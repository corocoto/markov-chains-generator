import {
    newLinesRegExp,
    NEWLINE_PLACEHOLDER,
    tokenizeRegExp,
    PARAGRAPH_CHARACTER
} from "./constants.js";
import { exists } from "./utils/index.js";

export function tokenize(text) {
    return text
        .replaceAll(newLinesRegExp, NEWLINE_PLACEHOLDER)
        .split(tokenizeRegExp)
        .filter(exists);
}

export function textify(tokens){
    return tokens.join('').replaceAll(NEWLINE_PLACEHOLDER, PARAGRAPH_CHARACTER);
}


