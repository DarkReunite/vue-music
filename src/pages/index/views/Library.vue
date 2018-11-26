<template lang="pug">
  v-container#Library
    div.table 
      table(v-if="mp3List")
        thead
          tr
            th #
            th 音乐标题
            th 歌手
            th 专辑
        tbody
          tr(v-for="(item,index) in mp3List" :key="index" @click="play(item)")
            td {{index}}
            td {{item.title}}
            td {{item.artist}}
            td {{item.album}}

</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      mp3URL: null,
      mp3List: null,
    }
  },

  mounted() {
    this.getMp3List();
  },

  methods: {
    ...mapMutations(['record_currentSong']),

    async getMp3List() {
      try {
        let res = await this.$axios.get('/mp3/list');
        if (res.data.status) {
          console.log(res.data.message);          
        }
        this.mp3List = res.data;

      } catch (error) {
        console.log(error);
        
      }
    },

    play(song){
      this.record_currentSong(song);
    }
  }
}
</script>

<style lang="scss" scoped>
  div.header-pic {
    position: relative;
    float: left;
    height: 200px;
    width: 200px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  #Library {
    div.table{
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 
          0 2px 2px 0 rgba(0,0,0,.14), 
          0 1px 5px 0 rgba(0,0,0,.12);
    }
    
    table {
      width: 100%;
      border-spacing: 0;
      background-color: #fff;

      th {
        color: rgba(0,0,0,.54);
        padding: 14px 28px !important;

        &:first-child {
          width: 10px;
        }

        &:nth-child(2){
          width: 30%;
        }
        
      }

      th,td {
        text-align: left;
        padding: 14px 28px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-bottom: 1px solid rgba(0,0,0,.12);

        &:first-child{
          padding-right: 0;
          padding-left: 24px;
        }
      }

      tbody{
        //变色
        tr {
          cursor: pointer;
          transition: all 0.2s;

          &:hover{
            background-color: #ebebeb;
          }
        }

      }
    }
  }

</style>


