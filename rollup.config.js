export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/angular2-datetime.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'angular2-datetime',
    external: [
        '@angular/core'    
    ]
}