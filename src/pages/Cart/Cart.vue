<template>
    <div>
      <Header></Header>
      <div class="crumb">
        <div class="w">
          <div class="crumb-con">
            <a class="link" href="./index.html">睿购商城</a>
            <span>></span>
            <span class="link-text">购物车</span>
          </div>
        </div>
      </div>
      <div class="cart-wrap w">
        <div class="cart-header">
          <table class="cart-table">
            <tbody>
            <tr>
              <th class="cart-cell cell-check">
                <label>
                  <input type="checkbox" class="cart-select-all"  @click="selectAllItem"
                         v-model="cartContent.allChecked">
                  <span>全选</span>
                </label>
              </th>
              <th class="cart-cell cell-info">商品信息</th>
              <th class="cart-cell cell-price">单价</th>
              <th class="cart-cell cell-count">数量</th>
              <th class="cart-cell cell-total">合计</th>
              <th class="cart-cell cell-opera">操作</th>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="cart-list" v-for="(item,index) in cartContent.cartProductVoList">
          <table class="cart-table" data-product-id="107" data-checked="1">
            <tbody>
            <tr>
              <td class="cart-cell cell-check">
                <!--选择当个商品-->
                <input type="checkbox" class="cart-select" @click="selectItem(index)"
                       v-model="item.productChecked">
              </td>
              <td class="cart-cell cell-img">
                <a href="./detail.html?productId=107" target="_blank">
                  <img class="p-img" src="../../assets/tv-ssmall.jpg">
                </a>
              </td>
              <td class="cart-cell cell-info">
                <a class="link p-name" href="./detail.html?productId=107" target="_blank">{{item.productName}}</a>
              </td>
              <td class="cart-cell cell-price">{{item.productPrice}}</td>
              <td class="cart-cell cell-count">
                <span class="count-btn" :class="{'disabled':item.quantity<=1}" data-opera-type="minus"
                      @click="updateItemCount(index,-1)" >-</span>
                <input class="count-input" data-max="9987" v-model="item.quantity">
                <span class="count-btn" data-opera-type="plus" @click="updateItemCount(index,1)">+</span>
              </td>
              <td class="cart-cell cell-total">{{item.productTotalPrice}}</td>
              <td class="cart-cell cell-opera">
                <a class="link cart-delete">删除</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="cart-footer clear">
          <div class="select-con">
            <label>
              <input type="checkbox" class="cart-select-all" @click="selectAllItem" v-model="cartContent.allChecked">
              <span>全选</span>
            </label>
          </div>
          <div class="delete-con">
            <a class="cart-delete-seleced link">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              <span>删除选中</span>
            </a>
          </div>
          <div class="submit-con">
            <span>总价：</span> <span class="submit-total">{{cartContent.cartTotalPrice}}</span>
            <span class="btn submit-btn" @click="orderConfirm">去结算</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Header from '../../components/Header/Header.vue'
    export default {
        name: "Cart",
        data(){
          return{
            cartContent:{}
          }
        },
        components:{
          Header
        },created(){
          if(this.$route.query != null){
            this.addItemToCart()
          }else{
            this.getCartList()
          }
        },methods:{
          countItem:function(){
            let count = 0
            this.cartContent.cartProductVoList.forEach((item,index)=>{
              count = count + item.quantity
            })
            return count
          },
          getCartList:function(){
            this.axios.get('http://yfb.neuedu.com:8812/cart/list.do')
              .then((response) => {
                console.log("cart list:" + JSON.stringify(response.data.data))
                this.cartContent = response.data.data
                this.$store.commit('syncCartItemQuantity',this.countItem())
              })
          }
          ,
          addItemToCart:function(){
            //添加商品
            this.axios.get('http://yfb.neuedu.com:8812/cart/add.do',
              {params:{'productId':this.$route.query.productId,'count':this.$route.query.count}})
              .then((response) => {
                this.cartContent = response.data.data
                console.log(this.cartContent)
                this.$store.commit('syncCartItemQuantity',this.countItem())
              })
          },
          //确认订单
          orderConfirm:function(){
            this.$store.commit('syncCartItemList',this.cartContent)
            this.$router.push('/orderConfirm')
          },
          //更新商品数量
          updateItemCount:function(index,way){
            let item = this.cartContent.cartProductVoList[index]
            if(way > 0){
              item.quantity++
            }else{
              item.quantity--
              if(item.quantity<=0){
                item.quantity=1
                return
              }
            }
            this.axios.get('http://yfb.neuedu.com:8812/cart/update.do',
              {params:{'productId':item.productId,'count':item.quantity}})
              .then((response) => {
                console.log(response.data.data)
                this.cartContent = response.data.data
                this.$store.commit('syncCartItemQuantity',this.countItem())
              })
          }
          ,
          selectItem:function(index){
              let item = this.cartContent.cartProductVoList[index];
              if(!item.productChecked){
                this.axios.get('http://yfb.neuedu.com:8812/cart/select.do',{params:{'productId':item.productId}})
                  .then((response) => {
                    console.log(response.data.data)
                    this.cartContent = response.data.data
                  })
              }else {
                this.axios.get('http://yfb.neuedu.com:8812/cart/un_select.do',{params:{'productId':item.productId}})
                  .then((response) => {
                    this.cartContent = response.data.data
                  })
              }
          },
          //全选与取消全选
          selectAllItem:function(){
            if(!this.cartContent.allChecked){//点击取反
              this.axios.get('http://yfb.neuedu.com:8812/cart/select_all.do')
                .then((response) => {
                  this.cartContent = response.data.data
                })
              // this.cartContent.cartProductVoList.forEach((item,index)=>{
              //     item.productChecked = true;
              // })
            }else{
                this.axios.get('http://yfb.neuedu.com:8812/cart/un_select_all.do')
                .then((response) => {
                  this.cartContent = response.data.data
                })
              // this.cartContent.cartProductVoList.forEach((item,index)=>{
              //   item.productChecked = false;
              // })
            }
          }
        }
    }
