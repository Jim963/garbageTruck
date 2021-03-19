import '@babel/polyfill';
import 'mutationobserver-shim';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store'
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
