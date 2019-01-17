const crud = require('./crud/crud.service.js');
const users = require('./users/users.service.js');
const crud1 = require('./crud1/crud1.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(crud);
  app.configure(users);
  app.configure(crud1);
};