</script>

<style>
  .cart-table{
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin-bottom: 10px;
  }
  /* header */
  .cart-header{
    background: #eee;
  }
  .cart-header .cart-cell{
    height: 40px;
    line-height: 40px;
  }
  .cart-table .cell-check{
    width: 6%;
    text-align: left;
    padding-left: 20px;
  }
  .cart-table .cell-img{
    width: 10%;
    text-align: left;
  }
  .cart-table .cell-img .p-img{
    margin: 10px 0;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
  }
  .cart-table .cell-info{
    width: 35%;
    text-align: left;
  }
  .cart-header .cell-info{
    width: 45%;
    padding-left: 106px;
  }
  .cart-table .cell-price{
    width: 10%;
    text-align: center;
  }
  .cart-table .cell-count{
    width: 15%;
    text-align: center;
  }
  .cart-table .cell-count .count-input{
    width: 60px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ddd;
    text-align: center;
    vertical-align: middle;
    outline: none;
    color: #333;
  }
  .cart-table .cell-count .count-btn{
    display: inline-block;
    width: 20px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #ddd;
    vertical-align: middle;
    cursor: pointer;
    background: #fff;
    -moz-user-select : none;
    -webkit-user-select : none;
    -ms-user-select : none;
    user-select : none;
  }
  .cart-table .cell-total{
    width: 14%;
    text-align: center;
    font-weight: bold;
  }
  .cart-table .cell-opera{
    width: 10%;
    text-align: center;
  }

  /* footer */
  .cart-footer{
    position: relative;
    line-height: 50px;
    background: #eee;
    overflow: hidden;
  }
  .cart-footer .select-con{
    float: left;
    padding-left: 20px;
  }
  .cart-footer .delete-con{
    float: left;
    margin-left: 20px;
  }
  .cart-footer .submit-con{
    float: right;
  }
  .cart-footer .submit-con .submit-total{
    font-size: 18px;
    color: #c60023;
    font-weight: bold;
    margin-right: 30px;
    vertical-align: middle;
  }
  .cart-footer .submit-con .btn-submit{
    width: 80px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  /* 错误信息 */
  .err-tip{
    height: 60px;
    line-height: 60px;
    color: #f60;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background: #eee;
  }
</style>
