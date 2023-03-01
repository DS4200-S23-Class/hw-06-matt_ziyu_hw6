(function(){
	console.log("linked");
})();

// Create width and hieght for our frame
const WIDTH = 500;
const HEIGHT = 500;
const MARG = {left : 50, right : 50, top : 50, bottom : 50};

// Create the visualizations width and height
const VIS_HEIGHT = HEIGHT- MARG.top - MARG.bottom;
const VIS_WIDTH = WIDTH - MARG.left - MARG.right;

// Color the element in the table using the Species fill as d
function color (d){
	if (d == "setosa"){
        return 'blue';
    } else if (d == "versicolor") {
        return 'red';
    } else {
        return 'green';
    };
}

//Frame 1 with the height and width from above and call it svg1
const FRAME1 = 
d3.select("#vis1")
    .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("id", "svg1");

//Frame 2 with the height and width from above and call it svg2
const FRAME2 = 
d3.select("#vis2")
    .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("id", "svg2");

//Unpack the data named iris.csv in data
d3.csv("data/iris.csv").then((data) => { 


    // find max X and Y for the first graph
    const MAX_X_1 = d3.max(data, (d) => { return parseFloat(d.Sepal_Length)});
    const MAX_Y_1 = d3.max(data, (d) => { return parseFloat(d.Petal_Length)});

    // Create x and y scale 
    const X_SCALE_1 = d3.scaleLinear() 
            .domain([0, (MAX_X_1)])  
            .range([0, VIS_WIDTH]);
    const Y_SCALE_1 = d3.scaleLinear() 
            .domain([MAX_Y_1, 0]) 
            .range([0, VIS_HEIGHT]); 
    // Rename the element by svg0_1
    let svg0_1 = d3.select("#svg1");

    // For the circles append the points from data and change the scale to the scale for our graphs and our other points that users will input
    // select all the ciecle in all of the first graph
    let p_fig1 = svg0_1.selectAll("circle") 
        .data(data) // this is passed from  .then()
        .enter()  
        .append("circle")
        // This scale is what we came up with that matches our graph and the other points that the user enters
          .attr("cx", (d) => { return d.Sepal_Length * VIS_WIDTH / MAX_X_1 + MARG.left; }) // use Sepal_Length for cx
          .attr("cy", (d) => { return VIS_HEIGHT + MARG.top - d.Petal_Length * VIS_HEIGHT / MAX_Y_1; }) // use Petal_Length for cy
          .attr("r", 6)  // set r 
          .attr("fill", (d) => { return color(d.Species)}) // fill by color based on species
          .attr("class", "circle"); // Set the classas circle
    // add the x and y scale using Sepal_Length and Petal_Length
    svg0_1.append("g") 
          .attr("transform", "translate(" + MARG.left + 
                "," + (VIS_HEIGHT + MARG.top) + ")") 
          .call(d3.axisBottom(X_SCALE_1)) 
            .attr("font-size", '10px'); 
    svg0_1.append("g") 
          .attr("transform", "translate(" + MARG.left + 
                  "," + (MARG.top) + ")") 
            .call(d3.axisLeft(Y_SCALE_1))
            .attr("font-size", '10px') ; 


    // find max X and Y for graph 2
    const MAX_X = d3.max(data, (d) => { return parseFloat(d.Sepal_Width)});
    const MAX_Y = d3.max(data, (d) => { return parseFloat(d.Petal_Width)});

    // Create x and y scale for graph 2
    const X_SCALE = d3.scaleLinear() 
            .domain([0, (MAX_X)])  
            .range([0, VIS_WIDTH]);
    const Y_SCALE = d3.scaleLinear() 
            .domain([MAX_Y, 0]) 
            .range([0, VIS_HEIGHT]); 

    // rename the SVG2 as svg0
    let svg0 = d3.select("#svg2");


    // For the circles append the points from data and change the scale to the scale for our graphs and our other points that users will input
    // select all of the circl in the second graph
    let p_fig2 = svg0.selectAll("circle") 
        .data(data) // this is passed from  .then()
        .enter()  
        .append("circle")
            // This scale is what we came up with that matches our graph and the other points that the user enters
            .attr("cx", (d) => { return d.Sepal_Width * VIS_WIDTH / MAX_X + MARG.left; }) // use Sepal_Width for cx
            .attr("cy", (d) => { return VIS_HEIGHT + MARG.top - d.Petal_Width * VIS_HEIGHT / MAX_Y; }) // use Petal_Width for cy
            .attr("r", 6)  // set r 
            .attr("fill", (d) => { return color(d.Species)}) // fill by color related to the species 
            .attr("class", "circle");
   
    // add the x and y scale using Sepal_Width and Petal_Width
    svg0.append("g") 
            .attr("transform", "translate(" + MARG.left + 
                "," + (VIS_HEIGHT + MARG.top) + ")") 
            .call(d3.axisBottom(X_SCALE)) 
            .attr("font-size", '10px'); 
    svg0.append("g") 
            .attr("transform", "translate(" + MARG.left + 
                    "," + ( MARG.top) + ")") 
            .call(d3.axisLeft(Y_SCALE))
            .attr("font-size", '10px') ; 

    // Set the x and y scale for the third graph 
    const X_SCALE_3 =  d3.scaleBand()
    .range([0,VIS_WIDTH])
    .domain(data.map((d)=>{return d.Species}))
    .padding(0.3); 
    const Y_SCALE_3 = d3.scaleLinear().domain([0,50]).range([VIS_HEIGHT,0]);
    const B_WIDTH = 60;
        
    //Frame 2 with the height and width from above and call it vis3 an id as svg3
    const FRAME3 = 
    d3.select("#vis3")
        .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .attr("id", "svg3");

    //add the x and y axis 
    FRAME3.append("g")
            .attr("transform","translate(" + (MARG.bottom)+"," + (VIS_HEIGHT + MARG.bottom)+ ")")
            .call(d3.axisBottom(X_SCALE_3))
            .selectAll("text")
                .attr("font_size", '10px');
    FRAME3.append("g")
        .attr("transform", "translate("+ MARG.left+","+MARG.top +")")
        .call(d3.axisLeft(Y_SCALE_3))
        .selectAll("text")
            .attr("font-size", '10px');

    // select all the bar in the third graph and add all the bar in to the graph
    let p_fig3 =FRAME3.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", (d) => {return X_SCALE_3(d.Species) + MARG.left +11;})
        .attr("y", Y_SCALE_3(50) + MARG.top)
        .attr("width",B_WIDTH)
        .attr("fill", (d) => {return color(d.Species)})
        .attr("opacity", 0.01)
        .attr("height",  VIS_HEIGHT);

        // set up the brush
        svg0.call( d3.brush()// Add the brush feature using the d3.brush function
        .extent( [ [0,0], [WIDTH,HEIGHT] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
        );

        // Function that is triggered when brushing is performed
        function updateChart(event) {
        extent = event.selection
        // get all the element to be selected when brush brush over them 
        p_fig2.classed("selected", (d)=>{ return isBrushed(extent, X_SCALE(d.Sepal_Width) + MARG.left, Y_SCALE(d.Petal_Width) + MARG.top)})
        p_fig1.classed("selected", (d)=>{ return isBrushed(extent, X_SCALE(d.Sepal_Width) + MARG.left, Y_SCALE(d.Petal_Width) + MARG.top)})
        p_fig3. classed("selected", (d)=>{ return isBrushed(extent, X_SCALE(d.Sepal_Width) + MARG.left, Y_SCALE(d.Petal_Width) + MARG.top)})
        };

        // A function that return TRUE or FALSE according if a dot is in the selection or not
        function isBrushed(brush_coords, cx, cy) {
        let x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
        let ret = x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
        return ret;
            // This return TRUE or FALSE depending on if the points is in the selected area
        }
    });

