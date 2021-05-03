import { stringParser } from './string.function';

describe('stringParser', () => {
  it('correctly parses a string', () => {
    expect(stringParser('example')).toEqual('example');
  });
})