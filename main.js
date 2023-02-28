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

function color (d){
	if (d == "setosa"){
        return 'blue';
    } else if (d == "versicolor") {
        return 'red';
    } else {
        return 'green';
    };
}
//Frame 1 with the height and width from above and call it vis0
const FRAME1 = 
d3.select("#vis1")
    .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("id", "svg1");
// It tells all the circles when its clicked to show the coordinates of the point
// Load in the scatter plot data and build the graph for it

//Frame 1 with the height and width from above and call it vis0
const FRAME2 = 
d3.select("#vis2")
    .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("id", "svg2");

d3.csv("data/iris.csv").then((data) => { 


     // find max X and Y
    const MAX_X_1 = d3.max(data, (d) => { return parseFloat(d.Sepal_Length)});
    const MAX_Y_1 = d3.max(data, (d) => { return parseFloat(d.Petal_Length)});

// Create x and y scale 
    const X_SCALE_1 = d3.scaleLinear() 
            .domain([0, (MAX_X_1)])  
            .range([0, VIS_WIDTH]);
    const Y_SCALE_1 = d3.scaleLinear() 
            .domain([MAX_Y_1, 0]) 
            .range([0, VIS_HEIGHT]); 

    let svg0_1 = d3.select("#svg1");

    // For the circles append the points from data and change the scale to the scale for our graphs and our other points that users will input
    let p_fig1 = svg0_1.selectAll("circle") 
        .data(data) // this is passed from  .then()
        .enter()  
        .append("circle")
        // This scale is what we came up with that matches our graph and the other points that the user enters
          .attr("cx", (d) => { return d.Sepal_Length * VIS_WIDTH / MAX_X_1 + MARG.left; }) // use x for cx
          .attr("cy", (d) => { return VIS_HEIGHT + MARG.top - d.Petal_Length * VIS_HEIGHT / MAX_Y_1; }) // use y for cy
          .attr("r", 6)  // set r 
          .attr("fill", (d) => { return color(d.Species)}) // fill by color
          .attr("class", "circle");
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


    // find max X and Y
    const MAX_X = d3.max(data, (d) => { return parseFloat(d.Sepal_Width)});
    const MAX_Y = d3.max(data, (d) => { return parseFloat(d.Petal_Width)});

// Create x and y scale 
    const X_SCALE = d3.scaleLinear() 
            .domain([0, (MAX_X)])  
            .range([0, VIS_WIDTH]);
    const Y_SCALE = d3.scaleLinear() 
            .domain([MAX_Y, 0]) 
            .range([0, VIS_HEIGHT]); 

    let svg0 = d3.select("#svg2");


    // For the circles append the points from data and change the scale to the scale for our graphs and our other points that users will input
    let p_fig2 = svg0.selectAll("circle") 
        .data(data) // this is passed from  .then()
        .enter()  
        .append("circle")
        // This scale is what we came up with that matches our graph and the other points that the user enters
            .attr("cx", (d) => { return d.Sepal_Width * VIS_WIDTH / MAX_X + MARG.left; }) // use x for cx
            .attr("cy", (d) => { return VIS_HEIGHT + MARG.top - d.Petal_Width * VIS_HEIGHT / MAX_Y; }) // use y for cy
            .attr("r", 6)  // set r 
            .attr("fill", (d) => { return color(d.Species)}) // fill by color
            .attr("class", "circle");
   

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


    const X_SCALE_3 =  d3.scaleBand()
    .range([0,VIS_WIDTH])
    .domain(data.map((d)=>{return d.Species}))
    .padding(0.3);

const Y_SCALE_3 = d3.scaleLinear().domain([0,50]).range([VIS_HEIGHT,0]);
const B_WIDTH = 60;
    //Frame 1 with the height and width from above and call it vis0
const FRAME3 = 
d3.select("#vis3")
    .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("id", "svg3");



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


    svg0.call( d3.brush()                 // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [WIDTH,HEIGHT] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    )
    // Function that is triggered when brushing is performed
    function updateChart(event) {
    extent = event.selection
    p_fig2.classed("selected", (d)=>{ return isBrushed(extent, X_SCALE(d.Sepal_Width) + MARG.left, Y_SCALE(d.Petal_Width) + MARG.top)})
    p_fig1.classed("selected", (d)=>{ return isBrushed(extent, X_SCALE(d.Sepal_Width) + MARG.left, Y_SCALE(d.Petal_Width) + MARG.top)})
    p_fig3. classed("selected", (d)=>{ return isBrushed(extent, X_SCALE(d.Sepal_Width) + MARG.left, Y_SCALE(d.Petal_Width) + MARG.top)})
    }

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

