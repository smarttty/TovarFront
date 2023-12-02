import Route from '@ember/routing/route';
import { set } from '@ember/object';
import config from '../../config/environment';

export default Route.extend({
    model() {
        return {};
    },

    postJSON(url, data) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
          //xhr.withCredentials = true;
    
          xhr.open('POST', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr.send(data);
    
    
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
        save(){
            let model = this.get('controller.model');
            set(model, 'price', Number(model.price));
            this.postJSON(`${config.APP.backendUrl}/Tovar`, JSON.stringify(model)).then(savedTovar => {
                this.transitionTo(`tovar`, savedTovar.id);
            });
        }
    }
});
