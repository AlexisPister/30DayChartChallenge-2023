<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";
    import * as d3 from 'd3';

    export let data;

    let map = data.map;
    let imports = data.imports.data;
    let exports = data.exports.data;
    let world = data.world;

    exports = exports.filter(d => d.length > 1).map(d => {
        let name = d[0]
        if (name.includes("Kosovo")) name = "Kosovo";
        if (name.includes("Germany")) name = "Germany";
        return {name: name, exports: d[1]}
    })
    imports = imports.filter(d => d.length > 1).map(d => {
        let name = d[0]
        if (name.includes("Kosovo")) name = "Kosovo";
        if (name.includes("Germany")) name = "Germany";
        return {name: name, imports: d[1]}
    })

    map.features = map.features.filter(d => {
        // return d.properties.NAME == "France"
        // return d.properties.CONTINENT == "Europe"
        return d
    })

    const europeBbox = [
        [-23, 34],
        [36, 66]
    ]

    console.log(imports, exports)

    imports.push({name: "Argentina", imports: "209"})
    exports.push({name: "Argentina", exports: "10"})

    let final = bertin.merge(map, "NAME", imports, "name", false)
    final = bertin.merge(final, "NAME", exports, "name", false)
    console.log("ff ", final)

    // Visual variables
    let WIDTH = 1350;
    // let WIDTH = 1300;
    const HEIGHT = 1000;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}

    onMount(() => {
        render()
    })

    function render() {
        d3.select("#graph").node().appendChild(
            bertin.draw({
                params: {
                    background: "#3d5a94",
                    margin: 20,
                    projection: "Mercator",
                    width: WIDTH,
                    extent: europeBbox
                },
                layers: [
                    {
                        type: "mushroom",
                        geojson: final,
                        top_values: "exports",
                        bottom_values: "imports",
                        k: 40,
                        // bottom_tooltip: {
                        //     fields: ["$name", "$pop", "(thousands inh.)"],
                        //     col: "#4fabd6"
                        // },
                        // top_tooltip: {fields: ["$name", "$gdp", "(million $)"], col: "#d64f4f"},
                        top_fill: "#af8dc3",
                        bottom_fill: "#7fbf7b",
                        leg_x: 400,
                        leg_y: 30,
                        // leg_title: "Imports (bottom) and exports (top) of goods and services in % of GDP",
                        leg_title: " ",
                        leg_top_fill: "#af8dc3",
                        leg_bottom_fill: "#7fbf7b",
                        leg_top_txt: "Exports (% of GDP)",
                        leg_bottom_txt: "Imports (% of GDP)",
                        leg_fontSize2: 18,
                        leg_txtcol: "white"
                    },
                    {type: "layer", geojson: map, fill: "rgb(192,158,130)"}
                    // {type: "outline"},
                    // {type: "graticule"}
                ]
            })
        )

//         bertin.draw({
//             params: {
//                 extent: africa,
//                 margin: 30,
//                 background: "#bde1f0"
//             },
//             layers: [
//                 {
//                     type: "header",
//                     text: `Unequal distribution of wealth in Africa`,
//                     fontSize: 36
//                 },
//                 {
//                     type: "mushroom",
//                     geojson: final,
//                     top_values: "gdp_pct",
//                     bottom_values: "pop_pct",
//                     k: k,
//                     bottom_tooltip: {
//                         fields: ["$name", "$pop", "(thousands inh.)"],
//                         col: "#4fabd6"
//                     },
//                     top_tooltip: {fields: ["$name", "$gdp", "(million $)"], col: "#d64f4f"},
//                     leg_x: 150,
//                     leg_y: 500,
//                     leg_title: "Wealth and population, 2021",
//                     leg_top_fill: "none",
//                     leg_bottom_fill: "none",
//                     leg_top_txt: "GDP (%)",
//                     leg_bottom_txt: "Inhabitants (%)",
//                     leg_fontSize: 17
//                 },
//                 {
//                     type: "text",
//                     position: [150, 705],
//                     baseline: "hanging",
//                     fontSize: 9,
//                     text: `GDP and population data are from the World Bank.
// To make them comparable, the data has been converted
// to a percentage of total African countries. `
//                 },
//                 {type: "layer", geojson: africa, fill: "#f5d482"},
//                 {type: "shadow", geojson: africa, dx: 5, dy: 5},
//                 {type: "layer", geojson: world, fill: "#e0d0b6"},
//                 {type: "scalebar"}
//             ]
//         })
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
        font-size: 3em;
        /*font-size: 2.9em;*/
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
            European countries imports and exports of goods and services in % of GDP in 2022.
        </h1>
<!--        <h3 id="subtitle">-->
<!--            Each dot is a neuron. Each line represents a synapse. The neurons that have a low number of connections have-->
<!--            been filtered out. The size of circles encodes the number of connections.-->
<!--        </h3>-->
        <div id="data-source">
            Data Source: <a href="https://ec.europa.eu/eurostat/en/">Eurostat</a>
            Layout: <a href="https://observablehq.com/@neocartocnrs/hello-bertin-js?collection=@neocartocnrs/bertin">Bertin.js</a><br>
        </div>
    </div>
    <div id="graph">
        <!--        <svg width="{WIDTH}" height="{HEIGHT}">-->
        <!--        </svg>-->
    </div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

