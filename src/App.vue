<template>
  <div id="app">
    <Carousel :imgs="imgs"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Carousel from "@/components/carousel";
export default {
  name: "Home",
  components: {
    Carousel,
  },
  data(){
    return {
       imgs: [
        {
          src: "https://picsum.photos/300/300?random=1",
        },
        {
          src: "https://picsum.photos/300/300?random=2",
        },
        {
          src: "https://picsum.photos/300/300?random=3",
        },
      ],
    }
  }
};
</script>
<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
</style>
