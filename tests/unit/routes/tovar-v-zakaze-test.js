import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tovar-v-zakaze', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tovar-v-zakaze');
    assert.ok(route);
  });
});
