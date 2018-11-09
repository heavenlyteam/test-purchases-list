import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import App from './App';

Vue.use(VueSocketio, process.env.BASE_API);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
