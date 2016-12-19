    
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
    map = L.map('map').setView([40.628776, -73.971701], 12);

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

// Changed Function
function filterData(data, data_year){
    filtered_data = null;
    console.log("Performing Filter");
    filtered_data = data.filter(function(d){
        // Changes here
        return d['INSPECTION DATE'] != undefined && dateformat.parse(d['INSPECTION DATE']).getFullYear() === data_year && d['GRADE'] != undefined && d['GRADE'] != "" && d['SCORE'] != '';
    });

    var sorted_data = d3.nest()
                        .key(function(d){ return d['CAMIS']; })
                        .entries(filtered_data);
    
    sorted_data.sort(function(a,b){
        return d3.ascending(b.values.length, a.values.length);
    });
    
    filtered_data = sorted_data;
    console.log("Filteration is Done!");
}

//function filterData(data, data_year){
//    filtered_data = null;
//    console.log("Performing Filter");
//    filtered_data = data.filter(function(d){
//        return d['INSPECTION DATE'] != undefined && dateformat.parse(d['INSPECTION DATE']).getFullYear() === data_year;
//    });
//
//    var sorted_data = d3.nest()
//                        .key(function(d){ return d['CAMIS']; })
//                        .entries(filtered_data);
//    console.log(sorted_data);
//    sorted_data.sort(function(a,b){
//        return d3.ascending(b.values.length, a.values.length);
//    });
//    
//    
//    filtered_data = sorted_data;
//    console.log("Filteration is Done!");
//    console.log(filtered_data.length);
//}

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

