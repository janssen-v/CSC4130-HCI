class BarChart {
	constructor(_data){
	 this.margin = {top: 50, right: 50, bottom: 50, left: 50};
        this.width = 600 - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;

        this.data = _data;

        this.initVis();

	}

	initVis() {
		let vis = this;
		// Select HTML tag with a specific id ``bar", add a SVG container, and set the corresponding attributes.
		//Then add a group and make a translation (e.g., width and height).(5pts)
		// To DO

		vis.svg = d3.select("#bar")
			.append("svg")
			.attr("width", 600)
			.attr("height", 600)
			.append("g")
			.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


		// Create scales for x any y (15pts)
		// To DO
		vis.x = d3.scaleLinear()
			.domain([0,67.5])
			.range([0,vis.width]);
		vis.y = d3.scaleLinear()
			.range([vis.height,0]);


		// Place Axis (i.e., x-axis on the bottom and y-axis on the left)


        // Create a bursh variable (5pts). The "bursh" variable will call brushed function
        // To determine whether a brush action is trigger, we can use d3.event.selection to judge
        //so remember to pass this variable into the brushed function
		vis.brush = d3.brushX()
			.on("end", vis.brushed) 
			.extent([[0,0],[vis.width,vis.height]]);
			

        // To DO

        // Add label for y-axis

        vis.svg.append("text")
               .attr("class", "ylabel")
               .attr("y", -15 - vis.margin.left+15)
               .attr("x", 0 - (vis.height/2))
               .attr("dy", "1em")
               .attr("transform", "rotate(-90)")
               .style("text-anchor", "middle")
               .text("Number of kWhDelivered");

	}

	updateVis(){
		let vis = this;

		// Create a higtogram (5pts) hint: D3.histogram()
		// To DO
		vis.histogram = d3.histogram()
			.value(function(d) { return d.kWhDelivered; })
			.domain(vis.x.domain())
			.thresholds(vis.x.ticks(400));

		// Create bins from the histogram (5pts)
		
		vis.bins = vis.histogram(vis.data);

		// Set the domains for x and y axis (8pts).

		//vis.y.domain([0, d3.max(vis.bins, function(d) { return d.length;})]);
		vis.y.domain([0, d3.max(vis.bins, function(d) { return d.length; })]);
		vis.x.domain([0, d3.max(vis.bins, function(d) { return d.x1; })]);


		// Place Axis (i.e., x-axis on the bottom and y-axis on the left)
		
		vis.svg.append("g")
			.attr("transform", "translate(0," + vis.height + ")")
			.call(d3.axisBottom(vis.x));
		vis.svg.append("g")
			.call(d3.axisLeft(vis.y));		

		vis.renderVis();	
		
	}


	renderVis(){
		let vis = this;

		// draw the bar chart from the generated bins (10 pts)

		// To DO

		vis.svg.selectAll("rect")
			.data(vis.bins)
			.enter()
			.append("rect")
			.attr("class", "bar")
				.attr("x", 1)
				.attr("transform", function(d) {return "translate(" +vis.x(d.x0) + "," + vis.y(d.length) + ")";})
				//.attr("width", function(d) {return vis.x (d.x1) - vis.x(d.x0) -1 ;})
				.attr("width", function(d) {return vis.x (d.x1) - vis.x(d.x0);})
				.attr("height", function(d) {return vis.height - vis.y(d.length);})
				.style("fill", "#69b3a2");

		// Place x and y axis on the bottom and left, respectively
        // vis.xAxisFocusG.call(vis.xAxisFocus);
        // vis.yAxisFocusG.call(vis.yAxisFocus);

        // call the brush function

        // vis.brushG
        //   .call(vis.brush)
		// Call brushed function on brush end
		vis.brushG = vis.svg.append("g").attr("class", "brushG");
		vis.brushG
			.call(vis.brush);
	}

	brushed(){
		let vis = this;
		// To DO
		
		vis.selection = d3.brushSelection(vis);

		if (vis.selection) {
			console.log("Brushed");
			//Convert given pixel coordinates (range: [x0,x1]) into a kw (domain: [number,number]) (10pts)
			
			var startP = vis.selection[0];
			var endP = vis.selection[1];

			console.log("x0pixel = " + startP);
			console.log("x1pixel = " + endP);	
			
			var start = startP/barchart.width * 67.5;
			var end = endP/barchart.width * 67.5;

			console.log("x0 = " + start);
			console.log("x1 = " + end);	
		}

		// Update x-axis  accordingly (4pts)

		barchart.svg.selectAll("g").remove();
		barchart.svg.selectAll("rect").remove();

		barchart.svg
			.append("g")
			.attr("transform", "translate(" + barchart.margin.left + "," + barchart.margin.top + ")");


		// Create scales for x any y (15pts)
		// To DO
		barchart.x = d3.scaleLinear()

			.domain([start, end])
			.range([0,barchart.width]);
		barchart.y = d3.scaleLinear()
			.range([barchart.height,0]);

		barchart.svg.append("text")
			.attr("class", "ylabel")
			.attr("y", -15 - barchart.margin.left+15)
			.attr("x", 0 - (barchart.height/2))
			.attr("dy", "1em")
			.attr("transform", "rotate(-90)")
			.style("text-anchor", "middle")
			.text("Number of kWhDelivered");



	// Based on the selected region to filter the bins (5pts) Hint: use filter() function
		barchart.bins = barchart.bins.filter(function(d) {return d.x0 >= start && d.x1 <= end;});

		//vis.y.domain([0, d3.max(vis.bins, function(d) { return d.length;})]);
		barchart.y.domain([0, d3.max(barchart.bins, function(d) { return d.length; })]);

		// Place Axis (i.e., x-axis on the bottom and y-axis on the left)
		
		barchart.svg.append("g")
			.attr("transform", "translate(0," + barchart.height + ")")
			.call(d3.axisBottom(barchart.x));
		barchart.svg.append("g")
			.call(d3.axisLeft(barchart.y));		

		//Redraw the bar chart (10pts)
		barchart.renderVis();
    

    // Update y-axis accordingly (5pts)


    // vis.xAxisFocusG.call(vis.xAxisFocus);
    // vis.yAxisFocusG.call(vis.yAxisFocus);

	
  }
}