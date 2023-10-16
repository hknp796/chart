<template>
    <div>
        <CanvasJSChart :options="options" :style="styleOptions" @chart-ref="chartInstance" />
    </div>
</template>

<script setup>
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
const chart = null
const timeout = null
const options = {
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
    axisY: {
        valueFormatString: "#,###,.##W"
    },
    toolTip: {
        shared: true,
    },
    // legend: {
    //     cursor: "pointer",
    //     fontColor: "dimGrey",
    //     itemclick: toggleDataSeries
    // },
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
        name: "Building B",
        color: "#FBC02D",
        xValueType: "dateTime",
        yValueFormatString: "#,### watts",
        showInLegend: true,
        legendText: "{name} " + yValue2 + " watts",
        dataPoints: dataPoints2
    }]
}
const styleOptions = {
    width: "100%",
    height: "360px"
}
</script>

<style lang="scss" scoped></style>