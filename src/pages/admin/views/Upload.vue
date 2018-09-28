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
                img(v-else src="../../../assets/logo.png")
              v-list-tile-content
                v-list-tile-title {{item.title}}
                v-list-tile-sub-title {{item.artist}} - {{item.ablum}}
            v-divider(inset)
      v-card-actions(v-if="mp3Info")
        v-spacer
        v-btn 上传
</template>

<script>
import analyzeFile from "@/plugins/analyzeFile";
export default {
  data() {
    return {
      mp3Info:null,
      mp3List:null,
    }
  },
  
  methods: {
    async chooseFile(e) {
      let filelist = e.target.files;
      let mp3info = await Promise.all(analyzeFile(filelist));
      this.mp3Info = mp3info;
      
      

    }
  }
}
</script>

<style lang="scss" scoped>
#uploadfile{
  display: none;
}
</style>
