'use strict';

function reverse(s) {
  return s.split('').reverse().join('');
}

function concatenate(s, n){
  var c ='';
  for (var i = 0; i < n; i++) {
    c+=s;
  }
  return c;
}

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
        return reply('Hello world. Words words words.');
    }
});

server.route({
    method: 'GET',
    path:'/protected',
    handler: function (request, reply) {
        return reply('Trespassors will be shot.').code(401);
    }
});

server.route({
    method: 'GET',
    path:'/strings/upper',
    handler: function (request, reply) {
        return reply(request.query.value.toUpperCase());
    }
});

server.route({
    method: 'GET',
    path:'/strings/reverse',
    handler: function (request, reply) {
        return reply(reverse(request.query.value));
    }
});

server.route({
    method: 'GET',
    path:'/strings/concatenate',
    handler: function (request, reply) {
        return reply(concatenate(request.query.value, request.query.times));
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
