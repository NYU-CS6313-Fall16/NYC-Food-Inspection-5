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

var displayMode = "";   // 1 --> Grade, 2 --> Violations 

//Data Variables
var year = 2016;
var selectedCuisines = [];
var selectedViolations = [];
var selectedGrades = "";

var all_data = [];
var filtered_data = [];
var dateformat = d3.time.format("%m/%d/%Y")

function setSelectedYear(yearValue){
    year = parseFloat(yearValue);
    
    console.log("Displayng Data for year "+year);
    filterData(all_data, year);
//    console.log(filtered_data);
    renderD3(filtered_data);
}

function displayByGrade(gradeSelection){
    displayMode = 1;
    
    $('#map-legend').html('');
    var legendContent = "<i class='fa fa-circle gradeA'></i> Grade A"+
                                    "<i class='fa fa-circle gradeB'></i> Grade B" +
                                    "<i class='fa fa-circle gradeC'></i> Grade C" +
                                    "<i class='fa fa-circle gradeP'></i> Grade Pending";
    
    $('#map-legend').html(legendContent);
    
    selectedGrades = "";
    console.log(gradeSelection);
    if(gradeSelection.includes("Grade A")){
        selectedGrades += "A";
    }
    if(gradeSelection.includes("Grade B")){
        selectedGrades += "B";
    }
    if(gradeSelection.includes("Grade C")){
        selectedGrades += "C";
    }
    if(gradeSelection.includes("Grade Pending")){
        selectedGrades += "P";
    }
    console.log(selectedGrades);
    filterByGrade(filtered_data, selectedGrades);
    console.log(filtered_data);
    renderD3(filtered_data);
}

function setSelectedCuisines(cuisineSelection){
    
}

function setSelectedViolations(violationSelection){
    displayMode = 2;
    $('#map-legend').html('');
    var legendContent = "<i class='fa fa-circle gradeA'></i> Grade A"+
                                    "<i class='fa fa-circle gradeB'></i> Grade B" +
                                    "<i class='fa fa-circle gradeC'></i> Grade C" +
                                    "<i class='fa fa-circle gradeB'></i> Grade B" +
                                    "<i class='fa fa-circle gradeC'></i> Grade C" +
                                    "<i class='fa fa-circle gradeC'></i> Grade C";
    
    $('#map-legend').html(legendContent);
    console.log("violation selected");
}

function addListeners(){
    $('#gradeSelect').on('changed.bs.select', function(e, clickedIndex, oldValue, newValue){
        
        displayByGrade($(this).find("option:selected").text());
    });
    
    $('#violationSelect').on('changed.bs.select', function(e, clickedIndex, oldValue, newValue){
        setSelectedViolations($(this).find("option:selected").text());
    });
    
    $('.switch-field label').on("click", function(){
        setSelectedYear($(this).text());
    });
}
function initializeMap(){
    map = L.map('map').setView([40.7430, -74.0016], 14);

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
    
    addListeners();

}

function filterData(data, data_year){
    filtered_data = null;
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
    console.log("Filteration is Done!");
    console.log(filtered_data.length);
}

function filterByGrade(data, gradeString){
    console.log(data);
    filtered_data = null;
    console.log("Performing filter by grade:");
    if(gradeString === ""){
        filterData(all_data,year);    
    }
    else{
        filtered_data = data.filter(function(d){
            for(var i=0; i<d.values.length; i++){
                return dateformat.parse(d.values[i]['INSPECTION DATE']).getFullYear() === year &&   gradeString.includes(d.values[i]['GRADE'])       
            }
        });    
    }
}

