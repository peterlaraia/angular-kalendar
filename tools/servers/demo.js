const express = require('express');
const open = require('open');
const path = require('path');

const port = 4444;
let server = express();
server.use('/', express.static(path.resolve(process.cwd(), 'demo')));
server.listen(port, () => {
    open('http://localhost:' + port + '/');
});