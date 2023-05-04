<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";
    import * as d3 from 'd3';

    import Hare from "../../../static/data/21/hare.svelte"
    import LynxSVG from "../../../static/data/21/lynx.svelte"

    export let data;
    let DATA = data.data
    DATA = DATA.slice(0, -1)

    let years = DATA.map(d => new Date(d[0]))
    let hares = DATA.map(d => Number(d[1]))
    let lynx = DATA.map(d => Number(d[2]))

    let haresSlope = hares.slice(0, -1).map((d, i) => hares[i + 1] - d)
    let lynxSlope = lynx.slice(0, -1).map((d, i) => lynx[i + 1] - d)

    // Visual variables
    let WIDTH = 1300;
    // const HEIGHT = 1000;
    const HEIGHT = 700;
    const HEIGHT_SLOPE = HEIGHT / 4;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}
    let vWIDTH = WIDTH - margin.left - margin.right;
    let vHEIGHT = HEIGHT - margin.bottom - margin.top;
    let vHEIGHTSLOPE = HEIGHT_SLOPE - margin.bottom - margin.top;
    const strokeW = 2;

    const hareColor = "rgb(215,187,121)";
    const lynxColor = "rgb(180,96,43)";

    let xDomain: [number, number] = d3.extent(years);
    // let yDomain = [d3.min(lynx.concat(hares)), d3.max(lynx.concat(hares))];
    let yDomain = [0, d3.max(lynx.concat(hares))];

    console.log(d3.max(lynx.concat(hares)))

    // Construct scales and axes.
    // const xScale = d3.scaleLinear().domain(xDomain).range(vWIDTH);
    const xScale = d3.scaleLinear(xDomain, [0, vWIDTH]);
    const yScale = d3.scaleLinear(yDomain, [vHEIGHT, 0]);
    const xAxis = d3.axisBottom(xScale).ticks(vWIDTH / 80).tickSizeOuter(0).tickFormat(d3.timeFormat('%Y'));
    const yAxis = d3.axisLeft(yScale).ticks(vHEIGHT / 40);


    onMount(() => {
        render()
    })

    function render() {
        // Compute default domains.
        const svg = d3.select("#main")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        // Construct a line generator.
        const hareLine = d3.line()
            .curve(d3.curveLinear)
            .x((d, i) => xScale(years[i]))
            .y((d, i) => yScale(hares[i]));

        const lynxLine = d3.line()
            .curve(d3.curveLinear)
            .x((d, i) => xScale(years[i]))
            .y((d, i) => yScale(lynx[i]));

        svg.append("g")
            .attr("transform", `translate(0,${vHEIGHT})`)
            .call(xAxis);

        svg.append("g")
            .call(yAxis)
        // .call(g => g.select(".domain").remove())
        // .call(g => g.selectAll(".tick line").clone()
        //     .attr("x2", width - marginLeft - marginRight)
        //     .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", - margin.left)
            .attr("y", -7)
            .attr("fill", "currentColor")
            .attr("font-size", "16")
            .attr("text-anchor", "start")
            .text("Pop. Number"));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", hareColor)
            .attr("stroke-width", strokeW)
            .attr("d", hareLine(DATA));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", lynxColor)
            .attr("stroke-width", strokeW)
            .attr("d", lynxLine(DATA));

        // renderLegend();
        renderSlopes();
    }

    function renderSlopes() {
        // Compute default domains.
        const svg = d3.select("#slopes")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        const yScale = d3.scaleLinear(d3.extent(haresSlope.concat(lynxSlope)), [vHEIGHTSLOPE, 0]);
        const xAxis = d3.axisBottom(xScale).ticks(vWIDTH / 80).tickSizeOuter(0).tickFormat(d3.timeFormat('%Y'));
        // const yAxis = d3.axisLeft(yScale).ticks(vHEIGHTSLOPE / 40);
        const yAxis = d3.axisLeft(yScale).tickValues([0])


        // Construct a line generator.
        const hareLine = d3.line()
            .curve(d3.curveLinear)
            .x((d, i) => xScale(years[i]))
            .y((d, i) => yScale(haresSlope[i]));

        const lynxLine = d3.line()
            .curve(d3.curveLinear)
            .x((d, i) => xScale(years[i]))
            .y((d, i) => yScale(lynxSlope[i]));

        svg.append("g")
            .attr("transform", `translate(0,${vHEIGHT})`)
            .call(xAxis);

        svg.append("g")
            .call(yAxis)
            .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", - margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("font-size", "16")
            .attr("text-anchor", "start")
            .text("Growth Rate (Slope)"));


        // .call(g => g.select(".domain").remove())
        // .call(g => g.selectAll(".tick line").clone()
        //     .attr("x2", width - marginLeft - marginRight)
        //     .attr("stroke-opacity", 0.1))
        // .call(g => g.append("text")
        //     .attr("x", -marginLeft)
        //     .attr("y", 10)
        //     .attr("fill", "currentColor")
        //     .attr("text-anchor", "start")
        //     .text(yLabel));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", hareColor)
            .attr("stroke-width", strokeW)
            .attr("d", hareLine(DATA));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", lynxColor)
            .attr("stroke-width", strokeW)
            .attr("d", lynxLine(DATA));

        svg.append("line")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", xScale(d3.max(years)))
            .attr("y2", yScale(0))
            .attr("stroke-dasharray", 4)
    }

    function renderLegend() {
        let legend = d3.select("svg")
            .append("g")
            .attr("transform", `translate(500, 70)`)
        // .attr("color", "red")

        let marginRight = 500;
        let marginTop = 80;

        legend.append("text")
            .text("Synapse Type")
            .attr("transform", (d, i) => `translate(${marginRight - 4},10)`)
            .attr("fill", "white")
            .attr("font-size", "22px")

        // legend.selectAll(".dot")
        //     .data(affiliations)
        //     .join("rect")
        //     .attr("transform", (d, i) => `translate(${marginRight}, ${marginTop + i * 25})`)
        //     .attr("x", -7)
        //     .attr("y", -7)
        //     .attr("width", 10)
        //     .attr("height", 10)
        //     // .attr("x", (d, i) => `translate(${marginRight}, ${marginTop + i * 25})`)
        //     // .attr("y", (d, i) => `translate(${marginRight}, ${marginTop + i * 25})`)
        //     // .attr("cx", 100)
        //     // .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        //     // .attr("r", 7)
        //     .style("fill", function (d) {
        //         return affiScale(d)
        //     })
        //     .classed("dot", true)


        legend.selectAll(".llabel")
            .data(["exc", "inh"])
            .join("text")
            .attr("x", marginRight + 20)
            .attr("y", function (d, i) {
                return marginTop + i * 25
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) {
                return color(d)
            })
            .text(function (d) {
                if (d == "exc") return "Excitatory Synapses"
                if (d == "inh") return "Inhibitory Synapses"
            })
            // .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-style", "bold")
            .classed("llabel", true)
    }
