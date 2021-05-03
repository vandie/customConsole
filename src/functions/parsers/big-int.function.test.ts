import { bigIntParser } from './big-int.function';

describe('bigIntParser', () => {
  it('correctly parses a basic number', () => {
    expect(bigIntParser(BigInt("9007199254740991"))).toEqual('9007199254740991');
  });
});