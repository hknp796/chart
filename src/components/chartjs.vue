<template>
    <button @click="resetClick">
        Reset
    </button>
    <div>
        <component v-bind:is="chartType" :data="chartOptions" :options="options" />
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
import annotationPlugin from 'chartjs-plugin-annotation';
import { ref } from 'vue';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import {
    Scatter, Line
} from 'vue-chartjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    annotationPlugin
);
const responseData = ref([
    {
        "model": "iphone x",
        "category": "apple",
        x: 1,
        y: 2,
        id: 1
    },
    {
        "model": "iphone 12",
        "category": "apple",
        x: 2,
        y: 3,
        id: 2

    },
    {
        "model": "samsung s22",
        "category": "samsung",
        x: 3,
        y: 4,
        id: 3
    },
    {
        "model": "iphone 13",
        "category": "apple",
        x: 4,
        y: 5,
        id: 4

    },
    {
        "model": "sony 10",
        "category": "sony",
        x: 4.5,
        y: 3,
        id: 5
    },
    {
        "model": "sony 11",
        "category": "sony",
        x: 6,
        y: 2,
        id: 6
    },
    {
        "model": "xperia",
        "category": "sony",
        x: 8,
        y: 4,
        id: 7
    },
    {
        "model": "samsung s20",
        "category": "samsung",
        x: 3.5,
        y: 4,
        id: 8
    },
    {
        "model": "iphone 14 256",
        "category": "apple",
        x: 3,
        y: 2,
        id: 9
    },
    {
        "model": "samsung s19",
        "category": "samsung",
        x: 5,
        y: 4,
        id: 10
    },
    {
        "model": "samsung A20",
        "category": "samsung",
        x: 4,
        y: 3,
        id: 11
    },
    {
        "model": "xpearia s40",
        "category": "sony",
        x: 3,
        y: 3,
        id: 12
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
const shapes = ['rect', 'triangle', 'triangle']
responseData.value.forEach(({ category, ...data }, index) => {
    if (!chartOptions.value.datasets.some(({ label }) => label === category)) {

        chartOptions.value.datasets.push({
            label: category,
            fill: false,
            ...colors[index],
            data: [{ category, ...data }],
            hidden: false,
            pointRadius: [5],
            pointStyle: shapes[index],
        },
        )
    }
    else {
        const dataset = chartOptions.value.datasets.find(({ label }) => label === category)
        dataset.data.push({ category, ...data })
    }
})

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

//   // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

let chartType = ref(Scatter)
const scatterData = ref({
    datasets: [
        {
            label: 'Scatter Dataset 1',
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            category: 'apple',
            data: [
                {
                    x: -2,
                    y: 4,
                    model: 'iphone'
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
            pointStyle: 'rect',
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

const pointClick = (e, a) => {
    if (!a.length) return
    const { index, datasetIndex } = a[0]
    showInChart(chartOptions.value.datasets[datasetIndex].data[index])
}

const showInChart = ({ id }) => {
    resetClick()
    tableData.value = tableData.value.filter(({ id: itemId }) => id === itemId)
    chartOptions.value = {
        datasets: chartOptions.value.datasets.map((data) => {
            data.pointRadius = data.data.map(({ id: dataId }) => dataId === id ? 10 : 3)
            const hasPoint = data.data.some(({ id: dataId }) => dataId === id)
            if (!hasPoint)
                data.backgroundColor = data.backgroundColor + '33'
            return data
        })
    }
}
const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        annotation: {
            annotations: {
                line1: {
                    type: 'line',
                    yMin: 3,
                    yMax: 3,
                    borderColor: '#000',
                    borderWidth: 1,
                },
                line2: {
                    type: 'line',
                    xMin: 2,
                    xMax: 2,
                    borderColor: '#000',
                    borderWidth: 1,
                }
            }
        },
        legend: {
            display: true,
            onClick: newLegendClickHandler,
            position: 'right',
            labels: {
                usePointStyle: true
            }
        },
        tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
            // callbacks: {
            //     label: function (context) {
            //         const model = context.dataset.data[context.dataIndex].model
            //         return `${context.dataset.category} ${model}` //+ context.formattedValue
            //     }
            // }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
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
                y.backgroundColor = y.backgroundColor.slice(0, -2)
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
        return resetClick()
    }
    currentCategoryIndex.value = index;
    chartOptions.value = {
        datasets: chartOptions.value.datasets.map((data, i) => {
            const y = data
            if (currentCategoryIndex.value !== i) {
                if (y.backgroundColor.length === 9) {
                    y.backgroundColor = y.backgroundColor.slice(0, -2)
                }
                y.backgroundColor = y.backgroundColor + '33'
                y.pointRadius = [3, 3, 3, 3]
            }
            else {
                if (y.backgroundColor.length === 9) {
                    y.backgroundColor = y.backgroundColor.slice(0, -2)
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