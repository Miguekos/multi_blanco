<template>
  <div class="q-pa-sm">
<!--    {{ datas }}-->
<!--    <q-btn @click="boton">boton</q-btn>-->
<!--    <a href="#dia11">qweqeqw</a>-->
    <div class="q-pa-xs">
      <div class="row">
        <div class="col-xs-12 col-md-2 q-pa-xs">
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
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <!--          <q-select stack-label dense outlined v-model="model" :options="options" label="Outlined" />-->
          <q-input
            stack-label
            dense
            outlined
            v-model="id_registro"
            label="Registro"
          />
        </div>
        <div class="col-xs-12 col-md-4 q-pa-xs">
          <!--          <q-select stack-label dense outlined v-model="model" :options="options" label="Outlined" />-->
          <q-input
            stack-label
            dense
            outlined
            v-model="comentario"
            label="Comentario"
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
        <div class="col-xs-12 col-md-1 q-pa-xs self-center">
          <q-btn
            color="green"
            class="full-width"
            push
            @click="addTask"
            label="agregar"
          ></q-btn>
        </div>
      </div>
    </div>
    <q-separator color="red-3" class="q-pb-xs" />
    <div class="q-pa-xs">
      <div class="row">
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-btn label="test" @click="doScrollToPostion"></q-btn>
          <!--          <q-input-->
          <!--            label="Inicio"-->
          <!--            stack-label-->
          <!--            dense-->
          <!--            outlined-->
          <!--            v-model="date_start"-->
          <!--          >-->
          <!--            <template v-slot:prepend>-->
          <!--              <q-icon name="event" class="cursor-pointer">-->
          <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
          <!--                  <q-date-->
          <!--                    v-model="date_start"-->
          <!--                    mask="DD-MM-YYYY HH:mm"-->
          <!--                    @input="() => actualizzartime()"-->
          <!--                  >-->
          <!--                    <div class="row items-center justify-end">-->
          <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
          <!--                    </div>-->
          <!--                  </q-date>-->
          <!--                </q-popup-proxy>-->
          <!--              </q-icon>-->
          <!--            </template>-->
          <!--            <template v-slot:append>-->
          <!--              <q-icon name="access_time" class="cursor-pointer">-->
          <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
          <!--                  <q-time-->
          <!--                    v-model="date_start"-->
          <!--                    mask="DD-MM-YYYY HH:mm"-->
          <!--                    format24h-->
          <!--                    @input="() => actualizzartime()"-->
          <!--                  >-->
          <!--                    <div class="row items-center justify-end">-->
          <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
          <!--                    </div>-->
          <!--                  </q-time>-->
          <!--                </q-popup-proxy>-->
          <!--              </q-icon>-->
          <!--            </template>-->
          <!--          </q-input>-->
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-btn label="test 2" @click="doScrollToTime"></q-btn>
          <!--          <q-input dense outlined label="Fin" stack-label v-model="date_end">-->
          <!--            <template v-slot:prepend>-->
          <!--              <q-icon name="event" class="cursor-pointer">-->
          <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
          <!--                  <q-date-->
          <!--                    v-model="date_end"-->
          <!--                    mask="DD-MM-YYYY HH:mm"-->
          <!--                    @input="() => actualizzartime()"-->
          <!--                  >-->
          <!--                    <div class="row items-center justify-end">-->
          <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
          <!--                    </div>-->
          <!--                  </q-date>-->
          <!--                </q-popup-proxy>-->
          <!--              </q-icon>-->
          <!--            </template>-->
          <!--            <template v-slot:append>-->
          <!--              <q-icon name="access_time" class="cursor-pointer">-->
          <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
          <!--                  <q-time-->
          <!--                    v-model="date_end"-->
          <!--                    mask="DD-MM-YYYY HH:mm"-->
          <!--                    format24h-->
          <!--                    @input="() => actualizzartime()"-->
          <!--                  >-->
          <!--                    <div class="row items-center justify-end">-->
          <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
          <!--                    </div>-->
          <!--                  </q-time>-->
          <!--                </q-popup-proxy>-->
          <!--              </q-icon>-->
          <!--            </template>-->
          <!--          </q-input>-->
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input label="Buscar" v-model="id_buscar" dense outlined></q-input>
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-btn
            color="blue"
            class="full-width"
            push
            @click="buscar"
            label="buscar"
          ></q-btn>
        </div>
        <div class="col-xs-6 col-md-2 q-pa-xs">
          <q-badge color="primary">
            Largo: {{ cellHeight }} (20 to 100, step 10)
          </q-badge>
          <q-slider
            style="width: 80%;"
            v-model="cellHeight"
            :min="40"
            :max="100"
            :step="10"
            label
            color="light-blue"
          />
        </div>
        <div class="col-xs-6 col-md-2 q-pa-xs">
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
        <div class="col-xs-12 col-md-1 q-pa-xs">
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
    <q-separator color="red-3" class="q-pb-xs" />
    <div
      v-for="(item, index) in armando"
      :key="index"
      class="q-pa-md"
      :id="`dia${index}`"
      ref="input"
    >
      <!--      <div class="flex flex-center text-h5">-->
      <!--        {{ item.name }}-->
      <!--      </div>-->
      <v-gantt-chart
        ref="gantt"
        :showCurrentTime="true"
        :startTime="item.inicio"
        :endTime="item.fin"
        :datas="datas"
        :cellWidth="cellWidth"
        :cellHeight="cellHeight"
        :timeLines="timeLines"
        :hideHeader="false"
        :hideXScrollBar="false"
        :hideYScrollBar="false"
        :enableGrab="false"
        :customGenerateBlocks="false"
        :timeRangeCorrection="true"
        :preload="1"
        :titleHeight="titleHeight"
        :titleWidth="180"
        :scale="scale"
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
          <div class="text-h6">
            <b>{{ item.name }}</b>
          </div>
        </template>
      </v-gantt-chart>
      <q-separator color="red-3" class="q-pb-xs" />
    </div>
    <q-dialog
      v-model="bar2"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <!--          <q-icon name="network_wifi" />-->
          <!--          <q-icon name="network_cell" />-->
          <!--          <q-icon name="battery_full" />-->
          <div>Detalle</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{ bar2_data.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pb-md">
            Registro: <b> {{ bar2_data.name }}</b>
          </div>
          <div class="q-pb-md">
            Fecha de Inicio: <b> {{ bar2_data.start }}</b>
          </div>
          <div class="q-pb-md">
            Fecha de Fin: <b> {{ bar2_data.end }}</b>
          </div>
          <div class="text-center">
            Comentario: <b> {{ bar2_data.comentario }}</b>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
      armando: [],
      id_buscar: "",
      bar2_data: "",
      bar2: false,
      testdate: formattedDateStart,
      date_start: formattedDateStart,
      date_end: formattedDateEnd,
      id_registro: "",
      comentario: "",
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
      date_ini: formattedDateStart,
      date_fin: formattedDateStart,
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
          .hour(7)
          .minute(0)
          .second(0)
          .add(1, "day")
          .toString(),
        dayjs()
          .hour(18)
          .minute(0)
          .second(0)
          .add(1, "day")
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
    boton(){
      location.href=`#dia12`;
    },
    doScrollToPostion() {
      // this.$refs.gantt.focus()

      // console.log("asdasd", this.$refs.input[6].focus())
      // this.$refs.input[2].focus()
      // this.$refs.gantt.scrollToPostionHandle({ x: 100, y: 100 });
    },
    doScrollToTime() {
      this.$refs.gantt.scrollToTimehandle(dayjs().toString());
    },
    buscar() {
      if (this.id_buscar.length > 2) {
        const array = this.datas;
        // console.log("this.id_buscar", this.id_buscar)
        const item_find = this.id_buscar;
        // console.log(this.datas)
        let result = "";
        for (let i = 0; i < array.length; i++) {
          const element = array[i].gtArray;
          // console.log("element", element)
          function esCereza(fruta) {
            return fruta.name === `${item_find}`;
          }
          if (element.find(esCereza)) {
            result = element.find(esCereza);
          } else {
            console.log("nada");
          }
        }
        console.log(result);
        this.updateTimeLines(result.start, result.end, result);
      } else {
        this.$q.notify({
          message: "Campo de busqueda vacio.!"
        });
      }
    },
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
    updateTimeLines(timeA, timeB, item) {
      // window.locationf=`#dia12`;
      // window.open(`#dia12`);
      // console.log(item);
      location.href=`#dia${item.name}`;
      this.bar2_data = item;
      this.timeLines = [
        {
          time: timeA
        },
        {
          time: timeB,
          color: "#747e80"
        }
      ];
      this.bar2 = true;
    },
    addTask() {
      for (let i = 0; i < this.datas.length; i++) {
        const element = this.datas[i];
        console.log(
          dayjs(`${this.date_ini} +01:00`, "DD-MM-YYYY HH:mm Z").toString()
        );
        // console.log(element.name, this.empleados_select)
        if (element.name === this.empleados_select) {
          element.gtArray.push({
            name: this.id_registro,
            comentario: this.comentario,
            start: dayjs(
              `${this.date_ini} +01:00`,
              "DD-MM-YYYY HH:mm Z"
            ).toString(),
            end: dayjs(
              `${this.date_fin} +01:00`,
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
    for (let i = 0; i < 32; i++) {
      // console.log("asdasdas", i)
      this.armando.push({
        name: dayjs()
          .add(i, "day")
          .format("DD/MM/YYYY"),
        inicio: dayjs()
          .hour(6)
          .minute(0)
          .second(0)
          .add(i, "day")
          .toString(),
        fin: dayjs()
          .hour(19)
          .minute(0)
          .second(0)
          .add(i, "day")
          .toString()
      });
    }
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
    // console.log("String", dayjs('05/02/2021 1:02:03 PM +01:00', 'MM/DD/YY H:mm:ss A Z').toString())
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
        zipcode: "",
        category: "",
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
.gantt-header-title {
  border-radius: 12px;
}
.scroll-container {
  /*width: 350px;*/
  /*height: 200px;*/
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.scroll-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 5em;
}
</style>
