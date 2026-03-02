import express from 'express';
import path from 'path';
import connectDB from './db/db.js';
import Campground from './models/CampgroundSchema.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

connectDB();

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecampgrounds', (req, res) => {
  const Campground1 = new Campground({
    title: 'My Backyard',
    price: 0,
    description: 'Cheap camping in my backyard',
    location: 'Philadelphia, PA'
  });
  Campground1.save();
  res.send(Campground1);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});