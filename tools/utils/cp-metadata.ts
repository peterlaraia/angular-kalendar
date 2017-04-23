import * as copy from 'recursive-copy';

const options = {
    filter: [
        '**/*',
        '!**/*.js'
    ]
}

copy('build', 'dist', options, (err, results) => {
    if (err) {
        console.error('Error copying files from build to dist');
    } else {
        console.info(`Copied: ${results.length} files`);
    }
})