export default {
    entry: './build/index.js',
    dest: './dist/bundles/angular-kalendar.umd.js',
    format: 'umd',
    moduleName: 'angular-kalendar',
    external: [
        '@angular/core',
        '@angular/common',
        '@angular/forms'
    ]
}
