<script setup>
import { Head, Link } from "@inertiajs/vue3";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />
    <!-- Estrutura principal da página inicial -->
    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
    >
        <!-- Cabeçalho da página com links de login e registro -->
        <div class="max-w-7xl mx-auto p-6 lg:p-8">
            <div class="flex justify-center">
                <!-- Logo ou ícone da aplicação -->
            </div>

            <!-- Conteúdo principal: apenas dois cartões apontando para as rotas "/mapa" e "/grafico" -->
            <div class="mt-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <!-- Cartão para a rota "/mapa" -->
                    <Link :href="route('mapa')" class="card-style">
                        <div class="card-content">
                            <h2>Mapa</h2>
                            <p>Visualize o mapa com nossos dados.</p>
                        </div>
                    </Link>

                    <!-- Cartão para a rota "/grafico" -->
                    <Link :href="route('grafico')" class="card-style">
                        <div class="card-content">
                            <h2>Gráfico</h2>
                            <p>
                                Veja os gráficos elaborados a partir dos nossos
                                dados.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>
