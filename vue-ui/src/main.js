import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import { store } from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'iview/dist/styles/iview.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(VueQuillEditor, /* { default global options } */ )
Vue.use(VueAxios, axios)
Vue.use(iView);
Vue.prototype.baseUrl = "http://10.31.162.51:3000";

axios.interceptors.request.use((config) => {
    if (store.state.token) {
        config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})