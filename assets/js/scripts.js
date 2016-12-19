//----------------------GLOBAL VARIABLES------------------------------
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
var selectedCuisines = "";
var selectedViolations = "";
var selectedGrades = "";

var all_data = [];
var filtered_data = [];
var dateformat = d3.time.format("%m/%d/%Y")

var cuisines = [
'American',
'Chinese',
'Latin',
'Italian',
'Mexican',
'Cafe/Coffee/Tea',
'Japanese',
'Caribbean',
'Bakery',
'Spanish',
'Chicken',
'Indian',
'Asian',
'Delicatessen',
'Jewish/Kosher',
'French',
'Hamburgers',
'Thai',
'Donuts',
'Korean',
'Mediterranean',
'Irish',
'Ice Cream',
'Sandwiches',
'Seafood',
'Middle Eastern',
'Tex-Mex',
'Greek',
'Vietnamese',
'Vegetarian',
'Peruvian',
'Russian',
'Steak',
'Eastern European',
'African',
'Turkish',
'Beverages',
'Soul Food',
'Continental',
'Barbecue',
'Pakistani',
'Salads',
'Bangladeshi',
'German',
'Fillipino',
'Creole',
'Tapas',
'Polish',
'Brazilian',
'Armenian',
'Hotdogs',
'Ethiopian',
'Australian',
'Moroccan',
'English',
'Afghan',
'Portugese',
'Egyptian',
'Indonesian',
'Cajun',
'Southwestern',
'Scandinavian',
'Chilean',
'Hawaiian',
'Polynesian',
'Czech',
'Iranian',
'Breakfast',
];

//-------------Initialization of the Map------------------------------

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
    
    populateCuisine();
    addListeners();
    var legendContent = "<i class='fa fa-circle gradeA'></i> Grade A"+
                                    "<i class='fa fa-circle gradeB'></i> Grade B" +
                                    "<i class='fa fa-circle gradeC'></i> Grade C" +
                                    "<i class='fa fa-circle gradeP'></i> Grade Pending";
    $('#map-legend').html(legendContent);
}

//--------------------------------------------------------------------

//-------------Adding Listeners to Dropdowns--------------------------

function addListeners(){
    $('#gradeSelect').on('changed.bs.select', function(e, clickedIndex, oldValue, newValue){
        selectedGrades = $(this).find("option:selected").text();
        filterAllSelections();
    });
    
    $('#violationSelect').on('changed.bs.select', function(e, clickedIndex, oldValue, newValue){
        selectedViolations = $(this).find("option:selected").text();
        filterAllSelections();
    });
    
    $('#cuisineSelect').on('changed.bs.select', function(e, clickedIndex, oldValue, newValue){
        selectedCuisines = $(this).find("option:selected").text();
        filterAllSelections();
    });
    
//    $('.switch-field label').on("click", function(){
//        setSelectedYear($(this).text());
//    });
}

function populateCuisine(){
    cuisines.sort();
    for(var i=0; i<cuisines.length; i++){
        $('#cuisineSelect').append("<option>"+cuisines[i]+"</option>")
    }
    $('#cuisineSelect').selectpicker('refresh');
}

//-----------------------------------------------------------------------

//-------------Filter Data Based on Grade Selection----------------------

function displayByGrade(gradeSelection){
        
    // Add Legend
    $('#map-legend').html('');
    var legendContent = "<i class='fa fa-circle gradeA'></i> Grade A"+
                                    "<i class='fa fa-circle gradeB'></i> Grade B" +
                                    "<i class='fa fa-circle gradeC'></i> Grade C" +
                                    "<i class='fa fa-circle gradeP'></i> Grade Pending";
    
    $('#map-legend').html(legendContent);
    
    // Create a Grade Selection String which contains all selected grades.
//    selectedGrades = "";
//    if(gradeSelection.includes("Grade A")){
//        selectedGrades += "A";
//    }
//    if(gradeSelection.includes("Grade B")){
//        selectedGrades += "B";
//    }
//    if(gradeSelection.includes("Grade C")){
//        selectedGrades += "C";
//    }
//    if(gradeSelection.includes("Grade Pending")){
//        selectedGrades += "P";
//    }
//    console.log(selectedGrades);
    
    // Call filter function to filter data based on selected grade
    var gradeFilteredData = filterByGrade(filtered_data, selectedGrades);
    
    // Render the filtered data
    renderD3(gradeFilteredData);
}

