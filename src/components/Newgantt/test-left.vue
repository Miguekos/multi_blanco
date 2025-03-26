<template>
  <div class="name" :style="{ background: updateColorLight(data.colorPair)}">
    <div class="colorBar" :style="{ background: updateColorDark(data.colorPair) }"/>
    <div class="type">{{ data.type }}</div>
    <div class="carId">{{ data.name }}</div>
    <div class="speed">{{ data.speed }}</div>
  </div>
</template>

<script>
import {hexToRgbLight, hexToRgbDark} from "src/services/HexToRGB"

export default {
  name: "TestLeft",
  props: {
    data: Object
  },
  methods: {
    updateColorLight(val) {
      // console.log("val", val)
      // console.log("hexToRgb(val)", hexToRgbLight(val))
      return hexToRgbLight(val)
    },
    updateColorDark(val) {
      return hexToRgbDark(val)
    }
  }
};
</script>

<style scoped>
.name {
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0 5px 0 0;
  border-radius: 8px 0 0 8px;
  align-items: center;
}

.colorBar {
  width: 10px;
  height: 100%;
}

.carId {
  flex: 1;
}

.type {
  padding: 0 5px 0 0;
  font-size: 1.2rem;
}
</style>
