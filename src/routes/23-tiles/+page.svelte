<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";


    // Variables
    export let data;
    let mainData = data.data
    mainData = mainData.filter(d => d.Date.slice(-4) == "2021")
    console.log(mainData.map(d => d["Cold Shower"]))

    // Visual variables
    const WIDTH = 1300;
    const HEIGHT = 1000;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}


    onMount(() => {
        render()
    })

    function render() {
        let plot = Plot.plot({
            padding: 0,
            width: WIDTH - 200,
            height: HEIGHT - 500,
            y: {tickFormat: Plot.formatMonth("en", "short")},
            color: {type: "ordinal", domain: ["Yes", "No", "Not logged"], range: ["#91bfdb", "#fc8d59", "white"], legend:"swatches"},
            marks: [
                Plot.cell(mainData, {
                    x: (d) => new Date(d.Date).getUTCDate(),
                    y: (d) => new Date(d.Date).getUTCMonth(),
                    fill: "Cold Shower",
                    inset: 0.7
                })
            ]
        })
        document.querySelector("#graph").append(plot)
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
        font-size: 3.1em;
        /*font-size: 3.9em;*/
        /*margin-bottom: 10px;*/
        margin-bottom: 0;
        /*width: 80%;*/
        /*text-align: center;*/
    }

    #subtitle {
        margin: 0;
        margin-bottom: 0.2em;
    }

    /*#graph {*/
    /*    text-align: center;*/
    /*    align-content: center;*/
    /*}*/

    #data-source {
        /*padding-left: 4px;*/
    }

    #cold {
        color: #91bfdb;
    }

</style>

<div id="container">
    <div id="main-text">
        <h1>
            <span id="cold">Cold Showers</span> Calendar 2021
        </h1>
        <h3 id="subtitle">
            Cold showers seem to be more difficult during winter.
        </h3>
        <div id="data-source">
            Layout: <a href="https://observablehq.com/plot/">Observable Plot</a><br>
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

