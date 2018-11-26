<template lang="pug">
  v-container
    v-card
      v-card-title(primary-title) 
        span.headline 歌曲列表
      v-card-text
        v-list(two-line)
          v-subheader 歌曲列表
          v-divider
          div(v-for="item in mp3List")
            v-list-tile(avatar)
              v-list-tile-avatar
                img(v-if="item.picture" :src="item.picture")
                img(v-else src="/logo.png")
              v-list-tile-content
                v-list-tile-title {{item.title}}
                v-list-tile-sub-title {{item.artist}} - {{item.album}}
            v-divider(inset)
    v-card.mt-3
      v-card-text
        pagination(
          :page="page"
          :totalPage="totalPage"
        )

</template>
<script>

import pagination from '@/pages/admin/components/Pagination';

export default {
  props:['page'],
  components: {
    pagination
  },
  data(){
    return {
      totalPage: null,
      mp3List: null
    }
  },

  mounted() {
    this.getTotalPage();
    this.getMp3List();
  },

  methods: {
    async getMp3List(){
      try {
        let res = await this.$axios.get(`/admin/list/${this.page}`);
        if (res.data.status) {
          console.log(res.data.message);          
        }
        this.mp3List = res.data;

        this.mp3List.forEach(value => {
          if (value.picture) {
            value.picture = 'http://192.168.31.64:4000' + value.picture
          }
        });
      } catch (error) {
        console.log(error);
        
      }
    },

    async getTotalPage(){
      //获取文章的整个页数
      try {
        let res = await this.$axios.get('/admin/list/total/page');
        
        if (res.data.status) {
          console.log(res.data.message);
          return;
        }
        
        this.totalPage = res.data;

      } catch (error) {
        console.log(error);

      }
    }
  },

    watch: {
    '$route' : 'getMp3List'
  }
}
</script>

<style lang="scss" scoped>

</style>