</script>


<style>
    #container {
        display: flex;
        flex-direction: column;
        /*align-content: center;*/
        text-align: center;
        align-items: center;
        /*width: 60%;*/
        /*padding-left: 200px;*/
    }

    #main-text {
        /*padding: 20px;*/
        padding-top: 0;
        padding-bottom: 0;
        z-index: 2;
        /*text-align: justify;*/
        width: 70%;
    }

    h1 {
        font-size: 2.9em;
        /*font-size: 3.9em;*/
        /*margin-bottom: 10px;*/
        margin-bottom: 0;
        /*width: 80%;*/
        /*text-align: center;*/
    }

    #subtitle {
        margin: 0;
        margin-bottom: 0.2em;
        font-style: normal;
    }

    /*#graph {*/
    /*    text-align: center;*/
    /*    align-content: center;*/
    /*}*/

    #data-source {
        /*padding-left: 4px;*/
        font-size: 1.3em;
    }

    svg {
        /*background-color: #4d1b00;*/
        /*background-color: #462303;*/
    }

    #friends {
        font-size: 120%;
        padding-right: 10px;
        padding-left: 10px;
    }

    .icon {
        width: 100px;
    }

</style>

<div id="container">
    <div id="main-text">
        <h1>
            Prey-Predator Dynamics: Canadian hare and lynx populations
        </h1>
<!--        <h3 id="subtitle">-->
<!--            Hare and lync population are correlated and -->
<!--        </h3>-->
        <div id="data-source">
            Data Source: <a href="http://people.whitman.edu/~hundledr/courses/M250F03/M250.html">Fluctuations in the numbers of varying hare</a>
            Layout: <a href="https://d3js.org/">D3JS</a>
            Icons: <a href="https://www.phylopic.org/">Phylopic</a>
        </div>
    </div>
    <div id="graph">
        <svg id="main" width="{WIDTH}" height="{HEIGHT}">
            <g transform="translate({WIDTH - 200}, 0)" id="legend">
                <g transform="scale(0.1)" id="hare">
                    <Hare></Hare>
                </g>
                <g transform=" translate(0, 70) scale(0.1)" id="lynx">
                    <LynxSVG></LynxSVG>
                </g>
                <text fill="{hareColor}" x="70" y="40">Hare</text>
                <text fill="{lynxColor}" x="70" y="100">Lynx</text>
            </g>


        </svg>
        <svg id="slopes" width="{WIDTH}" height="{HEIGHT_SLOPE}">
        </svg>
    </div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