function renderD3(data){
    data.forEach(function(d){
        d.LatLng = new L.LatLng(d.values[0]['LAT'], d.values[0]['LONG'])
    });
    
    var feature = g.selectAll("circle")
                    .data(data);
    feature.enter().append("circle")
                .attr("class","marker")
                .style("opacity", .8) 
                .style("fill", function(d){return getGrade(d)["color"]})
                .attr("r", 3)
                .on("click", function(){ console.log("clicked");})
                .on("mouseover", function(d) {	
                    var window_content = tooltipData(d.values[0]["CAMIS"],d);
                    div.html(window_content);
                    plotLineChart(d.values[0]["CAMIS"]);
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
    
    feature.exit().remove();

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

function tooltipData(camis, restaurant_data){
	var restaurant_allData = all_data.filter(function(d){ return d['CAMIS']==camis});
	var currentYear = restaurant_allData.filter(function(d){ return dateformat.parse(d['INSPECTION DATE']).getFullYear() == year });
	var grade = '';	
	var violation = 0;
	var critical = 0;
	for (var i = 0, len = currentYear.length; i < len; i++) {
		if(!currentYear[i]['ACTION'].includes('No violations')){
					violation = violation + 1;
		}
		if(!currentYear[i]['CRITICAL FLAG'].includes('Not Critical')){
			critical = critical + 1;
		}
	}
	var innerHTML = "<div id='tooltip_area'><div id='tooltip_header'>"+currentYear[0]['DBA']+"</div><br/>";
	innerHTML = innerHTML +"<div id='tooltip_inner_area'>"
				+"<div style='float:left;width:50%; height:50px'><img src='"+getGrade(restaurant_data)['src']+"' height='40px'></img></div>"
				+"<div style='float:left; width:25%;text-align:left'>Violations</div>"
				+"<div style='float:left;width:25%;'>"+violation+"</div>"
				+"<div style='float:left; width:25%;text-align:left'>Critical</div>"
				+"<div style='float:left;width:25%;'>"+critical+"</div>"
				+"</div></div>";
	return innerHTML;
}
      
function getGrade(d){
    var grade = "";
    var maxScore = 0;
    for(var i=0; i<d.values.length;i++){
        //if(d.values[i]["GRADE"] != "" && dateformat.parse(d.values[i]['INSPECTION DATE']).getFullYear() === year){
        //    grade = d.values[i]["GRADE"];
        //}
        if(d.values[i]['SCORE'] > maxScore){
		maxScore = d.values[i]['SCORE'];
	}
	if(maxScore <= 13 ){
		grade = 'A';	
	}else if(maxScore <= 27 ){
		grade = 'B';	
	}else{
		grade = 'C';
	}
    }    

    if(grade === "A"){
        return {color:"#214099", src:"assets/img/A.png"};
    }
    else if(grade === "B"){
        return {color:"#03A45E", src:"assets/img/B.png"};
    }
    else if(grade === "C"){
        return {color:"#F8A51B", src:"assets/img/C.png"};
    }
    else{
        return {color:"#A1A1A1", src:"assets/img/N.png"};
    }
}

function plotLineChart(camis){
	var margin = {top: 10, right: 40, bottom: 15, left: 5},
			width = 200 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom;
	var parseDate = d3.time.format("%m/%d/%y").parse;

	allData = all_data.filter(function(d){ return d['CAMIS']==camis});
	vals = d3.nest()
			.key(function(d) { return dateformat.parse(d['INSPECTION DATE']).getFullYear() })
		.rollup(function(leaves) { return d3.max(leaves,function(d){return d['SCORE'];}); })
		.entries(allData);

	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5).tickSize("-175");

	var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(10).tickSize("-155");
		//.orient("left").ticks(d3.max(vals, function(d){return d.values})).tickSize("-155");

	var plot_svg = d3.select("#tooltip_area")
				.append("svg")
					.attr("width", width + margin.left + margin.right+ 25)
					.attr("height", height + margin.top + margin.bottom)
					.style("padding-left","50px")
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	x.domain([2013, 2017]);
	//y.domain([0, d3.max(vals, function(d) { console.log(d);return d.values; })]);
	y.domain([0, 100]);

	plot_svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	plot_svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);
		
	var valueline = d3.svg.line()
		.x(function(d) {   return x(d.key);})
		.y(function(d) { return y(d.values); });
	
	plot_svg.append("path")
		.attr("d", valueline(vals));

	plot_svg.selectAll("dot")
			.data(vals)
			.enter().append("circle")
			.attr("r", 1.5)
			.attr("cx", function(d) { return x(d.key); })
			.attr("cy", function(d) { return y(d.values); });
	

}

d3.csv("https://raw.githubusercontent.com/NYU-CS6313-Fall16/NYC-Food-Inspection-5/master/assets/data/BK5200.csv", function(error, data){
    all_data = data;
    
    initializeMap();
    filterData(all_data, year);
    renderD3(filtered_data);
});
