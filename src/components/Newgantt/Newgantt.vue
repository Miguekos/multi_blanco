<template>
  <div class="q-pa-sm">
    <q-header class="bg-white">
      <q-toolbar class="bg-red-8">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Multiservicios Blanco
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <div class="text-white">
        <SegundaLinea />
      </div>
      <div>
        <TerceraLinea @click="buscar" />
      </div>
      <q-separator color="red" class="q-pb-xs" />
    </q-header>
    <!--    {{ $store.state.planing.datas }}-->
    <!--    {{$store.getters['planing/get_datas']}}-->
    <div
      :style="{
        // 'padding-top': '220px'
      }"
      v-for="(item, index) in armando"
      :key="index"
      class="q-pa-md"
      :id="`dia${item.name_month}${item.name_day}`"
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
        :datas="$store.getters['planing/get_datas']"
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
      <!--      <q-card class="bg-primary text-white">-->
      <!--        <q-bar>-->
      <!--          &lt;!&ndash;          <q-icon name="network_wifi" />&ndash;&gt;-->
      <!--          &lt;!&ndash;          <q-icon name="network_cell" />&ndash;&gt;-->
      <!--          &lt;!&ndash;          <q-icon name="battery_full" />&ndash;&gt;-->
      <!--          <div>Detalle</div>-->

      <!--          <q-space />-->

      <!--          <q-btn dense flat icon="close" v-close-popup>-->
      <!--            <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>-->
      <!--          </q-btn>-->
      <!--        </q-bar>-->

      <!--        <q-card-section>-->
      <!--          <div class="text-h6">{{ bar2_data.name }}</div>-->
      <!--        </q-card-section>-->

      <!--        <q-card-section class="q-pt-none">-->
      <!--          <div class="q-pb-md">-->
      <!--            Registro: <b> {{ bar2_data.registration_id }}</b>-->
      <!--          </div>-->
      <!--          <div class="q-pb-md">-->
      <!--            Fecha de Inicio: <b> {{ formartdatedialog(bar2_data.start) }}</b>-->
      <!--          </div>-->
      <!--          <div class="q-pb-md">-->
      <!--            Fecha de Fin: <b> {{ formartdatedialog(bar2_data.end) }}</b>-->
      <!--          </div>-->
      <!--          <div class="text-center">-->
      <!--            Comentario:-->
      <!--            <div>-->
      <!--              <b> {{ bar2_data.comentario }}</b>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <q-card-actions>-->
      <!--            -->
      <!--          </q-card-actions>-->
      <!--        </q-card-section>-->
      <!--      </q-card>-->
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">{{ bar2_data.name }}</div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ bar2_data.registration_id }}
            </div>
            <div class="text-caption text-grey">
              {{ bar2_data.comentario }}
            </div>
            <div class="full-width">
              <q-input v-model="text" filled type="textarea" />
            </div>
          </q-card-section>
          <q-space />
          <q-separator vertical />
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="logo_multi_blanco.png" />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <div class="q-pr-lg">
            Inicio: <b> {{ formartdatedialog(bar2_data.start) }}</b>
          </div>

          <q-separator vertical />

          <div class="q-pl-lg q-pr-lg">
            Fin: <b> {{ formartdatedialog(bar2_data.end) }}</b>
          </div>

          <!--          <q-separator vertical/>-->

          <div class="q-pr-lg">
            <q-btn align="right" v-close-popup color="primary">
              Descargar
            </q-btn>
          </div>

          <q-space />
          <q-btn align="right" v-close-popup flat color="red">
            Cerrar
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapActions } from "vuex";
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
import { cargar_datas } from "src/store/module-planing/actions";

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

function sscroll(id) {
  // (A) SCROLL PARAMETERS
  var speed = 100, // Less = faster
    step = 30, // Less = smoother but slower
    click = 0;

  // (B) GET CURRENT Y POSITION + TARGET Y POSITION
  // console.log("ididid", id)
  var fromY = self.pageYOffset ? self.pageYOffset : document.body.scrollTop;
  var target = document.getElementById(id);
  // console.log("target",target)
  var toY = target.offsetTop;
  while (target.offsetParent && target.offsetParent != document.body) {
    target = target.offsetParent;
    toY += target.offsetTop;
  }

  window.scrollTo(0, toY - 190);

  // console.log("toY", toY + 190)

  // (C) SCROLL ANIMATION - DOWNWARDS
  // if (fromY < toY) {
  //   for (var i = fromY; i <= toY; i += step) {
  //     if (i + step > toY) {
  //       setTimeout("window.scrollTo(0, " + toY + ")", click * speed);
  //     } else {
  //       setTimeout("window.scrollTo(0, " + i + ")", click * speed);
  //     }
  //     click++;
  //   }
  // }

  // (D) SCROLL ANIMATION - UPWARDS
  // else {
  //   for (var i = fromY; i >= toY; i -= step) {
  //     if (i - step < toY) {
  //       setTimeout("window.scrollTo(0, " + toY + ")", click * speed);
  //     } else {
  //       setTimeout("window.scrollTo(0, " + i + ")", click * speed);
  //     }
  //     click++;
  //   }
  // }
}

