import connectDB from "../db/db.js";
import Campground from "../models/CampgroundSchema.js";
import { descriptors, places } from "./seedHelpers.js";
import cities from "./cities.js";

const seedDB = async () => {
  await connectDB();
  console.log("Database connected");
};

seedDB().then(async () => {
  Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`,
      price,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });
    await camp.save();
  }
  console.log("Database seeded");
  process.exit();
});
