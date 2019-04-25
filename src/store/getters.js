export default {
  getPageNum: (state) => {
    return state.itemData.pageNum;
  },
  userInfo: state =>JSON.parse(sessionStorage.getItem("userInfo"))
  ,
  token: (state) => sessionStorage.getItem("token")
}

