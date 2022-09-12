import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { execSync } from 'child_process';

const isPreact = process.env.PREACT === 'true';
const pkg = require(isPreact ? './preact/package.json' : './package.json');
const prefix = (arg) => (isPreact ? `./preact/${arg}` : arg);

if (isPreact) {
  // Run preact transform
  execSync(
    '$(npm bin)/babel src --out-dir preact/src --plugins @babel/plugin-syntax-typescript,./react-to-preact.js --extensions .ts --out-file-extension .ts'
  );
}

export default {
  input: isPreact ? 'preact/src/index.ts' : 'src/index.ts',
  output: [
    {
      file: prefix(pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: prefix(pkg.module),
      format: 'es',
      sourcemap: true,
    },
    {
      file: prefix(pkg['umd:main']),
      format: 'umd',
      sourcemap: true,
      name: 'fielder',
      globals: isPreact
        ? { preact: 'preact', 'preact/hooks': 'preact' }
        : { react: 'react' },
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      tsconfigOverride: isPreact
        ? { exclude: ['./src'], include: ['./preact/src'] }
        : undefined,
    }),
    terser({}),
  ],
};
