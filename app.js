import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './db/db.js';
import router from './routes/routes.js';
import methodOverride from 'method-override';
import errorHandler from './middlewares/errorHandler.js';
import ejsMate from 'ejs-mate';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(process.cwd(), 'public')));

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

app.use((req, res, next) => {
    res.locals.currentUser = 1;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use((req, res) => {
  res.status(404).render('404');
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});