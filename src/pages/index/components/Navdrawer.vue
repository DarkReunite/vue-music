<template lang="pug">
  v-navigation-drawer(app)
    v-toolbar(flat) 
      v-toolbar-side-icon
      v-toolbar-title VMusic
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
        {title: 'My Library', icon: 'library_music', to: '/library'},
      ]
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
