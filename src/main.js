import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(dayOfYear)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
