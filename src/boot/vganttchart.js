import vGanttChart from "v-gantt-chart";

export default async ({ Vue }) => {
  Vue.use(vGanttChart);
  Vue.component("v-gantt-chart", vGanttChart);
};
