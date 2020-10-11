<template>
  <div>
    <div class="grid shadow-lg" :style="gridStyle">
      <div
        ondragstart="return false;"
        ondrop="return false;"
        v-for="(cell, index) in spreadMatrix"
        :key="index"
        :style="cellStyle(cell, index)"
        @mouseover="hoverIndex = index"
        @mouseout="hoverIndex = -1"
        @contextmenu="$event.preventDefault()"
        @mousedown="handleClick($event, index)"
      ></div>
    </div>

    <div class="row d-flex justify-content-between mt-4 col-7 mx-auto">
      <button
        type="button"
        class="btn btn-primary col col-5 rounded-pill shadow"
        @click="selectStart"
      >
        Select start
      </button>
      <button
        type="button"
        class="btn btn-danger col col-5 rounded-pill shadow"
        @click="selectEnd"
      >
        Select end
      </button>
    </div>
    <div class="text-center">
      <button
        type="button"
        class="btn btn-lg btn-success px-5 rounded-pill mt-4 shadow"
        @click="searchPath"
      >
        Search path
      </button>
    </div>
  </div>
</template>

<script>
import { initiateMap, findPath } from "../astar";

export default {
  data() {
    return {
      hoverIndex: -1,
      startIndex: -1,
      endIndex: -1,
      selectedIndex: -1,
      width: 44,
      height: 22,
      matrix: [],
      wasInitiated: false,
      walls: new Set(),
    };
  },
  computed: {
    spreadMatrix() {
      return this.matrix.reduce((a, b) => a.concat(b), []);
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.width}, minmax(1px, 1fr))`,
      };
    },
  },
  methods: {
    handleClick(event, index) {
      if (event.which == 3) {
        if (!this.walls.has(index)) {
          this.walls.add(index);
        } else {
          this.walls.delete(index);
        }
      } else {
        this.selectedIndex = index;
      }
    },
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
            : this.walls.has(index)
            ? "gray"
            : cell.isInPath
            ? "orange"
            : "white",
      };
    },
    selectStart() {
      if (this.selectedIndex > -1) {
        if (this.selectedIndex === this.endIndex) {
          this.sendError(
            `The starting position and the ending positions can't be the same`
          );
        } else {
          if (!this.wasInitiated) {
            this.matrix = initiateMap(this.height, this.width, this.walls);
            this.wasInitiated = true;
          }

          this.startIndex = this.selectedIndex;
        }
      } else {
        this.sendError(`There isn't a selected cell`);
      }
    },
    selectEnd() {
      if (this.selectedIndex > -1) {
        if (this.selectedIndex === this.startIndex) {
          this.sendError(
            `The starting position and the ending positions can't be the same`
          );
        } else {
          if (!this.wasInitiated) {
            this.matrix = initiateMap(this.height, this.width, this.walls);
            this.wasInitiated = true;
          }

          this.endIndex = this.selectedIndex;
        }
      } else {
        this.sendError(`There isn't a selected cell`);
      }
    },
    sendError(message) {
      this.$emit("on-error", message);
    },
    searchPath() {
      if (this.startIndex === -1 || this.endIndex === -1) {
        this.sendError("There isn't a selected starting and ending point.");
      }

      this.matrix = initiateMap(this.height, this.width, this.walls);

      const path = findPath(
        this.matrix,
        this.spreadMatrix[this.startIndex],
        this.spreadMatrix[this.endIndex]
      ).reverse();

      path.forEach(({ row, col }, index) => {
        setTimeout(() => {
          this.matrix[row][col].isInPath = true;
          this.$forceUpdate();
        }, 20 * index);
      });

      this.wasInitiated = false;
    },
  },
  mounted() {
    this.matrix = initiateMap(this.height, this.width, this.walls);
    this.wasInitiated = true;
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