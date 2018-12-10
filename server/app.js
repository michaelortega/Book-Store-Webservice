const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect(
  "mongodb://michael:password123@ds213259.mlab.com:13259/bookstore-db",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to database.");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000.");
});
