import Vue from 'vue'
import Vuex from 'vuex'

import { getMp3List } from "@/server/getData";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前播放的歌曲
    currentSong: null,
    //播放列表
    playList: null,

  },
  mutations: {
    //改变store中playList的值
    record_list (state, list) {
      //如果list不为数组
      if (!Array.isArray(list)) {
        return;
      }
      //将list信息存储到playList中
      state.playList = list;
      
    },

    //设置currentSong的值
    record_currentSong (state, song) {
      //如果song对象为空
      if (!song) {
        return;
      }

      state.currentSong = song;
    },

    //将下一首歌曲的信息放入currentSong中
    record_nextSong (state) {
      if (state.currentSong && state.playList) {
        let nextIndex = state.playList.findIndex( (element) => {
          return element.id == state.currentSong.id
        }) + 1;

        state.currentSong = state.playList[nextIndex];
      }
    }
  },
  actions: {
    //在playbar组件构建时执行该函数，获取后台返回的歌曲列表
    async commitMp3List ({commit}) {
      let list = await getMp3List();

      //mutations更新playList的状态
      commit('record_list', list.data);
      
    }
  }
})
