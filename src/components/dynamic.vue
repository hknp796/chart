<script>
  export default {
    data() {
 
      let updateInterval = 2000, initialNumberOfDataPoints = 100, dataPoints1 = [], dataPoints2 = [], yValue1 = 1650, yValue2 = 1600;
      let xValue = new Date().getTime() - updateInterval * initialNumberOfDataPoints;
 
      for(var i = 0; i < initialNumberOfDataPoints; i++){
        yValue1 += Math.round(2 + Math.random() *(-2-2));
        yValue2 += Math.round(2 + Math.random() *(-2-2));
 
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
        chart: null,
        timeout: null,
        dataPoints1: dataPoints1, dataPoints2: dataPoints2, yValue1: yValue1, yValue2: yValue2, xValue: xValue, updateInterval: updateInterval,
        options: {
          zoomEnabled: true,
          exportEnabled: true,
          theme: "light2",
          title: {
            text: "Live Power Consumption of 2 Buildings"
          },
          subtitles: [{
            text: "Chart updates every 2seconds"
          }],
          axisX: {
            valueFormatString: "H:mm:ss TT"
          },
          axisY:{
            valueFormatString: "#,###,.##W"
          }, 
          toolTip: {
            shared: true
          },
          legend: {
            cursor:"pointer",
            fontColor: "dimGrey",
            itemclick : this.toggleDataSeries
          },
          data: [{ 
              type: "spline",
              name: "Building A",
              color: "#00796B",
              xValueType: "dateTime",
              yValueFormatString: "#,### watts",
              xValueFormatString: "hh:mm:ss TT",
              showInLegend: true,
              legendText: "{name} " + yValue1 + " watts",
              dataPoints: dataPoints1
            },
            {				
              type: "spline",
              name: "Building B" ,
              color: "#FBC02D",
              xValueType: "dateTime",
              yValueFormatString: "#,### watts",
              showInLegend: true,
              legendText: "{name} " + yValue2 + " watts",
              dataPoints: dataPoints2
          }]
        },
        styleOptions: {
          width: "100%",
          height: "360px"
        },
        
      }
    },
    methods: {
      toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        }
        else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
      updateChart() {
        this.xValue += this.updateInterval;
        // adding random value
        this.yValue1 += Math.round(2 + Math.random() *(-2-2));
        this.yValue2 += Math.round(2 + Math.random() *(-2-2));
 
        // pushing the new values
        this.dataPoints1.push({
          x: this.xValue,
          y: this.yValue1
        });
        this.dataPoints2.push({
          x: this.xValue,
          y: this.yValue2
        });
 
        // updating legend text with  updated with y Value 
        this.chart.options.data[0].legendText = "Building A - " + this.yValue1 + " watts";
        this.chart.options.data[1].legendText = " Building B - " + this.yValue2+ " watts"; 
        this.chart.render();
        this.timeout = setTimeout(this.updateChart, this.updateInterval);
      },
      chartInstance(chart) {
        this.chart = chart;
        console.log(this.updateInterval)
        this.timeout = setTimeout(this.updateChart, this.updateInterval);
      }
    },
    unmounted() {
      clearTimeout(this.timeout);
    }
  }
</script>
  
<template>
    <CanvasJSChart :options="options" :style="styleOptions" @chart-ref="chartInstance"/>
</template>             