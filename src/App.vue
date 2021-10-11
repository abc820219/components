<template>
  <div id="app">
    <Drawer v-model="visible" :position="position" width="100%" height="300px">content</Drawer>
    <Drawer v-model="visible1" :position="position" width="200px" height="100%">content</Drawer>
    <button @click="visible = true">button</button>
    <button @click="l">l</button>
    <button @click="r">r</button>
    <button @click="t">t</button>
    <button @click="b">b</button>
  </div>
</template>
<script>
import Drawer from "@/components/Drawer";
export default {
  components: {
    Drawer,
  },
  data() {
    return {
      visible: false,
      visible1: false,
      position: "top",
    };
  },
  methods: {
    l() {
      this.position = "left";
      this.visible1 = true;
    },
    r() {
      this.position = "right";
      this.visible1 = true;
    },
    t() {
      this.position = "top";
      this.visible = true;
    },
    b() {
      this.position = "bottom";
      this.visible = true;
    },
  },
};
</script>
<style lang="scss">
</style>
