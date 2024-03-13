import { GetTileLayerByUrl } from "@/Pages/Mapa/Functions/TileLayers/GetTileLayerByUrl.js";

/**
 * Remove uma camada específica do mapa Leaflet utilizando um objeto raster para identificar a camada a ser removida.
 * A função busca a camada correspondente no mapa a partir da URL do raster fornecido e, se encontrada, a remove do mapa.
 *
 * @param {L.Map} map - A instância do mapa Leaflet de onde a camada será removida.
 * @param {Object} raster - O objeto raster contendo as informações da camada, incluindo a URL para identificação.
 * @param {boolean} [logMessages=false] - Se verdadeiro, loga mensagens de aviso e sucesso no console sobre a remoção da camada.
 *
 * @returns {boolean} Retorna verdadeiro se a camada foi encontrada e removida com sucesso, falso caso contrário.
 *
 * Exemplo de uso:
 * TileLayerRemove(map, {
 *     xyz_options: {
 *         url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
 *     }
 * }, true);
 */
function TileLayerRemove(map, raster, logMessages = false) {
    let _tileLayer = GetTileLayerByUrl(map, raster, logMessages);
    if (map.hasLayer(_tileLayer) == undefined) {
        logMessages &&
            console.log(
                "    [TileLayers.Remove] [Aviso] (" + _tileLayer,
                ") não existe no mapa."
            );
        return false;
    } else {
        map.removeLayer(_tileLayer);
        logMessages &&
            console.log(
                "    [TileLayers.Remove] [Aviso] (" + _tileLayer,
                ") removido do mapa."
            );
    }
}

export { TileLayerRemove };
