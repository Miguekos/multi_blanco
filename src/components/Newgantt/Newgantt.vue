<template>
  <div class="q-pa-sm">
    <q-header class="bg-white">
      <q-toolbar class="bg-red-8">
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          @click="go_to_home"
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
              <q-img alt="logo" src="logo_multi_blanco.png" />
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
                @click="active_edit_task = false"
                flat
                color="red"
              >
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section
          v-if="active_edit_task"
          style="max-height: 80vh"
          class="scroll bg-orange-1"
        >
          <div class="row q-pb-lg">
            <div class="col-12 q-pa-xs">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-red">
                    Direccion:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    <q-input
                      dense
                      outlined
                      v-model="bar2_data.address"
                    ></q-input>
                    <!--                    {{ bar2_data.address }}-->
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-red">
                    Empresa:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    <q-input
                      dense
                      outlined
                      v-model="bar2_data.specialty"
                    ></q-input>
                    <!--                    {{ bar2_data.specialty }}-->
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
                    <q-input dense outlined v-model="bar2_data.phone"></q-input>
                    <!--                    {{ bar2_data.phone }}-->
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-red">
                    Asgurado:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    <q-input
                      dense
                      outlined
                      v-model="bar2_data.customer"
                    ></q-input>
                    <!--                    {{ bar2_data.customer }}-->
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
                    <q-input
                      dense
                      outlined
                      v-model="bar2_data.description"
                    ></q-input>
                    <!--                    {{ bar2_data.description }}-->
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-red">
                    Detalle:
                  </q-item-label>
                  <!--                  {{bar2_data}}-->
                  <q-item-label caption class="text-black">
                    <q-input dense outlined v-model="bar2_data.date_ini">
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="bar2_data.date_ini"
                              mask="DD-MM-YYYY"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    <div class="row">
                      <div class="col">
                        <vue-timepicker
                          v-model="bar2_data.time_ini"
                          :hour-range="[7, [8, 18], 19]"
                          :minute-interval="30"
                        ></vue-timepicker>
                      </div>
                      <div class="col">
                        <vue-timepicker
                          v-model="bar2_data.time_fin"
                          :hour-range="[7, [8, 18], 19]"
                          :minute-interval="30"
                        ></vue-timepicker>
                      </div>
                    </div>
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

        <q-card-section v-else style="max-height: 80vh" class="scroll">
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
                    Empresa:
                  </q-item-label>
                  <q-item-label caption class="text-black">
                    {{ bar2_data.specialty }}
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
            <!--            <form method="get" action="https://api.apps.com.pe/fileserver/33242.pdf">-->
            <!--              <button type="submit">Download!</button>-->
            <!--            </form>-->
            <q-btn align="right" @click="descargar" color="primary">
              Descargar
            </q-btn>
          </div>

          <q-space />
          <div class="q-gutter-xs">
            <q-btn
              v-if="active_edit_task"
              icon="check"
              @click="edit_task"
              color="info"
              rounded
            ></q-btn>
            <q-btn
              v-if="!active_edit_task"
              icon="edit"
              @click="change_active_edit"
              color="orange"
              rounded
            ></q-btn>
            <q-btn
              icon="delete"
              @click="delete_task"
              :loading="del_load"
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
    <q-dialog v-model="status_result_search">
      <q-card>
        <!--        {{ result_search }}-->
        <div class="q-pa-xs">
          <q-table
            title="Buscando"
            dense
            :data="result_search"
            :columns="columns_search"
            row-key="name"
            :pagination="initialPagination"
          >
            <template v-slot:body-cell="props">
              <q-td
                class="cursor-pointer"
                @click="click_and_find(props.row)"
                :props="props"
              >
                {{ props.value }}
              </q-td>
            </template>
            <template v-slot:body-cell-start="props">
              <q-td :props="props">
                <div class="my-table-details">
                  {{ generic_format_date(props.row.start) }}
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
        <!--        {{ result_search }}-->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapActions } from "vuex";
const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY HH:mm");
// const formattedDateSinSegundos = date.formatDate(timeStamp, "DD-MM-YYYY HH:00");
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

const columns_search = [
  {
    name: "name",
    required: true,
    label: "Registro",
    align: "left",
    field: row => row.registration_id,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: "specialty",
    align: "left",
    label: "Empresa",
    field: "specialty",
    sortable: true
  },
  {
    name: "processor",
    align: "left",
    label: "Tramitador",
    field: "processor",
    sortable: true
  },
  { name: "phone", align: "left", label: "Telf.", field: "phone" },
  { name: "address", align: "left", label: "Direccion", field: "address" },
  {
    name: "start",
    align: "right",
    label: "Fecha",
    field: "start"
  }
];

