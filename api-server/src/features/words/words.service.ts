/**
 * The function `getXRandomizedWords` retrieves a collection of words from a JSON test file, organizes them
 * into distinct groups based on their part of speech, and then selects a specified number of random
 * words from each group to create a final randomized collection.
 * @returns The function `getXRandomizedWords` returns a Promise that resolves to a `WordCollection`
 * object.
 */
import wordCollection from '../../../data/words.data.json';
import { shuffleArray } from '../../utils/shuffleArray';

import {
  Word,
  WordCollection,
  WordCollectionResponse,
  WordPosition,
} from './words.schema';

export default async function getXRandomizedWords(
  pick = 10,
): Promise<WordCollectionResponse> {
  const wordsByPOS = await getWordsByPOSGroupsRandomed();
  const allWords = wordsByPOS.flat(); // all words made into a single array

  const shuffledWords = shuffleArray(allWords); // randomize

  const randomizedCollection = await shuffledWords.slice(0, pick);

  const words: Word[] = randomizedCollection.map((x) => ({
    id: x.id,
    word: x.word,
    pos: x.pos,
  }));

  // simulate 1 sec delay
  // await sleep(1000);

  return { words };
}

// simulate async operation
// get words collection form test data JSON
let getWordsCollection = async (): Promise<Word[]> => {
  // simulate async operation, data could be fetched from a remote source
  try {
    const { wordList: words } = WordCollection.parse(await wordCollection);

    return words;
  } catch (error) {
    throw new Error(
      `an error occured during fetching word collection data:: ${error}`,
    );
  }
};

let filterWordsByPOS = (pos: WordPosition) =>
  getWordsCollection().then((data: Word[]) =>
    data.filter((word) => word.pos === pos),
  );

// filters words by their part of speech
// and organizes them into distinct collections: nouns, verbs, adjectives, and adverbs with random order
let getWordsByPOSGroupsRandomed = async () => {
  const nounsPromise = filterWordsByPOS('noun');
  const verbsPromise = filterWordsByPOS('verb');
  const adjectivesPromise = filterWordsByPOS('adjective');
  const adverbsPromise = filterWordsByPOS('adverb');

  // simulate async operation
  const [nouns, verbs, adjectives, adverbs] = await Promise.all([
    nounsPromise,
    verbsPromise,
    adjectivesPromise,
    adverbsPromise,
  ]);

  const posGroups: Word[][] = [nouns, verbs, adjectives, adverbs];

  shuffleArray(posGroups); // randomize grouping order

  return posGroups;
};
