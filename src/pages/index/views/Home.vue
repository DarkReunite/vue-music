<template lang="pug">
  v-app
    navDrawer
    toolBar
    v-content.margin-bottom
      router-view
    playBar
</template>

<script>
import toolBar from '@/pages/index/components/Toolbar';
import navDrawer from '@/pages/index/components/Navdrawer';
import playBar from '@/pages/index/components/PlayBar';

export default {
  components: {
    toolBar,
    navDrawer,
    playBar
  }
}
</script>

<style lang="scss" scoped>
.margin-bottom {
  margin-bottom: 100px !important;
}
</style>
