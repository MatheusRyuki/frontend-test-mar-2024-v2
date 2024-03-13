/**
 * Carrega e adiciona uma camada de tiles (TileLayer) ao mapa Leaflet especificado, utilizando uma URL e opções de configuração.
 * Esta função também gerencia a visualização de um spinner de carregamento, indicando o progresso do carregamento da camada de tiles.
 *
 * @param {L.Map} map - A instância do mapa Leaflet onde a camada de tiles será adicionada.
 * @param {string} nomeLayer - O nome identificador da camada de tiles, utilizado para controle de painéis no mapa.
 * @param {string} url - A URL da camada de tiles a ser carregada.
 * @param {Object} options - Um objeto contendo opções de configuração para a camada de tiles.
 * @param {boolean} [logMessages=false] - Se verdadeiro, loga mensagens de aviso, carregamento e sucesso no console.
 *
 * @returns {void} Não retorna valor. A função tem o efeito colateral de adicionar a camada de tiles ao mapa.
 *
 * Exemplo de uso:
 * TileLayerLoad(map, 'OpenStreetMap', 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 *     attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
 * }, true);
 */
function TileLayerLoad(map, nomeLayer, url, options, logMessages = false) {
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

    let tileLayer = L.tileLayer(url, options)
        .on("loading", loadingTileLayer)
        .on("load", loadedTileLayer)
        .addTo(map);
}

export { TileLayerLoad };
