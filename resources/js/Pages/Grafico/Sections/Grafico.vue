<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
    dados: Object,
});

const chartRef = ref(null);
const chartConfig = reactive({
    type: "bar",
    data: {},
    options: {},
});

// Estado para controlar a visibilidade dos datasets
const datasetsVisibility = reactive({
    temperatura: true,
    precipitacao: true,
});

onMounted(() => {
    chartConfig.data = {
        labels: props.dados.labels,
        datasets: props.dados.datasets,
    };
    const ctx = chartRef.value.getContext("2d");
    new Chart(ctx, chartConfig);
});

// Observa mudanças na visibilidade dos datasets para atualizar o gráfico
watch(
    datasetsVisibility,
    (newVal) => {
        chartConfig.data.datasets.forEach((dataset) => {
            if (dataset.label.includes("Temperatura")) {
                dataset.hidden = !newVal.temperatura;
            } else if (dataset.label.includes("Precipitação")) {
                dataset.hidden = !newVal.precipitacao;
            }
        });
        // Redesenha o gráfico aqui se necessário
    },
    { deep: true }
);
</script>

<template>
    <div>
        <canvas ref="chartRef" class="chart-container"></canvas>
        <div class="button-container">
            <button
                class="toggle-btn"
                @click="
                    datasetsVisibility.temperatura =
                        !datasetsVisibility.temperatura
                "
            >
                Temperatura
            </button>
            <button
                class="toggle-btn"
                @click="
                    datasetsVisibility.precipitacao =
                        !datasetsVisibility.precipitacao
                "
            >
                Precipitação
            </button>
        </div>
    </div>
</template>
