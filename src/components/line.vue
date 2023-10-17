<template>
    <Bar :data="data" :options="options" />
</template>
  
<script lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line ,Bar} from 'vue-chartjs'
//   import * as chartConfig from './chartConfig.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
)

export default {
    name: 'App',
    components: {
        Line,
        Bar
    },
    data() {
        return {

            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            },
            options : {
                responsive: true,
                maintainAspectRatio: false
            }
            
        }
    }
}
</script>
  