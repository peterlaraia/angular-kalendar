const express = require('express');
const open = require('open');
const path = require('path');

const port = 9876;
let server = express();
server.use('/', express.static(path.resolve(process.cwd(), 'coverage')));
server.listen(port, () => {
    open('http://localhost:' + port);
});