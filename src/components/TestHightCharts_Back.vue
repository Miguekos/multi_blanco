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
              :options="empleados_group"
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
              label="Outlined"
            />
          </div>
          <div class="col-xs-12 col-md-2 q-pa-xs">
            <q-input
              outlined
              dense
              v-model="time_ini"
              mask="time"
              :rules="['time']"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="time_ini">
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
            <q-input
              outlined
              dense
              v-model="time_fin"
              mask="time"
              :rules="['time']"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="time_fin">
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
            <q-btn @click="addTask" label="addTask"></q-btn>
            <q-btn @click="agregar" label="agregar"></q-btn>
          </div>
        </div>
      </div>
      <div class="col-12">
        <highcharts
          :constructor-type="'ganttChart'"
          ref="lineCharts"
          :callback="funcionStart"
          :options="chartOpti"
          :updateArgs="updateArgs"
        ></highcharts>
      </div>
      <div id="button-container">
        <button id="pdf"><i class="fa fa-download"></i> Download PDF</button>
      </div>
    </div>

    <!--  {{ chartOptions.yAxis }}-->
    <!--  <q-btn label="Agregar" @click="addTask">-->
    <!--  </q-btn>-->
    <!--  <div class="button-row">-->
    <!--    <button id="btnAddTask">Add</button>-->
    <!--    <button id="btnCancelAddTask">Cancel</button>-->
    <!--  </div>-->
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

var today = new Date(),
  day = 1000 * 60 * 60 * 24,
  each = Highcharts.each,
  reduce = Highcharts.reduce,
  // btnShowDialog = document.getElementById('btnShowDialog'),
  // btnRemoveTask = document.getElementById('btnRemoveSelected'),
  // btnAddTask = document.getElementById('btnAddTask'),
  // btnCancelAddTask = document.getElementById('btnCancelAddTask'),
  // addTaskDialog = document.getElementById('addTaskDialog'),
  // inputName = document.getElementById('inputName'),
  // selectDepartment = document.getElementById('selectDepartment'),
  // selectDependency = document.getElementById('selectDependency'),
  // chkMilestone = document.getElementById('chkMilestone'),
  isAddingTask = false;

console.log("dayday", day / 10);
// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();

function updateRemoveButtonStatus() {
  const chart = this.series;
  console.log("ffdfdfdf", chart);
  // console.log("fdgdgdgd", chart.getSelectedPoints().length)
  // Run in a timeout to allow the select to update
  setTimeout(function() {
    // btnRemoveTask.disabled = !chart.getSelectedPoints().length ||
    //   isAddingTask;
  }, 10);
}

// btnRemoveTask.onclick = function () {
//   var points = chart.getSelectedPoints();
//   each(points, function (point) {
//     point.remove();
//   });
// };

// btnShowDialog.onclick = function () {
//   // Update dependency list
//   var depInnerHTML = '<option value=""></option>';
//   each(chart.series[0].points, function (point) {
//     depInnerHTML += '<option value="' + point.id + '">' + point.name +
//       ' </option>';
//   });
//   selectDependency.innerHTML = depInnerHTML;
//
//   // Show dialog by removing "hidden" class
//   addTaskDialog.className = 'overlay';
//   isAddingTask = true;
//
//   // Focus name field
//   inputName.value = '';
//   inputName.focus();
// };

// btnAddTask.onclick = function () {
//   // Get values from dialog
//   var series = chart.series[0],
//     name = inputName.value,
//     undef,
//     dependency = chart.get(
//       selectDependency.options[selectDependency.selectedIndex].value
//     ),
//     y = parseInt(
//       selectDepartment.options[selectDepartment.selectedIndex].value,
//       10
//     ),
//     maxEnd = reduce(series.points, function (acc, point) {
//       return point.y === y && point.end ? Math.max(acc, point.end) : acc;
//     }, 0),
//     milestone = chkMilestone.checked || undef;
//
//   // Empty category
//   if (maxEnd === 0) {
//     maxEnd = today;
//   }
//
//   // Add the point
//   series.addPoint({
//     start: maxEnd + (milestone ? day : 0),
//     end: milestone ? undef : maxEnd + day,
//     y: y,
//     name: name,
//     dependency: dependency ? dependency.id : undef,
//     milestone: milestone
//   });
//
//   // Hide dialog
//   addTaskDialog.className += ' hidden';
//   isAddingTask = false;
// };

// btnCancelAddTask.onclick = function () {
//   // Hide dialog
//   addTaskDialog.className += ' hidden';
//   isAddingTask = false;
// };

// btnRemoveTask.onclick = function () {
//   var points = chart.getSelectedPoints();
//   each(points, function (point) {
//     point.remove();
//   });
// };

// document.getElementById('pdf').addEventListener('click', function () {
//   Highcharts.charts[0].exportChart({
//     type: 'application/pdf'
//   });
// });

console.log("asd", today + 2 * day);

