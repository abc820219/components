<template>
  <div class="drawer" v-if="value" @click="$emit('input', false)">
    <div
      @click.stop
      class="content"
      :style="{ width, height }"
      :class="position"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "300px",
    },
    position: {
      type: String,
      default: "top",
    },
  },
  data() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  .content {
    position: absolute;
    background-color: #fff;
    &.left {
      left: 0;
      top: 0;
      bottom: 0;
    }
    &.right {
      right: 0;
      top: 0;
      bottom: 0;
    }
    &.bottom {
      bottom: 0;
      left: 0;
      right: 0;
    }
    &.top {
      top: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>