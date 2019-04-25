<template>
  <div class="header">
    <div class="w">
      <router-link to="/home" class="rglogo"></router-link>
      <div class="search-con">
        <input class="search-input" id="search-input" placeholder="请输入商品名称" />
        <button class="btn search-btn" id="search-btn">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style>
  /* 通用头部导航 */
  .header .rglogo{
    position: absolute;
    left: 0px;
    top: 20px;
    display: block;
    width: 240px;
    height: 80px;
    background-image: url(../../assets/logo.png);
    background-size: 240px 80px;
  }
  .header .search-con{
    padding: 40px 0 30px 250px;
  }
  .header .search-con .search-input{
    width: 550px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 15px;
    border: 2px solid #FF8800;
    outline: none;
  }
  .header .search-con .search-btn{
    position: absolute;
    height: 44px;
    width: 80px;
  }
</style>
