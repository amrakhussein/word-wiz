import request from 'supertest';
import app from '../app';
import { Word, WordCollectionResponse } from '../features/words/words.schema';

describe('Integration tests for the words API', () => {
  it('GET /words - success -  get all words ', async () => {
    const response = await request(app).get('/words');
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json'),
    );
    expect(response.status).toBe(200);
    const result: WordCollectionResponse = response.body;
    const { statusCode } = response;

    expect(result).toEqual(
      expect.objectContaining({
        words: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            word: expect.any(String),
            pos: expect.any(String),
          }),
        ]),
      }),
    );

    expect(statusCode).toBe(200);
  });

  it('Should return no nulls among the words collections', async () => {
    const iterations = 10;

    for (let i = 0; i < iterations; i++) {
      const response = await request(app).get('/words?pick=10');
      const result: WordCollectionResponse = response.body;

      const hasNull = result.words.some((word: Word) => word === null);

      expect(hasNull).toBe(false);
    }
  });

  it('Should return a randomized collections', async () => {
    const response1 = await request(app).get('/words?pick=10');
    const result1: WordCollectionResponse = response1.body;

    const response2 = await request(app).get('/words?pick=10');
    expect(response2.status).toBe(200);
    const result2: WordCollectionResponse = response2.body;

    expect(result1.words).toHaveLength(10);
    expect(result2.words).toHaveLength(10);

    const isSameOrder = result1.words.every(
      (word: Word, idx: number) => word.id === result2.words[idx]?.id,
    );

    expect(isSameOrder).toBe(false);
  });

  it('Should return a collection of words that include all wordPOS each time', async () => {
    const wordPositionCount = {
      noun: 0,
      verb: 0,
      adjective: 0,
      adverb: 0,
    };

    const iterations = 8;

    for (let i = 0; i < iterations; i++) {
      const response = await request(app).get('/words?pick=10');
      const result: WordCollectionResponse = response.body;
      expect(result.words).toHaveLength(10);

      result.words.forEach((word: Word) => {
        wordPositionCount[word.pos]++;
      });
    }

    console.log('wordPositionCount: ', wordPositionCount);
    const posDistribution = Object.values(wordPositionCount);

    posDistribution.forEach((count) => {
      expect(count).toBeGreaterThan(0);
    });
  });
});
