<template>
  <div></div>
</template>

<script>
// we import all of `date`
import { date } from "quasar";
// destructuring to keep only what is needed
const { addToDate } = date;

let timeStamp = Date.now();
// let newDate = addToDate(timeStamp, { hours: 3 })
let formattedString = date.formatDate(timeStamp, "HH:00");

console.log("formattedString", formattedString);
// console.log("newDate", date.formatDate(newDate, 'HH:00'))

export default {
  name: "PageIndex",
  computed: {
    time_fin() {
      console.log("this.time_ini", this.time_ini);
      let newDate = addToDate(this.time_ini, { hours: 3 });
      console.log("newDate", newDate);
      let asd = date.formatDate(newDate, "HH:00");
      console.log("asd", asd);
      return asd;
    }
  },
  components: {
    // Timeline: () => import('src/components/TimeLine'),
    // GanttHight: () => import('src/components/TestHightCharts'),
    // NewGantt: () => import("components/Newgantt/Newgantt")
  },
  data() {
    return {
      time_ini: formattedString,
      // time_fin: newDate,
      model: "2019-02-22 21:02",
      date_ini: null,
      time: "10:56",
      timeWithSeconds: "09:24:10",
      name: "Miguel"
    };
  },
  async created() {
    // await this.$router.push("/planing");
    await this.$store.commit("planing/set_leftDrawerOpen", true);
  }
};
</script>
