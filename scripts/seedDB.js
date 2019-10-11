require('dotenv').config();
const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// This file seed the Users collection with the users below
mongoose.set('useNewUrlParser', true); // fix for deprecation warning
mongoose.set('useFindAndModify', false); // fix for deprecation warning
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_LOCAL_CONN_URL);

const usersSeed = [
  {
    firstName: "Christian",
    lastName: "Castanares",
    email: "xtian@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "customer",
    company: {
      companyName: "Company 1",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Startup",
      indsutry: "Computer and IT Systems and Services"
    }
  },
  {
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian2@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "customer",
    company: {
      companyName: "Company 2",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Small business within the top 50-75%",
      indsutry: "Computer and IT Systems and Services"
    }
  },
  {
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian3@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "customer",
    company: {
      companyName: "Company 3",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Medium business within the top 15-50%",
      indsutry: "Computer and IT Systems and Services"
    }
  },
  {
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian4@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "customer",
    company: {
      companyName: "Company 4",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Large business within the top 5-15%",
      indsutry: "Computer and IT Systems and Services"
    }
  },
  {
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian5@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "customer",
    company: {
      companyName: "Company 5",
      address: "123 Somewhere Over There",
      city: "Lake Mary",
      state: "Florida",
      zipcode: "12345",
      country: "US",
      companySize: "Leader in the industry within the top 5%",
      indsutry: "Computer and IT Systems and Services"
    }
  },
  {
    firstName: "Admin",
    lastName: "Test",
    email: "admin@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "admin",
    company: {
      companyName: "Assured Enterprises"
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


const productSeed = [
  {
    name: "Product One",
    description: "The short description of product one goes here.",
    price: 100,
    sku: "AE-001",
  },
  {
    name: "Product Two",
    description: "The short description of product two goes here.",
    price: 100,
    sku: "AE-002",
  },
  {
    name: "Product Three",
    description: "The short description of product three goes here.",
    price: 100,
    sku: "AE-003",
  },
]

db.Product
  .deleteMany({})
  .then(() => db.Product.create(productSeed))
  .then(data => {
    console.log(Object.keys(data).length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
