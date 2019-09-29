const mongoose = require("mongoose");
const db = require("../models");

// This file seed the Users collection with the users below
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/AssuredApp");

const usersSeed = [
  {
    username: "xtian",
    firstName: "Christian",
    lastName: "Castanares",
    email: "xtian@test.com",
    password: "111111",
    address: "123 Somewhere Over There",
    city: "Lake Mary",
    state: "Florida",
    zipcode: "12345",
    country: "US"
  },
  {
    username: "xtian2",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian2@test.com",
    password: "111111",
    address: "123 Somewhere Over There",
    city: "My City",
    state: "Florida",
    zipcode: "12345",
    country: "US"
  },
  {
    username: "xtian3",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian3@test.com",
    password: "111111",
    address: "123 Somewhere Over There",
    city: "My City",
    state: "Florida",
    zipcode: "12345",
    country: "US"
  }
];

db.User
  .deleteMany({})
  .then(() => db.User.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
