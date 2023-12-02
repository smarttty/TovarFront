import Route from '@ember/routing/route';
import config from '../../config/environment';
import { set } from '@ember/object';

export default Route.extend({

    tovarId: null,
    tovarName: null,
    zakazy: null,

    beforeModel(transition) {
        this.tovarId = transition.queryParams.tovarId;
        this.tovarName = transition.queryParams.tovarName;
        return this.getJSON(`${config.APP.backendUrl}/Zakaz`).then(zakazy => this.zakazy = zakazy);
    },

    model() {
        return {
            tovarId: this.tovarId,
            zakazId: this.zakazy[0].id
        }
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

    postJSON(url, data) {
        return new Promise(function (resolve, reject) {
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

    setupController(controller) {
        this._super(...arguments);
        controller.set('tovarName', this.tovarName);
        controller.set('zakazy', this.zakazy);
    },

    actions: {
        updateZakaz() {
            const controller = this.get('controller');
            controller.set('model.zakazId', event.target.value);
        },

        save() {
            let model = this.get('controller.model');
            set(model, 'zakazId', Number(model.zakazId));
            set(model, 'tovarId', Number(model.tovarId));
            this.postJSON(`${config.APP.backendUrl}/TovarVZakaze`, JSON.stringify(model)).then(_ => {
                this.transitionTo(`tovar`, model.tovarId);
            });
        }
    }
});
