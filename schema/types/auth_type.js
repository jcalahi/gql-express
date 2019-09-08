const graphql = require('graphql');
const axios = require('axios');
const UserType = require('./user_type');

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const AuthType = new GraphQLObjectType({
  name: 'AuthType',
  fields: {
    token: { 
      type: GraphQLString,
      resolve: (parentValue) => {
        return parentValue.accessToken;
      }
    },
    user: {
      type: UserType,
      resolve: (parentValue, args, res, co) => {
        return axios.get('http://localhost:3000/users/1', null, {
          headers: { Authorization: "Bearer " + parentValue.accessToken }
        }).then(res => {
          console.log(res);
          return res.data;
        });
      }
    }
  }
});

module.exports = AuthType;
