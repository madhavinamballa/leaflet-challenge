var myMap = L.map("map", {
    center: [
      40.7, -94.5
    ],
    zoom: 3
  });
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url,function(data){
    //function to choose colors depending on the magnitude
    function getColor(mag){
        var color = "";
        if (mag > 5) {
            color = "red";
        }
        else if (mag > 4) {
            color = "orange";
        }
        else if (mag > 3) {
            color = "yellow";
        }
        else if (mag > 2) {
            color = "pink";
        }
        else if (mag > 1) {
            color = "green";
        }
        else {
        color = "purple";
        }
        return color;

    }
      function geojsonMarkerOptions(someGeojsonFeature){
        return {radius:someGeojsonFeature.properties.mag *3,
        fillColor: getColor(someGeojsonFeature.properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8};
      }
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style:geojsonMarkerOptions,
        // attach a popup to features when they are clicked
        onEachFeature: function(feature, layer) {
                  layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
                }

    }).addTo(myMap);
    // set up the legend
    var legend = L.control({
      position: "bottomright"
    });
  
    // Then add all the details for the legend
    legend.onAdd = function(myMap) {
      var div = L.DomUtil.create("div", "info legend");
  
      var grades = [0, 1, 2, 3, 4, 5];
      var colors=[
        "purple",
        "green",
        "pink",
        "yellow",
        "orange",
        "red"
      ];
      
  
      // Looping through our intervals to generate a label with a colored square for each interval.
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    // Finally, we our legend to the map.
    legend.addTo(myMap);
  
  var secondurl=https://github.com/fraxen/tectonicplates;
  d3.json(secondurl,function(seconddata){
    L.geoJSON(seconddata,{
      weight:1,
      color:"orange"

    }).
    addTo(tectonicplates);
    tectonicplates.addTo(myMap);
  });
});
      
    



    
   