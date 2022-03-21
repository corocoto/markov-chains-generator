export const NEWLINE_PLACEHOLDER = "§";
export const newLinesRegExp = /\n\s*/g;

export const punctuation = `[](){}!?.,:;'"\/*&^%$_+-–—=<>@|~`.split("").join("\\");
export const ellipsis = "\\.{3}";

export const words = "[a-zA-Zаа-яёА-ЯЁ]+";
export const compounds = `${words}-${words}`;

export const tokenizeRegExp = new RegExp(`(${ellipsis}|${compounds}|${words}|[${punctuation}])`);

export const PARAGRAPH_CHARACTER = "\n";