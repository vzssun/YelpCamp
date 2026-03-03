import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './db/db.js';
import router from './routes/routes.js';
import methodOverride from 'method-override';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

connectDB();

app.use(router);
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content',
  optionsSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});