import { readFileSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';

const packageJson = JSON.parse(readFileSync('package.json').toString());
delete packageJson.devDependencies;
delete packageJson.scripts;
delete packageJson.private;
writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));

copySync('README.md', 'dist/README.md')