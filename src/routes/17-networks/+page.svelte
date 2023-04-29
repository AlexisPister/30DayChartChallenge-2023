<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";
    import * as d3 from 'd3';

    export let data;

    let neurons = data.neurons.data;
    let neuronToMuscle = data.muscles.data;
    console.log(neurons, neuronToMuscle)

    neurons = neurons.filter(n => n["Number of Connections"] > 5)

    let nodes = new Set()
    neurons.forEach(n => {
        nodes.add(n.Neuron)
        nodes.add(n.Target)
    })
    nodes = Array.from(nodes).map(n => {
        return {name: n, degree: 0}
    })
    neurons.forEach(n => {
        nodes.filter(d => d.name == n.Neuron)[0].degree += 1;
        nodes.filter(d => d.name == n.Target)[0].degree += 1;
    })

    nodes = nodes.sort((a, b) => a.degree - b.degree)

    // Visual variables
    let WIDTH = 1300;
    const HEIGHT = 1000;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}

    // const affiScale = d3.scaleOrdinal(d3.schemeSet2).domain(Object.keys(order).slice(0, -1).concat([undefined])).range(["#4377b9", "#e51b1a", '#f4d4a9', "#f0f001", "#3797af", "lightgray"])
    const color = d3.scaleOrdinal().domain(["exc", "inh"]).range(["rgb(176,161,89)", "rgb(165,114,215)"])
    // A linear scale to position the nodes on the X axis
    var x = d3.scalePoint()
        .range([0, WIDTH - margin.right - margin.left])
        .domain(nodes.map(n => n.name))

    let size = d3.scaleLog()
        .domain(d3.extent(nodes.map(n => n.degree)))
        .range([1, 7]);

    onMount(() => {
        render()
    })

    function render() {
        const svg = d3.select("svg")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)


        // Add the circle for the nodes
        let cells = svg
            .selectAll("mynodes")
            .data(nodes.sort(function (a, b) {
                return a.degree - b.degree
                // return +b.n - +a.n
            }))
            .join("circle")
            .attr("cx", function (d) {
                return (x(d.name))
            })
            .attr("cy", HEIGHT / 1.7)
            .attr("r", d => {
                return size(d.degree)
            })
            .style("fill", function (d) {
                // return "black"
                return "rgb(173,152,152)"
            })
        // .attr("stroke", "white")

        let links = svg
            .selectAll('mylinks')
            .data(neurons)
            .join('path')
            .attr('d', function (d) {
                let start = x(d.Neuron)    // X position of start node on the X axis
                let end = x(d.Target)      // X position of end node
                return ['M', start, HEIGHT / 1.7,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                    'A',                            // This means we're gonna build an elliptical arc
                    (start - end) / 2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                    (start - end) / 2, 0, 0, ',',
                    start < end ? 1 : 0, end, ',', HEIGHT / 1.7] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                    .join(' ');
            })
            .style("fill", "none")
            .attr("stroke", d => {
                return color(d.Neurotransmitter)
                return "grey"
            })
            .style("stroke-width", 1)

        renderLegend();
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
    :global(body) {
        /*font-family: Rasa;*/
        /*background-color: #428ad2;*/
        /*background-color: #311100;*/
        /*background-color: #474948;*/
        /*color: white;*/
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

</style>

<div id="container">
    <div id="main-text">
        <h1>
            Neural Network of C. Elegans
        </h1>
        <h3 id="subtitle">
            Each dot is a neuron. Each line represents a synapse. The neurons that have a low number of connections have
            been filtered out. The size of circles encodes the number of connections.
        </h3>
        <div id="data-source">
            Data Source: <a href="https://openworm.org/science.html">openworm.org</a>
            Layout: <a href="https://d3js.org/">D3JS</a><br>
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

