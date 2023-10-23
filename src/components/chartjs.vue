<template>
    <button @click="resetClick">
        Reset
    </button>
    <div>
        <component v-bind:is="chartType"  :data="chartOptions" :options="options" />
    </div>
    <table>
        <tr>
            <th>Model</th>
            <th>Category</th>
            <th>X</th>
            <th>Y</th>
        </tr>
        <tr v-for="i in tableData" :key="i">
            <td>{{ i.model }}</td>
            <td>{{ i.category }}</td>
            <td>{{ i.x }}</td>
            <td>{{ i.y }}</td>
            <td><button @click="showInChart(i)">Show</button></td>
        </tr>
    </table>
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
const responseData = ref([
    {
        "model": "iphone x",
        "category": "apple",
        x: 1,
        y: 2,
        id:1
    },
    {
        "model": "iphone 12",
        "category": "apple",
        x: 2,
        y: 3,
        id:2

    },
    {
        "model": "samsung s22",
        "category": "samsung",
        x: 3,
        y: 4,
        id:3
    },
    {
        "model": "iphone 13",
        "category": "apple",
        x: 4,
        y: 5,
        id:4

    },
    {
        "model": "sony 10",
        "category": "sony",
        x: 4.5,
        y: 3,
        id:5
    },
    {
        "model": "sony 11",
        "category": "sony",
        x: 6,
        y: 2,
        id:6
    },
    {
        "model": "xperia",
        "category": "sony",
        x: 8,
        y: 4,
        id:7
    },
    {
        "model": "samsung s20" ,
        "category": "samsung",
        x: 3.5,
        y: 4,
        id:8
    },
    {
        "model": "iphone 14 256" ,
        "category": "apple",
        x: 3,
        y: 2,
        id:9
    },
    {
        "model": "samsung s19" ,
        "category": "samsung",
        x: 5,
        y: 4,
        id:10
    },
    {
        "model": "samsung A20" ,
        "category": "samsung",
        x: 4,
        y: 3,
        id:11
    },
    {
        "model": "xpearia s40" ,
        "category": "sony",
        x: 3,
        y: 3,
        id:12
    }
])
const tableData = ref(responseData.value)

const chartOptions = ref({
    datasets: []
})
const colors = [
    {
        borderColor: '#7acbf9',
        backgroundColor: '#7acbf9',
    },
    {
        borderColor: '#f87979',
        backgroundColor: '#f87979',
    },
    {
        borderColor: '#008000',
        backgroundColor: '#008000',
    },

    {
        borderColor: '#ff0000',
        backgroundColor: '#ff0000',
    },
    {
        borderColor: '#ff0000',
        backgroundColor: '#ff0000',
    }
]
const shapes = ['rect','triangle','triangle']
responseData.value.forEach(({ category, ...data }, index) => {
    if (!chartOptions.value.datasets.some(({ label }) => label === category)){

        chartOptions.value.datasets.push({
            label: category,
            fill: false,
            ...colors[index],
            data: [{category,  ...data }],
            hidden: false,
            pointRadius:[5],
            pointStyle: shapes[index],
        })
    }
    else {
        const dataset = chartOptions.value.datasets.find(({ label }) => label === category)
        dataset.data.push({category, ...data })
    }
})




let chartType = ref(Scatter)
const scatterData = ref({
    datasets: [
        {
            label: 'Scatter Dataset 1',
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            category:'apple',
            data: [
                {
                    x: -2,
                    y: 4,
                    model:'iphone'
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
            ],
            hidden: false,
            pointRadius: [5, 5, 5, 5, 5],
        },
        {
            label: 'Scatter Dataset 2',
            fill: false,
            borderColor: '#7acbf9',
            backgroundColor: '#7acbf9',
            pointStyle:'rect',
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
            pointRadius: [5, 5, 5, 5, 5],
            hidden: false,
        },
    ]
})

console.log(chartOptions.value)
// console.log(scatterData.value)
const pointClick = (e, a, b) => {
    // console.log(a[0].index);
    // scatterData.value = {
    //         datasets: scatterData.value.datasets.map((data, i) => {
    //             const y = data
    //             console.log(y.pointRadius);
    //             y.pointRadius[a[0].index] = 10
    //             return y
    //         })
    //     }
}

const showInChart = ({ id }) => {
    resetClick()
    tableData.value = tableData.value.filter(({ id: itemId }) => id === itemId)
    chartOptions.value = {
        datasets: chartOptions.value.datasets.map((data) => {
            data.pointRadius = data.data.map(({ id: dataId }) => dataId === id ? 10 : 3)
            const hasPoint = data.data.some(({ id: dataId }) => dataId === id)
            if (!hasPoint)
                data.backgroundColor = data.backgroundColor+'33'
            return data
        })
    }
    // console.log(chartOptions.value)
}
const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            onClick: newLegendClickHandler,
            position: 'right',
            },
        tooltip: {
                callbacks: {
                    label: function(context) {
                        const model = context.dataset.data[context.dataIndex].model
                        return `${context.dataset.category} ${model}` //+ context.formattedValue
                    }
                }
            }
    },
    onClick: pointClick,

})
const resetClick = () => {
    tableData.value = responseData.value
    chartOptions.value = {
        datasets: chartOptions.value.datasets.map((data, i) => {
            const y = data
            tableData.value = responseData.value
            y.pointRadius = [5, 5, 5, 5]
            if (y.backgroundColor.length === 9) {
                y.backgroundColor = y.backgroundColor.slice(0,-2)
            }
            return y
        })
    }
}

const currentCategoryIndex = ref(null)
function newLegendClickHandler(e, legendItem, legend) {
    tableData.value = chartOptions.value.datasets[legendItem.datasetIndex].data
    const index = legendItem.datasetIndex

    if (currentCategoryIndex.value === index) {
        currentCategoryIndex.value = null
        chartOptions.value = {
            datasets: chartOptions.value.datasets.map((data, i) => {
                const y = data
                tableData.value = responseData.value
                y.pointRadius = [5, 5, 5, 5]
                if (y.backgroundColor.length === 9) {
                    y.backgroundColor = y.backgroundColor.slice(0,-2)
                }
                return y
            })
        }
        return
    }
    currentCategoryIndex.value = index;
    chartOptions.value = {
        datasets: chartOptions.value.datasets.map((data, i) => {
            const y = data
            if (currentCategoryIndex.value !== i){
                if (y.backgroundColor.length === 9) {
                    y.backgroundColor = y.backgroundColor.slice(0,-2)
                }
                y.backgroundColor = y.backgroundColor+'33'
                y.pointRadius = [3, 3, 3, 3]
            }
            else {
                if (y.backgroundColor.length === 9) {
                    y.backgroundColor = y.backgroundColor.slice(0,-2)
                }
                y.pointRadius = [10, 10, 10, 10]
            }
            return y
        })
    }
};


</script>
<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>