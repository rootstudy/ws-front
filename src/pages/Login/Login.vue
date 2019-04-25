<template>
  <div class="page-wrap">
    <div class="w">
      <div class="user-con">
        <form>
        <div class="user-title">用户登录</div>
        <div class="user-box">
          <div class="error-item">
            <i class="fa fa-minus-circle error-icon"></i>
            <p class="err-msg">Error</p>
          </div>
          <div class="user-item">
            <label class="user-label" for=""> <i class="fa fa-user"></i>
            </label>
              <input class="user-content" v-model="username" id="username" placeholder="请输入用户名"
                            autocomplete="off">
          </div>
          <div class="user-item">
            <label class="user-label" for="password"> <i
              class="fa fa-lock"></i>
            </label>
            <input type="password" v-model="password" class="user-content" id="password"
                            placeholder="请输入密码" autocomplete="off">
          </div>
          <a class="btn btn-submit" @click.prevent="login(username,password)" id="submit">登录</a>
          <div class="link-item">
            <a class="link" href="./user-pass-reset.html" target="_blank">忘记密码</a>
            <a class="link" href="./user-register.html" target="_blank">免费注册</a>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import {login} from "../../api"
    export default {
        name: "Login",
        data(){
          return{
              username: '',
              password:''
          }
        },
      methods: {
        //处理用户登录点击事件
        login: async function(username,password){
          const result = await login({'username': username, 'password': password},'POST')
          if (result.status == 0) {
            //更新用户登录状态信息
            this.$store.dispatch('syncUserInfo',result.data)
            console.log("login success path:" + this.$route.query.redirect)
            if(this.$route.query.redirect != null){
              this.$router.push({path:this.$route.query.redirect})
            }else {
              this.$router.go(-1)
            }
          } else {
           this.$router.push('/login');
            alert(result.msg);
          }
        }
    }
    }
</script>

<style>
  .page-wrap{
    padding: 40px 0;
    background: #FF8800;
  }
  .user-con{
    position: relative;
    margin: 0 auto;
    width: 400px;
    background: #fff;
  }
  .user-con .user-title{
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
  .user-con .user-box{
    padding: 20px;
  }
  .user-con .user-box .error-item{
    position: relative;
    padding: 4px 0 4px 40px;
    margin-bottom: 10px;
    border: 1px solid #FF8800;
    color: #FF8800;
    background: #fde9e9;
    display: none;
  }
  .user-con .user-box .error-icon{
    position: absolute;
    left: 14px;
    top: 50%;
    font-size: 14px;
    margin-top: -7px;
  }

  .user-con .user-item{
    position: relative;
    margin-bottom: 20px;
  }
  .user-con .user-item .user-label{
    position: absolute;
    left: 1px;
    top: 1px;
    bottom: 1px;
    width: 40px;
    line-height: 36px;
    background: #f3f3f3;
    font-size: 18px;
    color: #d3d3d3;
    text-align: center;
    border-right: 1px solid #bdbdbd;
  }
  .user-con .user-item .user-content{
    padding: 10px 0 10px 50px;
    width: 308px;
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    border: 1px solid #bdbdbd;
    outline: none;
  }
  .user-con .btn-submit{
    width: 100%;
    padding: 2px 0;
    text-align: center;
    font-size: 20px;
  }
  .user-con .link-item{
    text-align: right;
    margin-top: 10px;
  }
  .user-con .link-item .link{
    margin-left: 10px;
    color: #999;
  }
</style>
