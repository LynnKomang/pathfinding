<template>
  <div id="app">
    <Grid :matrix="grid" />
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  data() {
    return {
      size: 10,
    };
  },
  computed: {
    grid() {
      return Array(this.size).fill(Array(this.size));
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
