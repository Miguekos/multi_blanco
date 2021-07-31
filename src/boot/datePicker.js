import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'


export default async ({ Vue }) => {
  Vue.use(VueTimepicker);
  Vue.component("vue-timepicker", VueTimepicker);
};
