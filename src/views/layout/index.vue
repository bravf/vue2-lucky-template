<style lang="sass" scoped></style>
<template lang="pug">
el-container.layout
  el-header
    h2 layout
  el-container
    el-aside
      side-menu
    el-main
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
