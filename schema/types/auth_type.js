const graphql = require('graphql');
const jwtDecode = require('jwt-decode');
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
        const userData = jwtDecode(parentValue.accessToken);
        return axios.get(`http://localhost:3000/users/${userData.sub}`, null, {
          headers: { Authorization: "Bearer " + parentValue.accessToken }
        }).then(res => res.data);
      }
    }
  }
});

module.exports = AuthType;
