const express = require('express');
const next = require('next');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


const api = require('./lib/api');

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));

        server.use('/api', api);        

        if (dev)
            server.use(morgan('combined'));

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
