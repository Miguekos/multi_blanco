<template>
  <div class="q-pa-lg">
    <!--  <highcharts :options="chartOptions"></highcharts>-->
    <div class="row">
      <div class="col-12 q-pa-xs">
        <div class="row">
          <div class="col-xs-12 col-md-4 q-pa-xs">
            <q-select
              stack-label
              dense
              outlined
              v-model="empleados_select"
              :options="options_employed"
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
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date_ini" mask="DD-MM-YYYY HH:mm">
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="date_ini"
                      mask="DD-MM-YYYY HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
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
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date_fin" mask="DD-MM-YYYY HH:mm">
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="date_fin"
                      mask="DD-MM-YYYY HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 text-center">
            <q-btn @click="addTask" label="agregar"></q-btn>
            <q-btn label="Recargar"></q-btn>
          </div>
        </div>
      </div>
      <div class="col-12">
        <highcharts
          :constructor-type="'ganttChart'"
          ref="lineCharts"
          :callback="funcionStart"
          :options="chartOptions"
          :updateArgs="updateArgs"
        ></highcharts>
      </div>
      <!--      {{empleados_select}}-->
      <!--      <div id="button-container">-->
      <!--        <button id="pdf">-->
      <!--          <i class="fa fa-download"></i> Download PDF-->
      <!--        </button>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import ganttInit from "highcharts/modules/gantt";
import draggable from "highcharts/modules/draggable-points";

ganttInit(Highcharts);
draggable(Highcharts);
exportingInit(Highcharts);

Highcharts.setOptions({
  colors: ["#56A419", "#004887", "#f77d02", "#02f7ca", "#f7027c"],
  chart: {
    style: {
      fontFamily: "Comic Sans MS"
    }
  },
  lang: {
    contextButtonTitle: "asdasdads",
    weekdays: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ],
    shortMonths: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Julio",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }
  // options here
});

