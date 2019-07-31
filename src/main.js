// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




import Vue from 'vue'
import App from './App'
import router from './router'
// 引入IVIEW组件
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 引入vue-easytable
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'




Vue.use(iView)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

//引入axios
import axios from 'axios'

axios.defaults.withCredentials = true

Vue.prototype.$ajax = axios
Vue.prototype.axios = axios




// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

import  QS from 'qs'
//导入vue-router
//引入主题 这个要放在本来样式的下面
import '../theme/index.css'

import VueRouter from 'vue-router'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.use(VueRouter)

// axios.interceptors.response.use(
//   response => {
//     // return response;
//     // console.log(response)
//   },
//   error => {
//     if (error.response) {
//         if (error.response.status == 401) {
//           router.replace({
//             path: '/login',
//             query: {redirect: router.currentRoute.fullPath}
//           })
//         }
//       }
//        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//       console.log(error.response)
//     }
//   }
// );
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




