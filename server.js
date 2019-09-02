const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000);
console.log('Running GraphQL API at localhost:4000/graphql');