function filterByGrade(data, gradeString){
    if(gradeString === ""){
        return data;
    }
    
    gradeFilteredData = data.filter(function(d){
        return gradeString.includes(getGrade(d)["grade"]);
    });
    
    return gradeFilteredData;
}

//-------------Filter Data Based on Cuisine Selection----------------------

<<<<<<< HEAD
function getShortCuisine(inputCuisine){
    if(inputCuisine.includes('Cafe')||inputCuisine.includes('Tea')){
        return 'Cafe';
=======
function filterByGrade(data, gradeString){
    filtered_data = null;
    console.log("Performing filter by grade:");
    if(gradeString === ""){
        filterData(all_data,year);    
>>>>>>> origin/master
    }
    if(inputCuisine.includes('Latin')){
        return 'Latin';
    }
    else if(inputCuisine.includes('Pizza') || inputCuisine.includes('Italian')){
        return 'Italian';
    }
    else if(inputCuisine.includes('Ice Cream') || inputCuisine.includes('Yogurt')){
        return 'Ice Cream';
    }
    else if(inputCuisine.includes('Sandwich') || inputCuisine.includes('Salad')){
        return 'Sandwich';
    }
    else if(inputCuisine.includes('Juice') || inputCuisine.includes('Smoothies') || inputCuisine.includes('Bottled') || inputCuisine.includes('beverages')){
        return 'Beverages';
    }
    else if(inputCuisine.includes('Pancakes') || inputCuisine.includes('Waffles') || inputCuisine.includes('Bagels')){
        return 'Breakfast';
    }
    else if(inputCuisine.includes('Hotdogs')){
        return 'Hotdogs';
    }
    return inputCuisine;
}

function setSelectedCuisines(cuisineSelection){
    var cuisineFilteredData = filterByCuisine(filtered_data, cuisineSelection);
    renderD3(cuisineFilteredData);
}

function filterByCuisine(data, cuisineString){
    if(cuisineString === ""){
        return data;
    }
    
<<<<<<< HEAD
    var cuisineData = data.filter(function(d){
        return cuisineString.includes(getShortCuisine(d.values[0]['CUISINE DESCRIPTION']));
    });
=======
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
                    plotLineChart(d.values[0]["CAMIS"],d);
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
>>>>>>> origin/master
    
    return cuisineData;
}

//-------------------------------------------------------------------------

//-------------Filter Data Based on Violations Selection-------------------

function setSelectedViolations(violationSelection){
    
}
//-------------------------------------------------------------------------

//-------------Master Filter FUnction--------------------------------------
function filterAllSelections(){
    
//    console.log("Cuisine: "+selectedCuisines);
//    console.log("Grades: "+selectedGrades);
//    console.log("Violations: "+selectedViolations);
    
    var gradeSelection = selectedGrades;
    selectedGrades = "";
    if(gradeSelection.includes("A")){
        selectedGrades += "A";
    }
    if(gradeSelection.includes("B")){
        selectedGrades += "B";
    }
    if(gradeSelection.includes("C")){
        selectedGrades += "C";
    }
    if(gradeSelection.includes("P")){
        selectedGrades += "P";
    }
    
    if(selectedGrades === "" && selectedCuisines === "" && selectedViolations === ""){
        console.log("No Selection. Render All");
        renderD3(filtered_data);
    }
    else if(selectedGrades !== "" && selectedCuisines === "" && selectedViolations === ""){
        console.log("Only Grades Selected");
        displayByGrade(selectedGrades);
    }
    else if(selectedGrades === "" && selectedCuisines !== "" && selectedViolations === ""){
        console.log("Only Cuisines Selected")
        setSelectedCuisines(selectedCuisines);
    }
    else if(selectedGrades === "" && selectedCuisines === "" && selectedViolations !== ""){
        console.log("Only Violations Selected");
//         Yet To Write for Only Violations
    }
    else if(selectedGrades !== "" && selectedCuisines !== "" && selectedViolations === ""){
        console.log("Grades and Cuisines Selected");
        
        var masterFilteredData = filtered_data.filter(function(d){
            return selectedCuisines.includes(getShortCuisine(d.values[0]['CUISINE DESCRIPTION'])) &&
                         selectedGrades.includes(getGrade(d)["grade"]);
        });
        
        renderD3(masterFilteredData);
    }
    else if(selectedGrades === "" && selectedCuisines !== "" && selectedViolations !== ""){
        console.log("Cuisines and Violations Selected");
        
    }
    else if(selectedGrades !== "" && selectedCuisines === "" && selectedViolations !== ""){
        console.log("Grades and Violations Selected");
        
    }
    else if(selectedGrades !== "" && selectedCuisines !== "" && selectedViolations !== ""){
        console.log("All 3 Selected");
        
    }
    
    
}

//-------------------------------------------------------------------------



//--------------------Tooltip and Line Chart--------------------------

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
     var address = currentYear[0]['BUILDING']+", "+currentYear[0]['STREET']+",<br>"
                    +currentYear[0]['BORO']+", "+currentYear[0]['ZIPCODE'];
    
	var innerHTML = "<div class='tooltip_area'><div class='tooltip_header'>"+currentYear[0]['DBA']+"</div><br/>";

<<<<<<< HEAD
    innerHTML = innerHTML +"<div class='tooltip_inner_area'>"
                + "<div class='tooltip-address'><p>"+getShortCuisine(currentYear[0]['CUISINE DESCRIPTION']).toUpperCase()+"<br>"+address+"</p></div>"
				+"<div class='tooltip-image'><img src='"+getGrade(restaurant_data)['src']+"'></img></div>"
				+"<div class='tooltip-violation'><p>VIOLATIONS: "+violation+"<br>CRITICAL: "+critical+"</p></div>"
				+"</div></div>";
    
	return innerHTML;
=======
// Changed Function
function getGrade(d){
    var grade = "Z";
    var maxScore = 0;
    var month = 0;
    for(var i=0; i<d.values.length;i++){
        // Added a few more conditions here for grade with latest date
        if(d.values[i]['GRADE'] != '' && dateformat.parse(d.values[i]['INSPECTION DATE']).getFullYear() === year 
		&& dateformat.parse(d.values[i]['INSPECTION DATE']).getMonth() >= month && grade > d.values[i]['GRADE']){
            month = dateformat.parse(d.values[i]['INSPECTION DATE']).getMonth();
            grade = d.values[i]['GRADE'];    
        }
    }
    
    if(grade === "A"){
        return {color:"#214099", src:"assets/img/A.png", mon:month};
    }
    else if(grade === "B"){
        return {color:"#03A45E", src:"assets/img/B.png", mon:month};
    }
    else if(grade === "C"){
        return {color:"#F8A51B", src:"assets/img/C.png", mon:month};
    }
    else{
        return {color:"#A1A1A1", src:"assets/img/N.png", mon:month};
    }
>>>>>>> origin/master
}

<<<<<<< HEAD
=======



>>>>>>> origin/master
function plotLineChart(camis,restaurant_data){
	var margin = {top: 10, right: 40, bottom: 15, left: 5},
			width = 250 - margin.left - margin.right,
			height = 200 - margin.top - margin.bottom;
	var parseDate = d3.time.format("%m/%d/%y").parse;

	allData = all_data.filter(function(d){ return d['CAMIS']==camis});
	vals = d3.nest()
			.key(function(d) { return dateformat.parse(d['INSPECTION DATE']).getFullYear() })
			//.rollup(function(leaves) { return d3.max(leaves,function(d){return d['SCORE'];}); })
		.entries(allData);

	// wrote custom rollup code since d3 rollup function was driving me nuts..
	var rolled = []; 
	for(var i=0; i<vals.length; i++){
		var month = 0;
		var scores = [];
		for(j=0;j<vals[i].values.length;j++){
			if(dateformat.parse(vals[i].values[j]['INSPECTION DATE']).getMonth() >= month){
            			month = dateformat.parse(vals[i].values[j]['INSPECTION DATE']).getMonth();
            			scores.push(vals[i].values[j]['SCORE']) ;
        		}
		}
		rolled.push({key:vals[i].key, values:d3.max(scores)});
	}

	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5).tickSize("-175");

	var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(10).tickSize("-205");
		//.orient("left").ticks(d3.max(vals, function(d){return d.values})).tickSize("-155");

	var plot_svg = d3.select(".tooltip_area")
				.append("svg")
					.attr("width", width + margin.left + margin.right+ 25)
					.attr("height", height + margin.top + margin.bottom)
					.style("padding-left","50px")
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	x.domain([2013, 2017]);
	//y.domain([0, d3.max(vals, function(d) { console.log(d);return d.values; })]);
	y.domain([0, 80]);

	plot_svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	plot_svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);
		
	var valueline = d3.svg.line()
		.x(function(d) {   return x(d.key);})
		.y(function(d) { return y(+d.values); });
	
	plot_svg.append("path")
		.attr("d", valueline(rolled));

	plot_svg.selectAll("dot")
			.data(rolled)
			.enter().append("circle")
			.attr("r", 2.5)
			.attr("cx", function(d) { return x(d.key); })
			.attr("cy", function(d) { return y(+d.values); });

}

