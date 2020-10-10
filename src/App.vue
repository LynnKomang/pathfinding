<template>
  <div id="app">
    <Hero />
    <div class="container">
      <Grid class="mx-auto" @on-error="showAlert" />
      <notifications group="error" position="bottom right" />
    </div>
  </div>
</template>

<script>
import Grid from "./components/Grid.vue";
import Hero from "./components/Hero";

export default {
  name: "App",
  components: {
    Grid,
    Hero,
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
</style>
