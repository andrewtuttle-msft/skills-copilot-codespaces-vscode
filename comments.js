// Create web server

// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';

// Import routes
import comments from './routes/comments';

// Import config
import config from './config';

// Create web server
const app = express();

// Use middlewares
app.use(bodyParser.json());
app.use(cors());

// Connect to database
MongoClient.connect(config.database.url, (err, database) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Pass database to routes
  app.use('/api/comments', comments(database));

  // Serve static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Start server
  app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });
});