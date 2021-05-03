import { functionParser } from './function.function';

describe('functionParser', () => {
  it('correctly parses a function', () => {
    const exampleFunction = () => console.log('example');
    expect(functionParser(exampleFunction)).toEqual('() => console.log(\'example\')');
  });
})