import Vue from 'vue'
import App from './App.vue'
import WgUi from '../packages'
Vue.config.productionTip = false
Vue.use(WgUi)
new Vue({
  render: h => h(App)
}).$mount('#app')
