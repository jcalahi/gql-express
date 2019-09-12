const graphql = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const MovieType = require('./types/movie_type');
const AuthType = require('./types/auth_type');
const UserService = require('../services/api');

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = graphql;

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: GraphQLList(MovieType),
      resolve: async () => {
        const res = await UserService.getMovies();
        return res.data;
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) } 
      },
      resolve: async (parent, { username, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await UserService.createUser(username, hashedPassword);
        return {
          token: jwt.sign({ id: response.data.id, username }, 'scoutbase', { expiresIn: '1h' }),
          user: {
            id: response.data.id,
            username: response.data.username
          }
        }
      }
    },
    login: {
      type: AuthType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) } 
      },
      resolve: async (parentValue, { username, password }, req) => {
        const response = await UserService.getUsers();
        let user = response.data.find(item => item.username === username);

        if (!user) {
          throw new Error('Username not found!');
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordMatch) {
          throw new Error('Invalid login!');
        }
  
        return {
          token: jwt.sign({ id: response.data.id, username }, 'scoutbase', { expiresIn: '1h' }),
          user
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({ query, mutation });
