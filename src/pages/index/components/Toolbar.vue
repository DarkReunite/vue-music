<template lang="pug">
  v-toolbar(app color="orange accent-1" tabs prominent)
    v-toolbar-title.mr-4 My Library
    v-autocomplete(solo label="Search ..." hide-details no-data-text="没有数据")
    v-tabs(slot="extension" color="transparent")
      v-tab Song
</template>
