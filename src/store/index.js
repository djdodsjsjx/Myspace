import { createStore } from 'vuex'
import ModuleUser from './user'

export default createStore({
  state: {  // 存储全局变量
  },
  getters: {  // 全局变量之间的计算
  },
  mutations: {  // 修改全局变量(同步)
  },
  actions: {  // 更新全局变量(异步)，不能直接对全局变量进行修改，若需要修改，则放置再mutations中，
  },
  modules: {  // 对全局变量进行分类
    user: ModuleUser,
  }
});
