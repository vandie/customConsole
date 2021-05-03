import { symbolParser } from './symbol.function';

describe('symbolParser', () => {
  it('correctly parses a symbol', () => {
    expect(symbolParser(Symbol("id"))).toEqual('[symbol]');
  });
})