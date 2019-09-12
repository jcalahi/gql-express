const graphql = require('graphql');
const UserType = require('./user_type');

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const AuthType = new GraphQLObjectType({
  name: 'AuthType',
  fields: {
    token: { type: GraphQLString },
    user: { type: UserType }
  }
});

module.exports = AuthType;
