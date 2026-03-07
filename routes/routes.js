import express from 'express';
import Campground from '../models/CampgroundSchema.js';

const router = express.Router();

router.get('/', (req, res) => {
  const currentUser = 1;
  const success = 'success';
  const error = 'error';
  res.render('home', { currentUser, success, error });
});

router.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

router.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show', { campground });
});

router.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

router.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

router.get('/campgrounds/:id/edit', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit', { campground });
});

router.put('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`/campgrounds/${campground._id}`);
});

router.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
});

router.get('/error', (req, res) => {
  throw new Error('This is a test error');
});

export default router;