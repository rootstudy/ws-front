<template>
    <div>
      <Header></Header>
      <div class="crumb">
        <div class="w">
          <div class="crumb-con">
            <a class="link" href="./index.html">睿易购</a>
            <span>></span>
            <span class="link-text">商品列表</span>
          </div>
        </div>
      </div>
      <div class="page-wrap w">
        <ul class="sort-con">
          <li class="sort-item active" data-type="default">默认排序</li>
          <li class="sort-item" data-type="price">
            <span>价格</span>
            <i class="fa fa-sort-asc"></i>
            <i class="fa fa-sort-desc"></i>
          </li>
        </ul>
        <!-- list 容器 -->
        <ul class="p-list-con">
          <li class="p-item" v-for="item in itemList.list">
          <div class="p-img-con">
              <router-link :to="{'path':'itemDetail','query':{'itemId':item.id}}" class="link">
                <img class="p-img" :src=getImageUrl(item.mainImage)>
              </router-link>
            </div>
            <div class="p-price-con">
              <span class="p-price">{{item.price}}</span>
            </div>
            <div class="p-name-con">
              {{item.name}}
            </div>
          </li>
        </ul>
        <!-- 分页容器 -->
        <div class="page clearfix">
          <div id="J_bottomPage" class="p-wrap" v-if="itemList !=null">
                    <span class="p-num">
                      <!--class绑定，判断是否还有上一页-->
                        <a :class="{'pn-prev disabled':!itemList.hasPreviousPage}" @click="goPage('prev')" href="javascript:;">
                            <i>&lt;</i>
                            <em>上一页</em>
                        </a>
                        <a href="javascript:;" :class="{curr:item == itemList.pageNum}" @click="goPage(item)"
                           v-for="item in itemList.navigatepageNums">{{item}}
                        </a>
                        <b class="pn-break">...</b>
                        <a :class="{'pn-next disabled':!itemList.hasNextPage}" @click="goPage('next')" href="javascript:;">
                            <em>下一页</em><i>&gt;</i>
                        </a>
                    </span>
            <span class="p-skip">
                        <em>共<b>{{itemList.pages}}</b>页&nbsp;&nbsp;跳转到第</em>
                        <input class="input-txt" type="text" value="1" v-model.number="param.params.pageNum">
                        <em>页</em>
                        <a class="btn btn-default" href="javascript:;" @click="getItemList">确定</a>
                    </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Header from '../../components/Header/Header.vue'
    export default {
        name: "ItemList",
        data(){
          return{
            itemList:{},
            pageNum:1,
            param:{//HTTP请求参数
              params:{
                keyword: 'i',
                categoryId: '100002',
                pageNum: 1,
                pageSize: 1
              }
            }
          }
        },
        components:{
          Header
        },created(){
          if(this.$route.query.categoryId!=null){
            this.param.params.categoryId = this.$route.query.categoryId
          }
          this.getItemList()
        }
        ,methods:{
          searchItem:function(){

          },
          //获取商品列表(action)
          getItemList(){
            this.axios.get('http://yfb.neuedu.com:8812/product/list.do',this.param)
            .then((response) => {
              console.log("itemlist:" + JSON.stringify(response.data.data))
              this.itemList = response.data.data
            })
          },
          goPage(way){
            if(way == 'next'){
              if(!this.itemList.hasNextPage){
                return;
              }
              this.param.params.pageNum++;
              this.getItemList();
            }else if(way == 'prev'){
              if(!this.itemList.hasPreviousPage){
                return;
              }
              this.param.params.pageNum--;
              this.getItemList();
            }else{
              this.param.params.pageNum = way;
              this.getItemList();
            }
          },
          getImageUrl(icon) {//拼接返回图片路径
            return "http://59.46.220.76:8813/"+icon;
          }
        }
    }
</script>

<style>
  /* 排序按钮 */
  .sort-con{
    overflow: auto;
  }
  .sort-con .sort-item{
    float: left;
    display: inline-block;
    position: relative;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #ccc;
    margin-right: -1px;
    background: #fff;
    color: #333;
    cursor: pointer;
  }
  .sort-con .sort-item.active{
    background: #FF8800;
    border: 1px solid #FF8800;
    color: #fff;
  }
  .sort-con .sort-item .fa-sort-desc{
    position: absolute;
    top: 8px;
    right: 8px;
  }
  .sort-con .sort-item.asc .fa-sort-desc{
    opacity: .6;
  }
  .sort-con .sort-item.desc .fa-sort-asc{
    opacity: .6;
  }

  /* 列表 */
  .p-list-con{
    margin-top: 15px;
    margin-right: -20px;
    overflow: hidden;
  }
  .p-list-con .p-item{
    position: relative;
    width: 180px;
    float: left;
    padding: 10px;
    margin: 0 20px 20px 0;
    background: #fff;
  }
  .p-list-con .p-item .p-img-con{
    width: 180px;
    height: 200px;
  }
  .p-list-con .p-item .p-img-con .p-img{
    width: 100%;
    height: 100%;
  }
  .p-list-con .p-item .p-price-con{
    height: 30px;
    line-height: 30px;
  }
  .p-list-con .p-item .p-price-con .p-price{
    font-size: 16px;
    color: #e7380d;
  }
  .p-list-con .p-item .p-name-con{
    height: 40px;
    overflow: hidden;
  }
  .p-list-con .p-item .p-name-con .p-name{
    line-height: 20px;
    margin-bottom: 10px;
    color: #666;
    text-decoration: none;
  }


  .page{
    display: block;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 10px;
  }
  .page .p-wrap {
    margin-left: 200px;
  }
  .page .p-num {
    float: left;
  }
  .page .p-num .pn-next.disabled, .page .p-num .pn-prev.disabled, .page .p-num .curr{
    background: 0 0;
    background: #fff;
    cursor: default;
    text-decoration:none;
  }

  .page .p-num a {
    color: #333;
    border: 1px solid #ddd;
    background-color: #f7f7f7;
    background-repeat: repeat-x;
    background-image: -webkit-linear-gradient(top,#f7f7f7,#f2f2f2);
    background-image: linear-gradient(top,#f7f7f7,#f2f2f2);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f7f7f7', endColorstr='#f2f2f2', GradientType=0);
  }
  .page .p-num a, .page .p-num b {
    float: left;
    height: 36px;
    line-height: 36px;
    padding: 0 14px;
    margin-right: 5px;
    font-size: 14px;
  }
  .page .p-skip {
    float: left;
    margin-left: 20px;
  }
  .page .p-skip em {
    float: left;
    line-height: 38px;
    font-size: 14px;
  }
  .page .p-skip .input-txt {
    float: left;
    width: 30px;
    height: 30px;
    margin: 0 3px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
  }
  .page .p-skip .btn {
    float: left;
    height: 27px;
    margin-left: 10px;
    font-size: 14px;
    line-height: 27px;
  }
  .btn-default {
    border: 1px solid #DDD;
    padding: 4px 13px 5px;
    color: #666;
    background-color: #f7f7f7;
    background-repeat: repeat-x;
    background-image: -webkit-linear-gradient(top,#f7f7f7,#f2f2f2);
    background-image: linear-gradient(top,#f7f7f7,#f2f2f2);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f7f7f7', endColorstr='#f2f2f2', GradientType=0);
  }
  strong, b {
    font-weight: bold;
  }
  em, i, u {
    font-style: normal;
  }
</style>
