<template>
  <div class="footer">
    <div class="w">
      <div class="slogen">
        <div class="item-con">
          <p class="img-duo"></p>
          <p class="item-txt">品类齐全，轻松购物</p>
        </div>
        <div class="item-con">
          <p class="img-kuai"></p>
          <p class="item-txt">多仓直发，极速配送</p>
        </div>
        <div class="item-con">
          <p class="img-hao"></p>
          <p class="item-txt">正品行货，精致服务</p>
        </div>
        <div class="item-con">
          <p class="img-sheng"></p>
          <p class="item-txt">天天低价，畅选无忧</p>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright © 2018 睿购商城 All Right Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped >
  .footer{
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .footer .slogen{
    margin: 0 auto;
    display: block;
    height: 54px;
    line-height: 54px;
  }
  .footer .slogen .item-con{
    line-height: 54px;
    text-align: center;
    float: left;
    margin-left: 25px;
  }
  .footer .slogen .item-con .item-txt{
    float: left;
    padding-left: 10px;
    height: 42px;
    line-height: 42px;
    font-size: 20px;
    font-weight: 700;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #444;
  }
  .footer .slogen .item-con .img-duo{
    float: left;
    width: 48px;
    height: 53px;
    background: url(../../assets/duo.png);
  }
  .footer .slogen .item-con .img-kuai{
    float: left;
    width: 48px;
    height: 53px;
    background: url(../../assets/kuai.png);
  }
  .footer .slogen .item-con .img-hao{
    float: left;
    width: 48px;
    height: 53px;
    background: url(../../assets/hao.png);
  }
  .footer .slogen .item-con .img-sheng{
    float: left;
    width: 48px;
    height: 53px;
    background: url(../../assets/sheng.png);
  }
  .footer .copyright{
    margin-top: 15px;
    display: block;
    text-align: center;
    color: #666;
    line-height: 30px;
  }
</style>
