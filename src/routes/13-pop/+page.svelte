<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";


    // Variables
    export let data;
    const mainData = data.data
    console.log(Object.keys(mainData[0]))


    let mainData2 = mainData
    // let mainData2 = []
    // mainData.forEach(d => {
    //     if (d.genres && d.genres.length > 0) {
    //         let mainGenre = JSON.parse(d.genres)[0];
    //         if (mainGenre) {
    //             d["mainGenre"] = mainGenre.name
    //             mainData2.push(d)
    //         }
    //     }
    // })
    // mainData2 = mainData2.filter(d => !["Western", "Documentary", "Music", "War", "Foreign", "Family", "Crime", "History"].includes(d.mainGenre))
    mainData2 = mainData2.filter(d => d.revenue > 5000 && d.budget > 5000)

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
                type: "linear",
                scheme: "warm",
                legend: true,
                nice: true,
                label: "TMDB average rating",
            },
            marks: [
                Plot.dot(mainData2, {
                    // x: "release_date",
                    x: "budget",
                    // y: "runtime",
                    // y: "vote_average",
                    y: "revenue",
                    // fill: "mainGenre",
                    fill: "vote_average",
                    r: 3
                }),
                // Plot.linearRegressionY(mainData2, {x: "release_date", y: "runtime", stroke: "mainGenre"}),
                // Plot.linearRegressionY(mainData2, {x: "release_date", y: "runtime"})
                Plot.linearRegressionY(mainData2, {x: "budget", y: "revenue", stroke: "mainGenre"}),
                Plot.linearRegressionY(mainData2, {x: "budget", y: "revenue"}),
                Plot.text(mainData2, {
                    text: d => d.original_title,
                    filter: d => d.revenue > 1000000 && d.budget < 80000,
                    x: "budget",
                    y: "revenue",
                    clip: true,
                    dy: -14,
                    lineWidth: 12,
                    fill: "black"
                }),
                Plot.text(mainData2, {
                    text: d => d.original_title,
                    filter: d => d.revenue < 100000 && d.budget > 10000000,
                    x: "budget",
                    y: "revenue",
                    dy: -14,
                    // facetAnchor: "bottom",
                    // dx: 10,
                    clip: true,
                    // lineWidth: 10,
                    fill: "black"
                })
            ],
            y: {
                // nice: true,
                type: "log",
                // domain: [20, 220]
                domain: [5000, 1000000000]
            },
            x: {
                // type: "utc",
                // nice: true,
                type: "log",
                domain: [5000, 1000000000]
                // domain: [new Date("1990-01-01"), new Date("2020-01-01")]
            },
            marginBottom: 40,
            marginLeft: 60,
            width: WIDTH,
            height: HEIGHT
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
            Movie revenue is positively correlated with the budget.
        </h1>
        <h3 id="subtitle">
            <i>The Blair Witch Project</i> is the best movie investement while <i>Foodfight!</i> is the worst (in this sample of 5000 movies).
        </h3>
        <div id="data-source">
            Data Source: <a href="https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata?select=tmdb_5000_movies.csv"
                            style="padding-right: 8px">TMDB 5000 Movie dataset</a>
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

