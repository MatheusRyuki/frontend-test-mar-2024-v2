<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
import { Link } from "@inertiajs/vue3";
Chart.register(...registerables);

const props = defineProps({
    dados: Object,
});

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
    const ctx = chartRef.value.getContext("2d");
    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: props.dados.labels,
            datasets: props.dados.datasets.map((dataset) => {
                if (dataset.label.includes("Temperatura")) {
                    return {
                        ...dataset,
                        type: "line", // Especifica que este dataset é um gráfico de linhas
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        fill: false, // Opção para gráficos de linha
                        tension: 0.1, // Suavização da linha
                    };
                } else if (dataset.label.includes("Precipitação")) {
                    return {
                        ...dataset,
                        type: "bar", // Especifica que este dataset é um gráfico de barras
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgb(54, 162, 235)",
                    };
                }
                return dataset; // Retorna o dataset sem modificação caso não corresponda aos casos acima
            }),
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true, // Garante que a escala Y comece em zero
                },
            },
        },
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
    <div class="chart-page-container">
        <canvas ref="chartRef" class="chart-container"></canvas>
        <div class="button-container">
            <button
                class="toggle-btn"
                @click="toggleVisibility('Precipitação acumulada (mm)')"
            >
                Precipitação
            </button>
            <button
                class="toggle-btn"
                @click="toggleVisibility('Temperatura Média')"
            >
                Temperatura
            </button>
            <Link :href="route('mapa')" class="navigate-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="22.5"
                    viewBox="0 0 576 512"
                >
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"
                    />
                </svg>
                Ir para o Mapa
            </Link>
        </div>
    </div>
</template>
