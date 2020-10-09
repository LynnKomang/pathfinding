<template>
  <div>
    <div class="grid" :style="gridStyle">
      <div
        v-for="(cell, index) in spreadMatrix"
        :key="index"
        :style="cellStyle(cell, index)"
        @mouseover="hoverIndex = index"
        @mouseout="hoverIndex = -1"
        @click="selectedIndex = index"
      ></div>
    </div>

    <div class="row d-flex justify-content-between mt-4 col-6 mx-auto">
      <button
        type="button"
        class="btn btn-primary col col-5 rounded-pill"
        @click="selectStart"
      >
        Select start
      </button>
      <button
        type="button"
        class="btn btn-danger col col-5 rounded-pill"
        @click="selectEnd"
      >
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
      hoverIndex: -1,
      startIndex: -1,
      endIndex: -1,
      selectedIndex: -1,
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
  methods: {
    cellStyle(cell, index) {
      return {
        "background-color":
          this.hoverIndex === index
            ? "aqua"
            : this.startIndex === index
            ? "blue"
            : this.endIndex === index
            ? "red"
            : this.selectedIndex === index
            ? "lawngreen"
            : "white",
      };
    },
    selectStart() {
      if (this.selectedIndex > -1) {
        this.startIndex = this.selectedIndex;
      }
    },
    selectEnd() {
      if (this.selectedIndex > -1) {
        this.endIndex = this.selectedIndex;
      }
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