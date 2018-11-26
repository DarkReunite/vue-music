<template lang="pug">
  nav.pagination
    div.nav-links
      ul
        li
          router-link.arrow(v-if="parseInt(page) > 1" :to="{path: `/admin/list/${parseInt(page) - 1}`}")
            v-icon keyboard_arrow_left
          button.arrow.disabled(v-else disabled)
            v-icon keyboard_arrow_left
        li(v-if="parseInt(page) > 1")
          router-link(to="/admin") 1
        li(v-if="parseInt(page) - 2 > 1") 
          span ...
        li(v-if="parseInt(page) - 1 > 1")
          router-link(:to="{path: `/admin/list/${parseInt(page) - 1}`}") {{ parseInt(page) - 1 }}
        li
          button.active {{page}}
        li(v-if="parseInt(page) + 1 < totalPage")
          router-link(:to="{path: `/admin/list/${parseInt(page) + 1}`}") {{ parseInt(page) + 1 }}
        li(v-if="parseInt(page) + 2 < totalPage")
          span ...
        li(v-if="parseInt(page) < totalPage") 
          router-link(:to="{path: `/admin/list/${totalPage}`}") {{totalPage}}
        li
          router-link.arrow(v-if="parseInt(page) < totalPage" :to="{path: `/admin/list/${parseInt(page) + 1}`}")
            v-icon keyboard_arrow_right
          button.arrow.disabled(v-else disabled)
            v-icon keyboard_arrow_right
        
  
</template>

<script>
export default {
  props: ['page', 'totalPage'],
  data() {
    return {

    }
  },

  methods: {

  },


}
</script>

<style lang="scss" scoped>

nav.pagination {

  text-align: center;

  ul {
    display: inline-flex;
    list-style-type: none;

    li {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;

      button, a {
        color: #000000;
        text-decoration: none;
        margin: 0.3rem;
        height: 34px;
        line-height: 34px;
        width: 34px;
        border-radius: 4px;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
                    0px 2px 2px 0px rgba(0,0,0,0.14), 
                    0px 1px 5px 0px rgba(0,0,0,0.12);

        &.active{
          color: white;
          background-color: #1867c0;
          box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 
                      0px 4px 5px  0px rgba(0,0,0,0.14), 
                      0px 1px 10px 0px rgba(0,0,0,0.12);
        }
        
        &.arrow {
          height: 2rem;
          width: 2rem;
          margin: 0.3rem 10px;
        }

        &.disabled {
          opacity: 0.7;
        }


      }

      

      

      span {
        display: inline-flex;
        align-items: flex-end;
        justify-content: center;
        height: 2rem;
        width: 2rem;
      }
    }
  }
}
</style>
