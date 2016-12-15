var darkMapStyle = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#444444"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "lightness": -35
      },
      {
        "gamma": 3.16
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "hue": "#ff0000"
      },
      {
        "saturation": 15
      },
      {
        "lightness": 90
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "hue": "#ff0000"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "lightness": "83"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": 100
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#24282b"
      },
      {
        "lightness": -45
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": "-70"
      },
      {
        "lightness": "27"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];
        
//Map Viz
var map;
var layer;
var map;
var overlay;
var div;
var gradeImg;
var mapboxLayout = 'https://api.mapbox.com/styles/v1/vigneshgawali/ciwnz27st005a2qnx44boes06/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlnbmVzaGdhd2FsaSIsImEiOiJjaXVuOHU3Z2UwMGlwMnptMWxtbHEyN2Q2In0._n3WiiMrnMAJJ1Jb8jRuYw';
var g;
var svg;

//Data Variables
var year = 2016;
var all_data = [];
var filtered_data = [];
var dateformat = d3.time.format("%m/%d/%Y")

function addListeners(){
    $('.dropdown-menu.grade a').on("click", function(){ console.log("Clicked grade: "+$(this).text())});
    $('.dropdown-menu.cuisine a').on("click", function(){ console.log("Clicked cuisine: "+$(this).text())});
    $('.dropdown-menu.violation a').on("click", function(){ console.log("Clicked violation: "+$(this).text())});
        
    $('.switch-field label').on("click", function(){console.log("Year Selected:"+$(this).text())});
}
function initializeMap(){
    map = L.map('map').setView([40.6782, -73.9442], 11);

    L.tileLayer(mapboxLayout, {
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(map);

    div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    map._initPathRoot()    

    svg = d3.select("#map").select("svg"),
    g = svg.append("g");

}

function filterData(data, data_year){
    console.log("Performing Filter");
    filtered_data = data.filter(function(d){
        return d['INSPECTION DATE'] != undefined && dateformat.parse(d['INSPECTION DATE']).getFullYear() === data_year;
    });

    var sorted_data = d3.nest()
                        .key(function(d){ return d['CAMIS']; })
                        .entries(filtered_data);

    sorted_data.sort(function(a,b){
        return d3.ascending(a.values.length, b.values.length);
    });

    filtered_data = sorted_data;
    console.log("Filteration is Done!")
}

function renderD3(data){
    data.forEach(function(d){
        d.LatLng = new L.LatLng(d.values[0]['LAT'], d.values[0]['LONG'])
    });
    
    var feature = g.selectAll("circle")
                    .data(data)
                    .enter().append("circle")
                    .attr("class","marker")
                    .style("opacity", .8) 
                    .style("fill", function(d){return getGrade(d)["color"]})
                    .attr("r", 3)
                    .on("click", function(){ console.log("clicked");})
                    .on("mouseover", function(d) {	
                        var window_content = '<div id="iw-container">' +
                            '<span><div class="iw-title">'+ d.values[0]["DBA"] +'</div></span>' +
                            '<div class="iw-content">' +
                            '<img src="' + getGrade(d)["src"] + '">' +
                            '<p>Cuisine: '+d.values[0]["CUISINE DESCRIPTION"]+'</p>' +
                            '</div>' +
                            '</div>';
                        div.html(window_content)
                        div.transition()		
                            .duration(200)
                            .style("opacity", .9)	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                    })
                    .on("mouseout", function() {		
                        div.transition()		
                            .duration(500)		
                            .style("opacity", 0);	
                    });  

    map.on("viewreset", update);
    update();

    function update() {
        feature.attr("transform", function(d) { 
                        return "translate("+ 
                            map.latLngToLayerPoint(d.LatLng).x +","+ 
                            map.latLngToLayerPoint(d.LatLng).y +")";
                    });
    }
}
      
function getGrade(d){
    var grade = "";

    for(var i=0; i<d.values.length;i++){
        if(d.values[i]["GRADE"] != ""){
            grade = d.values[i]["GRADE"];
        }
    }    

    if(grade === "A"){
        return {color:"blue", src:"assets/img/A.png"};
    }
    else if(grade === "B"){
        return {color:"green", src:"assets/img/B.png"};
    }
    else if(grade === "C"){
        return {color:"yellow", src:"assets/img/C.png"};
    }
    else{
        return {color:"grey", src:"assets/img/N.png"};
    }
}

d3.csv("assets/data/MH2500.csv", function(error, data){
    all_data = data;
    initializeMap();
    filterData(all_data, year);
    renderD3(filtered_data);
});