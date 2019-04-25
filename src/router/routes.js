import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/OrderConfirm'
import User from '../pages/User/User.vue'
import ItemList from "../pages/Item/ItemList"
import ItemDetail from "../pages/Item/ItemDetail"
import Cart from '../pages/Cart/Cart.vue'
import Login from '../pages/Login/Login'
import OrderConfrim from '../pages/Order/OrderConfirm.vue'
import Payment from '../pages/Payment/Payment'
export const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',  //主页
    component:Home,
  },{
    path:'/user',  //用户
    component:User,
    meta:{
      needLogin:true
    }
  },{
    path:'/order',  //订单
    component:Order,
    meta:{
      needLogin:true
    }
  },{
    path:'/payment', //支付
    component:Payment,
    name:'payment',
    meta:{
      needLogin:true
    }
  },{
    path:'/itemList', //商品列表
    component:ItemList,
    name:'itemList'
  },{
    path:'/itemDetail',//商品详情
    name:'itemDetail',//配置name，动态路由
    component:ItemDetail
  }, {
    path:'/cart',
    name:'cart',
    component:Cart,
    meta:{
      needLogin:true
    }
  },
  {
    path:'/orderConfirm',
    name:'orderConfirm',
    component:OrderConfrim,
    meta:{
      needLogin:true
    }
  }
  ,{
    path: '*', //默认跳转到主页
    redirect: '/home'
  }
]
