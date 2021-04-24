//set my map
var myMap = L.map("map", {
  center: [42.6611, -99.5302],
  zoom: 4,
  worldCopyJump: true,
});

//icon for the marker
var myIcon = L.icon({
    'iconUrl': "https://img.icons8.com/bubbles/50/000000/broken-pencil.png",
    'iconSize': [45, 45],
    'iconAnchor':[0, 0]
})

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: 'pk.eyJ1IjoibXRzb3ByaXMiLCJhIjoiY2tuNnV4dzVlMGh4bjJxbjFseXJjazJrNCJ9.LFVl0HmYYof6TQ4SueplJA'
}).addTo(myMap);

//read in data with var
var university_url='http://127.0.0.1:5000/data'

d3.json(university_url).then((response)=>{
    var markers = L.markerClusterGroup();
    Object.entries(response).forEach((country)=>{
      console.log(country)
      var lat = country[1]['cord']['latitude']
      var long = country[1]['cord']['longitude']

      var marker = markers.addLayer(L.marker([lat,long], {'icon':myIcon})
      .bindPopup("<h1>" + country[0]+ "</h1> <hr> <h3> Inbound: " + country[1]['inbound']['in18/19'] + "</h3> <h3> Outbound:" + country[1]['outbound']['out18/19']+"</h3>"))

    })
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
})




