<template>
  <div>
  <div class="crumb">
    <div class="w">
      <div class="crumb-con">
        <router-link class="link" to="home">睿购商城</router-link>
        <span>></span>
        <span class="link-text">订单确认</span>
      </div>
    </div>
  </div>
  <div class="confirm-wrap w">
    <div class="panel">
      <h2 class="panel-title">收货地址</h2>
      <div class="panel-body address-list">
        <a class="address-item" v-for="(item,index) in shippingList" :class="{'active':isActive===index}" @click="selectShipping(index)" >
          <div class="address-title">
            <span class="name">（ {{item.receiverName}} 收 ）</span>
            <span class="province">{{item.receiverProvince}}</span>
            <span class="city">{{item.receiverCity}}</span>
          </div>
          <div class="address-detail">
            <span class="address">{{item.receiverAddress}}</span>
            <span class="mobile">{{item.receiverMobile}}</span>
          </div>
          <div class="address-opera">
            <span class="link address-update">编辑</span>
            <span class="link address-delete">删除</span>
          </div>
        </a>
        <div class="address-item add">
          <div class="address-new">
          <i class="fa fa-plus"></i>
            <div class="text">使用新地址</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <h2 class="panel-title">商品清单</h2>
      <div class="panel-body order-product">
        <table class="product-table" data-product-id="" data-checked=""><tbody>
          <tr>
            <th width="10%">&nbsp;</th>
            <th width="30%" align="left">商品描述</th>
            <th width="20%" align="center">价格</th>
            <th width="20%" align="center">数量</th>
            <th width="20%" align="center">小计</th>
          </tr>
          <tr v-for="item in cartItemList.cartProductVoList" v-if="item.productChecked">
            <td class="product-cell cell-img">
              <a href="./detail.html?productId=107" target="_blank">
                <img class="p-img" src="../../assets/tv-ssmall.jpg">
              </a>
            </td>
            <td align="left">
              <a class="link p-name" href="./detail.html?productId=107" target="_blank">
                {{item.productName}}</a>
            </td>
            <td align="center">{{item.productPrice}}</td>
            <td align="center">x{{item.quantity}}</td>
            <td align="center">￥{{item.productTotalPrice}}</td>
          </tr>
          </tbody>
        </table>
        <div class="submit-con">
          <span>订单总价：</span>
          <span class="submit-total">￥{{cartItemList.cartTotalPrice}}</span>
          <span class="btn order-submit" @click="createOrder">提交订单</span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "OrderConfirm",
        data(){
          return{
            shippingList:{},
            isActive:0
          }
        },
        computed:{
          ...mapState(['cartItemList'])
        },created(){
          this.getShippingList()
        },
        mounted(){
          //监听浏览器返回按钮，并阻止其默认事件,调用自定pagePack方法返回
          if (window.history && window.history.pushState) {//判断浏览器是否支持popstate
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.pageBack, false);
          }
        },
        destroyed(){
          //页面销毁时，取消监听。否则其他vue路由页面也会被监听
          window.removeEventListener('popstate', this.pageBack, false);
        },methods: {
          pageBack: function () {
              this.$router.go(-1);
          },
          getShippingList:function(){
            this.axios.get('http://yfb.neuedu.com:8812/shipping/list.do')
              .then((response) => {
                this.shippingList = response.data.data.list
              })
          },
        selectShipping:function(index){
          this.isActive = index;
        },
        //生成订单
        createOrder:function(){
            const shippingId = this.shippingList[this.isActive].id;
            this.axios.get('http://yfb.neuedu.com:8812/order/create.do',{params:{'shippingId':shippingId}})
            .then((response) => {
              const orderId = response.data.data.orderNo;
              console.log("orderId" + orderId);
              this.$router.push({'name':'payment','query':orderId});
            })
        }
      }
    }
</script>

<style>
  .address-item,.address-add{
    margin:20px 20px 0 0;
    width: 200px;
    padding: 5px 8px;
    float: left;
    border: 3px dashed #ccc;
    cursor: pointer;
  }
  .address-item.active{
    border: 3px dashed #FF8800;
  }
  .address-item:hover,
  .address-add:hover{
    background: #fafafa;
  }
  .address-item .address-title{
    color: #666;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
  }
  .address-item .address-detail{
    margin-top: 5px;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    color: #666;
  }
  .address-item .address-opera{
    text-align: right;
    visibility: hidden;
  }
  .address-item:hover .address-opera{
    visibility: visible;
  }
  .address-item .address-opera .link{
    margin-right: 5px;
  }
  .address-add .address-new{
    padding: 8px 0;
    text-align: center;
    color: #ccc;
  }
  .address-add .address-new .fa{
    font-size: 50px;
    line-height: 50px;
  }
  .address-add .address-new .text{
    font-size: 12px;
  }

  /* 鍟嗗搧娓呭崟閮ㄥ垎 */
  .product-table{
    width: 100%;
    margin: 10px 0;
    border-collapse: collapse;
  }
  .product-table th,
  .product-table td{
    border-bottom: 1px dotted #ddd;
  }
  .product-table .cell-img{
    padding: 10px;
    width: 10%;
    text-align: center;
  }
  .product-table .cell-img .p-img{
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
  }
  .product-table .cell-info{
    width: 30%;
    text-align: left;
  }
  .product-table .cell-price{
    width: 20%;
    text-align: center;
  }
  .product-table .cell-count{
    width: 20%;
    text-align: center;
  }
  .product-table .cell-total{
    width: 20%;
    text-align: center;
  }
  .submit-con{
    background: #eee;
    text-align: right;
  }
  .submit-con .submit-total{
    margin-right: 20px;
    font-size: 18px;
    color: #FF8800;
    font-weight: bold;
    vertical-align: middle;
  }
  .submit-con .order-submit{
    height: 50px;
    line-height: 50px;
    width: 100px;
    text-align: center;
  }

  /* modal閮ㄥ垎 */
  .modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #eee;
    background: rgba(0,0,0,.4);
    z-index: 1000;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .modal .modal-container{
    width: 700px;
    margin: 50px auto;
    background: #fff;
    border-radius: 2px;
  }
  .modal .modal-container .modal-header{
    position: relative;
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }
  .modal .modal-container .modal-header .modal-title{
    font-size: 14px;
  }
  .modal .modal-container .modal-header .close{
    position: absolute;
    padding: 10px;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .modal .modal-container .modal-body{
    padding: 15px;
  }

  /* form閮ㄥ垎 */
  .form .form-line{
    margin: 5px 0;
    overflow: hidden;
  }
  .form .form-line .label{
    display: block;
    float: left;
    width: 85px;
    text-align: right;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
  .form .form-line .label .required{
    color: red;
  }
  .form .form-line .form-item{
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    outline: none;
    margin-right: 10px;
  }
  .form .form-line .btn{
    margin-left: 95px;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
  }
</style>
