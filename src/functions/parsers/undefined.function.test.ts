import { undefinedParser } from './undefined.function';

describe('undefinedParser', () => {
  it('correctly parses a undefined', () => {
    expect(undefinedParser(undefined)).toEqual('undefined');
  });
})