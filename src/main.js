import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(VueDirectiveImagePreviewer)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
