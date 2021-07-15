import HighchartsVue from "highcharts-vue";
// import something here
// require('highcharts/modules/exporting')(Highcharts);
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue }) => {
  // something to do
  Vue.use(HighchartsVue);
  Vue.component("highcharts-vue", HighchartsVue);
};
