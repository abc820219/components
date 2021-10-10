<template>
  <div id="app">
    <PreviewImg
      :imgList="list"
      :visible.sync="isPreview"
      :activeIndex.sync="activeIndex"
      width="1000px"
      height="500px"
    />
    <img
      v-for="(img, i) in list"
      :src="img"
      :key="img"
      @click="preview(img, i)"
      alt=""
      style="width: 400px; height: 200px"
    />
  </div>
</template>
<script>
import PreviewImg from "@/components/PreviewImg";
export default {
  components: {
    PreviewImg,
  },
  data() {
    return {
      list: [
        "https://picsum.photos/id/684/600/400",
        "https://picsum.photos/id/683/600/400",
        "https://picsum.photos/id/682/600/400",
      ],
      currentImg: "",
      isPreview: false,
      activeIndex: 0,
    };
  },
  methods: {
    preview(src, i) {
      this.currentImg = src;
      this.isPreview = true;
      this.activeIndex = i;
    },
  },
};
</script>

