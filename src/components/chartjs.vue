<template>
    <button type="button" @click="toggleBubbleSize">clicke</button>
    {{ scatterData }}
    <div>
        <component ref="myChart" v-bind:is="chartType" :data="scatterData" :options="options" @click="onClick"></component>
        <!-- <Chart  :type="chartType"  :data="chartData" :options="options" @click="onClick" /> -->
    </div>
</template>
  
<script  setup>
import { ref } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    ArcElement,
    PointElement
    // InteractionItem,
} from 'chart.js';
import {
    // ChartComponentRef,
    Chart,
    Line,
    Bar,
    Pie,
    Scatter,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,

} from 'vue-chartjs';
//   import * as chartConfig from './chartConfig.js';
// import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement
);
let chartType = ref(Scatter)
let chartData = ref('')
const barData = ref({
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
    ]
})
chartData.value = barData.value
const pieData = ref({
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
        }
    ]
})
//     chartData.value = pieData

const scatterData = ref({
    datasets: [
        {
            label: 'Scatter Dataset 1',
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: [
                {
                    x: -2,
                    y: 4,
                    r: 5,
                    clicked: false,
                },
                {
                    x: -1,
                    y: 1,
                    clicked: false,
                    r: 5
                },
                {
                    x: 0,
                    y: 0,
                    r: 10,
                    clicked: false,
                },
                {
                    x: 1,
                    y: 1,
                    clicked: false,
                    r: 5
                },
                {
                    x: 2,
                    y: 4,
                    clicked: false,
                    r: 10
                }
            ]
            ,
            hidden: false
            // pointRadius: [5, 5, 5, 5],
        },
        {
            label: 'Scatter Dataset 2',
            fill: false,
            borderColor: '#7acbf9',
            backgroundColor: '#7acbf9',
            data: [
                {
                    x: -2,
                    y: -4
                },
                {
                    x: -1,
                    y: -1
                },
                {
                    x: 0,
                    y: 1
                },
                {
                    x: 1,
                    y: -1
                },
                {
                    x: 2,
                    y: -4
                }
            ],
            hidden: false,
        },
        // {
        //     label: 'Scatter Dataset 3',
        //     fill: false,
        //     borderColor: 'green',
        //     backgroundColor: '#7acbf9',
        //     data: [
        //         {
        //             x: -3,
        //             y: -5
        //         },
        //         {
        //             x: -2,
        //             y: -2
        //         },
        //         {
        //             x: 1,
        //             y: 2
        //         },
        //         {
        //             x: 0,
        //             y: 1
        //         },
        //         {
        //             x: 3,
        //             y: -5
        //         }
        //     ]
        // },
        // {
        //     label: 'Scatter Dataset 4',
        //     fill: false,
        //     borderColor: 'red',
        //     backgroundColor: '#7acbf9',
        //     data: [
        //         {
        //             x: -5,
        //             y: -7
        //         },
        //         {
        //             x: -3,
        //             y: -3
        //         },
        //         {
        //             x: 3,
        //             y: 4
        //         },
        //         {
        //             x: 4,
        //             y: -4
        //         },
        //         {
        //             x: 7,
        //             y: -5
        //         }
        //     ]
        // }
    ]
})

const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            // onClick: newLegendClickHandler,
            position: 'right'
        },
        // tooltip: {
        //     enabled: true,
        //     mode: 'index',
        //     intersect: false,
        //     callbacks: {
        //         title: function (context) {
        //             // Customize the tooltip title
        //             return 'Custom Title: ' + context[0].label;
        //         },
        //         label: function (context) {
        //             // Customize the tooltip label
        //             return 'Custom Value: ' + context.formattedValue + 'MK';
        //         },
        //         labelColor: function () {
        //             return {
        //                 backgroundColor: 'red'
        //             }
        //         }
        //     },
        // },
    }
})

// const datasetAtEvent = (dataset: InteractionItem[]) => {
//     if (!dataset.length) return;

//     const datasetIndex = dataset[0].datasetIndex;

//     console.log('dataset', data.datasets[datasetIndex].label);
// };

// const elementAtEvent = (element: InteractionItem[]) => {
//     if (!element.length) return;

//     const { datasetIndex, index } = element[0];

//     console.log(
//         'element',
//         data.labels[index],
//         data.datasets[datasetIndex].data[index]
//     );
// };

// const elementsAtEvent = (elements: InteractionItem[]) => {
//     if (!elements.length) return;

//     console.log('elements', elements);

// };

// const chartRef = ref(null);
const myChart = ref()
const onClick = (event) => {
    // options.type = 'bar'
    chartType.value = Scatter
    chartData.value = scatterData.value
    // console.log(chartRef, 'event');
    // const {
    //     value: { chart },
    // } = chartRef;

    // if (!chart) {
    //   return;
    // }

    // datasetAtEvent(getDatasetAtEvent(chart, event));
    // elementAtEvent(getElementAtEvent(chart, event));
    // elementsAtEvent(getElementsAtEvent(chart, event));
};
function newLegendClickHandler(e, legendItem, legend) {
    console.log(legend,'chart');
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    console.log(legendItem.hidden, 'dd');
    if (ci.isDatasetVisible(index)) {
        // ci.show(index);
        legendItem.hidden = true;
    }
    console.log(scatterData.value.datasets[0]);
    scatterData.value.datasets[0].data =
        [
            {
                x: -5,
                y: -7
            },
            {
                x: -3,
                y: -3
            },
            {
                x: 3,
                y: 4
            },
            {
                x: 4,
                y: -4
            },
            {
                x: 7,
                y: -5
            }
        ]
    // const index = legendItem.datasetIndex;
    // const type = legend.chart.config.type;
    // let ci = legend.chart;
    //     legendItem.hidden = true
    // console.log(legendItem);
    //     // console.log(scatterData.value.datasets);
    // for (let i = 0; i < scatterData.value.datasets.length; i++) {
    //     if (i === index) {
    //         ci.getDatasetMeta(0).hidden = true
    //     ci.update()

    //         // console.log(scatterData.value.datasets[index].hidden);
    //     }
    // }
    // console.log(myChart.value);
    // if (index > 1) {
    //     // Do the original logic
    //     if (type === 'pie' || type === 'doughnut') {
    //         pieDoughnutLegendClickHandler(e, legendItem, legend)
    //     } else {
    //         newLegendClickHandler(e, legendItem, legend);
    //     }

    // } else {
    //     let ci = legend.chart;
    //     [
    //         ci.getDatasetMeta(0),
    //         ci.getDatasetMeta(1)
    //     ].forEach(function (meta) {
    //         meta.hidden = meta.hidden === null ? !ci.data.datasets[index]?.hidden : null;
    //     });
    //     ci.update();
    // }
};
const toggleBubbleSize = () => {
    scatterData.value.datasets[0].data[0].x = 0
    scatterData.value.datasets[0].pointRadius = scatterData.value.datasets[0].pointRadius.map(radius => radius * 2);
    // scatterData.value.datasets[0].pointRadius = [10, 10, 10, 10];

    //   this.renderChart(data, options);
};
</script>
  