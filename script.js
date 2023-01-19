
MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [77.5914, 12.9744],
    zoom: 10.23,
    maxBounds: [
        [77.05043688354732, 12.693551017449792],
        [78.1323631164492, 13.25493216443411]
    ]
});

map.on('load', () => {

    map.addSource('bescom-omus', {
        'type': 'geojson',
        'data': 'data.geojson'
    });

    map.addLayer({
        'id': 'bescom-omus-layer',
        'type': 'fill',
        'source': 'bescom-omus',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0.0)',
            'fill-outline-color': 'rgba(0, 0, 0, 1)'
        }
    });

    map.on('click', 'bescom-omus-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(createPopup(e.features[0].properties))
            .addTo(map);
    });

    map.on('mouseenter', 'bescom-omus-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'bescom-omus-layer', () => {
        map.getCanvas().style.cursor = '';
    });

});

function createPopup(properties) {
    const contacts = JSON.parse(properties['contacts'])
    var final = '';

    final += '<h3>Your BESCOM OMU is ' + properties['omu_name'] + '.</h3>'
    final += '<p>Try calling the number(s) below to get an update on the power situation in your neighbourhood.</p>'

    for (var i = 0; i < contacts.length; i++) {
        final += '<b>' + contacts[i]['mob_no'] + '</b>';
        final += '<p class="engineer-name">' + contacts[i]['name'] + '</p>';
    }

    return final;
}