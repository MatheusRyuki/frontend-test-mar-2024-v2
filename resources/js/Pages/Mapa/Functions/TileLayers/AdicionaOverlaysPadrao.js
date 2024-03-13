import { TileLayerLoad } from "@/Pages/Mapa/Functions/TileLayers/TileLayerLoad.js";

/**
 * Adiciona overlays padrão ao mapa a partir de uma lista de rasters. Itera sobre os rasters fornecidos,
 * adicionando ao mapa aqueles marcados como 'overlay' e com a propriedade 'enabled' igual a true. Cada overlay
 * é carregado usando sua respectiva URL e configurações especificadas em 'xyz_options'.
 *
 * @param {L.Map} map - A instância do mapa Leaflet onde os overlays serão adicionados.
 * @param {Array} rasters - Uma lista de objetos raster contendo informações sobre cada overlay.
 *                          Espera-se que cada raster tenha as propriedades 'tipo', 'nome', 'xyz_options',
 *                          e um booleano 'enabled'. 'xyz_options' deve incluir a URL do tile e outras
 *                          configurações de overlay.
 * @param {boolean} logMessages - Um flag opcional que, quando verdadeiro, ativa a impressão de mensagens de log
 *                                indicando o sucesso do carregamento de cada overlay.
 *
 * Nota: Esta função não retorna valores. Efeitos diretos são aplicados ao mapa (L.Map) fornecido.
 *
 * Exemplo de uso:
 * AdicionaOverlaysPadrao(mapa, rasters, true);
 */
function AdicionaOverlaysPadrao(map, rasters, logMessages = false) {
    rasters.forEach((raster) => {
        if (raster.tipo == "overlay" && raster.xyz_options.enabled == true) {
            TileLayerLoad(
                map,
                raster.nome,
                raster.xyz_options.url,
                raster.xyz_options
            );
            logMessages &&
                console.log(
                    "    [TileLayers.AdicionaOverlaysPadrao] [SUCESSO] (" +
                        raster.nome +
                        ")"
                );
        }
    });
}

export { AdicionaOverlaysPadrao };
