import { TileLayerLoad } from "@/Pages/Mapa/Functions/TileLayers/TileLayerLoad.js";

/**
 * Adiciona um basemap padrão ao mapa com base nas informações fornecidas pelos rasters.
 * Itera sobre a lista de rasters, verificando se o tipo é 'basemap'. Para cada basemap encontrado,
 * carrega o layer no mapa usando a URL fornecida e as opções especificadas em xyz_options.
 *
 * @param {L.Map} map - A instância do mapa Leaflet onde os basemaps serão adicionados.
 * @param {Array} rasters - Uma lista de objetos raster, cada um contendo informações sobre um basemap.
 *                          Espera-se que cada raster tenha as propriedades 'tipo', 'nome', e 'xyz_options',
 *                          onde 'xyz_options' inclui a URL do tile e outras configurações relevantes.
 * @param {boolean} logMessages - Um flag opcional que, se verdadeiro, ativa a impressão de mensagens de log
 *                                para indicar o sucesso do carregamento de cada basemap.
 * @returns {boolean} Retorna verdadeiro ao adicionar com sucesso pelo menos um basemap, falso caso contrário.
 *
 * Exemplo de uso:
 * AdicionaBasemapPadrao(mapa, rasters, true);
 */
function AdicionaBasemapPadrao(map, rasters, logMessages = false) {
    rasters.forEach((raster) => {
        if (raster.tipo == "basemap") {
            TileLayerLoad(
                map,
                raster.nome,
                raster.xyz_options.url,
                raster.xyz_options
            );
            logMessages &&
                console.log(
                    "    [TileLayers.CarregaBasemapPadrao] [SUCESSO] (" +
                        raster.nome +
                        ")"
                );
            return true;
        }
    });
    return false;
}

export { AdicionaBasemapPadrao };
