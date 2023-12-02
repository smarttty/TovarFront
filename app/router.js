import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tovar-list');

  this.route('new', function() {
    this.route('tovar');
    this.route('tovar-v-zakaze');
  });

  this.route('tovar', {path: 'tovar/:id'});
  this.route('tovar-v-zakaze');
});

export default Router;
