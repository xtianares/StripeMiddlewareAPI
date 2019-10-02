require('dotenv').config();
const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// This file seed the Users collection with the users below
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_LOCAL_CONN_URL);

const usersSeed = [
  {
    username: "xtian",
    password: "111111",
    firstName: "Christian",
    lastName: "Castanares",
    email: "xtian@test.com",
    phone: "111-111-1111",
    companyName: "Company 1",
    address: "123 Somewhere Over There",
    city: "Lake Mary",
    state: "Florida",
    zipcode: "12345",
    country: "US"
  },
  {
    username: "xtian2",
    password: "111111",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian2@test.com",
    phone: "111-111-1111",
    companyName: "Company 2",
    address: "123 Somewhere Over There",
    city: "My City",
    state: "Florida",
    zipcode: "12345",
    country: "US"
  },
  {
    username: "xtian3",
    password: "111111",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian3@test.com",
    phone: "111-111-1111",
    companyName: "Company 3",
    address: "123 Somewhere Over There",
    city: "My City",
    state: "Florida",
    zipcode: "12345",
    country: "US"
  }
];

usersSeed.forEach(user => {
  user.password = bcrypt.hashSync(user.password, saltRounds);
});

db.User
  .deleteMany({})
  .then(() => db.User.create(usersSeed))
  .then(data => {
    console.log(Object.keys(data).length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
