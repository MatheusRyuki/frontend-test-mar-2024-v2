/**
 * Busca e retorna a camada de tiles (TileLayer) associada a uma URL específica dentro do mapa fornecido.
 * Esta função é útil para identificar se uma determinada camada de tiles já está presente no mapa,
 * permitindo operações condicionais baseadas na existência da camada.
 *
 * @param {L.Map} map - A instância do mapa Leaflet onde a busca será realizada.
 * @param {Object} raster - Um objeto raster contendo as 'xyz_options' que, por sua vez, devem incluir a URL da camada de tiles.
 * @param {boolean} [logMessages=false] - Se verdadeiro, loga uma mensagem no console se a camada de tiles for encontrada.
 *
 * @returns {L.Layer|undefined} Retorna a camada de tiles (L.Layer) correspondente se encontrada no mapa; caso contrário, retorna undefined.
 *
 * Exemplo de uso:
 * let layer = GetTileLayerByUrl(map, raster, true);
 * if (layer) {
 *     console.log("Camada encontrada no mapa.");
 * } else {
 *     console.log("Camada não encontrada no mapa.");
 * }
 */
function GetTileLayerByUrl(map, raster, logMessages = false) {
    let urlLayer = raster.xyz_options.url;

    for (let i in map._layers) {
        if (map._layers[i]._url == urlLayer) {
            logMessages &&
                console.log(
                    "    [TileLayers.GetTileLayerByUrl] [Aviso] (" +
                        map._layers[i],
                    ") encontrado no mapa."
                );
            return map._layers[i];
        }
    }
}

export { GetTileLayerByUrl };
