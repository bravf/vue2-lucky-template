<style lang="sass" scoped>
@import '@/styles/color-var'
$aside-width: 220px
$header-height: 60px

.layout
  .aside
    box-sizing: border-box
    width: $aside-width!important
    height: 100vh
    overflow: auto
    border-right: solid 1px #e6e6e6
    .el-menu
      border-right: none !important

  .header
    height: $header-height !important
    background: $white
    display: flex
    align-items: center

  .main
    box-sizing: border-box
    height: calc(100vh - #{$header-height})
    background-color: #fafafa
    overflow: auto
</style>
<template lang="pug">
el-container.layout
  el-aside.aside
    side-menu
  el-container
    el-header.header
      h2 header
    el-main.main
      router-view
</template>
<script>
import SideMenu from './side-menu.vue'
export default {
  name: 'layout',
  components: {
    SideMenu,
  },
}
</script>
