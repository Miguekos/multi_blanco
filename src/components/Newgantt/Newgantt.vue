<template>
  <div class="q-pa-sm">
    <div class="q-pa-xs">
      <div class="row">
        <div class="col-xs-12 col-md-4 q-pa-xs">
          <q-select
            stack-label
            dense
            outlined
            v-model="empleados_select"
            :options="empleados_group"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            label="Empleado"
          />
        </div>
        <div class="col-xs-12 col-md-4 q-pa-xs">
          <!--          <q-select stack-label dense outlined v-model="model" :options="options" label="Outlined" />-->
          <q-input
            stack-label
            dense
            outlined
            v-model="id_registro"
            label="Registro"
          />
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input dense outlined v-model="date_ini">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_ini" mask="DD-MM-YYYY HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="date_ini" mask="DD-MM-YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input dense outlined v-model="date_fin">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_fin" mask="DD-MM-YYYY HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="date_fin" mask="DD-MM-YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 text-center">
          <q-btn @click="addTask" label="agregar"></q-btn>
          <!--          <q-btn label="Recargar"></q-btn>-->
        </div>
      </div>
    </div>
    <div class="q-pa-xs">
      <div class="row">
        <div class="col-2 q-pa-xs">
          <q-input
            label="Inicio"
            stack-label
            dense
            outlined
            v-model="date_start"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="date_start"
                    mask="DD-MM-YYYY HH:mm"
                    @input="() => actualizzartime()"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="date_start"
                    mask="DD-MM-YYYY HH:mm"
                    format24h
                    @input="() => actualizzartime()"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-2 q-pa-xs">
          <q-input dense outlined label="Fin" stack-label v-model="date_end">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="date_end"
                    mask="DD-MM-YYYY HH:mm"
                    @input="() => actualizzartime()"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="date_end"
                    mask="DD-MM-YYYY HH:mm"
                    format24h
                    @input="() => actualizzartime()"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-2 q-pa-xs"></div>
        <div class="col-2 q-pa-xs">
          <q-badge color="primary">
            Largo: {{ cellHeight }} (20 to 100, step 10)
          </q-badge>
          <q-slider
            style="width: 80%;"
            v-model="cellHeight"
            :min="20"
            :max="100"
            :step="10"
            label
            color="light-blue"
          />
        </div>
        <div class="col-2 q-pa-xs">
          <q-badge color="secondary">
            Ancho: {{ cellWidth }} (20 to 100, step 10)
          </q-badge>
          <q-slider
            style="width: 80%;"
            v-model="cellWidth"
            :min="20"
            :max="100"
            :step="10"
            label
            color="light-green"
          />
        </div>
        <div class="col-2 q-pa-xs">
          <q-select
            outlined
            dense
            label="Rango"
            map-options
            v-model="scale"
            :options="scaleList"
            option-value="value"
            option-label="label"
            emit-value
          ></q-select>
        </div>
      </div>
    </div>
    <div class="q-pa-xs">
      <v-gantt-chart
        :startTime="times[0]"
        :endTime="times[1]"
        :datas="datas"
        :cellWidth="cellWidth"
        :cellHeight="cellHeight"
        :timeLines="timeLines"
        :titleHeight="titleHeight"
        ale="scale"
        tleWidth="titleWidth"
      >
        <template v-slot:block="{ data, item }">
          <!-- El componente de bloque de contenedor -->
          <Test
            :data="data"
            :item="item"
            :updateTimeLines="updateTimeLines"
            :cellHeight="cellHeight"
            :currentTime="currentTime"
          >
          </Test>
        </template>
        <template v-slot:left="{ data }">
          <!-- El componente de nombre de línea -->
          <TestLeft :data="data"></TestLeft>
        </template>
        <template v-slot:title>
          <!-- El ensamblado de encabezado -->
          Planing
        </template>
      </v-gantt-chart>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY HH:mm");
const formattedDateSinSegundos = date.formatDate(timeStamp, "DD-MM-YYYY HH:00");
// const formattedDateStart = date.formatDate(timeStamp, 'ddd, DD MMM YYYY HH:mm:ss Z')
const formattedDateStart = date.formatDate(timeStamp, "DD-MM-YYYY 00:00");
const formattedDateEnd = date.formatDate(timeStamp, "DD-MM-YYYY 23:00");
console.log("formattedString", formattedString);
import Test from "./test.vue"; //你自己的gantt条容器
import TestLeft from "./test-left.vue"; //你自己的行名称组件
// import { mockDatas } from "@src/mock/index.js"; //伪造的数据
import dayjs from "dayjs"; //时间库
import "dayjs/locale/es";
dayjs.locale("es");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const scaleList = `1,2,3,4,5,6,10,12,15,20,30,60,120,180,240,360,720,1440,2880,4320`
  .split(",")
  .map(n => {
    let value = parseInt(n);
    let label;
    if (value < 60) {
      label = value + " Minutos";
    } else if (value >= 60 && value < 1440) {
      label = value / 60 + " Hora";
    } else {
      label = value / 1440 + " Dia";
    }
    return {
      value,
      label
    };
  });

