import wordCollection from '../../../mocked-data.json';
import { shuffleArray } from '../../helpers/shuffleArray';

import { WordList, WordPosition } from './words.schema';

export default async function getXRandomizedWords(pick = 10) {
  let randomizedCollection = [];

  let wordsByPOS = await getWordsByPOSGroups();
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

  return randomizedCollection;
}

// simulate async operation
// get words collection form test data JSON
let getWordsCollection = async (): Promise<WordList> => {
  // simulate async operation, data could be fetched from a remote source
  try {
    const { wordList } = (await wordCollection) as WordList;
    // console.log('wordList: ', wordList);
    return { wordList };
  } catch (error) {
    throw new Error(
      `an error occured during fetching word collection data:: ${error}`,
    );
  }
};

let filterWordsByPOS = (pos: WordPosition) =>
  getWordsCollection().then((data: WordList) =>
    data.wordList.filter((words) => words.pos === pos),
  );

// filters words by their part of speech
// and organizes them into distinct collections: nouns, verbs, adjectives, and adverbs
let getWordsByPOSGroups = () => {
  let nouns = filterWordsByPOS('noun');
  let verbs = filterWordsByPOS('verb');
  let adjectives = filterWordsByPOS('adjective');
  let adverbs = filterWordsByPOS('adverb');

  return [nouns, verbs, adjectives, adverbs];
};

const getRandomIndex = (maxIndex: number) =>
  Math.floor(Math.random() * maxIndex);
