<template>
  <div>
    <!--左侧菜单-->
    <Header></Header>
    <div class="w" >
      <ul class="keywords-list">
        <li class="keywords-item" v-for="item  in categoryList">
          <router-link class="link" :to="{'name':'itemList','query':{'categoryId':item.id}}">{{item.name}}</router-link>
        </li>
      </ul>
      <!--轮播图-->
      <swiper :options="swiperOption" ref="mySwiper" class="banner-con">
        <!-- slides -->
        <swiper-slide><img class="banner-img" src="../../assets/banner1.jpg" /> </swiper-slide>
        <swiper-slide><img class="banner-img" src="../../assets/banner2.jpg"/> </swiper-slide>
        <swiper-slide><img class="banner-img" src="../../assets/banner3.jpg"/> </swiper-slide>
        <swiper-slide><img class="banner-img" src="../../assets/banner4.jpg"/> </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <!--楼层展示商品-->
    <div class="w">
      <div class="floor-wrap">
        <h3 class="floor-title">家用电器</h3>
        <ul class="floor-list">
          <li class="floor-item"><a href="./list.html?categoryId=100006">
            <span class="floor-text">双开门冰箱</span>
            <img class="floor-img" src="../../assets/floor1-1.jpg" alt="双开门冰箱"/>
          </a>
          </li>
          <li class="floor-item">
            <a href="./list.html?categoryId=100007">
            <span class="floor-text">电视</span>
            <img class="floor-img" src="../../assets/floor1-2.jpg" alt="电视"/>
            </a>
          </li>
          <li class="floor-item"><a href="./list.html?categoryId=100008">
            <span class="floor-text">洗衣机</span> <img class="floor-img"
                                                     src="../../assets/floor1-3.jpg" alt="洗衣机"/>
          </a></li>
          <li class="floor-item"><a href="./list.html?categoryId=100009">
            <span class="floor-text">空调</span> <img class="floor-img"
                                                    src="../../assets/floor1-4.jpg" alt="空调"/>
          </a></li>
          <li class="floor-item"><a href="./list.html?categoryId=100010">
            <span class="floor-text">热水器</span> <img class="floor-img"
                                                     src="../../assets/floor1-5.jpg" alt="热水器"/>
          </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header/Header'
  export default {
    name: "Home",
    components: {
      Header
    },
    data(){
      return {
        categoryList:{},
        swiperOption: {
          autoplay: true, //配置自动播放
          loop: true,     //循环播放
          pagination: {   //分页器
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        }
      }
    },
    created(){
      this.getCategoryList()
    }
    ,
    methods:{
      getCategoryList:function(){
        this.axios.get('http://yfb.neuedu.com:8812/manage/category/get_category.do',{params:{'categoryId':0}})
          .then((response) => {
            this.categoryList = response.data.data;
          })
      }
    }
  }
</script>

<style scoped >
  /* keywords-list */
  .keywords-list {
    float: left;
    width: 240px;
    height: 350px;
    padding: 10px 0;
    margin-right: 10px;
    background: #fefefe;
    color: #fff;
  }

  .keywords-list .keywords-item {
    padding-left: 10px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }

  .keywords-list .keywords-item:hover {
    background: #9999;
  }

  .keywords-list .keywords-item .link {
    margin-right: 1px;
    color: #626262;
  }

  .keywords-list .keywords-item .link:hover {
    color: ##FF8800;
  }
  /* banner-con */
  .banner-con {
    width: 830px;
    float: left;
    height: 370px;
    background: #eee;
  }
  .banner-con .loading {
    margin-top: 150px;
  }

  .banner-con .banner-img {
    width: 100%;
    height: 370px;
  }

  /* banner的前一张和后一张按钮 */
  .banner-con .banner-arrow {
    position: absolute;
    top: 160px;
    width: 30px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    background: #ccc;
    background: rgba(0, 0, 0, .2);
    cursor: pointer;
  }
  .banner-con .banner-arrow:hover {
    background: #aaa;
    background: rgba(0, 0, 0, .5);
  }
  .banner-con .banner-arrow.prev {
    left: 0;
  }

  .banner-con .banner-arrow.next {
    right: 0;
  }

  /* floor */

  .floor-wrap .floor-title {
    position: relative;
    height: 50px;
    line-height: 50px;
    color: #d58717;
    font-weight: normal;
    font-size: 28px;
    font-family: 'fzzzh', sans-serif;
    text-align: center;
    padding: 0 25px;
    color: #222;
    border-bottom: 1px solid #000000;
  }

  .floor-title::before, .floor-title::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    display: block;
    background: #222;
    top: 25px;
  }

  .floor-wrap .floor-title::before {
    left: 410px;
  }

  .floor-wrap .floor-title::after {
    right: 410px;
  }

  /* 更改各楼层标题颜色 */
  .floor-wrap:nth-child(2) .floor-title {
    color: #3b838c;
    border-bottom: 1px solid #3b838c;
  }

  .floor-wrap:nth-child(3) .floor-title {
    color: #a93931;
    border-bottom: 1px solid #a93931;
  }

  .floor-wrap:nth-child(4) .floor-title {
    color: #488bad;
    border-bottom: 1px solid #488bad;
  }

  .floor-wrap:nth-child(5) .floor-title {
    color: #642663;
    border-bottom: 1px solid #642663;
  }

  .floor-wrap .floor-list {
    margin-right: -20px;
    overflow: hidden;
  }

  .floor-wrap .floor-list .floor-item {
    position: relative;
    width: 200px;
    height: 220px;
    margin: 15px 20px 15px 0;
    float: left;
    cursor: pointer;
    background: #fff;
  }

  .floor-wrap .floor-list .floor-item:hover {
    box-shadow: 1px 1px 7px #ddd;
  }

  .floor-wrap .floor-list .floor-item .floor-text {
    position: absolute;
    top: 12px;
    left: 20px;
    font-size: 16px;
    color: #555;
  }

  .floor-wrap .floor-list .floor-item .floor-img {
    position: absolute;
    right: 15px;
    bottom: 10px;
    width: 80%;
    height: 75%;
    border: none;
  }

  /* banner */
  .banner {
    position: relative;
    overflow: auto;
  }

  .banner li {
    list-style: none;
  }

  .banner ul li {
    float: left;
  }

  /* banner的前一张和后一张按钮 */
  .banner .dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    text-align: center;
  }

  .banner .dots li {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 4px;
    text-indent: -999em;
    border: 2px solid #fff;
    border-radius: 6px;
    cursor: pointer;
    opacity: .4;
    -webkit-transition: background .5s, opacity .5s;
    -moz-transition: background .5s, opacity .5s;
    transition: background .5s, opacity .5s;
  }

  .banner .dots li.active {
    background: #fff;
    opacity: 1;
  }

  /* 瀵艰埅涓讳綋 */
  .nav-side {
    float: left;
    width: 130px;
    min-height: 100px;
  }

  .nav-side .nav-item {
    line-height: 25px;
    font-size: 13px;
  }

  .nav-side .nav-item .link {
    color: #888;
  }

  .nav-side .nav-item.active .link {
    color: ##FF8800;
  }

  .content.with-nav {
    float: left;
    width: 950px;
  }
</style>
