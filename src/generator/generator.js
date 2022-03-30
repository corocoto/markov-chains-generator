import { tokenize, textify } from "../tokenizer/tokenizer.js";
import { fromTokens, pickRandom } from "./utils/index.js";

function sliceCorpus(corpus, sampleSize = 2) {
    return corpus
        .map((_, index) => corpus.slice(index, index + sampleSize))
        .filter(group => group.length === sampleSize)
}

function collectTransitions(samples) {
    return samples.reduce((transitions, sample) => {
        const lastIndex = sample.length - 1;
        const lastToken = sample[lastIndex];
        const restTokens = sample.slice(0, lastIndex);

        const state = fromTokens(restTokens);
        const next = lastToken;


        transitions[state] = transitions[state] ?? [];
        transitions[state].push(next);

        return transitions;
    }, {});
}

function predictNext(chain, transitions, sampleSize) {
    const lastState = fromTokens(chain.slice(-(sampleSize - 1)));
    const nextWords = transitions[lastState] ?? [];
    return pickRandom(nextWords);
}

function createChain(startText, transitions) {
    const head = startText ?? pickRandom(Object.keys(transitions));
    return tokenize(head);
}

function* generateChain(startText, transitions, sampleSize = 2) {
    const chain = createChain(startText, transitions);

    while (true) {
        const state = predictNext(chain, transitions, sampleSize);
        yield state;

        state ? chain.push(state) : chain.pop();
    }
}

export function generate({source, start = null, wordsCount = 100 } = {}) {
    const corpus = tokenize(String(source));
    const samples = sliceCorpus(corpus, 4);
    const transitions = collectTransitions(samples);

    const generator = generateChain(start, transitions, 4);
    const generatedTokens = [];

    for (let i = 0; i < wordsCount; i++) {
        generatedTokens.push(generator.next().value);
    }

    return textify(generatedTokens);
}