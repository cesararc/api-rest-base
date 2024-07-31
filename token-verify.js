
const jwt = require('jsonwebtoken');

const secret =  'mysecret'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyMjM4NDMwNiwiZXhwIjoxNzIyMzg3OTA2fQ.I79Zk9nOhfzC29XEVLqozdoFso4qQLeUSOqH5RPjXU0'

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

console.log(verifyToken(token, secret)); // { sub: 1, role: 'customer', iat: 1627580137, exp: 1627583737 }
