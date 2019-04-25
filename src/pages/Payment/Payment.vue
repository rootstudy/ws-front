<template>
    <div>
      <div class="crumb">
        <div class="w">
          <div class="crumb-con">
            <a class="link" href="./index.html">睿购商城</a>
            <span>></span>
            <span class="link-text">订单支付</span>
          </div>
        </div>
      </div>
      <div class="pay-wrap w">
        <p class="pay-tips">订单提交成功，请您尽快支付！ 订单号：{{this.$route.query}}</p>
        <p class="pay-tips enhance">请使用微信扫描如下二维码进行支付：</p>
        <div class="img-con">
          <img class="qr-code" :src="qrCodePath">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Payment",
        data(){
          return{
            qrCodePath:''
          }
        },
      created(){
          console.log('payment:' + this.$route.query);
          this.orderPay(this.$route.query)
      },
      methods:{
          orderPay:function(orderNo){
            this.axios.get('http://yfb.neuedu.com:8812/order/pay.do',{params:{'orderNo':orderNo}})
              .then((response) => {
                console.log(response.data.data);
                this.qrCodePath = response.data.data.qrPath;
              })
          }
      }
    }
</script>

<style scoped>

  .pay-wrap{
    padding: 10px 0 25px 0;
    background: #fff;
  }
  .pay-tips{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
    text-align: center;
  }
  .pay-tips.enhance{
    color: #FF8800;
  }
  .img-con{
    margin: 0 auto;
    width: 300px;
    height: 300px;
    background: #fff;
    border: 1px solid #ddd;
  }
  .img-con .qr-code{
    width: 100%;
    height: 100%;
  }
</style>
