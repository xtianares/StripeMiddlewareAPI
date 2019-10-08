require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

// const cors = require("cors"); // disabled for now until we need Jack's tool to be able to use the API
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.set('secretKey', process.env.JWT_SECRET); // jwt secret token from environment variable

// Define middleware here
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
// app.use(cors()); // disabled for now until we need Jack's tool to be able to use the API
app.disable('x-powered-by');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.set('useNewUrlParser', true); // fix for deprecation warning
mongoose.set('useFindAndModify', false); // fix for deprecation warning
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_LOCAL_CONN_URL);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
