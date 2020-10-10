<template>
  <div id="app" class="container">
    <Grid :matrix="grid" class="mx-auto" @on-error="showAlert" />
    <notifications group="error" position="bottom right" />
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";
import { initiateMap } from "./astar";

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
      return initiateMap(this.height, this.width);
    },
  },
  components: {
    Grid,
  },
  methods: {
    showAlert(message) {
      this.$notify({
        type: "error",
        group: "error",
        title: "Error",
        text: message,
      });
    },
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
