// Initializes the `crud` service on path `/crud`
const createService = require('feathers-nedb');
const createModel = require('../../models/crud.model');
const hooks = require('./crud.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/crud', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('crud');

  service.hooks(hooks);
};