export default {
  name: "App",
  components: { Test, TestLeft },
  computed: {},
  data() {
    return {
      testdate: formattedDateStart,
      date_start: formattedDateStart,
      date_end: formattedDateEnd,
      id_registro: "",
      currentTime: dayjs(),
      time_ini: "10:00",
      time_fin: "12:00",
      updateArgs: [true, true, { duration: 1000 }],
      options_employed: [],
      empleados_group: [
        {
          id: 1,
          name: "Miguel R"
        },
        {
          id: 2,
          name: "Alex F"
        },
        {
          id: 3,
          name: "Juan B"
        },
        {
          id: 4,
          name: "Carlos F"
        },
        {
          id: 5,
          name: "David H"
        },
        {
          id: 6,
          name: "Diego P"
        }
      ],
      categories: [],
      date_ini: "14-07-2021 10:00",
      date_fin: "14-07-2021 12:00",
      empleados_select: null,
      scaleList: scaleList,
      timeLines: [
        {
          // time: dayjs().hour(1).minute(0).second(0).toString(),
          // color: "#cd0c0c",
        },
        {
          // time: dayjs().hour(0).minute(0).second(0).toString(),
          // time: dayjs().toString(),
          // color: "#06b7d2"
        }
      ],
      times: [
        dayjs()
          .hour(0)
          .minute(0)
          .second(0)
          .toString(),
        dayjs()
          .hour(23)
          .minute(0)
          .second(0)
          .toString()
        // dayjs().subtract(5, "hour").toString(),
        // dayjs().toString(),
        // dayjs().add(29, "day").add(2, "hour").toString(),
      ],
      cellWidth: 90,
      cellHeight: 50,
      titleHeight: 40,
      titleWidth: 250,
      scale: 60,
      // startTime: dayjs().hour(0).toString(),
      // endTime: dayjs().hour(23).toString(),
      datas: []
    };
  },
  methods: {
    actualizzartime() {
      console.log("actualizzartime");
      // console.log("asd", this.date_start)
      // console.log("asd", typeof this.date_start)
      // console.log("this.times[0]", this.times[0]);
      if (this.date_start == null) {
        console.log("la misma fecha");
      } else {
        // let unit = 'days'
        // let diff = date.getDateDiff(this.date_end, this.date_start, unit)
        // console.log("diff", diff)
        this.times[0] = dayjs(
          `${this.date_start} -00:00`,
          "DD-MM-YYYY HH:mm Z"
        ).toString();
        // console.log("this.times[0] - 2", this.times[0]);
        this.times[1] = dayjs(
          `${this.date_end} -00:00`,
          "DD-MM-YYYY HH:mm Z"
        ).toString();
      }
      // if (date.isValid(this.times[0])) {
      //   console.log("date_validated", this.date_start)
      //   // Do something with date string
      //   console.log("this.times[0] - 1", this.times[0]);
      //   // if (this.times[0]) {
      //   this.times[0] = dayjs(
      //     `${this.date_start} -00:00`,
      //     "DD-MM-YYYY HH:mm Z"
      //   ).toString();
      //   console.log("this.times[0] - 2", this.times[0]);
      //   this.times[1] = dayjs(
      //     `${this.date_end} -00:00`,
      //     "DD-MM-YYYY HH:mm Z"
      //   ).toString();
      //   // } else {
      //   //   console.log("Error controlado");
      //   // }
      // }
    },
    updateTimeLines(timeA, timeB) {
      this.timeLines = [
        {
          time: timeA
        },
        {
          time: timeB,
          color: "#747e80"
        }
      ];
    },
    addTask() {
      for (let i = 0; i < this.datas.length; i++) {
        const element = this.datas[i];
        console.log(
          dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z").toString()
        );
        // console.log(element.name, this.empleados_select)
        if (element.name === this.empleados_select) {
          element.gtArray.push({
            name: this.id_registro,
            start: dayjs(
              `${this.date_ini} -05:00`,
              "DD-MM-YYYY HH:mm Z"
            ).toString(),
            end: dayjs(
              `${this.date_fin} -05:00`,
              "DD-MM-YYYY HH:mm Z"
            ).toString()
          });
        }
      }
    }
  },
  watch: {
    rowNum: "updateData",
    colNum: "updateData",
    times: "updateData",
    scrollToY(val) {
      this.positionA = { x: val };
    }
  },
  async created() {
    console.log(
      "---->",
      dayjs()
        .hour(0)
        .minute(0)
        .second(0)
        .toString()
    );
    // console.log("-->", dayjs(`${this.date_start} -00:00`, 'DD-MM-YYYY Z').toString())
    // console.log("----->",dayjs(`${this.date_ini} -00:00`, 'DD-MM-YYYY HH:mm Z').toString())
    // console.log(dayjs().hour(6).minute(0).second(0).toString())
    // console.log("String", dayjs('05/02/2021 1:02:03 PM -05:00', 'MM/DD/YY H:mm:ss A Z').toString())
    this.categories = this.empleados_group;
    this.cant_categories = this.empleados_group.length;
    // let employed = []
    for (let i = 0; i < this.cant_categories; i++) {
      const element = this.empleados_group[i];
      const color1 = Math.floor(Math.random() * 255 + 1);
      const color2 = Math.floor(Math.random() * 255 + 1);
      const color3 = Math.floor(Math.random() * 255 + 1);
      this.datas.push({
        id: element.name,
        type: "",
        speed: "",
        name: element.id,
        // ''
        colorPair: {
          dark: `rgb(${color1}, ${color2}, ${color3},0.8)`,
          light: `rgb(${color1}, ${color2}, ${color3},0.1)`
        },
        gtArray: [
          //La matriz predeterminada que debe representarse
          // {
          //   name:'test',
          //   "start": dayjs().hour(6).minute(0).second(0).toString(),
          //   "end": dayjs().hour(8).minute(0).second(0).toString(),
          // }
        ]
      });
    }
    // this.options_employed = employed
  }
};
</script>

<style>
.gantt-header-title{
  border-radius: 12px;
}
</style>
