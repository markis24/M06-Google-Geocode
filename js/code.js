// Definimos una variable global para el mapa
let map;

// Creamos una función para inicializar el mapa
async function initMap() {
    // Importamos la clase Map desde la biblioteca maps de Google
    const {Map} = await google.maps.importLibrary("maps");

    // Creamos el mapa y lo asignamos a la variable map
    map = new Map(document.getElementById("map"), {
        center: {lat: 41.390205, lng: 2.154007},
        zoom: 18,
    });

    // Añadimos un marcador en la ubicación de Barcelona
    const marker = new google.maps.Marker({
        position: {lat: 41.390205, lng: 2.154007},
        map,
        title: "Selva de Mar",
    });
}

// Llamamos a la función para inicializar el mapa
initMap();

// Creamos un objeto Geocoder de Google Maps
let geocoder = new google.maps.Geocoder();

// Definimos la dirección que queremos geocodificar
let address = "Carrer de la Selva de Mar 211 08020 Barcelona";

// Realizamos la petición de geocodificación
geocoder.geocode({'address': address}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        // Si la geocodificación es exitosa, obtenemos las coordenadas
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();

        // Centramos el mapa en las coordenadas obtenidas y ajustamos el zoom
        let center = new google.maps.LatLng(latitude, longitude);
        map.setCenter(center);
        map.setZoom(16);

        // Añadimos un marcador en las coordenadas obtenidas
        const marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: map
        });
    } else {
        // Si la geocodificación falla, mostramos un mensaje de error
        alert("La dirección no se ha encontrado.");
    }
});

// Añadimos funcionalidad para obtener la ubicación actual del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map.setCenter(pos);
        map.setZoom(9);

        const marker = new google.maps.Marker({
            position: pos,
            map: map
        });
    });
}
// Definimos la URL de la imagen del nuevo icono
const iconURL = "";

// Creamos un nuevo marcador con el icono personalizado
const marker = new google.maps.Marker({
    position: {lat: 41.390205, lng: 2.154007},
    map: map,
    icon: iconURL
});

// Creamos un contenido para el InfoWindow
const contentString = "<div><h3>Título</h3><p>Contenido del InfoWindow</p></div>";

// Creamos el InfoWindow
const infowindow = new google.maps.InfoWindow({
    content: contentString
});

// Agregamos un listener al marcador para abrir el InfoWindow cuando se hace clic
marker.addListener('click', function() {
    infowindow.open(map, marker);
});
