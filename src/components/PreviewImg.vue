<template>
  <div
    class="previewImage"
    v-if="visible"
    @click="$emit('update:visible', false)"
  >
    <div class="arrow left" @click.stop="changeHandler(-1)"></div>
    <img
      @click.stop
      :src="imgList[activeIndex]"
      alt=""
      :style="{ width, height }"
    />
    <div class="arrow right" @click.stop="changeHandler(1)"></div>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    imgList: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "600px",
    },
    height: {
      type: String,
      default: "400px",
    },
  },
  computed: {},
  methods: {
    changeHandler(n) {
      if (this.activeIndex + n < 0) {
        this.$emit("update:activeIndex", this.imgList.length - 1);
      } else if (this.activeIndex + n > this.imgList.length -1) {
        this.$emit("update:activeIndex", 0);
      } else {
        this.$emit("update:activeIndex", this.activeIndex + n);
      }
    },
  },
};
</script>

<style lang="scss">
.previewImage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #ccc;
  cursor: pointer;
  &.left {
    transform: translateX(5px) rotate(-45deg);
    margin-right: 10px;
  }
  &.right {
    transform: translateX(5px) rotate(135deg);
  }
  &:hover {
    box-shadow: 1px 1px 5px #ccc;
  }
}
.arrow:after {
  content: "";
  display: block;
  height: 40%;
  width: 40%;
  border-left: 5px solid #ccc;
  border-top: 5px solid #ccc;
}
</style>
