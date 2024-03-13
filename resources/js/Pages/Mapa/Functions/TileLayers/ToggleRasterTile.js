import { TileLayerLoad } from '@/Pages/Mapa/Functions/TileLayers/TileLayerLoad.js';
import { TileLayerLoadWMS } from '@/Pages/Mapa/Functions/TileLayers/TileLayerLoadWMS.js';
import { TileLayerRemove } from '@/Pages/Mapa/Functions/TileLayers/TileLayerRemove.js';
import { GetTileLayerByUrl } from '@/Pages/Mapa/Functions/TileLayers/GetTileLayerByUrl.js';

/**
 * Alterna a visibilidade de uma camada raster no mapa Leaflet. Se a camada especificada pelo raster não estiver presente no mapa, ela será carregada e exibida. Se já estiver presente, será removida.
 * A função suporta tanto camadas raster comuns (overlay) quanto camadas WMS, decidindo qual método de carregamento utilizar baseado no tipo do raster.
 *
 * @param {L.Map} map - A instância do mapa Leaflet onde a camada raster será alternada.
 * @param {Object} raster - O objeto raster contendo as informações necessárias para carregar ou identificar a camada no mapa. Inclui o tipo da camada (overlay ou wms), o nome da camada, a URL da camada, e as opções específicas da camada.
 * @param {boolean} [logMessages=false] - Indica se mensagens de log devem ser exibidas no console para operações de carregamento e remoção da camada.
 *
 * @example
 * ToggleRasterTile(map, {
 *     nome: "OpenStreetMap",
 *     tipo: "overlay",
 *     xyz_options: {
 *         url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
 *         options: {...}
 *     }
 * });
 *
 * @example
 * ToggleRasterTile(map, {
 *     nome: "AlgumaCamadaWMS",
 *     tipo: "wms",
 *     xyz_options: {
 *         url: "URL_do_servidor_WMS",
 *         options: {...}
 *     }
 * }, true);
 */
function ToggleRasterTile(map, raster, logMessages = false) {
    var rasterLayer = GetTileLayerByUrl(map, raster, logMessages);

    if (rasterLayer == undefined) {
        if (raster.tipo == 'overlay') {
            TileLayerLoad(map, raster.nome, raster.xyz_options.url, raster.xyz_options, logMessages=false)
        } else if (raster.tipo == 'wms') {
            TileLayerLoadWMS(map, raster.nome, raster.xyz_options.url, raster.xyz_options, logMessages=false)
        }
    } else {
        TileLayerRemove(map, raster, logMessages);
    }
};

export { ToggleRasterTile };
