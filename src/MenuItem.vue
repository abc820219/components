<template>
  <li>
    <span
      v-if="menuList.children && menuList.children.length"
      @click="openHandler"
    > {{ open? '-': '+' }}</span>
    {{ menuList.label }}
    <ul v-show="open">
      <MenuItem
        v-for="list in menuList.children"
        :key="
          list.label"
        :menu-list="list"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    openHandler () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
