import {getItemList,login} from '../api'
import {ITEM_LIST, USER_INFO, REST_USER_INFO, TOKEN, ITEM} from "./Types";

export default{
      //更新登录成功后的状态
      syncUserInfo({commit},userInfo){
        commit(USER_INFO,userInfo);
        commit(TOKEN,true);
        sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
        sessionStorage.setItem("token",true);
      },
      //更新退出登录后的状态
      logout({commit}){
        commit(TOKEN,false);
        commit(USER_INFO,{});
        commit('cartItemQuantity',0);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userInfo");
      },
      updateItemStock({commit},stock){
        commit('updateItemStock',stock)
      }
}
