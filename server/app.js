const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use("cors");
mongoose.connect('mongodb://johnwick76:test123@ds145752.mlab.com:45752/graphql', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mLab');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('listening on port 4000');
});