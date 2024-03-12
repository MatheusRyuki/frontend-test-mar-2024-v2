/**
 * Ajusta o nível de zoom do mapa com base na direção especificada.
 *
 * @param {L.Map} map - A instância do mapa do Leaflet sobre a qual o zoom será aplicado.
 * @param {string} direction - A direção do zoom. Espera-se 'in' para aumentar o zoom e 'out' para diminuir.
 */
function ZoomInOut(map, direction) {
    if (direction === "in") {
        map.zoomIn();
    } else if (direction === "out") {
        map.zoomOut();
    }
}

export { ZoomInOut };
