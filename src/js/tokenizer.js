const NEWLINE_PLACEHOLDER = "§";
const newLinesRegExp = /\n\s*/g;

const punctuation = `[](){}!?.,:;'"\/*&^%$_+-–—=<>@|~`.split("").join("\\");
const ellipsis = "\\.{3}";

const words = "[a-zA-Zаа-яёА-ЯЁ]+";
const compounds = `${words}-${words}`;

const tokenizeRegExp = new RegExp(`(${ellipsis}|${compounds}|${words}|[${punctuation}])`);

function exists(entity) {
    return !!entity;
}

export function tokenize(text) {
    return text
        .replaceAll(newLinesRegExp, NEWLINE_PLACEHOLDER)
        .split(tokenizeRegExp)
        .filter(exists);
}

const PARAGRAPH_CHARACTER = "\n";

export function textify(tokens){
    return tokens.join('').replaceAll(NEWLINE_PLACEHOLDER, PARAGRAPH_CHARACTER);
}


