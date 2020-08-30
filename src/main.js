import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import Axios from "axios";
import jquery from 'jquery'
window.$ = jquery;
window.jQuery = jquery;
// var scrollex = require('./assets/js/jquery_scrollex_min');
// var scrolly = require('./assets/js/jquery_scrolly_min');
// var slidex = require('./assets/js/breakpoints_min');
// var slide = require('./assets/js/util');
// var slidec = require('./assets/js/script');
import './assets/scss/styles.scss';
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});

const waitForGlobal = async () => {
  if (window.tronWeb) {
      const nodes = await window.tronWeb.isConnected();
      const connected = !Object.entries(nodes).map(([key, value]) => {
          if (!value) {
              console.error(`Error: ${key} is not connected`)
          }
          return value
      }).includes(false)
      if (connected) {
          await store.dispatch('registerTronWeb')
      } else {
          setTimeout(async () => {
              await waitForGlobal()
          }, 100)
      }
  } else {
      setTimeout(async () => {
          await waitForGlobal()
      }, 100)
  }
}

waitForGlobal().then()
