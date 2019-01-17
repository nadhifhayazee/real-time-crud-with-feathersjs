const assert = require('assert');
const app = require('../../src/app');

describe('\'crud\' service', () => {
  it('registered the service', () => {
    const service = app.service('crud');

    assert.ok(service, 'Registered the service');
  });
});
