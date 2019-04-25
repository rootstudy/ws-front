import axios from 'axios'
import qs from 'qs'
const BASE_URL = 'http://yfb.neuedu.com:8812'
  //返回图片地址
  export const getImageUrl = (path)=>{
    return "http://59.46.220.76:8813/"+path
}
  //0.封装通用的ajax请求方法
  function  httpGet(url = '', params = {},type = 'GET'){
    let promise;
    return new Promise((resolve, reject) => {
      if(type == 'GET'){
        console.log('get-->params:' + JSON.stringify(params));
        promise =  axios.get(BASE_URL+url,params);
      }else{
        console.log('post-->params:' + qs.stringify(params));
        promise = axios.post(BASE_URL+url,qs.stringify(params))
      }
      promise.then((response)=>{
        console.log("response:" + JSON.stringify(response.data))
        resolve(response.data)
      }).catch((error)=>{
        resolve(error)
    })
    })
  }
async function  httpGet2(url = '', params = {},type = 'GET'){
  let promise;
  return new Promise((resolve, reject) => {
    if(type == 'GET'){
      console.log('get-->params:' + JSON.stringify(params));
      promise =  axios.get(BASE_URL+url,params);
    }else{
      console.log('post-->params:' + qs.stringify(params));
      promise = axios.post(BASE_URL+url,qs.stringify(params))
    }
    return promise
  })
}
  //获取所有商品信息
export const getItemList = (params)=>httpGet('/product/list.do',params);
export const login = (params,type)=>httpGet('/user/login.do',params,type);
export const addItemToCart =(params)=>httpGet('/cart/add.do',params);
export const getItemDetail = (params)=>httpGet('/product/detail.do',params);
