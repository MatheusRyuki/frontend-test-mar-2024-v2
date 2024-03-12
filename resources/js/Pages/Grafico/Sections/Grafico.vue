<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
    dados: Object,
});

const chartRef = ref(null);

onMounted(() => {
    const ctx = chartRef.value.getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: props.dados.labels,
            datasets: [
                {
                    label: "Temperatura",
                    data: props.dados.datasets[0].data,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    yAxisID: "y",
                },
                {
                    label: "Precipitação",
                    data: props.dados.datasets[1].data,
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    yAxisID: "y1",
                },
            ],
        },
        options: {
            scales: {
                y: {
                    type: "linear",
                    display: true,
                    position: "left",
                },
                y1: {
                    type: "linear",
                    display: true,
                    position: "right",
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        },
    });
});
</script>

<template>
    <canvas ref="chartRef">{{ dados }}</canvas>
</template>
