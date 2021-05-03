import { booleanParser } from './boolean.function';

describe('booleanParser', () => {
  it('correctly parses booleans', () => {
    expect(booleanParser(true)).toEqual('true');
    expect(booleanParser(false)).toEqual('false');
  });
});