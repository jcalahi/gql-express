const axios = require('axios');

function createUser(username, password) {
  return axios.post('http://localhost:3000/users', { username, password });
}

function getUsers() {
  return axios.get('http://localhost:3000/users');
}

function getMovies() {
  return axios.get('http://localhost:3000/movies');
}

function getActors() {
  return axios.get('http://localhost:3000/actors');
}

function getDirectors() {
  return axios.get('http://localhost:3000/directors');
}

module.exports = { 
  createUser, 
  getActors,
  getDirectors,
  getMovies, 
  getUsers 
};
