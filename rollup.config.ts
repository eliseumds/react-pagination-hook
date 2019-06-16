import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

const libraryName = 'react-pagination-hook'

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
};
const sharedConfig = {
  external: ['react', 'react-dom'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    sourceMaps(),
  ],
};

export default [
  {
    ...sharedConfig,
    input: `src/demo.tsx`,
    output: {
      file: 'docs/js/demo.js',
      format: 'umd',
      globals,
    },
  },
  {
    ...sharedConfig,
    input: `src/${libraryName}.ts`,
    output: [
      { file: pkg.main, name: libraryName, format: 'umd', sourcemap: true, globals },
      { file: pkg.module, format: 'es', sourcemap: true, globals },
    ],
  }
];
