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
  },
  {
    firstName: "Test",
    lastName: "Castanares",
    email: "xtian2@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "customer",
  },
  {
    firstName: "Admin",
    lastName: "Test",
    email: "admin@test.com",
    phone: "111-111-1111",
    password: "111111",
    role: "admin",
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

const assessmentSeed = [
  {
    questions: [
      "This is the question one of one",
      "This is the question two of one",
      "This is the question three of one",
      "This is the question four of one",
      "This is the question five of one"
    ]
  },
  {
    questions: [
      "This is the question one of two",
      "This is the question two of two",
      "This is the question three of two",
      "This is the question four of two",
      "This is the question five of two"
    ]
  },
  {
    questions: [
      "This is the question one of three",
      "This is the question two of three",
      "This is the question three of three",
      "This is the question four of three", 
      "This is the question five of three"
    ]
  },
]

db.Assessment
  .deleteMany({})
  .then(() => db.Assessment.create(assessmentSeed))
  .then(data => {
    console.log(Object.keys(data).length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
