// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sharedVariable: '' // 定义需要共享的变量
  },
  mutations: {
    updateSharedVariable(state, newValue) {
      state.sharedVariable = newValue; // 更新共享变量的值
    }
  }
});