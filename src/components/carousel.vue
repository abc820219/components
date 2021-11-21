<template>
  <div class="carousel" :style="{ maxWidth: `${width}` }">
    <ul
      class="carousel-box"
      ref="carouselBox"
      @transitionend="fakeImgChangeHandler"
      :style="{
        height,
        width: `${100 * imgsFakeData.length}%`,
        left: `${left}%`,
        transition: `left ${intervalTime / 1000}s`,
      }"
    >
      <li
        v-for="(img, index) of imgsFakeData"
        :key="index"
        :style="{
          backgroundImage: `url(${img.src})`,
          width: `${100 / imgsFakeData.length}%`,
        }"
      ></li>
    </ul>
    <button @click="() => setCurrentImgIndexHandler(currentImgIndex - 1)">
      左
    </button>
    <button
      v-for="n of imgs.length"
      :key="n"
      @click="() => setCurrentImgIndexHandler(n)"
    >
      {{ n }}
    </button>
    <button @click="() => setCurrentImgIndexHandler(currentImgIndex + 1)">
      右
    </button>
  </div>
</template>

<script>
let timer = null;
console.log(timer);
export default {
  props: {
    height: {
      type: String,
      default: "500px",
    },
    width: {
      type: String,
      default: "500px",
    },
    imgs: {
      type: Array,
      default: () => [],
    },
    intervalTime: {
      type: Number,
      default: 1000,
    },
    autoTime: {
      type: Number,
      default: 3000,
    },
  },
  name: "Carousel",
  computed: {
    left() {
      return this.currentImgIndex * -100;
    },
    imgsFakeData() {
      return [this.imgs[this.imgs.length - 1], ...this.imgs, this.imgs[0]];
    },
  },
  mounted() {
    this.setTimerHandler();
  },
  methods: {
    setCurrentImgIndexHandler(num) {
      if (this.currentImgIndex === num) return
      if (this.isChanging) return;
      clearInterval(timer);
      this.isChanging = true;
      this.currentImgIndex = num;
      setTimeout(() => {
        this.isChanging = false;
        this.setTimerHandler();
      }, this.intervalTime);
    },
    fakeImgChangeHandler() {
      if (
        this.currentImgIndex <= 0 ||
        this.currentImgIndex >= this.imgsFakeData.length - 1
      ) {
        this.$refs.carouselBox.style.transition = "none";
        setTimeout(() => {
          this.$refs.carouselBox.style.transition = `left ${this.intervalTime / 1000}s`;
        });
      }
      if (this.currentImgIndex <= 0) {
        this.currentImgIndex = this.imgsFakeData.length - 2;
      }
      if (this.currentImgIndex >= this.imgsFakeData.length - 1) {
        this.currentImgIndex = 1;
      }
    },
    setTimerHandler() {
      timer = setInterval(() => {
        this.currentImgIndex += 1;
      }, this.autoTime);
    },
  },
  data() {
    return {
      isChanging: false,
      currentImgIndex: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.carousel {
  overflow: hidden;
  position: relative;
}
.carousel-box li {
  width: 20%;
  height: 100%;
}
.carousel-box li {
  background-repeat: no-repeat;
  background-size: cover;
}
.carousel-box {
  position: relative;
  display: flex;
}
</style>