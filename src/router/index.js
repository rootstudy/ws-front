import Vue from 'vue'
import Router from 'vue-router'
import {routes} from './routes'

Vue.use(Router)
const router = new Router({
  routes,
  scrollBehavior(to,from,savedPosition){
    return {x:0,y:0}
  }
})
router.beforeEach((to, from, next) => {
  if(to.meta.needLogin){//判断是否需要进行身份验证
    if(sessionStorage.getItem("token") != null){//判断是否已经登录
      next()
    }else{
      next({path:'/login',query:{redirect:to.fullPath}})
    }
  }else{
    next()
  }
});
export default router;
