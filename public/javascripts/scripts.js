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

  // Contact form
  $('#contact-form').submit( function (event) {
    event.preventDefault();

    swal(
      {
        title: "Perfect!",
        type: "success",
        text: "We'll let you know as soon as we hear back",
      }
    );
  });

  if ($('#map').length) {
    // Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2Vob24iLCJhIjoiY2o1cDJ2b3V5MDVzODMzcXB3eGR6N2MwciJ9.R880cN3dpRkxr0XujMsbzQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 14,
      center: [151.2359, -33.8817]
    });

    map.on('load', function () {
      addSuburbsToMap();
      addPoiToMap();
      addCentersToMap();
      addCarersToMap();
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
          "fill-color": "#60f6d1",
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
          "line-color": "#7442f1",
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
          "fill-color": "#60f6d1",
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

    function addCentersToMap() {
      map.loadImage('/images/center@0.5x.png', function(error, image) {
        if (error) throw error;

        map.addImage('center', image);
        map.addLayer({
          'id': 'centers',
          'type': 'symbol',
          'source': {
            'type': 'vector',
            'url': 'mapbox://jessehon.cj5pfnj6v09ys2wo0oqzbftn5-8ie4q'
          },
          'source-layer': 'care-centers',
          "layout": {
            "icon-image": "center",
            "icon-size": 0.15
          }
        });

        map.on('click', 'centers', function (e) {
          var centerProps = e.features[0].properties;

          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(getHtmlForCenterPopup(centerProps))
              .addTo(map);
        });
      });
    }

    function addCarersToMap() {
      map.loadImage('/images/carer@0.5x.png', function(error, image) {
        if (error) throw error;

        map.addImage('carer', image);
        map.addLayer({
          'id': 'carers',
          'type': 'symbol',
          'source': {
            'type': 'vector',
            'url': 'mapbox://jessehon.cj5pie42y0b3g2xo57q84uk76-7l2eq'
          },
          'source-layer': 'carers',
          "layout": {
            "icon-image": "carer",
            "icon-size": 0.15
          }
        });

        map.on('click', 'carers', function (e) {
          var carerProps = e.features[0].properties;

          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(getHtmlForCarerPopup(carerProps))
              .addTo(map);
        });
      });
    }

    function addPoiToMap() {
      map.loadImage('/images/library@0.5x.png', function(error, image) {
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
            "icon-size": 0.15
          }
        });

        map.on('click', 'libraries', function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
        });
      });

      map.loadImage('/images/park@0.5x.png', function(error, image) {
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
            "icon-image": "rocket-15",
            "icon-size": 0.15
          }
        });

        map.on('click', 'parks', function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
        });
      });

      map.loadImage('/images/playground@0.5x.png', function(error, image) {
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
            "icon-image": "playground",
            "icon-size": 0.15
          }
        });

        map.on('click', 'playgrounds', function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.name)
              .addTo(map);
        });
      });

      map.loadImage('/images/swimming@0.5x.png', function(error, image) {
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
            "icon-image": "swimming",
            "icon-size": 0.15
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

    function getHtmlForCenterPopup(centerProps) {
      var center = _.find(centers, {id: _.toNumber(centerProps.id)});
      // var center = _.sample(centers);

      return '<img class="center-avatar center-avatar--xs" src="' + center.avatarUrl + '" /> <a href="/centers/' + center.id + '" class="">' + center.name + '</a>';
    }

    function getHtmlForCarerPopup(carerProps) {
      var user = _.find(users, {id: _.toNumber(carerProps.id)});
      // var user = _.sample(users);

      return '<img class="user-avatar user-avatar--xs" src="' + user.avatarUrl + '" /> <a href="/users/' + user.id + '" class="">' + user.name + '</a>';
    }
  }
});