export default {
  name: "TestHightCharts",
  computed: {
    chartOptions() {
      return {
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        },
        colors: [
          "#2f7ed8",
          "#0d233a",
          "#8bbc21",
          "#910000",
          "#1aadce",
          "#492970",
          "#f28f43",
          "#77a1e5",
          "#c42525",
          "#a6c96a"
        ],
        scrollbar: {
          enabled: true
        },
        // rangeSelector: {
        //   enabled: true,
        //   selected: 0
        // },
        chart: {
          spacing: [10, 10, 15, 10]
          // spacingLeft: 1,
          // styledMode: true
        },
        title: {
          text: "Control de tareas"
        },
        subtitle: {
          text: "Orden por dias"
        },
        plotOptions: {
          series: {
            animation: true, // Do not animate dependency connectors
            dragDrop: {
              draggableX: false,
              draggableY: false,
              dragMinY: 0,
              dragMaxY: 2,
              // dragPrecisionX: day / 10 // Snap to eight hours
              dragPrecisionX: 3600000 // Snap to eight hours
            },
            dataLabels: {
              // color: '#931a1a',
              enabled: true,
              format: "{point.name}",
              style: {
                cursor: "default",
                pointerEvents: "none"
              }
            },
            allowPointSelect: true,
            point: {
              events: {
                select: this.seleccionar,
                unselect: this.unseleccion,
                remove: this.remove_task,
                update: this.remove_task
              }
            }
          }
        },
        navigator: {
          enabled: true,
          liveRedraw: true,
          series: {
            type: "gantt"
            // pointPlacement: 0.5,
            // pointPadding: 0.25
          },
          yAxis: {
            min: 0,
            max: 3,
            reversed: true,
            categories: []
          }
        },
        yAxis: {
          type: "category",
          categories: this.categories,
          // grid: {
          //   borderColor: '#2f7ed8',
          //   borderWidth: 1,
          //   cellHeight: 160
          // },
          // staticScale: 62,
          // columns: 1,
          // enabled: true,
          min: 0,
          max: this.cant_categories - 1
        },
        // xAxis: {
        // uniqueNames: true
        // visible: true,
        // startOfWeek: 1,
        // title: {
        // text : "asd",
        // x: 0,
        // y: 0
        // },
        // labels:{
        //   align: 'center'
        // },
        // currentDateIndicator: true,
        // currentDateIndicator: {
        //   color: "#f10202",
        //   dashStyle: "solid",
        //   id: 1,
        //   text: "faskldjfakl",
        //   textAlign: 'center',
        //   label: {
        //     align: 'center',
        //     format: "%a, %b %d %Y, %H:%M"
        //   }
        // },
        // grid: {
        //   borderColor: '#2f7ed8',
        //   borderWidth: 1,
        //   cellHeight: 40
        // },
        // min: this.formatFeha("2021-07-11", "07:00"),
        // max: this.formatFeha("2021-07-11", "18:00")
        // },
        // tooltip: {
        //   xDateFormat: '%a %b %d, %H:%M',
        // outside: true
        // },
        // series: []
        series: [
          {
            type: "gantt",
            name: "Project 1",
            data: this.series_data
          }
        ]
      };
    }
  },
  data() {
    return {
      date_ini: "12-07-2021 10:00",
      date_fin: "13-07-2021 10:00",
      cant_categories: null,
      id_registro: "",
      time_ini: "10:00",
      time_fin: "12:00",
      updateArgs: [true, true, { duration: 1000 }],
      options_employed: [],
      empleados_group: [
        "Miguel R",
        "Alex F",
        "Juan B",
        "Carlos F",
        "David H",
        "Diego P"
      ],
      categories: [],
      empleados_select: [],
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      series_data: [
        // {
        //   start: this.formatFeha("2021-07-11", "07:00"),
        //   end: this.formatFeha("2021-07-11", "08:00"),
        //   name: 'Prototype',
        //   // id: 'prototype',
        //   y: 4,
        //   color: '#b2d431',
        //   colorIndex: 1
        // }
      ],
      series: [
        {
          type: "gantt",
          name: "Project 1",
          data: []
        }
      ]
    };
  },
  methods: {
    funcionStart() {
      console.log("funcionStart");
    },
    funcionUpdate() {
      console.log("funcionUpdate");
    },
    seleccionar(val) {
      console.log("seleccionar", val);
      console.log("seleccionar", val.target.options);
    },
    unseleccion() {
      console.log("unseleccion");
    },
    remove_task() {
      console.log("remove_task(");
    },
    newFormatDate(val) {
      var dateString = val,
        dateTimeParts = dateString.split(" "),
        timeParts = dateTimeParts[1].split(":"),
        dateParts = dateTimeParts[0].split("-"),
        date;

      date = new Date(
        dateParts[2],
        parseInt(dateParts[1], 10) - 1,
        dateParts[0],
        timeParts[0],
        timeParts[1]
      );

      console.log(date.getTime()); //1379426880000
      console.log(date); //Tue Sep 17 2013 10:08:00 GMT-0400
      return date.getTime();
    },
    formatFeha(fecha, hora) {
      Date.prototype.horas = function(horas) {
        const date = new Date(`${fecha} ${hora}`);
        date.setHours(date.getHours() - horas);
        return date;
      };
      const date = new Date();
      // console.log("fechaLista", fechaLista);
      return date.horas(5).getTime();
    },
    agregar() {
      this.chartOpti.series = this.series;
    },
    addTask() {
      this.series_data.push({
        start: this.newFormatDate(`${this.date_ini}`),
        end: this.newFormatDate(`${this.date_fin}`),
        name: this.id_registro,
        // id: 'prototype',
        y: this.empleados_select
        // color: '#b2d431',
        // colorIndex: 1
      });
    }
  },
  async created() {
    // this.chartOptions.yAxis.categories = this.empleados_group
    this.categories = this.empleados_group;
    this.cant_categories = this.empleados_group.length;
    let employed = [];
    for (let i = 0; i < this.cant_categories; i++) {
      const element = this.empleados_group[i];
      employed.push({
        id: i,
        name: element
      });
      // console.log(element)
    }
    this.options_employed = employed;
  }
};
</script>
