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
    company: {
      companyName: "Company 1",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Startup",
      coreBusinessArea: "Computer and IT Systems and Services"
    }
  },
  {
    username: "xtian2",
    password: "111111",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian2@test.com",
    phone: "111-111-1111",
    company: {
      companyName: "Company 2",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Small business within the top 50-75%",
      coreBusinessArea: "Computer and IT Systems and Services"
    }
  },
  {
    username: "xtian3",
    password: "111111",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian3@test.com",
    phone: "111-111-1111",
    company: {
      companyName: "Company 3",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Medium business within the top 15-50%",
      coreBusinessArea: "Computer and IT Systems and Services"
    }
  },
  {
    username: "xtian4",
    password: "111111",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian4@test.com",
    phone: "111-111-1111",
    company: {
      companyName: "Company 4",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Large business within the top 5-15%",
      coreBusinessArea: "Computer and IT Systems and Services"
    }
  },
  {
    username: "xtian5",
    password: "111111",
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian5@test.com",
    phone: "111-111-1111",
    company: {
      companyName: "Company 5",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Leader in the industry within the top 5%",
      coreBusinessArea: "Computer and IT Systems and Services"
    }
  },
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
