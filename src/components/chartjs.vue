<template>
    <button @click="buttonclick"> clicke</button>
    <div>
        <component v-bind:is="chartType" :data="scatterData" :options="options" />
    </div>
    <table>
        <tr>
            <th>Model</th>
            <th>Category</th>
            <th>X</th>
            <th>Y</th>
        </tr>
        <tr v-for="i in responseData" :key="i">
            <td>{{ i.model }}</td>
            <td>{{ i.category }}</td>
            <td>{{ i.x }}</td>
            <td>{{ i.y }}</td>
            <td><button>show</button></td>
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
        "x": 1,
        "y": 2,
        id:1
    },
    {
        "model": "iphone 12",
        "category": "apple",
        "x": 2,
        "y": 3,
        id:2

    },
    {
        "model": "samsung s22",
        "category": "samsung",
        "x": 3,
        "y": 4,
        id:3
    },
    {
        "model": "iphone 13",
        "category": "apple",
        "x": 4,
        "y": 5,
        id:4

    },
    {
        "model": "sony 10",
        "category": "sony",
        "x": 4,
        "y": 3,
        id:5
    },
    {
        "model": "sony 11",
        "category": "sony",
        "x": 6,
        "y": 2,
        id:6
    },
    {
        "model": "xperia",
        "category": "sony",
        "x": 8,
        "y": 4,
        id:7
    },
    {
        "model": "samsung s20" ,
        "category": "samsung",
        "x": 4,
        "y": 4,
        id:8
    },
    {
        "model": "iphone 14 256" ,
        "category": "apple",
        "x": 3,
        "y": 2,
        id:9
    },
    {
        "model": "samsung s19" ,
        "category": "samsung",
        "x": 5,
        "y": 4,
        id:10
    },
    {
        "model": "samsung A20" ,
        "category": "samsung",
        "x": 4,
        "y": 3,
        id:11
    },
    {
        "model": "xpearia s40" ,
        "category": "sony",
        "x": 3,
        "y": 3,
        id:12
    }
])

const chartOptions = ref({
    datasets: []
})
const colors = [
    {
        borderColor: '#7acbf9',
        backgroundColor: '#7acbf9',
    }
]
const shapes = ['rect']
responseData.value.forEach(({ category, ...data }, index) => {
    if (!chartOptions.value.datasets.some(({ label }) => label === category))
        chartOptions.value.datasets.push({
            label: category,
            fill: false,
            data: [{ category, ...data }],
            pointRadius: [],
            hidden: false,
            pointStyle: shapes[index],
            ...colors[index],
        })
    else {
        const dataset = chartOptions.value.datasets.find(({ label }) => label === category)
        dataset.data.push({ category, ...data })
    }
})
console.log(chartOptions.value)

const groupedData = responseData.value.reduce((result, item) => {
    const category = item.category;
    if (!result[category]) {
        result[category] = [];
    }
    result[category].push(item);
    return result;
}, {});
const filteredArray = Object.values(groupedData).map(group => {
    const filteredObj = {};
    group.forEach(item => {
        filteredObj.x = item.x;
        filteredObj.y = item.y;
    });
    return filteredObj;
});

// console.log(filteredArray);
// console.log(groupedData);
let chartType = ref(Scatter)
const scatterData = ref({
    datasets: [
        {
            label: 'Scatter Dataset 1',
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
const pointClick = (e, a, b) => {
    console.log(e, a, b);
    console.log(
        // b.ctx.canvas.style.scale = 3
    );
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
const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            onClick: newLegendClickHandler,
            position: 'right'
        },
    },
    onClick: pointClick,

})
const buttonclick = () => {
    scatterData.value = {
        datasets: scatterData.value.datasets.map((data, i) => {
            const y = data
            // console.log(y.pointRadius);
            if (y.pointRadius[3] === 10) {
                y.pointRadius[3] = 5;
            } else {
                y.pointRadius[3] = 10;
            }
            return y
        })
    }
}
// setInterval(() => {
//     buttonclick();
// }, 500);


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
            console.log(data);
            const y = data
            y.pointRadius = [10, 10, 10, 10]
            if (currentCategoryIndex.value !== i)
                y.hidden = true
            else
                y.hidden = false
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