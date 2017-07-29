$(function() {
  // Ratings
  _.each($('.rating-select'), function(elm) {
    var $elm = $(elm);
    var currentRating = $elm.data('current-rating');

    $elm.barrating({
      theme: 'fontawesome-stars-o',
      showSelectedRating: false,
      initialRating: currentRating,
    });
  });

  // Feedback form
  $('#feedback-form').submit( function (event) {
    event.preventDefault();

    swal(
      {
        title: "Awesome!",
        type: "success",
        text: "Can't wait to see you again",
      }
    );
  });

  // Mapbox
  mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2Vob24iLCJhIjoiY2o1cDJ2b3V5MDVzODMzcXB3eGR6N2MwciJ9.R880cN3dpRkxr0XujMsbzQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 15,
    center: [151.2164, -33.8737]
  });

  map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
  });

  map.on('load', function () {
    addSuburbsToMap();
    addPoiToMap();
  });

  function addSuburbsToMap() {
    map.addSource("suburbs", {
      "type": "vector",
      "url": "mapbox://jessehon.sydney-suburbs"
    });

    map.addLayer({
      "id": "suburb-fills",
      "type": "fill",
      "source": "suburbs",
      'source-layer': 'sydney-suburbs',
      "layout": {},
      "paint": {
        "fill-color": "#627BC1",
        "fill-opacity": 0.01
      }
    });

    map.addLayer({
      "id": "suburb-borders",
      "type": "line",
      "source": "suburbs",
      'source-layer': 'sydney-suburbs',
      "layout": {},
      "paint": {
        "line-color": "#627BC1",
        "line-width": 1
      }
    });

    map.addLayer({
      "id": "suburb-fills-hover",
      "type": "fill",
      "source": "suburbs",
      'source-layer': 'sydney-suburbs',
      "layout": {},
      "paint": {
        "fill-color": "#627BC1",
        "fill-opacity": 0.2
      },
      "filter": ["==", "name", ""]
    });

    // When the user moves their mouse over the suburb-fill layer, we'll update the filter in
    // the suburb-fills-hover layer to only show the matching state, thus making a hover effect.
    map.on("mousemove", "suburb-fills", function(e) {
      map.setFilter("suburb-fills-hover", ["==", "loc_pid", e.features[0].properties.loc_pid]);
    });

    // Reset the suburb-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", "suburb-fills", function() {
      map.setFilter("suburb-fills-hover", ["==", "loc_pid", ""]);
    });
  }

  function addPoiToMap() {
    map.loadImage('/images/library.png', function(error, image) {
      if (error) throw error;

      map.addImage('library', image);
      map.addLayer({
        'id': 'libraries',
        'type': 'symbol',
        'source': {
          'type': 'vector',
          'url': 'mapbox://jessehon.cj5p632hn07td2qrx22wv6uyn-08jkj'
        },
        'source-layer': 'east-poi-libraries',
        "layout": {
          "icon-image": "library",
          "icon-size": 0.25
        }
      });

      map.on('click', 'libraries', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
      });
    });

    map.loadImage('/images/park.png', function(error, image) {
      if (error) throw error;

      map.addImage('park', image);
      map.addLayer({
        'id': 'parks',
        'type': 'symbol',
        'source': {
          'type': 'vector',
          'url': 'mapbox://jessehon.cj5p62m9y07au2wphecww99m8-5t2my'
        },
        'source-layer': 'east-poi-parks',
        "layout": {
          "icon-image": "rocket-15"
        }
      });

      map.on('click', 'parks', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
      });
    });

    map.loadImage('/images/playground.png', function(error, image) {
      if (error) throw error;

      map.addImage('playground', image);
      map.addLayer({
        'id': 'playgrounds',
        'type': 'symbol',
        'source': {
          'type': 'vector',
          'url': 'mapbox://jessehon.cj5p62c4307mu2wplvtro20rg-86toy'
        },
        'source-layer': 'east-poi-playgrounds',
        "layout": {
          "icon-image": "playground"
        }
      });

      map.on('click', 'playgrounds', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
      });
    });

    map.loadImage('/images/swimming.png', function(error, image) {
      if (error) throw error;

      map.addImage('swimming', image);
      map.addLayer({
        'id': 'swimschools',
        'type': 'symbol',
        'source': {
          'type': 'vector',
          'url': 'mapbox://jessehon.cj5p62027074x2wmukbbmach1-6yt0x'
        },
        'source-layer': 'east-poi-swimschools',
        "layout": {
          "icon-image": "swimming"
        }
      });

      map.on('click', 'swimschools', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
      });
    });
  }
});
