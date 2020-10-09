<template>
  <div class="grid" :style="gridStyle">
    <div
      v-for="cellNum in size * size"
      :key="cellNum"
      @mouseover="highlight($event)"
      @mouseout="unhighlight($event)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    matrix: {
      type: Array,
      required: true,
    },
  },
  computed: {
    size() {
      return this.matrix.length;
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.size}, minmax(100px, 1fr))`,
      };
    },
  },
  methods: {
    highlight(event) {
      event.target.style.backgroundColor = "red";
    },
    unhighlight(event) {
      event.target.style.backgroundColor = "white";
    },
  },
};
</script>

<style>
.grid {
  display: grid;
}

.grid > div {
  border: 1px solid black;
}

.grid > div::before {
  content: "";
  padding-bottom: 100%;
  display: inline-block;
  vertical-align: top;
}
</style>