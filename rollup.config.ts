import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

const libraryName = 'react-pagination-hook'

const globals = {
  react: 'React',
};

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: libraryName, format: 'umd', sourcemap: true, globals },
    { file: pkg.module, format: 'es', sourcemap: true, globals },
  ],
  external: ['react'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    sourceMaps(),
  ],
}
