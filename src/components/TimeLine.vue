<template>
  <div>
    <apex-chart
      type="rangeBar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
    <!--    <apex-chart-->
    <!--      type="rangeBar"-->
    <!--      height="255"-->
    <!--      :options="chartOptions"-->
    <!--      :series="series"-->
    <!--    ></apex-chart>-->
  </div>
</template>

<script>
import moment from "moment";
import { date } from "quasar";
let timeStamp = Date.now();
const { addToDate } = date;
let formattedString = date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");
export default {
  name: "TimeLine",
  data() {
    return {
      fechaActual: "2021-07-11",
      series: [
        {
          name: "",
          data: [
            {
              x: "",
              y: [
                this.formatFeha("2021-07-11", "07:00"),
                this.formatFeha("2021-07-11", "17:00")
              ]
            }
          ]
        },
        {
          name: "1234",
          data: [
            {
              x: "Miguel Rodriguez",
              y: [
                this.formatFeha("2021-07-11", "12:00"),
                this.formatFeha("2021-07-11", "15:00")
              ],
              fillColor: "#775DD0"
            }
          ]
        },
        {
          name: "32423",
          data: [
            {
              x: "Miguel Rodriguez",
              y: [
                this.formatFeha("2021-07-11", "07:00"),
                this.formatFeha("2021-07-11", "09:00")
              ]
              // fillColor: '#775DD1'
            }
          ]
        },
        {
          name: "32423",
          data: [
            {
              x: "Axel R",
              y: [
                this.formatFeha("2021-07-11", "11:00"),
                this.formatFeha("2021-07-11", "12:00")
              ]
            }
          ]
        },
        {
          name: "32423",
          data: [
            {
              x: "Axel R",
              y: [
                this.formatFeha("2021-07-11", "15:00"),
                this.formatFeha("2021-07-11", "17:00")
              ]
            }
          ]
        },
        {
          name: "32423",
          data: [
            {
              x: "Alex Ruiz",
              y: [
                this.formatFeha("2021-07-11", "15:00"),
                this.formatFeha("2021-07-11", "17:00")
              ]
            }
          ]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "rangeBar"
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "90%",
            rangeBarGroupRows: true
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            var a = moment(val[0]);
            var b = moment(val[1]);
            var diff = b.diff(a, "hours");
            return diff + (diff > 0 ? " hours" : " day");
          },
          // formatter: function(val, opts) {
          // var label = opts.w.globals.labels[opts.seriesIndex]
          // var label = opts.w.config.series[opts.seriesIndex].name
          // var a = moment(val[0])
          // var b = moment(val[1])
          // var diff = b.diff(a, 'days')
          // console.log("label", opts.seriesIndex)
          // return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
          // return opts.seriesIndex
          // },
          style: {
            colors: ["#f3f4f5", "#fff"]
          }
        },
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#3F51B5",
          "#546E7A",
          "#D4526E",
          "#8D5B4C",
          "#F86624",
          "#D7263D",
          "#1B998B",
          "#2E294E",
          "#F46036",
          "#E2C044"
        ],
        fill: {
          type: "solid",
          opacity: 0.6
        },
        yaxis: {
          show: true
        },
        grid: {
          row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1
          }
        },
        xaxis: {
          type: "datetime"
        },
        legend: {
          // position: 'right'
        },
        tooltip: {
          custom: function(opts) {
            // console.log("opts", opts)
            const fromYear = new Date(opts.y1).getFullYear();
            const toYear = new Date(opts.y2).getFullYear();
            const values = opts.ctx.rangeBar.getTooltipValues(opts);
            // console.log(values)
            return "werw";
          }
        }
      }
    };
  },
  methods: {
    formatFeha(fecha, hora) {
      // var date = new Date(`${fecha} ${hora}`)
      // var fehcaProcess = date.setData(date.getHours())
      // console.log(fehcaProcess.getTime())
      // return fehcaProcess
      Date.prototype.horas = function(horas) {
        var date = new Date(`${fecha} ${hora}`);
        date.setHours(date.getHours() - horas);
        return date;
      };

      var date = new Date();
      var fechaLista = date.horas(5).getTime();
      // console.log("fechaLista", fechaLista);
      return fechaLista;
    }
  },
  created() {
    console.log(new Date("2021-07-11 12:00").getTime());
    console.log(timeStamp);
    // let newDate = addToDate(new Date(), { days: 7, month: 1 })
    let newDate = date.buildDate({
      year: 2010,
      date: 5,
      hours: 15,
      milliseconds: 123
    });
    console.log("newDate", newDate);
  }
};
</script>

<style scoped></style>
