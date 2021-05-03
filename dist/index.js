'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = /*#__PURE__*/Object.freeze({
    __proto__: null
});

const stringParser = (value) => value;

const numberParser = (value) => value.toString();

const bigIntParser = (value) => value.toString();

const booleanParser = (value) => value ? 'true' : 'false';

const symbolParser = (value) => '[symbol]';

const objectParser = (value, options = {}) => options.stringifyObjects ? JSON.stringify(value, null, 2) : value.toString();

const undefinedParser = (value) => 'undefined';

const functionParser = (value) => value.toString();

var inbuiltParsers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    string: stringParser,
    number: numberParser,
    bigint: bigIntParser,
    boolean: booleanParser,
    symbol: symbolParser,
    object: objectParser,
    'undefined': undefinedParser,
    'function': functionParser
});

const createLog = (output, options = {}) => {
    const parsers = options.customParsers ? Object.assign(Object.assign({}, inbuiltParsers), options.customParsers) : inbuiltParsers;
    return (...args) => {
        let prefixs = '';
        let text = args.map((value) => {
            const type = typeof value;
            const parser = parsers[type];
            if (parser)
                return parser(value, options);
            else
                return `[unrecognisedType ${type}]`;
        }).join(options.separator || '\n');
        if (options.includeTimestamp)
            prefixs = ` ${Date.now()}`;
        output(prefixs.length ? `${prefixs.trim()}: ${text}` : text);
    };
};

exports.customLog = createLog;
exports.parsers = inbuiltParsers;
exports.types = index;
//# sourceMappingURL=index.js.map