//--------------------------------------------------------------------

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

//--------------------Filter Data-------------------------------------

function getGrade(d){
    var grade = "P";
    var maxScore = 0;
    var month = 0;
    for(var i=0; i<d.values.length;i++){
        if(d.values[i]['GRADE'] != '' && dateformat.parse(d.values[i]['INSPECTION DATE']).getFullYear() === year 
		&& dateformat.parse(d.values[i]['INSPECTION DATE']).getMonth() >= month && grade > d.values[i]['GRADE']){
            month = dateformat.parse(d.values[i]['INSPECTION DATE']).getMonth();
            grade = d.values[i]['GRADE'];    
        }
    }
    
    var gradeColor = "";
    var imgSrc = "";
    
    if(grade == 'A'){
        gradeColor = "#214099";
        imgSrc = "assets/img/A.png";
    }
    else if(grade == 'B'){
        gradeColor = "#03A45E";
        imgSrc = "assets/img/B.png";
    }
    else if(grade == 'C'){
        gradeColor = "#F8A51B";
        imgSrc = "assets/img/C.png";
    }
    else{
        grade = 'P';
        gradeColor = "#A1A1A1"
        imgSrc = "assets/img/N.png";
    }
    return {color: gradeColor, src: imgSrc, mon: month, grade: grade};
}

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