// Changed Function
function getGrade(d){
    var grade = "Z";
    var maxScore = 0;
    var month = 0;
    for(var i=0; i<d.values.length;i++){
        // Added a few more conditions here for grade with latest date
        if(d.values[i]['GRADE'] != '' && dateformat.parse(d.values[i]['INSPECTION DATE']).getFullYear() === year && dateformat.parse(d.values[i]['INSPECTION DATE']).getMonth() >= month && grade > d.values[i]['GRADE']){
            month = dateformat.parse(d.values[i]['INSPECTION DATE']).getMonth();
            grade = d.values[i]['GRADE'];    
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
      
//function getGrade(d){
//    var grade = "";
//    var maxScore = 0;
//    for(var i=0; i<d.values.length;i++){
//        //if(d.values[i]["GRADE"] != "" && dateformat.parse(d.values[i]['INSPECTION DATE']).getFullYear() === year){
//        //    grade = d.values[i]["GRADE"];
//        //}
//        if(d.values[i]['SCORE'] > maxScore){
//		  maxScore = d.values[i]['SCORE'];
//        }
//	
//        if(maxScore <= 13 ){
//            grade = 'A';	
//        }
//        else if(maxScore <= 27 ){
//            grade = 'B';	
//        }
//        else{
//            grade = 'C';
//        }
//    }
//    
//    if(grade === "A"){
//        return {color:"#214099", src:"assets/img/A.png"};
//    }
//    else if(grade === "B"){
//        return {color:"#03A45E", src:"assets/img/B.png"};
//    }
//    else if(grade === "C"){
//        return {color:"#F8A51B", src:"assets/img/C.png"};
//    }
//    else{
//        return {color:"#A1A1A1", src:"assets/img/N.png"};
//    }
//}

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

//--------------------HEATMAP-----------------------------------------
var TEMPERATURE = 'Food Temp.';
var CONTAMINATION = 'Unclean Food';
var HYGIENE = 'Staff Hygiene';
var FACILITY = 'Facility/Storage';
var REGULATION = 'Regulation';
var VERMIN = 'Vermin';

function convertViolation(input){
            
            if (input.startsWith('02')) {
                return VERMIN;
            }
            else if(input.startsWith('03')) {
                return CONTAMINATION;
            }
            else if(input.startsWith('04A')){
                return REGULATION;
            }
            else if(input.startsWith('04B') || input.startsWith('04C') || input.startsWith('04D')) {
                return HYGIENE;
            }
            else if(input.startsWith('04E') || input.startsWith('04F')) {
                return FACILITY;
            }
            else if(input.startsWith('04G') || input.startsWith('04H') || input.startsWith('04I')) {
                return CONTAMINATION;
            }
            else if(input.startsWith('04J')) {
                return TEMPERATURE;
            }
            else if(input.startsWith('04')) {
                return VERMIN;
            }
            else if(input.startsWith('05')) {
                return FACILITY;
            }
            else if(input.startsWith('06A') || input.startsWith('06B')) {
                return HYGIENE;
            }
            else if(input.startsWith('06C')) {
                return CONTAMINATION;
            }
            else if(input.startsWith('06D') || input.startsWith('06E') || input.startsWith('06F')) {
                return FACILITY;
            }
            else if(input.startsWith('06')) {
                return REGULATION;
            }
            else if(input.startsWith('07')) {
                return REGULATION;
            }
            else if(input.startsWith('08')) {
                return FACILITY;
            }
            else if(input.startsWith('09A')) {
                return FACILITY;
            }
            else if(input.startsWith('09B')) {
                return TEMPERATURE;
            }
            else if(input.startsWith('09C')) {
                return CONTAMINATION;
            }
            else if(input.startsWith('10')) {
                return FACILITY;
            }
            else if(input.startsWith('15')) {
                return REGULATION;
            }
            else if(input.startsWith('16')) {
                return REGULATION;
            }
            else if(input.startsWith('18')) {
                return REGULATION;
            }
            else if(input.startsWith('20')) {
                return REGULATION;
            }
            else if(input.startsWith('22')) {
                return REGULATION;
            }
            return 'Other';
        }
        
function condenseCuisine(input) {
            if (input.startsWith('Latin')){
                return 'Latin';
            }
            else if(input.startsWith('Caf')) {
                return 'Cafe/Coffee/Tea';
            }
            else if(input.startsWith('Italian') || input.startsWith('Pizza')) {
                return 'Italian';
            }
            return input;
        }

function heatMap(data) {
    var filteredData = [];
    for( var entry in data) {
        filteredData.push(data[entry].values[0]);
    }
    var condensedData = [];
    var maxCount = 0;
    for( var entry in filteredData ) {
        newEntry = {
            cuisine : condenseCuisine(filteredData[entry]["CUISINE DESCRIPTION"]),
            violation : convertViolation(filteredData[entry]["VIOLATION CODE"]),
            DBA : filteredData[entry].DBA
        };
        condensedData.push(newEntry);
    }
    var topCuisines = d3.nest()
        .key(function(d) {return d.cuisine;})
        .rollup(function(v) {return v.length;})
        .entries(condensedData);
    topCuisines = topCuisines.sort(
        function compare(a, b) {
            if (a.values < b.values) {
                return 1;
            }
            else if (a.values > b.values) {
                return -1;
            }
            return 0;
        }
    );
    topCuisines = topCuisines.slice(0, 9);
    var topNCuisines = [];
    for (var entry in topCuisines) {
        topNCuisines.push(topCuisines[entry].key);
    }
    var countedData = d3.nest()
        .key(function(d) { if (topNCuisines.indexOf(d.cuisine) > -1) {return d.cuisine;} return 'Other'; })
        .key(function(d) { return d.violation; })
        .rollup(function(v) { return v.length; })
        .map(condensedData);
    var formattedData = [];
    var toCounts = {};
    for( var cuisine in countedData) {
        toCounts[cuisine] = 0;
        for( var violation in countedData[cuisine]) {
            toCounts[cuisine] += countedData[cuisine][violation];
        }
    }
    for( var cuisine in countedData ) {
        for( var violation in countedData[cuisine]) {
            var entry = {};
            entry.cuisine = cuisine;
            entry.violation = violation;
            entry.count = countedData[cuisine][violation] / toCounts[cuisine];
            formattedData.push(entry);
            if (entry.count > maxCount) {
                maxCount = entry.count;
            }
        }
    }
    //renderList(filteredData);
    renderChart(formattedData, maxCount);
}

function renderChart(data, maxCount) {
    console.log("rendering heatmap!");
    var chartWidth = 600;
    var chartHeight = 400;
    var chartMargin = {top: 10, left: 90, right: 10, bottom: 90};
    var chartInnerHeight = chartHeight - chartMargin.top - chartMargin.bottom;
    var chartInnerWidth = chartWidth - chartMargin.left - chartMargin.right;

    var squareSize = 20;

    var chart = d3.select("#Heatmap");
    var xAxisGroup = chart.append("g").attr("transform", "translate(" + chartMargin.left + "," + (chartInnerHeight + chartMargin.top) + ")");
    var yAxisGroup = chart.append("g").attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
    var dotGroup = chart.append("g").attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");
    console.log(data);
    console.log(maxCount);
    chart
        .attr("width", chartWidth)
        .attr("height", chartHeight);
    var xScale = d3
        .scale.ordinal()
        .rangeBands([0, chartInnerWidth]);
    var yScale = d3
        .scale.ordinal()
        .rangeBands([chartInnerHeight, 0]);
    var cScale = d3.scale.linear().domain([0, maxCount]).range(["white", "red"]);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(-300);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickSize(-500);
    xScale.domain(data.map(function(d) { return d.cuisine; })); 
    yScale.domain(data.map(function(d) { return d.violation; })); 
    xAxisGroup.call(xAxis)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );
    yAxisGroup.call(yAxis);
    dotGroup
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", function(d) {return yScale.rangeBand(d.violation)})
        .attr("width", function(d) {return xScale.rangeBand(d.cuisine)})
        .attr("x", 
              function(d) { return xScale(d.cuisine) })
        .attr("y", 
              function(d) { return yScale(d.violation) })
        .attr("fill", function(d, i) {return cScale(d.count)})
        .on("mouseover",function(){});  // Something for mouseover
}

//--------------------------------------------------------------------

d3.csv("https://raw.githubusercontent.com/NYU-CS6313-Fall16/NYC-Food-Inspection-5/master/assets/data/BK5200.csv", function(error, data){
    all_data = data;
    initializeMap();
    filterData(all_data, year);
    renderD3(filtered_data);
    heatMap(filtered_data);
});
