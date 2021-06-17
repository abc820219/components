<template>
  <div id="app">
    <ul class="menu">
      <MenuItem
        v-for="list in menuList"
        :key="list"
        :menu-list="list"
      />
    </ul>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  components: {
    MenuItem
  },
  data () {
    return {
      menuList: [{
        label: '24購物',
        children: [
          {
            label: '桌由',
            children: [
              {
                label: '好玩'
              }
            ]
          }
        ]
      }]
    }
  }
}
</script>
