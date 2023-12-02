import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | new/tovar', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:new/tovar');
    assert.ok(route);
  });
});
