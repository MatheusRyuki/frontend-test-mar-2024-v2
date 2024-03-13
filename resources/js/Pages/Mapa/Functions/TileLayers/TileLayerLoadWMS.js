/**
 * Carrega e adiciona uma camada WMS (Web Map Service) ao mapa Leaflet especificado, utilizando uma URL e opções de configuração.
 * Esta função também gerencia a visualização de um spinner de carregamento, indicando o progresso do carregamento da camada WMS.
 *
 * @param {L.Map} map - A instância do mapa Leaflet onde a camada WMS será adicionada.
 * @param {string} nomeLayer - O nome identificador da camada WMS, utilizado para controle de painéis no mapa.
 * @param {string} url - A URL do serviço WMS a ser carregado.
 * @param {Object} options - Um objeto contendo opções de configuração para a camada WMS, como layers, format, transparent, etc.
 * @param {boolean} [logMessages=false] - Se verdadeiro, loga mensagens de aviso, carregamento e sucesso no console.
 *
 * @returns {void} Não retorna valor. A função tem o efeito colateral de adicionar a camada WMS ao mapa.
 *
 * Exemplo de uso:
 * TileLayerLoadWMS(map, 'WeatherLayer', 'http://example.com/wms', {
 *     layers: 'specific_layer',
 *     format: 'image/png',
 *     transparent: true,
 *     version: '1.3.0'
 * }, true);
 */
function TileLayerLoadWMS(map, nomeLayer, url, options, logMessages = false) {
    if (map.getPane(nomeLayer) != undefined) {
        logMessages &&
            console.log(
                "    [TileLayers.Load] [Aviso] (" + nomeLayer,
                ") já existe no mapa."
            );
        return false;
    }

    function loadingTileLayer(e) {
        let spinner = document.getElementById("Spinner " + nomeLayer);
        spinner != undefined ? spinner.classList.remove("hidden") : null;
        logMessages &&
            console.log(
                "    [TileLayers.Load.loadingTileLayer] [Carregando..] (" +
                    nomeLayer +
                    ")"
            );
    }

    function loadedTileLayer(e) {
        let spinner = document.getElementById("Spinner " + nomeLayer);
        spinner != undefined ? spinner.classList.add("hidden") : null;
        logMessages &&
            console.log(
                "    [TileLayers.Load.loadedTileLayer] [SUCESSO] (" +
                    nomeLayer +
                    ")"
            );
    }

    let tileLayer = L.tileLayer
        .wms(url, options)
        .on("loading", loadingTileLayer)
        .on("load", loadedTileLayer)
        .addTo(map);
}

export { TileLayerLoadWMS };
