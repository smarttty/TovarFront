import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | new/tovar-v-zakaze', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:new/tovar-v-zakaze');
    assert.ok(route);
  });
});
