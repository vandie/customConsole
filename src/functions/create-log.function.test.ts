import { createLog } from './create-log.function';
import { set as setMockDate } from 'mockdate';
import { LogOptions } from '../types';

describe('createLog', () => {
  afterEach(() => jest.restoreAllMocks());

  describe('when running stock', () => {
    it('currying works as expected', () => {
      const callback = jest.fn();
      const log = createLog(callback);

      log('Example');
      expect(callback).toHaveBeenCalledWith('Example');
    });

    it('calls the correct parser for the correct type', () => {
      const callback = jest.fn();
      const log = createLog(callback);
      const fnSpy = jest.spyOn(require('./parsers/function.function'), 'functionParser');
      const objSpy = jest.spyOn(require('./parsers/object.function'), 'objectParser');
      const numSpy = jest.spyOn(require('./parsers/number.function'), 'numberParser');
      const boolSpy = jest.spyOn(require('./parsers/boolean.function'), 'booleanParser');
      const bigIntSpy = jest.spyOn(require('./parsers/big-int.function'), 'bigIntParser');
      const stringSpy = jest.spyOn(require('./parsers/string.function'), 'stringParser');

      const fn = () => 'hello';
      const obj = { field: 'example' }
      const num = 12.2;
      const bool = true;
      const bigInt = BigInt('20000000000');
      const string = 'I am string'

      log(fn, obj, num, bool, bigInt, string);
      expect(fnSpy).toHaveBeenCalledWith(fn, {});
      expect(objSpy).toHaveBeenCalledWith(obj, {});
      expect(numSpy).toHaveBeenCalledWith(num, {});
      expect(boolSpy).toHaveBeenCalledWith(bool, {});
      expect(bigIntSpy).toHaveBeenCalledWith(bigInt, {});
      expect(stringSpy).toHaveBeenCalledWith(string, {});
      expect(callback).toHaveBeenCalledWith(`() => 'hello'\n[object Object]\n12.2\ntrue\n20000000000\nI am string`);
    });
  });

  describe('when given custom parsers', () => {
    it('calls the correct custom parser for the job if available', () => {
      const callback = jest.fn();
      const customNumberParser = jest.fn().mockImplementation((num: number) => (num + 1).toString());
      const options = {
        customParsers: {
          'number': customNumberParser
        }
      };
      const log = createLog(callback, options);

      log('The answers are: ', 2, 6, 1 ,4);
      expect(customNumberParser).toHaveBeenCalledWith(2, options);
      expect(customNumberParser).toHaveBeenCalledWith(6, options);
      expect(customNumberParser).toHaveBeenCalledWith(1, options);
      expect(customNumberParser).toHaveBeenCalledWith(4, options);
      expect(callback).toHaveBeenCalledWith(`The answers are: \n3\n7\n2\n5`);
    });
  });

  describe('when given custom settings', () => {
    it('handles separator setting correctly', () => {
        const callback = jest.fn();
        const log = createLog(callback, {separator: '\t'});
  
        log('Example', 'part2', 'part3');
        expect(callback).toHaveBeenCalledWith('Example\tpart2\tpart3');
    });

    it('handles stringifyObjects setting correctly when set to true', () => {
      const callback = jest.fn();
      const log = createLog(callback, {stringifyObjects: true});

      log('Example', {
        field: 'example'
      });
      expect(callback).toHaveBeenCalledWith('Example\n{\n  "field": "example"\n}');
    });

    it('handles stringifyObjects setting correctly when set to false', () => {
      const callback = jest.fn();
      const log = createLog(callback, {stringifyObjects: false});

      log('Example', {
        field: 'example'
      });
      expect(callback).toHaveBeenCalledWith('Example\n[object Object]');
    });

    it('handles includeTimestamp setting correctly', () => {
      const callback = jest.fn();
      setMockDate(1434319925275);
      const log = createLog(callback, {includeTimestamp: true});

      log('Example');
      expect(callback).toHaveBeenCalledWith('1434319925275: Example');
    });

    it('handles custom typeChecks correctly', () => {
      const callback = jest.fn();
      const customNumberParser = jest.fn().mockImplementation((num: string) => (parseInt(num) + 1).toString());
      const options: LogOptions = {
        customParsers: {
          'customNumber': customNumberParser
        },
        customTypeChecker: (variable: any) => (typeof variable === 'string' ? 'customNumber' : typeof variable)
      };
      const log = createLog(callback, options);

      log('2');
      expect(customNumberParser).toHaveBeenCalledWith('2', options);
      expect(callback).toHaveBeenCalledWith('3');
    });
  });
})