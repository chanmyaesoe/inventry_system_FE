import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueToastr from 'vue-toastr';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'vue-toast-notification/dist/theme-sugar.css';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueToastr)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
