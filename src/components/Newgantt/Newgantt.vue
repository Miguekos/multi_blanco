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
        <SegundaLinea @click="buscar" />
      </div>
      <!--      <div>-->
      <!--        <TerceraLinea @click="buscar" />-->
      <!--      </div>-->
      <q-separator color="red" />
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
      <q-card class="my-card" flat bordered>
        <!--        {{ bar2_data }}-->
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="logo_multi_blanco.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Miguel</q-item-label>
            <q-item-label caption>
              {{ bar2_data.registration_id }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label>
              <q-btn
                icon="close"
                rounded
                align="right"
                v-close-popup
                flat
                color="red"
              >
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section style="max-height: 80vh" class="scroll">
          <div class="row q-pb-lg">
            <div class="col-12 q-pa-xs">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-red">
                    Direccion:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    {{ bar2_data.address }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-red">
                    Codigo Portal:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    {{ bar2_data.zip_code }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-red">
                    Telefono:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    {{ bar2_data.phone }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-red">
                    Asgurado:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    {{ bar2_data.customer }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-red">
                    Detalle:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    {{ bar2_data.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-xs">
              <q-input
                v-model="comment"
                label="Comentario Adicional"
                stack-label
                filled
                type="textarea"
              />
            </div>
            <div class="col-12 q-pa-xs">
              <q-uploader
                label="Adjuntar Sustento"
                class="full-width"
                v-model="imagen"
                :factory="factoryFnF"
                auto-upload
                @uploaded="uploaded"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section horizontal></q-card-section>

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
            <q-btn align="right" @click="descargar" color="primary">
              Descargar
            </q-btn>
          </div>

          <q-space />
          <div class="q-gutter-xs">
            <q-btn
              icon="edit"
              @click="edit_task"
              color="orange"
              rounded
            ></q-btn>
            <q-btn
              icon="delete"
              @click="delete_task"
              color="red"
              rounded
            ></q-btn>
          </div>
          <!--          <q-btn align="right" v-close-popup flat color="red">-->
          <!--            Cerrar-->
          <!--          </q-btn>-->
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
import Test from "./test.vue"; //los tuyos propios gantt contenedor
import TestLeft from "./test-left.vue"; //Su propio componente de nombre de línea
// import { mockDatas } from "@src/mock/index.js"; //Datos falsos
import dayjs from "dayjs"; //La biblioteca del tiempo
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

async function sscroll(id) {
  // (A) SCROLL PARAMETERS
  var speed = 50, // Less = faster
    step = 30, // Less = smoother but slower
    click = 0;

  // (B) GET CURRENT Y POSITION + TARGET Y POSITION
  var fromY = self.pageYOffset ? self.pageYOffset : document.body.scrollTop;
  var target = document.getElementById(id);
  var toY = target.offsetTop;
  while (target.offsetParent && target.offsetParent != document.body) {
    target = target.offsetParent;
    toY += target.offsetTop;
  }

  window.scrollTo(0, toY - 190);
}

export default {
  name: "App",
  components: {
    Test,
    TestLeft,
    SegundaLinea: () => import("src/components/Newgantt/segundabarra")
    // TerceraLinea: () => import("src/components/Newgantt/tercerabarra")
  },
  computed: {},
  data() {
    return {
      comment: "",
      imagen: "",
      nombre: "",
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
    ...mapActions("planing", ["cargar_datas", "delete_datas"]),
    edit_task(val) {
      this.$q
        .dialog({
          title: "Editar",
          message: "Desea editar este registro?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
          this.$q.notify({
            message: "Proximamente"
          });
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    delete_task() {
      console.log("val", this.bar2_data);
      this.$q
        .dialog({
          title: "Eliminar",
          message: "Desea eliminar este registro?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          // console.log('>>>> OK')
          try {
            this.$q.loading.show()
            const resp_delete = await this.delete_datas(this.bar2_data.id);
            console.log("resp_delete.data", resp_delete);
            await this.cargar_datas();
            this.bar2 = false;
            this.$q.notify({
              message: "Eliminado"
            });
            this.$q.loading.hide()
          } catch (e) {
            console.log("resp_delete_error", e);
            this.$q.loading.hide()
          }
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
          this.$q.loading.hide()
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
          this.$q.loading.hide()
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
          this.$q.loading.hide()
        });
    },
    uploaded(files) {
      console.log("subio");
      console.log(files);
      const img = JSON.parse(files.xhr.response).name;
      console.log("name", img);
      this.imagen = img;
    },
    factoryFnF(files) {
      // returning a Promise
      return new Promise(resolve => {
        // simulating a delay of 2 seconds
        // setTimeout(() => {

        resolve({
          url: `${process.env.IMAGEN}servermultiblanco/upload`
        });
        // console.log(files[0].__progressLabel);

        // }, 2000)
      }).then(asd => {
        console.log("asd", asd);
        console.log("Files", files[0].__progressLabel);
        return asd;
      });
    },
    descargar() {
      this.$axios
        .post(`${process.env.IMAGEN}generarreporte/2`, {
          id: this.bar2_data.id,
          operario: this.bar2_data.operator,
          temerario: this.bar2_data.processor,
          expediente: this.bar2_data.registration_id,
          cita: this.bar2_data.date,
          asegurado: this.bar2_data.customer,
          direccion: this.bar2_data.address,
          detalles: this.bar2_data.description,
          codigo_postal: this.bar2_data.description,
          telf: this.bar2_data.phone,
          importante: this.comment,
          img: this.imagen ? this.imagen : ""
        })
        .then(async resp => {
          console.log("generarreporte", resp.data);
          const url = `${process.env.IMAGEN}fileserver/${this.bar2_data.registration_id}.pdf`;
          var element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("target", "_blank");
          element.setAttribute("download", `${this.bar2_data.registration_id}`);

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();
          document.body.removeChild(element);
        })
        .catch(async err => {
          console.log(err);
        });
    },
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
    buscar(val, val2) {
      console.log("Buscar", val);
      console.log("Buscar 2", val2);
      if (val.length > 2 || val2.length > 2) {
        const array = this.$store.getters["planing/get_datas"];
        // console.log("val", val)
        const item_find = val;
        const item_zip_code = val2;
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
        for (let i = 0; i < array.length; i++) {
          const element = array[i].gtArray;

          // console.log("element", element)
          function findJson(arg) {
            return arg.zip_code === `${item_zip_code}`;
          }

          if (element.find(findJson)) {
            result = element.find(findJson);
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
    async updateTimeLines(timeA, timeB, item) {
      // window.scrollTo(xCoord, yCoord);
      console.log("item", item.start);
      const fecha = dayjs(item.start);
      console.log("asdasda", dayjs(`${item.start}`).get("date"));
      console.log(
        "dayjs",
        dayjs(`${item.start}`, "DD-MM-YYYY HH:mm Z").toString()
      );
      console.log(`#dia${fecha.get("month")}${fecha.get("date")}`);
      await sscroll(`dia${fecha.get("month")}${fecha.get("date")}`);
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
          dayjs(`${this.date_ini} +02:00`, "DD-MM-YYYY HH:mm Z").toString()
        );
        // console.log(element.name, this.empleados_select)
        if (element.name === this.empleados_select) {
          element.gtArray.push({
            name: this.id_registro,
            comentario: this.comentario,
            start: dayjs(
              `${this.date_ini} +02:00`,
              "DD-MM-YYYY HH:mm Z"
            ).toString(),
            end: dayjs(
              `${this.date_fin} +02:00`,
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
    console.log("this.$route.params", this.$route.params);
    if (this.$route.params.id) {
      console.log("this.$route.params", this.$route.params.id);
      // await this.$router.push("/dia1");
    } else {
      console.log("this.$route.params", this.$route.params.id);
      // await this.$router.push("/dia1");
    }
  }
};
</script>
