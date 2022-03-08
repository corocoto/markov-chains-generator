function sliceCorpus(corpus) {
    const sampleSize = 2;
    return corpus
        .map((_, index) => corpus.slice(index, index + sampleSize))
        .filter(group => group.length === sampleSize)
}