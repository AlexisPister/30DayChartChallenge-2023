<script lang="ts">
    import * as d3 from "d3";
    import {onMount} from "svelte";
    import {base} from "$app/paths";
    import * as Plot from "@observablehq/plot";
    import type {PlotOptions} from "@observablehq/plot";
    import {color} from "d3";

    // source https://data.worldbank.org/indicator/IT.CEL.SETS.P2?view=chart
    // 2005 2021
    let data = [
        {name: "Fix", 2005: 19, 2021: 11},
        {name: "Mobile", 2005: 34, 2021: 110}
    ];

    // visual variables
    const WIDTH = 1800;
    const HEIGHT = 1400;

    const COLORS = ["#66c2a5", "#fc8d62"]

    const margin = {
        right: 180
    }

    // variables
    let svg;


    onMount(() => {
        render()

        d3.select("#fix").style("color", colorsScale.Fix)
        d3.select("#mobile").style("color", colorsScale.Mobile)
    })


    let colorsScale = {
        Fix: COLORS[0],
        Mobile: COLORS[1]
    }


    function render() {
        console.log(data)
        let p = Plot.plot({
                width: WIDTH / 2,
                height: 500,
                marginLeft: 120,
                marginRight: 120,
                style: {
                    fontSize: 26,
                    backgroundColor: "#f4efff",
                    display: "flex"
                },
                x: {
                    axis: "top",
                    ticks: [2005, 2021],
                    tickFormat: "",
                },
                y: {
                    label: "% change in year",
                    domain: [0, 140],
                    axis: null
                },
                // caption: `Comparing the % population change in 2019 vs 2020.`,
                marks: [
                    // Plot.axisX({fontSize: 16}),
                    Plot.link(data, {
                        x1: 2005,
                        y1: "2005",
                        x2: 2021,
                        y2: "2021",
                        stroke: d => colorsScale[d.name],
                        strokeWidth: 5
                    }),
                    // Plot.ruleY([0]),
                    Plot.text(data, {
                        x: 2005,
                        y: "2005",
                        text: (d) =>
                            `${d.name}: ${(d[2005])}`,
                        textAnchor: "end",
                        dx: -5,
                        fill: d => colorsScale[d.name],
                        fontSize: 22
                    }),
                    Plot.text(data, {
                        x: 2021,
                        y: "2021",
                        text: (d) => d[2021],
                        textAnchor: "start",
                        dx: 5,
                        fill: d => colorsScale[d.name],
                        fontSize: 22
                    })
                ]
            } as PlotOptions)

        d3.select(p).style("display", "unset");
        document.querySelector("#graph").append(p)
    }
</script>

<svelte:head>
    <style>
    body {
        background-color: #f4efff;
    }
  </style>
</svelte:head>

<style>
    #container {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        width: 60%;
        /*padding-left: 200px;*/
    }

    #main-text {
        padding: 20px;
        padding-top: 0;
        z-index: 2;
        /*text-align: justify;*/
    }

    h1 {
        font-size: 3em;
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
            Evolution of <span id="mobile">mobile cellular</span> subscriptions and <span
                id="fix">fixed telephone</span> subscriptions between 2005 and 2021 (per 100 people).
        </h1>
        <div id="data-source">
            Data Source: <a href="https://data.worldbank.org/indicator/IT.MLT.MAIN.P2?view=chart">data.worldbank.org</a><br>
            Layout: Observable Plot
        </div>
    </div>
<!--    <div>-->
<!--        <svg>-->
<!--            <rect x="0" y="0" width="10" height="10"></rect>-->
<!--        </svg>-->
<!--    </div>-->

    <div id="graph">
    </div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

