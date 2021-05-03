import { numberParser } from './number.function';

describe('numberParser', () => {
  it('correctly parses a basic number', () => {
    expect(numberParser(2)).toEqual('2');
  });
});