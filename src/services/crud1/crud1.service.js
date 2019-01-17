// Initializes the `crud1` service on path `/`
const createService = require('feathers-nedb');
const createModel = require('../../models/crud1.model');
const hooks = require('./crud1.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('');

  service.hooks(hooks);
};
