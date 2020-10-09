<template>
  <div>
    <div class="grid" :style="gridStyle">
      <div
        v-for="(cell, index) in spreadMatrix"
        :key="index"
        :style="{ 'background-color': cell.isHovered ? 'aqua' : 'white' }"
        @mouseover="cell.isHovered = true"
        @mouseout="cell.isHovered = false"
      ></div>
    </div>

    <div class="row d-flex justify-content-between mt-4 col-6 mx-auto">
      <button type="button" class="btn btn-primary col col-5">
        Select start
      </button>
      <button type="button" class="btn btn-primary col col-5">
        Select end
      </button>
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
  data() {
    return {
      spreadMatrix: this.matrix.reduce((total, next) => total.concat(next), []),
    };
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