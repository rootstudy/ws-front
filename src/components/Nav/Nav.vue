<template>
  <div>
    <div class="nav">
      <div class="w">
        <div class="user-info">
            <span class="user not-login">
                <span><router-link to="/" class="link">商城首页</router-link></span>
                <span v-if="token">欢迎：{{userInfo.username}}</span>
                <span class="link js-login">
                   <span class="link js-logout" v-if="token" @click="logout">退出</span>
                   <router-link to="/login" class="link js-register" v-if="!token">请登录</router-link>
                </span>
                <span class="link js-register" v-if="!token">注册</span>
            </span>
        </div>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link class="link" to="/cart">
              <i class="fa fa-shopping-cart"></i>
              购物车(<span class="cart-count">{{cartItemQuantity}}</span>)
            </router-link>
          </li>
          <li class="nav-item">
            <a class="link" href="./order-list.html">我的订单</a>
          </li>
          <li class="nav-item">
            <a class="link" href="./order-list.html">个人中心</a>
          </li>
          <li class="nav-item">
            <a class="link" href="./about.html">我的emall</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
    import {mapState}from 'vuex'
    export default {
      name: "Nav",
      computed:{
        ...mapState(["userInfo","token","cartItemQuantity"])
      },methods:{
        logout(){
          this.$store.dispatch('logout');
          this.$router.push('/login');
        }
      }
    }
</script>

<style scoped >
  .nav{
    background: #eee;
    height: 30px;
    line-height: 30px;
  }
  .nav .user{
    float: left;
  }
  .nav .user.login{
    display: none;
  }
  .nav .user .link{
    margin-right: 5px;
  }
  .nav .nav-list{
    float: right;
  }

  .nav .nav-list .nav-item{
    display: inline-block;
    margin-left: 5px;
  }
</style>