//--------------------------------------------------------------------

//--------------------Render Data On Map------------------------------

function renderD3(data){
    data.forEach(function(d){
        d.LatLng = new L.LatLng(d.values[0]['LAT'], d.values[0]['LONG'])
    });
    
    var feature = g.selectAll("circle").data(data);
    
    feature.enter().append("circle")
                .attr("class","marker")
                .style("opacity", .8) 
                .attr("r", 3)
                .on("mouseover", function(d) {
                    var window_content = tooltipData(d.values[0]["CAMIS"],d);
                    div.html(window_content);
                    plotLineChart(d.values[0]["CAMIS"],d);
                    div.transition()		
                        .duration(100)
                        .style("opacity", 1)	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top",function(){
                            if(d3.event.pageY+150 > 580){
                                return d3.event.pageY-320+"px";
                            }
                            else{
                                return d3.event.pageY+"px"
                            }
                        });	
                })
                .on("mouseout", function() {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                })
                .style("fill", function(d){
                    return getGrade(d)['color'];
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

//--------------------------------------------------------------------

//--------------------Initial Data Load and Render--------------------

//https://raw.githubusercontent.com/NYU-CS6313-Fall16/NYC-Food-Inspection-5/master/
d3.csv("assets/data/BK5200.csv", function(error, data){
    all_data = data;
    initializeMap();
    filterData(all_data, year);
    renderD3(filtered_data);
    heatMap(filtered_data);
});


//----------------------MISC-------------------------------------------

//function setSelectedYear(yearValue){
//    year = parseFloat(yearValue);
//    
//    console.log("Displayng Data for year "+year);
//    filterData(all_data, year);
//    renderD3(filtered_data);
//}
