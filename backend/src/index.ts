import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import entryRoutes from './routes/entryRoutes';
import profileRoutes from './routes/profileRoutes';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

dotenv.config();

const app = express();

app.use(cors());

app.use(compression()); // Compress all routes

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);


app.use('/auth', authRoutes);
app.use('/entries', entryRoutes);
app.use('/profile', profileRoutes);

app.get('/ping', (req, res) => {
    res.send('pong');
  });

const PORT = process.env.PORT || 3000;

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('Server running ', PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
