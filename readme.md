# CustomConsole
CustomConsole replicates the functionality of `console.log`'s stringification (and then some) for a custom output method. Useful if you're wanting to output the console to a ui element for say, a game engine. It supports both JavaScript and TypeScript.

## Installation
From your command line call `npm install @vandie/customconsole` or `yarn install @vandie/customconsole`

## Usage
For basic usage it's as simple as creating a new logger and using it as you would `console.log`.

### Creating a logger
To create a logger, call the `customLog` function with your callback function passed.
```typescript
import { customLog } from 'customconsole';

// Our callback should take a single string value
const someCallback = (text: string) => { /** output string **/ }
const logger = customLog(someCallback);
```

### Using your logger.
Use your logger exactly as you would `console.log`. It takes an unlimited number of arguments with any types you want. eg.
```typescript
logger("Pass any data types you want", { vip: true }, 3);
```

## Advanced Usage
`customLog` does allow a second argument of type `LogOptions`. `LogOptions` is entirely optional, and all fields within it are such as well. LogOptions supports the following attributes:

### LogOptions
| Attribute        | type        | Effect |
| ---------------- | ----------- |--------|
| includeTimestamp | Boolean     | Starts each log with a js ms datestamp. eg. `"1434319925275: Example Log"`|
| stringifyObjects | Boolean     | If `true`, objects and arrays will be displayed using `JSON.stringify` rather than as `[object Object]` |
| separator   | String           | As with `console.log` each argument passed to your logger will be split with a new line character (`\n`). This argument allows you to replace that character with anything you see fit. |
| customParsers   | A key value store, where the keys are variable types (as returned by `typeof`) and the values is a parser function that you wish to call for this type             | Allows you to define custom parsers for the logger to use  |

### console.log replacement
Generally speaking you don't want to replace `console.log` as modifying prototypes is frowned upon. However, if you are attempting to have `console.log` calls output to a ui element from code you otherwise cannot modify (eg. a module from a third party), you can call
```typescript
const inbuiltLogger = console.log;
console.log = customLog(someCallback);
```