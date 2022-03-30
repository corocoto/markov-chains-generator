import {escapeString} from "./index.js";

const fromTokens = (tokens) => escapeString(tokens.join(''));

export default fromTokens;