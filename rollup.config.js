import typescript from '@rollup/plugin-typescript';
import * as pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    }
  ],
  plugins: [typescript()]
};