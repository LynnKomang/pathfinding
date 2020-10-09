<template>
  <div>
    <div class="grid" :style="gridStyle">
      <div
        v-for="cellNum in width * height"
        :key="cellNum"
        @mouseover="highlight($event)"
        @mouseout="unhighlight($event)"
      ></div>
    </div>
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
    width() {
      return this.matrix[0].length;
    },
    height() {
      return this.matrix.length;
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.width}, minmax(1px, 1fr))`,
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