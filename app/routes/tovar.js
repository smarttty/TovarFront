import Route from '@ember/routing/route';
import config from '../config/environment';
import { set } from '@ember/object';


export default Route.extend({
    model(params){
        return this.getJSON(`${config.APP.backendUrl}/Tovar/${params.id}`);
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

    putJSON(url, data) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
          //xhr.withCredentials = true;
    
          xhr.open('PUT', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr.send(data);
    
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 204) {
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
            this.putJSON(`${config.APP.backendUrl}/Tovar/${model.id}`, JSON.stringify(model));
        },

        addTovarToZakaz() {
            let model = this.get('controller.model');
            this.transitionTo(`new.tovar-v-zakaze`, {
                queryParams: {
                    tovarName: model.name,
                    tovarId: model.id
                }
            });
        }
    }
});
