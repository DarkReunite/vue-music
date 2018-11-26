<template lang="pug">
  v-container
    v-card
      v-card-title(primary-title) 
        span.headline 上传音频文件
      v-card-text
        v-subheader 上传文件
        label.v-btn(for="uploadfile" ) 选择文件
        input#uploadfile(type="file" multiple @change="chooseFile")
        v-list(two-line v-if="mp3Info")
          v-subheader 歌曲列表
          v-divider
          div(v-for="(item,index) in mp3Info" :key="index")
            v-list-tile(avatar)
              v-list-tile-avatar
                img(v-if="item.blobURL" :src="item.blobURL")
                img(v-else src="/logo.png")
              v-list-tile-content
                v-list-tile-title {{item.title}}
                v-list-tile-sub-title {{item.artist}} - {{item.ablum}}
            v-divider(inset)
      v-card-actions(v-if="mp3Info")
        v-spacer
        v-btn(@click="uploadFile") 上传
</template>

<script>
import analyzeFile from "@/plugins/analyzeFile";
import {sendMp3FileAndPic, sendMp3Info} from '@/server/sendData';
export default {
  data() {
    return {
      mp3Info:null,
      mp3File:null,
    }
  },
  
  methods: {
    /* eslint-disable */

    // 选择文件
    // 分析歌曲文件的内容并提取出歌曲的图片和各类信息
    async chooseFile(e) {
      this.mp3Info = await Promise.all(analyzeFile(e.target.files));
      
      this.mp3File = (function () {
        let mp3file = [];
        for (let i = 0; i < e.target.files.length; i++) {
          mp3file.push(e.target.files[i]);
        }
        return mp3file;
      })();
      
    },

    // 上传歌曲的文件和相关信息
    async uploadFile(){
      try {
        let idList = await Promise.all(sendMp3Info(this.mp3Info));
        
        idList.forEach((value, index) => {
          this.mp3Info[index].id = value.data
        });

        let resList = await Promise.all(sendMp3FileAndPic(this.mp3File, this.mp3Info));
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#uploadfile{
  display: none;
}
</style>
