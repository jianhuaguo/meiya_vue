import Vue from 'vue'
import Router from 'vue-router'

import TableMain from '@/components/TableMain'
import index from '@/components/index'
import store_list from '@/components/Store/store_list'
import addstore  from '@/components/Store/addstore'
import orderchart from '@/components/order/orderchart'
import predicted from  '@/components/predicted/predicted'
import userlist from  '@/components/user/userlist'
import homepage from  '@/components/homepage/homepage'
import ordersummary from '@/components/order/ordersummary'
import adduserlist from '@/components/user/adduserlist'
import Login from '@/components/Login'
import store_examine from '@/components/Store/store_examine'
import seckillrelease from '@/components/seckill/seckillrelease'
import seckillexamine from '@/components/seckill/seckillexamine'
import seckillsummary from '@/components/seckill/seckillsummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:Login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect:'/homepage',
      children:[
        {
          path: '/store/list',
          component: store_list
        },
        {
          path:'/store/add',
          component:addstore
        },
        {
          path:'/store/examine',
          component:store_examine
        },
        {
          path:'/order/chart',
          component:orderchart
        },
        {
          path:'/predicted',
          component:predicted
        },
        {
          path:'/user/userlist',
          component:userlist
        },
        {
          path:'/homepage',
          component:homepage
        },
        {
          path:'/order/ordersummary',
          component:ordersummary
        },
        {
          path:'/user/adduserlist',
          component:adduserlist
        },
        {
          path:'/seckill/examine',
          component:seckillexamine
        },
        {
          path:'/seckill/release',
          component:seckillrelease
        },
        {
          path:'/seckill/summary',
          component:seckillsummary
        }
      ]
    }
  ]
})
