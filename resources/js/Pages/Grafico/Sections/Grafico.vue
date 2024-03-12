<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
    dados: Object,
});

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
    const ctx = chartRef.value.getContext("2d");
    console.log(props.dados);
    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: props.dados.labels,
            datasets: props.dados.datasets,
        },
        options: {},
    });
});

function toggleVisibility(datasetLabel) {
    if (chartInstance) {
        const dataset = chartInstance.data.datasets.find(
            (d) => d.label === datasetLabel
        );
        if (dataset) {
            // Toggle da visibilidade
            dataset.hidden = !dataset.hidden;
            chartInstance.update();
        }
    }
}
</script>

<template>
    <div>
        <canvas ref="chartRef" class="chart-container"></canvas>
        <div class="button-container">
            <button class="toggle-btn" @click="toggleVisibility('Temperatura Média')">
                Temperatura
            </button>
            <button
                class="toggle-btn"
                @click="toggleVisibility('Precipitação acumulada (mm)')"
            >
                Precipitação
            </button>
        </div>
    </div>
</template>
