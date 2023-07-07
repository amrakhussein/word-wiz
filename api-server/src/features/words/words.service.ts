/**
 * The function `getXRandomizedWords` retrieves a collection of words from a JSON test file, organizes them
 * into distinct groups based on their part of speech, and then selects a specified number of random
 * words from each group to create a final randomized collection.
 * @returns The function `getXRandomizedWords` returns a Promise that resolves to a `WordCollection`
 * object.
 */
import wordCollection from '../../../mocked-data.json';
import { shuffleArray } from '../../helpers/shuffleArray';

import { WordCollection, WordPosition } from './words.schema';

export default async function getXRandomizedWords(
  pick = 10,
): Promise<WordCollection> {
  let randomizedCollection = [];

  let wordsByPOS = await getWordsByPOSGroupsRandomed();
  let groupIdx = 0; // start with the first word position group

  for (let i = 0; i < pick; i++) {
    let currentGroup = await wordsByPOS[groupIdx];
    let randomIndex = getRandomIndex(currentGroup.length);
    let randomWord = currentGroup[randomIndex];

    randomizedCollection.push(randomWord);

    // remove the selected word from the current group
    currentGroup.splice(randomIndex, 1);

    groupIdx++;
    if (groupIdx === wordsByPOS.length) {
      // reset group index when all word position groups have been traversed
      groupIdx = 0;
    }
  }

  // randomized selected collection
  shuffleArray(randomizedCollection);

  return { words: randomizedCollection };
}

// simulate async operation
// get words collection form test data JSON
let getWordsCollection = async (): Promise<WordCollection> => {
  // simulate async operation, data could be fetched from a remote source
  try {
    const { wordList: words } = await wordCollection;
    // console.log('wordList: ', wordList);
    return { words };
  } catch (error) {
    throw new Error(
      `an error occured during fetching word collection data:: ${error}`,
    );
  }
};

let filterWordsByPOS = (pos: WordPosition) =>
  getWordsCollection().then((data: WordCollection) =>
    data.words.filter((word) => word.pos === pos),
  );

// filters words by their part of speech
// and organizes them into distinct collections: nouns, verbs, adjectives, and adverbs with random order
let getWordsByPOSGroupsRandomed = () => {
  let nouns = filterWordsByPOS('noun');
  let verbs = filterWordsByPOS('verb');
  let adjectives = filterWordsByPOS('adjective');
  let adverbs = filterWordsByPOS('adverb');

  // Create an array with the POS groups
  let posGroups = [nouns, verbs, adjectives, adverbs];
  console.log('posGroups: ', posGroups);

  shuffleArray(posGroups);

  return posGroups;
};

const getRandomIndex = (maxIndex: number) =>
  Math.floor(Math.random() * maxIndex);
