import {ITEM_LIST,USER_INFO,REST_USER_INFO,TOKEN,ITEM} from './Types'
export default{
  //获取所有商品数据
  [ITEM_LIST](state,itemList){
    state.itemList = itemList;
  },
  [USER_INFO](state,userInfo,token){
    state.userInfo = userInfo;
  },
  [TOKEN](state,token){
    state.token = token;
  },
  [REST_USER_INFO](state){
    state.userInfo = {};
  },
  [ITEM](state,item){
    state.item = item;
  },
  updateItemStock(state,stock){
    state.item.stock = stock;
  },
  syncCartItemQuantity(state,quantity){
    state.cartItemQuantity = quantity;
  },
  syncCartItemList(state,cartItemList){
    state.cartItemList = cartItemList;
  }
}
