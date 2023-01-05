import express from 'express';
import cors from 'cors';
import routes from './routes';
import db from './db';
import path from 'path'

db.connect();

const app = express();

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

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