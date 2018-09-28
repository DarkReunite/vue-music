<template lang="pug">
  v-navigation-drawer(app)
    v-toolbar(flat)
    v-list
      v-list-tile(v-for="(item, index) in list" :key="item.title" :to="item.to")
        v-list-tile-action
          v-icon {{item.icon}}
        v-list-tile-content
          v-list-tile-title {{item.title}}
</template>

<script>
export default {
  data(){
    return {
      list: [
        {title: '歌曲列表', icon: 'dashboard', to: '/admin/list'},
        {title: '上传文件', icon: 'question_answer', to: '/admin/upload'},
      ]
    }
  }
}
</script>
