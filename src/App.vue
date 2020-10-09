<template>
  <div id="app" class="container">
    <Grid :matrix="grid" class="mx-auto" />
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  data() {
    return {
      width: 44,
      height: 22,
    };
  },
  computed: {
    grid() {
      return Array(this.height).fill(Array(this.width).fill(0));
    },
  },
  components: {
    Grid,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
