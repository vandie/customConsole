import { objectParser } from './object.function';

describe('objectParser', () => {
  it('correctly parses a object', () => {
    expect(objectParser({field: 'example'})).toEqual('[object Object]');
  });

  it('correctly parses a object with stringifyObjects enables', () => {
    expect(objectParser({field: 'example'}, {stringifyObjects: true})).toEqual(`{\n  "field": "example"\n}`);
  });
})