<script lang="ts">
    import * as d3 from "d3";
    import {onMount} from "svelte";

    export let data;
    let planetsData = data.planets

    // variables
    let svg;


    // visual variables
    const WIDTH = 1900;
    const HEIGHT = 900;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {
        right: 180
    }

    onMount(() => {
        render();
    })

    function render() {
        const x = WIDTH / 2;
        const y = WIDTH / 2;

        const svg = d3.select("svg")
            .append("g")
            .attr("transform", `translate(-${(WIDTH / 2) - 300}, 0)`)
        // .attr("viewBox", [-200, -150, WIDTH, HEIGHT]);

        let NHUMANS = 8026492406;
        let diameterScale = d3.scaleLog().domain([1000, 696340 * 2]).range([2, 28])
        // let distanceScale = d3.scalePow().exponent(0.2).domain([1, 6000]).range([1, WIDTH - 300])
        // let distanceScale = d3.scaleLog().domain([2000, 696340 * 2]).range([2, 28])
        let popScale = d3.scaleSequential(d3.interpolateSpectral).domain([-1, 8026492406])
        // let popScale = d3.scaleSequential(d3.interpolateCividis).domain([-1, 8026492406])

        // sun
        svg.append("circle")
            // .attr("r", 20)
            .attr("r", diameterScale(696340 * 2))
            .attr("cx", WIDTH / 2)
            .attr("cy", HEIGHT / 2)
            .attr("id", "sun")
            .attr("fill", "rgba(72,47,11,0.5)")

        // let distanceScale = d3.scaleLinear().domain()
        // let distanceScale = d3.scaleLinear().domain([2000, 15000]).range([2, 10])
        const scaleFactor = 120;

        const orbit = svg
            .selectAll(".orbit")
            .data(planetsData)
            .join("circle")
            .attr("cx", (WIDTH / 2))
            .attr("cy", HEIGHT / 2)
            .attr("r", d => calculate_orbit(d))
            .classed("orbit", true)
            .style("fill", "none")
            // .style("stroke", "gray")
            .style("stroke", "lightgray")

        let planets = svg.selectAll(".planet")
            .data(planetsData)
            .join("circle")
            .classed("planet", true)
            // .attr("r", (d) => 8)
            .attr("r", (d) => diameterScale(d.diameter))
            .attr("cx", d => (WIDTH / 2) + calculate_orbit(d))
            .attr("cy", HEIGHT / 2)
            .attr('fill', d => {
                let val = 0;
                if (d.planet == "Earth") {
                    val = 8026492406
                }
                return popScale(val)
            })
            // .attr('stroke', d => d.color)
            .attr('stroke', d => {
                if (d.planet == "Earth") return "black"
                return "none"
            })
            .attr('stroke-width', 1)
        // .attr("r", d => calculate_orbit(d))

        let names = svg.selectAll(".name")
            .data(planetsData)
            .join("text")
            .classed("name", true)
            .attr("x", d => ((WIDTH / 2) + calculate_orbit(d)) - diameterScale(d.diameter))
            .attr("y", d => {
                if (d.planet == "Venus" || d.planet == "Mars") {
                    return HEIGHT / 2 + 22
                }
                return HEIGHT / 2 - 22
            })
            .text(d => d.planet)
            .attr("color", "white")
            .attr("font-size", 18)
            .attr("fill", "white")


        // LEGEND
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient");

        linearGradient.selectAll("stop")
            .data(popScale.ticks().map((t, i, n) => ({offset: `${100 * i / n.length}%`, color: popScale(t)})))
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        let margin = {bottom: 50, left: 20, right: 20}
        let barHeight = 20;
        let width = 300
        svg.append('g')
            .attr("transform", `translate(${WIDTH / 2},${HEIGHT - margin.bottom - barHeight})`)
            .append("rect")
            .attr('transform', `translate(${margin.left}, 0)`)
            .attr("width", width - margin.right - margin.left)
            // .attr("width", WIDTH - margin.right - margin.left)
            .attr("height", barHeight)
            .style("fill", "url(#linear-gradient)");


        let axisScale = d3.scaleLinear()
            .domain(popScale.domain())
            .range([margin.left, width - margin.right])

        const axisBottom = g => g
            .attr("class", `x-axis`)
            // .attr("transform", `translate(0,${HEIGHT - margin.bottom})`)
            // .call(d3.axisBottom(axisScale)
            .call(d3.axisTop(axisScale)
                // .ticks(width / 80)
                .tickValues([0, 8026492406])
                // .ticks([1, 200, ])
                .tickSize(0))

        svg.append('g')
            .attr("transform", `translate(${WIDTH / 2},${HEIGHT - margin.bottom - barHeight})`)
            .call(axisBottom)
            .attr("font-size", 18)
            .attr("color", "white")

        svg.append('g')
            .attr("transform", `translate(${WIDTH / 2},${HEIGHT - margin.bottom - barHeight})`)
            .append("text")
            .text("Number of human inhabitants")
            .attr("y", + 42)
            .attr("x", 19)
            .attr("font-size", 18)
            .attr("fill", "white")

        function calculate_orbit(d) {
            // console.log(d)
            // return Math.sqrt(d.distance_from_sun * scaleFactor);
            return Math.sqrt(d.distance_from_sun) * 15;
        }
    }
</script>

<svelte:head>
    <style>
    body {
        background-color: rgba(18, 31, 65, 1);
        /*background-color: rgba(18, 5, 59, 0.95);*/
        color: white;
    }
  </style>
</svelte:head>


<style>
    a {
        color: white;
    }

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
        padding: 20px;
        padding-top: 0;
        z-index: 2;
        /*text-align: justify;*/
        width: 70%;
    }

    h1 {
        font-size: 2.7em;
        /*font-size: 3.9em;*/
        margin-bottom: 10px;
        /*width: 80%;*/
        /*text-align: center;*/
    }

    /*#graph {*/
    /*    text-align: center;*/
    /*    align-content: center;*/
    /*}*/

    #data-source {
        /*padding-left: 4px;*/
    }

    /*svg {*/
    /*    display: flex;*/
    /*}*/
</style>

<div id="container">
    <div id="main-text">
        <h1>
            Number of human inhabitants per planet of the solar system (04/08/2023).
        </h1>
        <div id="data-source">
            Data Source: <a href="https://www.worldometers.info/world-population/" style="padding-right: 8px">Worldometers</a>
            Layout: <a href="https://altair-viz.github.io/index.html">D3JS</a><br>
            Planets' diameters are on a logarithmic scale, and their distances to the sun are on a square root scale.
        </div>
    </div>
    <div id="graph">
        <svg width="{WIDTH}" height="{HEIGHT}">
        </svg>

    </div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

