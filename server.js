require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.set('secretKey', process.env.JWT_SECRET); // jwt secret token from environment variable

// Define middleware here
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_LOCAL_CONN_URL);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
