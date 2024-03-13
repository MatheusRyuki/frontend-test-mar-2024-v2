/**
 * Localiza e exibe a posição atual do usuário no mapa.
 *
 * Esta função utiliza a funcionalidade de geolocalização do Leaflet para encontrar
 * a localização atual do usuário e exibir no mapa utilizando um marcador e um círculo
 * que representa a área aproximada de precisão da localização.
 *
 * @param {L.Map} map - Instância do mapa Leaflet onde a localização será exibida.
 *
 * Em caso de sucesso, adiciona um marcador na posição do usuário com um popup informando
 * "Você está aqui!" e um círculo representando a precisão da localização.
 * Em caso de erro ao obter a localização, exibe um alerta com a mensagem do erro.
 */
function GetUserLocation(map) {
    map.locate({ setView: true, maxZoom: 16 });
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map).bindPopup("Você está aqui!").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    }
    map.on("locationfound", onLocationFound);
    function onLocationError(e) {
        alert(e.message);
    }
    map.on("locationerror", onLocationError);
}

export { GetUserLocation };
