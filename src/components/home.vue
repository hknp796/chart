<script>
export default {
  // mounted() {
  //   this.updateInterval = 2000, 
  //   this.initialNumberOfDataPoints = 100
  //   this.dataPoints1 = [], 
  //   this.dataPoints2 = [], 
  //   this.yValue1 = 1650, 
  //   this.yValue2 = 1600;
  //     this.xValue = new Date().getTime() - this.updateInterval * this.initialNumberOfDataPoints;

  //     for(var i = 0; i < this.initialNumberOfDataPoints; i++){
  //       this.yValue1 += Math.round(2 + Math.random() *(-2-2));
  //       this.yValue2 += Math.round(2 + Math.random() *(-2-2));

  //       // pushing the new values
  //       this.dataPoints1.push({
  //         x: this.xValue,
  //         y: this.yValue1
  //       });
  //       this.dataPoints2.push({
  //         x: this.xValue,
  //         y: this.yValue2
  //       });
  //       this.xValue += this.updateInterval;
  //     }

  //     // this.updateChart()
  // },
  data() {
    let updateInterval = 2000, initialNumberOfDataPoints = 100, dataPoints1 = [], dataPoints2 = [], yValue1 = 1650, yValue2 = 1600;
    let xValue = new Date().getTime() - updateInterval * initialNumberOfDataPoints;

    for (var i = 0; i < initialNumberOfDataPoints; i++) {
      yValue1 += Math.round(2 + Math.random() * (-2 - 2));
      yValue2 += Math.round(2 + Math.random() * (-2 - 2));

      // pushing the new values
      dataPoints1.push({
        x: xValue,
        y: yValue1
      });
      dataPoints2.push({
        x: xValue,
        y: yValue2
      });
      xValue += updateInterval;
    }
    return {
      level: 1,
      l2Month: null,
      chart: null,
      timeout: null,
      // dataPoints1: '',
      // dataPoints2: '',
      // yValue1: '',
      // yValue2: '',
      // xValue: '',
      // updateInterval: '',
      dataPoints1: dataPoints1, dataPoints2: dataPoints2, yValue1: yValue1, yValue2: yValue2, xValue: xValue, updateInterval: updateInterval,
      initialNumberOfDataPoints: ' ',
      showBackButton: false,
      buttonStyle: {
        "backgroundColor": "#F25F5C"
      },
      visitorsDrilldownedChartOptions: {
        animationEnabled: true,
        theme: "light2",
        axisY: {
          gridThickness: 0,
          lineThickness: 1
        },
        data: []
      },
      newVSReturningVisitorsOptions: {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "New vs Returning Visitors"
        },
        subtitles: [{
          text: "Click on Any Segment to Drilldown",
          backgroundColor: "#EA5C59",
          fontSize: 16,
          fontColor: "white",
          padding: 5
        }],
        data: []
      },
      options: {
        "New vs Returning Visitors": [{
          type: "pie",
          animationEnabled: true,
          name: "New vs Returning Visitors",
          startAngle: 90,
          cursor: "pointer",
          explodeOnClick: false,
          showInLegend: true,
          legendMarkerType: "square",
          click: this.visitorsChartDrilldownHandler,
          indexLabelPlacement: "inside",
          indexLabelFontColor: "white",
          dataPoints: [
            { y: 551160, name: "New Visitors", color: "#F25F5C", indexLabel: "62.56%" },
            { y: 329840, name: "Returning Visitors", color: "#FFE066", indexLabel: "37.44%" }
          ]
        }],
        "New Visitors": [{
          color: "#F25F5C",
          name: "New Visitors",
          type: "column",
          click: this.thirdDrill,
          dataPoints: [
            { label: "Jan", y: 42600, name: 'New Visitors Jan' },
            { label: "Feb", y: 44960 },
            { label: "Mar", y: 46160 },
            { label: "Apr", y: 48240 },
            { label: "May", y: 48200 },
            { label: "Jun", y: 49600 },
            { label: "Jul", y: 51560 },
            { label: "Aug", y: 49280 },
            { label: "Sep", y: 46800 },
            { label: "Oct", y: 57720 },
            { label: "Nov", y: 59840 },
            { label: "Dec", y: 54400 }
          ]
        }],
        "Returning Visitors": [{
          color: "#FFE066",
          name: "Returning Visitors",
          type: "column",
          dataPoints: [
            { label: "Jan", y: 21800 },
            { label: "Feb", y: 25040 },
            { label: "Mar", y: 23840 },
            { label: "Apr", y: 24760 },
            { label: "May", y: 25800 },
            { label: "Jun", y: 26400 },
            { label: "Jul", y: 27440 },
            { label: "Aug", y: 29720 },
            { label: "Sep", y: 29200 },
            { label: "Oct", y: 31280 },
            { label: "Nov", y: 33160 },
            { label: "Dec", y: 31400 }
          ]
        }],

        "New Visitors Jan": [{
          color: "#0AF",
          name: "New Visitors Jan",
          click: this.dynamic,

          type: "line",
          dataPoints: [
            { label: "Week 1", y: 42600, name: 'dynamic' },
            { label: "Week 2", y: 44960 },
            { label: "Week 3", y: 46160 },
            { label: "Week 4", y: 46160 },
          ]
        }],
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          fontColor: "dimGrey",
          itemclick: this.toggleDataSeries
        },
        // 'dynamic': [{
        //   type: "spline",
        //   name: "Building A",
        //   color: "#00796B",
        //   xValueType: "dateTime",
        //   yValueFormatString: "#,### watts",
        //   xValueFormatString: "hh:mm:ss TT",
        //   showInLegend: true,
        //   legendText: "{name} " + this.yValue1 + " watts",
        //   dataPoints: this.dataPoints1
        // },
        // ]
      },
      styleOptions: {
        width: "100%",
        height: "360px"
      }
    }
  },
  methods: {
    visitorsChartDrilldownHandler(e) {
      ++this.level
      console.log(e);
      this.chart.options = this.visitorsDrilldownedChartOptions;
      this.chart.options.data = this.options[e.dataPoint.name];
      this.buttonStyle["backgroundColor"] = this.options[e.dataPoint.name][0].color;
      this.chart.options.title = { text: e.dataPoint.name };
      this.chart.render();
      this.showBackButton = true;
    },
    handleClick(e) {
      if (--this.level === 1) {
        this.chart.options = this.newVSReturningVisitorsOptions;
        this.chart.options.data = this.options["New vs Returning Visitors"];
        this.showBackButton = false;
      }
      else {
        this.chart.options = this.newVSReturningVisitorsOptions;
        this.chart.options.data = this.options[this.l2Month];
        this.showBackButton = true;
      }
      this.chart.render();
    },
    chartRef(chartInstance) {
      this.chart = chartInstance;
      this.chart.options = this.newVSReturningVisitorsOptions;
      this.timeout = setTimeout(this.updateChart, this.updateInterval);

      this.chart.options.data = this.options["New vs Returning Visitors"];

      this.chart.render();
    },
    thirdDrill(e) {
      ++this.level
      this.l2Month = e.dataPoint.name
      this.chart.options = this.visitorsDrilldownedChartOptions;
      this.chart.options.data = this.options[this.l2Month]
      this.buttonStyle["backgroundColor"] = this.options[this.l2Month][0].color;
      this.chart.render();
      this.showBackButton = true;
    },
    dynamic(e) {
      this.l2Month = e.dataPoint.name
      this.chart.options = this.visitorsDrilldownedChartOptions;
      this.chart.options.data = [{
          type: "spline",
          name: "Building A",
          color: "#00796B",
          xValueType: "dateTime",
          yValueFormatString: "#,### watts",
          xValueFormatString: "hh:mm:ss TT",
          showInLegend: true,
          legendText: "{name} " + this.yValue1 + " watts",
          dataPoints: this.dataPoints1
        },
        ]
      this.buttonStyle["backgroundColor"] = this.options[this.l2Month][0].color;
      this.timeout = setTimeout(this.updateChart, this.updateInterval);

      this.chart.render();
      this.showBackButton = true;
    },
    // toggleDataSeries(e) {
    //   if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    //     e.dataSeries.visible = false;
    //   }
    //   else {
    //     e.dataSeries.visible = true;
    //   }
    //   e.chart.render();
    // },
    updateChart() {
      this.xValue += this.updateInterval;
      // adding random value
      this.yValue1 += Math.round(2 + Math.random() * (-2 - 2));
      this.yValue2 += Math.round(2 + Math.random() * (-2 - 2));
      // pushing the new values
      this.dataPoints1.push({
        x: this.xValue,
        y: this.yValue1
      });
      this.dataPoints2.push({
        x: this.xValue,
        y: this.yValue2
      });

      // console.log(this.dataPoints1,'da');
      // this.chart.options.data.dataPoints = this.dataPoints1 


      // updating legend text with  updated with y Value 
      // this.chart.options.data[0].legendText = "Building A - " + this.yValue1 + " watts";
      // this.chart.options.data[1].legendText = " Building B - " + this.yValue2 + " watts";
      this.chart.render();
      this.timeout = setTimeout(this.updateChart, this.updateInterval);
    },
  },
  unmounted() {
    clearTimeout(this.timeout);
  }
}
</script>
<template>
  <div class="container">
    <CanvasJSChart :options="newVSReturningVisitorsOptions" @chart-ref="chartRef" :styles="styleOptions" />
    <button class="back-button" v-if="showBackButton" v-on:click="handleClick" :style="buttonStyle">&lt; Back</button>
  </div>
</template> 