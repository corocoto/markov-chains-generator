import {tokenize, textify} from "./tokenizer.js";

const escapeString = (token) => `_+${token}`;
const fromTokens = (tokens) => escapeString(tokens.join(''));

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


const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (list) => list[random(0, list.length - 1)];

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


console.log(generate({source: `Из молодежи, не считая старшей дочери графини (которая была четырьмя годами старше сестры и держала себя уже как большая) и гостьи-барышни, в гостиной остались Николай и Соня-племянница. Соня была тоненькая, миниатюрненькая брюнетка с мягким, отененным длинными ресницами взглядом, густою черною косою, два раза обвивавшею ее голову, и желтоватым оттенком кожи на лице и в особенности на обнаженных худощавых, но грациозных мускулистых руках и шее.`, wordsCount: 200}));
