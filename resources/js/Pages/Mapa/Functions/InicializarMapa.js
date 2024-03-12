import { ZoomInOut } from "./Zoom/ZoomInOut.js";

let logMessages = false;

/**
 * Gera configurações iniciais para o mapa Leaflet baseado nas configurações fornecidas.
 *
 * @param {Object} configs - Objeto contendo configurações específicas do mapa, incluindo controle de zoom e limites.
 * @returns {Object} Configurações do mapa Leaflet.
 */
function ConfigsLeaflet(configs) {
    return {
        zoomControl: configs.configuracoesLeaflet.zoomControl,
        zoomSnap: configs.configuracoesLeaflet.zoomSnap,
        zoomDelta: configs.configuracoesLeaflet.zoomDelta,
        minZoom: configs.zoom.min,
        maxZoom: configs.zoom.max,
    };
}

/**
 * Adiciona um controle no mapa para exibir as coordenadas da posição do mouse.
 *
 * @param {L.Map} map - A instância do mapa Leaflet.
 * @param {Object} configuracoesLeaflet - Objeto contendo configurações do sistema de coordenadas e texto de projeção.
 */
function AdicionaCoordenadasMouse(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    let mousePosControl = L.control.mousePosition({
        position: "bottomleft",
        emptyString: "Coordenadas indisponíveis",
        formatter: function (lng, lat) {
            let pt = projCRS.project(L.latLng(lat, lng));
            if (sistema == "utm") {
                return "" + pt.y.toFixed(0) + " N : " + pt.x.toFixed(0) + " E";
            }
            return (
                "Lat.:" + pt.y.toFixed(5) + " | Lon.:" + pt.x.toFixed(5) + ""
            );
        },
    });
    map.addControl(mousePosControl);
    logMessages &&
        console.log("   [CreateMap] Coordenadas do mouse adicionada ao mapa.");
}

/**
 * Adiciona uma barra de escala no mapa Leaflet.
 *
 * @param {L.Map} map - A instância do mapa Leaflet.
 * @param {number} [largura=150] - Largura máxima da barra de escala em pixels.
 * @param {string} [posicao="bottomleft"] - Posição da barra de escala no mapa.
 */
function AdicionaEscala(map, largura = 150, posicao = "bottomleft") {
    let escala = L.control
        .scale({
            position: posicao,
            metric: true,
            imperial: false,
            maxWidth: largura,
        })
        .addTo(map);
    logMessages && console.log("   [CreateMap] Escala adicionada ao mapa.");
}

/**
 * Define e adiciona uma função no objeto `window` para resetar a visão inicial do mapa.
 *
 * @param {L.Map} map - A instância do mapa Leaflet.
 * @param {number} x - Longitude inicial do centro do mapa.
 * @param {number} y - Latitude inicial do centro do mapa.
 * @param {number} z - Nível de zoom inicial do mapa.
 */
function FuncaoVisaoInicial(map, x, y, z) {
    window.SetaVisaoInicial = function () {
        return map.setView([y, x], z);
    };
    logMessages &&
        console.log(
            "   [CreateMap] Função de resetar para visão inicial adicionada."
        );
}

/**
 * Adiciona funcionalidades de zoom in e zoom out no mapa, utilizando uma função importada.
 *
 * @param {L.Map} map - A instância do mapa Leaflet.
 */
function FuncoesZoom(map) {
    ZoomInOut(map, window, logMessages);
}

/**
 * Define um texto de atribuição personalizado no canto inferior do mapa.
 *
 * @param {L.Map} map - A instância do mapa Leaflet.
 * @param {string} textoAttribution - Texto de atribuição a ser exibido no mapa.
 */
function AdicionaAttribution(map, textoAttribution) {
    map.attributionControl.setPrefix(textoAttribution);
    logMessages &&
        console.log("   [CreateMap] Attribution adicionado ao mapa.");
}

/**
 * Cria um menu de contexto que é exibido ao clicar com o botão direito do mouse no mapa, mostrando as coordenadas do ponto clicado.
 *
 * @param {L.Map} map - A instância do mapa Leaflet.
 * @param {Object} configuracoesLeaflet - Objeto contendo configurações do sistema de coordenadas e texto de projeção.
 */
function CriaMenuContexto(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    let popup = L.popup();
    map.on("contextmenu", (e) => {
        let coordenada = projCRS.project(L.latLng(e.latlng.lat, e.latlng.lng));
        if (sistema == "utm") {
            let content =
                "<b>N</b>: " +
                coordenada.y.toFixed(0) +
                "<br><b>E</b>: " +
                coordenada.x.toFixed(0) +
                "<br>";
        }
        let content =
            "<b>Lat.</b>: " +
            coordenada.y.toFixed(5) +
            " <br><b>Lon.</b>: " +
            coordenada.x.toFixed(5) +
            "<br>";
        popup.setLatLng(e.latlng).setContent(content).openOn(map);
         // Adiciona uma classe customizada ao popup para estilização
        popup.getElement().classList.add("custom-popup");
    });
    logMessages &&
        console.log("   [CreateMap] Menu de contexto adicionado ao mapa.");
}

/**
 * Adiciona uma funcionalidade no objeto `window` para mostrar informações do mapa e permitir ao usuário inserir coordenadas.
 *
 * Ao ser chamada, esta função exibe um prompt para o usuário digitar coordenadas, adiciona um marcador nessas coordenadas e ajusta a visão do mapa.
 *
 * @param {L.Map} mapa - A instância do mapa Leaflet.
 * @returns {Object} Objeto contendo informações sobre o zoom, o centro e os limites do mapa.
 */
function FuncaoMapaInformacoes(mapa) {
    window.MapaInformacoes = function () {
        let zoom = mapa.getZoom();
        let centro = mapa.getCenter();
        let bounds = mapa.getBounds();
        let informacoes = {
            zoom: zoom,
            centro: centro,
            bounds: bounds,
            xyz: {
                x: centro.lng,
                y: centro.lat,
                z: zoom,
            },
        };
        let userInput = prompt(
            "Digite as coordenadas em ordem 'latitude longitude'\n\nSepare as coordenadas por espaço.\n\nEx:\n-23.123456 -46.123456"
        );
        let userInputText = userInput.split(" ");
        let userInputLat = parseFloat(userInputText[0]);
        let userInputLng = parseFloat(userInputText[1]);
        let markerIcon = L.icon({
            iconUrl: "/maps/icons/marker-icon.png",
            shadowUrl: "/maps/icons/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
        let marker = L.marker([userInputLat, userInputLng], {
            icon: markerIcon,
        }).addTo(mapa);
        mapa.setView([userInputLat, userInputLng], 15);
        return informacoes;
    };
    logMessages && console.log(mapa);
}

export {
    ConfigsLeaflet,
    AdicionaCoordenadasMouse,
    AdicionaEscala,
    FuncaoVisaoInicial,
    FuncoesZoom,
    AdicionaAttribution,
    CriaMenuContexto,
    FuncaoMapaInformacoes,
};
