<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";


    // Variables
    export let data;
    let mainData = data.data
    console.log(Object.keys(mainData[0]))
    console.log(mainData)
    mainData = mainData.filter(d => d.Species)

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
            style: {fontSize: "11px"},
            color: {
                type: "categorical",
                scheme: "dark2",
                legend: true,
                // nice: true,
            },
            marks: [
                Plot.dot(mainData, {
                    // x: "release_date",
                    // x: "SepalWidthCm",
                    x: "SepalLengthCm",
                    // y: "vote_average",
                    // y: "SepalLengthCm",
                    y: "SepalWidthCm",
                    fill: "Species",
                    r: 3
                }),
                Plot.density(mainData, {x: "SepalLengthCm", y: "SepalWidthCm", bandwidth:20, fillOpacity: 0.1, stroke: "Species", strokeWidth: 0.8, strokeOpacity: 0.8}),
                Plot.linearRegressionY(mainData, {x: "SepalLengthCm", y: "SepalWidthCm", stroke: "Species", strokeWidth: 2.5, ci: null}),
                Plot.linearRegressionY(mainData, {x: "SepalLengthCm", y: "SepalWidthCm", strokeWidth: 2.5, ci: null})
            ],
            y: {
                type: "linear",
            },
            x: {
                type: "linear",
            },
            marginBottom: 40,
            marginLeft: 60,
            width: WIDTH - 200,
            height: HEIGHT - 200
        })

        document.querySelector("#graph").append(plot)
    }
</script>


<style>
    :global(body) {
        /*font-family: Rasa;*/
        /*background-color: #428ad2;*/
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
        font-size: 2.7em;
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

    /*svg {*/
    /*    display: flex;*/
    /*}*/

    .yellow {
        color: #feed01;
    }

    .blue {
        color: #36a9e0;
    }

    .red {
        color: #e30713;
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
            Simpson's Paradox with Iris dataset
        </h1>
        <h3 id="subtitle">
            The Sepal width of Iris flowers is positively correlated with sepal length but inversely correlated when looking at Iris species individually.
        </h3>
        <div id="data-source">
            Data Source: Iris dataset
            Layout: <a href="https://altair-viz.github.io/index.html">Observable Plot</a><br>
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

