<template>
  <div id="app">
    <Nav></Nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"/> //可以被换成的组件
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from './components/Nav/Nav.vue'
  import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components:{
    Nav,
    Footer
  },provied(){
    return{
      reload:this.reload
    }
  }
}
</script>

<style>
</style>