export default {
  name: "TestHightCharts",
  computed: {
    chartOptions() {
      return {
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
        chart: {
          spacing: [10, 10, 15, 10]
          // spacingLeft: 2,
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
                select: updateRemoveButtonStatus,
                unselect: this.unseleccion,
                remove: this.remove_task,
                update: this.remove_task
              }
            }
          }
        },
        yAxis: {
          type: "category",
          categories: ["Miguel R", "Alex F", "Juan B"]
        },
        xAxis: {
          currentDateIndicator: true,
          min: this.formatFeha("2021-07-11", "07:00"),
          max: this.formatFeha("2021-07-11", "18:00")
        },
        tooltip: {
          xDateFormat: "%a %b %d, %H:%M",
          outside: true
        },
        series: []
        // series: this.chartOpti.series
      };
    }
  },
  data() {
    return {
      id_registro: "",
      time_ini: "10:00",
      time_fin: "12:00",
      updateArgs: [true, true, { duration: 1000 }],
      empleados_group: ["Miguel R", "Alex F", "Juan B"],
      empleados_select: [],
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      series: [
        {
          type: "gantt",
          name: "Project 1",
          data: [
            // {
            //   start: this.formatFeha("2021-07-11", "07:00"),
            //   end: this.formatFeha("2021-07-11", "08:00"),
            //   name: 'Prototype',
            //   // id: 'prototype',
            //   y: 0,
            //   color: '#b2d431',
            //   colorIndex: 1
            // },
            // {
            //   start: this.formatFeha("2021-07-11", "08:00"),
            //   end: this.formatFeha("2021-07-11", "09:00"),
            //   name: 'Testing',
            //   // dependency: 'prototype',
            //   y: 0
            // }, {
            //   start: this.formatFeha("2021-07-11", "13:00"),
            //   end: this.formatFeha("2021-07-11", "15:00"),
            //   name: 'Testing',
            //   // dependency: 'prototype',
            //   y: 0
            // }, {
            //   start: this.formatFeha("2021-07-11", "10:00"),
            //   end: this.formatFeha("2021-07-11", "11:00"),
            //   name: 'Product pages',
            //   y: 1
            // }, {
            //   start: this.formatFeha("2021-07-11", "12:00"),
            //   end: this.formatFeha("2021-07-11", "14:00"),
            //   name: 'Newsletter',
            //   y: 1
            // }, {
            //   start: this.formatFeha("2021-07-11", "15:00"),
            //   end: this.formatFeha("2021-07-11", "16:00"),
            //   name: 'Licensing',
            //   // id: 'testing',
            //   y: 2
            // }, {
            //   start: this.formatFeha("2021-07-11", "7:00"),
            //   end: this.formatFeha("2021-07-11", "8:00"),
            //   name: 'Publish',
            //   // dependency: 'testing',
            //   y: 2
            // }
          ]
        }
      ],
      chartOpti: {
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
        chart: {
          spacing: [10, 10, 15, 10]
          // spacingLeft: 2,
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
                select: updateRemoveButtonStatus,
                unselect: this.unseleccion,
                remove: this.remove_task,
                update: this.remove_task
              }
            }
          }
        },
        yAxis: {
          type: "category",
          categories: ["Miguel R", "Alex F", "Juan B"]
        },
        xAxis: {
          currentDateIndicator: true,
          min: this.formatFeha("2021-07-11", "07:00"),
          max: this.formatFeha("2021-07-11", "18:00")
        },
        tooltip: {
          xDateFormat: "%a %b %d, %H:%M",
          outside: true
        },
        series: []
      }
    };
  },
  methods: {
    load() {
      let lineCharts = this.$refs.lineCharts;
      // lineCharts.delegateMethod('showLoading', 'Loading...');
      console.log("lineCharts", lineCharts);
      setTimeout(() => {
        lineCharts.addSeries(this.series);
        // lineCharts.hideLoading();
      }, 2000);
    },
    funcionStart() {
      console.log("funcionStart");
    },
    seleccionar() {
      console.log("seleccionar");
    },
    unseleccion() {
      console.log("unseleccion");
    },
    remove_task() {
      console.log("remove_task(");
    },
    formatFeha(fecha, hora) {
      // var date = new Date(`${fecha} ${hora}`)
      // var fehcaProcess = date.setData(date.getHours())
      // console.log(fehcaProcess.getTime())
      // return fehcaProcess
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
      // Get values from dialog
      // console.log("addTask")
      // let data = []
      // const series = this.chartOptions.series[0].data;
      // for (let index = 0; index < data.length; index++) {
      //   const element = series[index]
      //   console.log("element", element)
      // }
      // data.push({
      //   start: this.formatFeha("2021-07-11", this.time_ini),
      //   end: this.formatFeha("2021-07-11", this.time_ini),
      //   y: 0,
      //   name: this.id_registro,
      //   color: '#931a1a',
      //   colorIndex: 1,
      //   // completed: {
      //   //   amount: 1,
      //     // fill:
      //   // }
      //   // completed: 0.25
      //   // dependency: dependency ? dependency.id : undef,
      //   // milestone: milestone
      // })
      const asd = {
        start: this.formatFeha("2021-07-11", `${this.time_ini}`),
        end: this.formatFeha("2021-07-11", `${this.time_fin}`),
        name: "Prototype",
        // id: 'prototype',
        y: 0,
        color: "#b2d431",
        colorIndex: 1
      };
      // console.log("data", data)
      this.series[0].data.push(asd);
      // console.log("series", series)
      // const series = this.chartOptions.chart;
      // console.log("seriesNew", seriesNew)
      // console.log("addTask",series)
      // console.log("addtask", JSON.stringify(series))
      // series.addPoint({
      //     start: this.formatFeha("2021-07-11", this.time_ini),
      //     end: this.formatFeha("2021-07-11", this.time_ini),
      //     y: 0,
      //     name: this.id_registro,
      //     // dependency: dependency ? dependency.id : undef,
      //     // milestone: milestone
      // })
      // this.chartOptions.series[0].data.push({
      //   start: this.formatFeha("2021-07-11", this.time_ini),
      //   end: this.formatFeha("2021-07-11", this.time_ini),
      //   y: 0,
      //   name: this.id_registro,
      //   // dependency: dependency ? dependency.id : undef,
      //   // milestone: milestone
      // });
    }
  },
  async created() {
    this.chartOptions.yAxis.categories = this.empleados_group;
  }
};
</script>
