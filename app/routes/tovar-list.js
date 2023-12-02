import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
    model(){
        return this.getJSON(`${config.APP.backendUrl}/Tovar`);
    },

    getJSON(url) {
        return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          //xhr.withCredentials = true;
    
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr.send();
    
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          }
        });
      },

      actions: {
        addTovar(){
            this.transitionTo('new.tovar');
        },

        clickTovar(id) {
            this.transitionTo('tovar', id);
        }
      }
});
