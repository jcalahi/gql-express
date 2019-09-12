const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const schema = require('./schema/schema');

const getUser = token => {
  try {
    return token ? jwt.verify(token, 'scoutbase') : null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    return { user };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
