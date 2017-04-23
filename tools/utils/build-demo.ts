import { mkdirSync } from 'fs';
import * as rimraf from 'rimraf';
import { copySync } from 'fs-extra';

console.log('Build Demo');

const vendorFiles = [
    './node_modules/@angular/core/bundles/core.umd.js',
    './node_modules/@angular/compiler/bundles/compiler.umd.js',
    './node_modules/@angular/common/bundles/common.umd.js',
    './node_modules/@angular/forms/bundles/forms.umd.js',
    './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    './node_modules/systemjs/dist/system.src.js',
    './node_modules/zone.js/dist/zone.min.js',
    './node_modules/core-js/client/shim.min.js',
    './node_modules/rxjs/bundles/Rx.js',
    './node_modules/ts-helpers/index.js',
    './node_modules/tslib/tslib.js'
];

console.log('Copy Vendor Files');
rimraf('demo/vendor', () => {
    mkdirSync('demo/vendor');
    vendorFiles.forEach((path) => {
        console.log('copying: ', path);
        const filename = path.split('/').pop();
        copySync(path, `demo/vendor/${filename}`);
    });
});

copySync('dist', 'demo/angular-kalendar');
