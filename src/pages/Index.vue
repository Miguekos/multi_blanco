<template>
  <div>
    Inicio
    <!--    <VueCtkDateTimePicker-->
    <!--      id="DateTimePicker"-->
    <!--      format="YYYY-MM-DD HH:mm"-->
    <!--      formatted="YYYY-MM-DD HH:mm"-->
    <!--      v-model="date_ini"-->
    <!--      inline-->
    <!--    />-->

<!--    <vue-timepicker :second-interval="10"></vue-timepicker>-->
    <vue-timepicker :minute-interval="60"></vue-timepicker>

    <!--    <VueTimepicker :second-interval="10"></VueTimepicker>-->

<!--    <VueTimepicker></VueTimepicker>-->

    <q-separator />

    <div class="q-pa-md">
      <q-input filled v-model="time_ini" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="time_ini">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-separator />
      <q-input filled v-model="time_fin" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="time_fin">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="timepicker">asd</div>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

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
    VueTimepicker,
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
  mounted() {}
};
</script>
