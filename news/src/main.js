// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouts from 'vue-router'
import Goods from './components/goods/goods.vue'
import Seller from './components/seller/seller.vue'
import Ratings from './components/ratings/ratings.vue'
import axios from 'axios'
import Mint from 'mint-ui'
Vue.use(Mint)
Vue.use(VueRouts)
Vue.prototype.$ajax = axios

// Vue.config.productionTip = false

/* eslint-disable no-new */
const routers = [{
    path: '/goods',
    component: Goods
}, {
    path: '/seller',
    component: Seller
}, {
    path: '/ratings',
    component: Ratings
}]
const router = new VueRouts({
    routes:routers,
    linkActiveClass:'active'
})
const app = new Vue({
    el: '#app',
    router,
    ...App,
})
