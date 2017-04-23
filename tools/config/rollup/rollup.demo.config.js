import resolve from 'rollup-plugin-node-resolve-angular';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'demo/dist/demo/src/main.js',
    dest: 'demo/main.bundle.js',
    format: 'umd',
    moduleName: 'angular-kalendar',
    plugins: [
        resolve({jsnext: true, main: true}),
        commonjs({
            include: 'node_modules/**',
            extensions: ['.js'],
            ignoreGlobal: false,
            sourceMap: false,
            namedExports: { './rxjs/Subject.js': ['Subject']}
        })
    ]
}