import express from 'express';
import cors from 'cors';
import routes from './routes';
import db from './db';

db.connect();

const app = express();

// init middleware
app.use(cors());

// define routes
app.use('/', routes);

// define server
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);