async function scroll(id) {
  // (A) SCROLL PARAMETERS
  // const speed = 50,
  //   step = 30,
  //   click = 0;

  // (B) GET CURRENT Y POSITION + TARGET Y POSITION
  // const fromY = self.pageYOffset ? self.pageYOffset : document.body.scrollTop;
  let target = document.getElementById(id);
  let toY = target.offsetTop;
  while (target.offsetParent && target.offsetParent !== document.body) {
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
      initialPagination: {
        sortBy: "start",
        descending: false,
        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server
      },
      columns_search,
      result_search: [],
      status_result_search: false,
      json_edit: {},
      active_edit_task: false,
      del_load: false,
      comment: "",
      imagen: "",
      nombre: "",
      text: "",
      leftDrawerOpen: false,
      armando: [],
      id_buscar: "",
      bar2_data: {},
      bar2: false,
      testdate: formattedDateStart,
      date_start: formattedDateStart,
      date_end: formattedDateEnd,
      id_registro: "",
      comentario: "",
      currentTime: dayjs(),
      time_ini: "07:00",
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
      scale: 30
      // startTime: dayjs().hour(0).toString(),
      // endTime: dayjs().hour(23).toString(),
      // datas: []
    };
  },
  methods: {
    ...mapActions("planing", ["cargar_datas", "delete_datas", "edit_datas"]),
    async go_to_home() {
      this.$store.commit("planing/set_leftDrawerOpen", false);
      await this.$router.replace("/");
      await this.$router.go();
    },
    async page_loading_ini() {
      await this.$q.loading.show();
    },
    async page_loading_end() {
      await this.$q.loading.hide();
    },
    async edit_task() {
      try {
        await this.page_loading_ini();
        const start = dayjs(
          `${this.bar2_data.date_ini} ${this.bar2_data.time_ini} +02:00`,
          "DD-MM-YYYY HH:mm Z"
        );
        const end = dayjs(
          `${this.bar2_data.date_ini} ${this.bar2_data.time_fin} +02:00`,
          "DD-MM-YYYY HH:mm Z"
        );
        await this.edit_datas({
          ...this.bar2_data,
          start: start,
          end: end
        })
          .then(async () => {
            this.$q.notify({
              message: "Editado Correctamente"
            });
            await this.page_loading_end();
            this.active_edit_task = false;
            this.bar2 = false;
          })
          .catch(err => {
            console.log(err);
          });
      } catch (e) {
        console.log("edit_task", e);
      }
    },
    async change_active_edit() {
      this.$q
        .dialog({
          title: "Editar",
          message: "Desea editar este registro?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          // console.log('>>>> OK')
          this.active_edit_task = true;
          // this.$q.notify({
          //   message: "Coming"
          // });
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
    async delete_task() {
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
          this.del_load = true;
          await this.delete_datas(this.bar2_data.id)
            .then(async resp_delete => {
              await this.page_loading_ini();
              console.log("resp_delete.data", resp_delete);
              await this.cargar_datas();
              this.$q.notify({
                message: "Eliminado"
              });
              await this.page_loading_end();
              this.del_load = false;
              this.bar2 = false;
              // this.$q.loading.hide();
            })
            .catch(async err => {
              console.log("resp_delete_error", err);
              this.$q.loading.hide();
            });
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
          this.$q.loading.hide();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
          this.$q.loading.hide();
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
          this.$q.loading.hide();
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
    async descargar() {
      await this.page_loading_ini();
      fetch(`${process.env.IMAGEN}generarreporte/1`, {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          id: this.bar2_data.id,
          operario: this.bar2_data.operator,
          temerario: this.bar2_data.processor,
          expediente: this.bar2_data.registration_id,
          cita: dayjs(this.bar2_data.start).format("DD/MM/YYYY HH:mm"),
          asegurado: this.bar2_data.customer,
          direccion: this.bar2_data.address,
          detalles: this.bar2_data.description,
          codigo_postal: this.bar2_data.description,
          start: this.bar2_data.start,
          specialty: this.bar2_data.specialty,
          telf: this.bar2_data.phone,
          importante: this.comment,
          img: this.imagen ? this.imagen : ""
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(async response => response.blob())
        .then(async blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = `${this.bar2_data.registration_id}.pdf`;
          a.click();
          a.remove();
          setTimeout(() => window.URL.revokeObjectURL(url), 100);
          await this.page_loading_end();
        })
        // .then(async resp => {
        //   console.log("generarreporte", resp.data);
        //   const url = `${process.env.IMAGEN}fileserver/${this.bar2_data.registration_id}.pdf`;
        //   const element = document.createElement("a");
        //   element.setAttribute("href", url);
        //   element.setAttribute("target", "_blank");
        //   element.setAttribute("download", `${this.bar2_data.registration_id}`);
        //   element.style.display = "none";
        //   document.body.appendChild(element);
        //
        //   element.click();
        //   document.body.removeChild(element);
        //   this.imagen = "";
        //   await this.page_loading_end();
        // })
        .catch(async err => {
          console.log(err);
          await this.page_loading_end();
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
        let result = [];
        for (let i = 0; i < array.length; i++) {
          console.log("primer for");
          const element = array[i].gtArray;
          function esCereza(fruta) {
            return fruta.registration_id === `${item_find}`;
          }

          if (element.find(esCereza)) {
            result = element.find(esCereza);
            console.log("result", result);
            this.updateTimeLines(result.start, result.end, result);
          } else {
            // console.log("nada");
          }
        }
        for (let i = 0; i < array.length; i++) {
          const element = array[i].gtArray;
          // console.log("element", element)
          function findJson() {
            // console.log("item_zip_code", item_zip_code);
            // console.log(
            //   "new_find",
            //   i,
            //   element.filter(
            //     item =>
            //       item.phone.toLowerCase().indexOf(`${item_zip_code}`) > -1
            //   )
            // );
            // console.log(arg.phone === `${item_zip_code}`);
            const finder = element.filter(
              item =>
                item.address.toLowerCase().indexOf(`${item_zip_code}`) > -1
            );
            if (finder.length > 0) {
              console.log("finder", finder);
              result.push(finder);
            } else {
              // console.log("nothing");
            }
            return element.filter(
              item => item.phone.toLowerCase().indexOf(`${item_zip_code}`) > -1
            );
          }

          if (element.find(findJson)) {
            // result = element.find(findJson);
            element.find(findJson);
            console.log("result_result_result", result);
          } else {
            // console.log("nada");
          }
        }
        console.log("result.length", result.length);
        // console.log(result[0]);
        // console.log(typeof result[0]);
        if (result.length > 0) {
          console.log("if");
          this.result_search = result[0];
          this.status_result_search = true;
          // this.updateTimeLines(result[0].start, result[0].end, result[0]);
        } else {
          console.log("Nothing here");
        }
        // this.updateTimeLines(result.start, result.end, result);
      } else {
        this.$q.notify({
          message: "Campo de busqueda vacio.!"
        });
      }
    },
    async click_and_find(result) {
      console.log("result", result);
      await this.updateTimeLines(result.start, result.end, result);
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
    generic_format_date(time) {
      const fecha = dayjs(time);
      return `${fecha.format("DD-MM-YYYY HH:mm")}`;
    },
    async updateTimeLines(timeA, timeB, item) {
      // window.scrollTo(xCoord, yCoord);
      console.log("item", item.start);
      const fecha = dayjs(item.start);
      console.log("fecha", fecha.format("HH:mm"));
      console.log("asdasda", dayjs(`${item.start}`).get("date"));
      console.log(
        "dayjs",
        dayjs(`${item.start}`, "DD-MM-YYYY HH:mm Z").toString()
      );
      console.log(`#dia${fecha.get("month")}${fecha.get("date")}`);
      try {
        await scroll(`dia${fecha.get("month")}${fecha.get("date")}`);
        // location.href = `#dia${fecha.get('month')}${fecha.get('date')}`;
        this.bar2_data = {
          ...item,
          time_ini: this.formartdatedialog(item.start),
          time_fin: this.formartdatedialog(item.end),
          date_ini: fecha.format("DD-MM-YYYY")
        };
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
      } catch (e) {
        this.bar2_data = {
          ...item,
          time_ini: this.formartdatedialog(item.start),
          time_fin: this.formartdatedialog(item.end),
          date_ini: fecha.format("DD-MM-YYYY")
        };
        this.bar2 = true;
      }
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
    times: "updateData"
    // scrollToY(val) {
    //   this.positionA = { x: val };
    // }
  },
  async created() {
    this.$q.loading.show();
    this.$store.commit("planing/set_leftDrawerOpen", false);
    await this.cargar_datas();
    for (let i = 0; i < 32; i++) {
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
    console.log("this.$route.params", this.$route.params);
    if (this.$route.params.id) {
      console.log("this.$route.params", this.$route.params.id);
      // await this.$router.push("/dia1");
    } else {
      console.log("this.$route.params", this.$route.params.id);
      // await this.$router.push("/dia1");
    }
    this.$q.loading.hide();
  }
};
</script>
