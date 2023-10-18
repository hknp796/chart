<template>
    <div>
        <component v-bind:is="chartType" :data="scatterData" :options="options" />
    </div>
</template>
  
<script  setup>
import { ref } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';
import {
    Scatter,
} from 'vue-chartjs';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement
);
let chartType = ref(Scatter)
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
                },
                {
                    x: -1,
                    y: 1,
                },
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 1,
                    y: 1,
                },
                {
                    x: 2,
                    y: 4,
                }
            ]
            ,
            hidden: false,
            pointRadius: [5, 10, 5, 5],
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
    ]
})

const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            onClick: newLegendClickHandler,
            position: 'right'
        },
    }
})

const currentCategoryIndex = ref(null)
function newLegendClickHandler(e, legendItem, legend) {
    const index = legendItem.datasetIndex
    if (currentCategoryIndex.value === index) {
        currentCategoryIndex.value = null
        scatterData.value = {
            datasets: scatterData.value.datasets.map((data, i) => {
                const y = data
                y.hidden = false
                return y
            })
        }
        return
    }
    currentCategoryIndex.value = index;
    const ci = legend.chart;
    if (ci.isDatasetVisible(currentCategoryIndex.value)) {
        legendItem.hidden = true;
    }
    scatterData.value = {
        datasets: scatterData.value.datasets.map((data, i) => {
            const y = data
            if (currentCategoryIndex.value !== i)
                y.hidden = true
            else
                y.hidden = false
            return y
        })
    }
};
</script>
  