export default {
  name: "App",
  components: {
    Test,
    TestLeft,
    SegundaLinea: () => import("src/components/Newgantt/segundabarra"),
    TerceraLinea: () => import("src/components/Newgantt/tercerabarra")
  },
  computed: {},
  data() {
    return {
      text: "",
      leftDrawerOpen: false,
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
      persons_group: [],
      empleados_group: [],
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
      scale: 60
      // startTime: dayjs().hour(0).toString(),
      // endTime: dayjs().hour(23).toString(),
      // datas: []
    };
  },
  methods: {
    ...mapActions("planing", ["cargar_datas"]),
    formartdatedialog(val) {
      return dayjs(`${val}`)
        .subtract(0, "hours")
        .format("HH:mm");
    },
    boton() {
      location.href = `#dia12`;
    },
    doScrollToPostion() {},
    doScrollToTime() {
      this.$refs.gantt.scrollToTimehandle(dayjs().toString());
    },
    buscar(val) {
      console.log("Buscar 2", val);
      if (val.length > 2) {
        const array = this.$store.getters["planing/get_datas"];
        // console.log("val", val)
        const item_find = val;
        // console.log(this.$store.getters['planing/get_datas'])
        let result = "";
        for (let i = 0; i < array.length; i++) {
          const element = array[i].gtArray;

          // console.log("element", element)
          function esCereza(fruta) {
            return fruta.registration_id === `${item_find}`;
          }

          if (element.find(esCereza)) {
            result = element.find(esCereza);
            this.updateTimeLines(result.start, result.end, result);
          } else {
            console.log("nada");
          }
        }
        console.log(result);
        // this.updateTimeLines(result.start, result.end, result);
      } else {
        this.$q.notify({
          message: "Campo de busqueda vacio.!"
        });
      }
    },
    actualizzartime() {
      console.log("actualizzartime");
      if (this.date_start == null) {
        console.log("la misma fecha");
      } else {
        this.times[0] = dayjs(
          `${this.date_start} -00:00`,
          "DD-MM-YYYY HH:mm Z"
        ).toString();
        this.times[1] = dayjs(
          `${this.date_end} -00:00`,
          "DD-MM-YYYY HH:mm Z"
        ).toString();
      }
    },
    updateTimeLines(timeA, timeB, item) {
      // window.scrollTo(xCoord, yCoord);
      console.log("item", item.start);
      const fecha = dayjs(item.start);
      console.log("asdasda", dayjs(`${item.start}`).get("date"));
      console.log(
        "dayjs",
        dayjs(`${item.start}`, "DD-MM-YYYY HH:mm Z").toString()
      );
      console.log(`#dia${fecha.get("month")}${fecha.get("date")}`);
      sscroll(`dia${fecha.get("month")}${fecha.get("date")}`);
      // location.href = `#dia${fecha.get('month')}${fecha.get('date')}`;
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
          dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z").toString()
        );
        // console.log(element.name, this.empleados_select)
        if (element.name === this.empleados_select) {
          element.gtArray.push({
            name: this.id_registro,
            comentario: this.comentario,
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
    // await this.$axios
    //   .get("http://127.0.0.1:8000/persons")
    //   .then(resp => {
    //     console.log(resp);
    //     this.persons_group = resp.data;
    //     this.$store.commit("planing/set_persons", resp.data);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     console.log("Error");
    //   });

    await this.cargar_datas();

    for (let i = 0; i < 32; i++) {
      // console.log("asdasdas", i)
      const fecha = dayjs().add(i, "day");
      this.armando.push({
        name_day: fecha.get("date"),
        name_month: fecha.get("month"),
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
    // this.categories = this.persons_group;
    // this.cant_categories = this.persons_group.length;
    // let datas = [];
    // for (let i = 0; i < this.cant_categories; i++) {
    //   const element = this.persons_group[i];
    //   const color1 = Math.floor(Math.random() * 255 + 1);
    //   const color2 = Math.floor(Math.random() * 255 + 1);
    //   const color3 = Math.floor(Math.random() * 255 + 1);
    //   datas.push({
    //     id: element.name,
    //     category: "",
    //     name: element.registro,
    //     // ''
    //     colorPair: {
    //       dark: `rgb(${color1}, ${color2}, ${color3},0.8)`,
    //       light: `rgb(${color1}, ${color2}, ${color3},0.1)`
    //     },
    //     gtArray: []
    //   });
    // }
    // await this.$axios
    //   .get("http://127.0.0.1:8000/planing")
    //   .then(async resp => {
    //     const datainfo = resp.data;
    //     console.log(datainfo);
    //     for (let index = 0; index < datainfo.length; index++) {
    //       for (let i = 0; i < datas.length; i++) {
    //         const element = datas[i];
    //         if (element.name === datainfo[index].id) {
    //           const start = dayjs(
    //             `${this.date_ini} -05:00`,
    //             "DD-MM-YYYY HH:mm Z"
    //           );
    //           const end = dayjs(
    //             `${this.date_fin} -05:00`,
    //             "DD-MM-YYYY HH:mm Z"
    //           );
    //           element.gtArray.push(datainfo[index].gtArray);
    //           // console.log("jsonAdd", jsonAdd);
    //           console.log("element", element);
    //         }
    //       }
    //     }
    //     console.log("datas",datas)
    //     this.$store.commit("planing/set_datas", datas);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     console.log("Error");
    //   });
    console.log("this.$route.params", this.$route.params);
    if (this.$route.params.id) {
      console.log("this.$route.params", this.$route.params.id);
      // await this.$router.push("/dia1");
    } else {
      console.log("this.$route.params", this.$route.params.id);
      await this.$router.push("/dia1");
    }
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
