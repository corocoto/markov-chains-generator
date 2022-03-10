import {tokenize} from "./tokenizer.js";

function sliceCorpus(corpus) {
    const sampleSize = 2;
    return corpus
        .map((_, index) => corpus.slice(index, index + sampleSize))
        .filter(group => group.length === sampleSize)
}

function collectTransitions(samples) {
    return samples.reduce((transitions, sample) => {
        const [state, next] = sample;

        transitions[state] = transitions[state] ?? [];
        transitions[state].push(next);

        return transitions;
    }, {});
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (list) => list[random(0, list.length - 1)];

function predictNext(chain, transitions) {
    const lastState = chain.at(-1);
    const nextWords = transitions[lastState] ?? [];
    return pickRandom(nextWords);
}

function createChain(startText, transitions) {
    const head = startText ?? pickRandom(Object.keys(transitions));
    return tokenize(head);
}

function* generateChain(startText, transitions) {
    const chain = createChain(startText, transitions);

    while (true) {
        const state = predictNext(chain, transitions);
        yield state;

        chain.push(state);
    }
}

const startText = " ";
const transitions = collectTransitions(sliceCorpus(tokenize('Привет! Как у тебя дела?')));
const generator = generateChain(startText, transitions);
console.log(generator.next().value)