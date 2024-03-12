<script setup>
import { ref, onMounted } from "vue";

import "leaflet";
import "leaflet/dist/leaflet.css";
import "proj4";
import "proj4leaflet";
import "leaflet-mouse-position";
import "leaflet.vectorgrid";

import {
    ConfigsLeaflet,
    AdicionaCoordenadasMouse,
    AdicionaEscala,
    FuncaoVisaoInicial,
    AdicionaAttribution,
    CriaMenuContexto,
    FuncaoMapaInformacoes,
    FuncoesZoom,
} from "@/Pages/Mapa/Functions/InicializarMapa.js";

import { AdicionaBasemapPadrao } from "@/Pages/Mapa/Functions/TileLayers/AdicionaBasemapPadrao.js";
import { AdicionaOverlaysPadrao } from "@/Pages/Mapa/Functions/TileLayers/AdicionaOverlaysPadrao.js";
import { ToggleRasterTile } from "@/Pages/Mapa/Functions/TileLayers/ToggleRasterTile.js";
import { ZoomInOut } from "@/Pages/Mapa/Functions/Zoom/ZoomInOut.js";

const props = defineProps({
    projeto: Object,
    rasters: Object,
});

let configsMapa = props.projeto.mapa.configuracao;

let rasters = props.projeto.rasters;

let map = ref(null);

onMounted(() => {
    // Objeto com as configurações do Leaflet para criação do objeto map
    let configs = ConfigsLeaflet(configsMapa);

    // Cria o objeto map do Leaflet
    map = L.map("map", configs);

    // Adiciona a função "SetaVisaoInicial" de resetar a visão inicial do mapa
    FuncaoVisaoInicial(
        map,
        configsMapa.visaoInicial.x,
        configsMapa.visaoInicial.y,
        configsMapa.visaoInicial.z
    );

    // Seta a visualização inicial do mapa
    SetaVisaoInicial();

    // Adiciona as funções de zoom do mapa
    FuncoesZoom(map);

    // Adiciona a função "MapaInformacoes" para mostrar as informações do mapa
    FuncaoMapaInformacoes(map);

    // Adiciona as coordenadas do mouse no canto inferior direito do mapa
    configsMapa.funcionalidades.coordenadasMouse
        ? AdicionaCoordenadasMouse(map, configsMapa.configuracoesLeaflet)
        : configsMapa.funcionalidades.coordenadasMouse;

    // Desabilitar o clique-duplo para função de zoom (nativa do Leaflet)
    map.doubleClickZoom.disable();

    // Adiciona escala ao mapa caso configsMapa.funcionalidades.escala seja true
    configsMapa.funcionalidades.escala
        ? AdicionaEscala(map)
        : configsMapa.funcionalidades.escala;

    // Adiciona atribuições (fonte de dados) ao mapa
    configsMapa.funcionalidades.atribuicoes
        ? AdicionaAttribution(
              map,
              configsMapa.configuracoesLeaflet.atribuicaoPrefixo
          )
        : map.attributionControl.remove();

    // Desativa o clique do botão direito para evitar menu de contexto do navegador e cria o menu de contexto (clique direito com coordenadas)
    configsMapa.funcionalidades.menuContexto
        ? CriaMenuContexto(map, configsMapa.configuracoesLeaflet)
        : configsMapa.funcionalidades.menuContexto;

    // Adiciona o basemap padrão do mapa (TileLayers)
    AdicionaBasemapPadrao(map, rasters);

    // Adiciona os overlays (TileLayers)
    AdicionaOverlaysPadrao(map, rasters);

    // Cria a função "ToggleRaster" para alternar a visualização dos overlays
    window.ToggleRaster = function (nomeRaster) {
        rasters.forEach((raster) =>
            raster.nome == nomeRaster ? ToggleRasterTile(map, raster) : null
        );
    };
});

// Função para chamar `ZoomInOut` diretamente com os parâmetros corretos
function zoomInOut(direction) {
    ZoomInOut(map, direction);
}
</script>

<template>
    <div id="map" class="z-[5] h-[calc(100vh)] max-h-[calc(100vh)]">
        <!-- Botões de Zoom In e Zoom Out -->
        <div class="zoom-controls">
            <button @click="zoomInOut('in')" class="zoom-in-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                >
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"
                    />
                </svg>
            </button>
            <button @click="zoomInOut('out')" class="zoom-out-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 512 512"
                >
                    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.zoom-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
}

.zoom-controls button {
    display: block;
    background-color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 5px;
}

.zoom-controls button img {
    width: 24px;
    height: 24px;
}
</style>
