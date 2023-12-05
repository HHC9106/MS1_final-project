const marginPage = ({ top: 0, right: 10, bottom: 0, left: 10 })
const widthPage = document.querySelector(".circlebar").clientWidth;
const heightPage = document.querySelector(".circlebar").clientHeight;
const ycenter = heightPage / 2;
const tooltip = d3.select("body").append("div").attr("class", "tooltip");


var svg = d3.select(".circlebar")
    .append("svg")
    .attr("width", widthPage - marginPage.left - marginPage.right)
    .attr("height", heightPage + marginPage.top + marginPage.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginPage.left + "," + marginPage.top + ")");



d3.csv('./data/data_quali/circleData_donateYear.csv').then(function (data) {
    const circleWidth = widthPage / data.length;
    console.log(data)

    // Define the arrowhead marker
    svg.append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('markerWidth', 50)
        .attr('markerHeight', 50)
        .attr('refX', 8)
        .attr('refY', 5)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M0,0 L0,10 L10,5 Z')
        .attr('fill', 'black');

    // Draw a dashed line with an arrow to the right
    svg.append('line')
        .attr('x1', 0)
        .attr('y1', ycenter)
        .attr('x2', widthPage)
        .attr('y2', ycenter)
        .attr('stroke', 'darkgrey')
        .attr('stroke-dasharray', '8,4') // Dashed line
        .attr('stroke-width', '2')
        .attr('marker-end', 'url(#arrowhead)'); // Arrowhead marker

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => i * circleWidth + circleWidth / 3) // Equally distribute circles
        .attr('cy', ycenter) // Center the circles vertically
        .attr('r', d => Math.sqrt(+d.counts) / 2) // Set the radius based on the data
        .attr('fill', 'lightgrey')
        .attr('stroke', 'grey')
        .attr('text', d => d.Year)
        .on("click", (e, d) => {
            console.log(d)
            let yearname = `${d.Year}`;
            tooltip
                .html(yearname).style("visibility", "visible")
                .style("top", e.pageY - (tooltip.node().clientHeight + 5) + "px")
                .style("left", e.pageX - tooltip.node().clientWidth / 2.0 + "px");;
        });

    // Add text elements for the year titles
    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => i * circleWidth + circleWidth / 3)
        .attr('y', ycenter + 90) // Adjust this value based on your layout
        .attr('text-anchor', 'middle')
        .text(d => d.Year)
        .classed('circle-title', true);

});

