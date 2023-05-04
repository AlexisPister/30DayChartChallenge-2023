<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";


    // Variables
    export let data;
    const friendsEpisodes = data.imdb.data;

    // let mainV = "US Viewership (in millions)";
    let mainV = "imdb_rating";
    let SEASON = "season";
    console.log(friendsEpisodes)

    // Visual variables
    const WIDTH = 1300;
    const HEIGHT = 1000;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}


    onMount(() => {
        render()

    })

    // $: render();


    function render() {
        let plot = Plot.plot({
            style: {fontSize: "14px"},
            color: {
                type: "categorical",
                scheme: "set3",
                // range: ["#7851A9", "#DC861A", "#654321", "#3F00FF", "#155D37", "#FAEB07", "#8B0000"]
            },
            marks: [
                Plot.frame(),
                // Plot.ruleX([Math.floor(d3.min(friendsEpisodes.map(d => d[mainV])))]),
                Plot.areaY(
                    friendsEpisodes,
                    Plot.binX(
                        {
                            y: 'count'
                        },
                        {
                            x: mainV,
                            fill: 'season',
                            thresholds: 12,
                            curve: "basis"
                        }
                    )
                ),
                Plot.dot(
                    friendsEpisodes,
                    Plot.stackY({
                        offset: null,
                        // title: d => d.hours + ' hours',
                        x: mainV,
                        // fill: SEASON,
                        fill: "black",
                        r: 2,
                        stroke: "gray"
                    })
                    // {
                    //     x: mainV,
                    //     // y: "count",
                    //
                    //     fill: 'season',
                    //     stroke: null,
                    //     r: 3
                    // }
                ),
                Plot.text(friendsEpisodes, {
                    text: d => d.title,
                    filter: d => d[mainV] > 9.3 || d[mainV] < 7.5,
                    x: mainV,
                    y: 2.4,
                    clip: true,
                    lineWidth: 12,
                    fill: "gray"
                })
                // Plot.text(friendsEpisodes, {filter: d => d.year % 5 === 0, x: "miles", y: "gas", text: d => `${d.year}`, dy: -8})
                // boxPlot()
            ],
            fy: {
                padding: 0.2,
                domain: d3.range(1, 11).map(n => n.toString())
            },
            facet: {
                data: friendsEpisodes,
                // marginBottom: 200,
                // marginTop: 100,
                y: 'season',
                marginRight: 80
            },
            y: {
                // ticks: 3,
                // tickFormat: d => d < 0 ? '' : d,
                // tickSize: 20,
                ticks: [0, 3, 6]
                // nice: true
            },
            x : {
                nice: true,
                domain: [5, 10]
            },
            marginBottom: 40,
            width: WIDTH,
            height: HEIGHT
        })

        document.querySelector("#graph").append(plot)
    }

    function boxPlot() {
        const boxPlotOffset = 10;
        const boxPlotSize = 10;
        const maxTotal = 100;

        const upperQuartile = d => d3.quantile(d, 0.75)
        const lowerQuartile = d => d3.quantile(d, 0.25)
        const upperWhisker = d => Math.min(d3.max(d), upperQuartile(d) + 1.5 * iqr(d))
        const lowerWhisker = d => Math.max(d3.min(d), lowerQuartile(d) - 1.5 * iqr(d))
        const iqr = d => upperQuartile(d) - lowerQuartile(d)

        return [
            Plot.ruleX(
                friendsEpisodes,
                Plot.groupZ(
                    {
                        x: 'median'
                    },
                    {
                        x: mainV,
                        y1: -boxPlotOffset - boxPlotSize * maxTotal / 100 / 2,
                        y2: -boxPlotOffset + boxPlotSize * maxTotal / 100 / 2,
                        strokeWidth: 2,
                        stroke: '#333333'
                    }
                )
            ),
            Plot.rectX(
                friendsEpisodes,
                Plot.groupZ(
                    {
                        x1: lowerQuartile,
                        x2: upperQuartile
                    },
                    {
                        x: mainV,
                        y1: -boxPlotOffset - boxPlotSize * maxTotal / 100 / 2,
                        y2: -boxPlotOffset + boxPlotSize * maxTotal / 100 / 2,
                        stroke: '#333333'
                    }
                )
            ),
            Plot.ruleY(
                friendsEpisodes,
                Plot.groupY(
                    {
                        x1: lowerWhisker,
                        x2: lowerQuartile
                    },
                    {
                        x: mainV,
                        y: -boxPlotOffset,
                        stroke: '#333333'
                    }
                )
            ),
            Plot.ruleY(
                data,
                Plot.groupY(
                    {
                        x1: upperQuartile,
                        x2: upperWhisker
                    },
                    {
                        x: mainV,
                        y: -boxPlotOffset,
                        stroke: '#333333'
                    }
                )
            )
        ]
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
            IMDB ratings of <span id="friends">F<span class="red">&#183;</span>R<span class="blue">&#183;</span>I<span class="yellow">&#183;</span>E<span class="red">&#183;</span>N<span class="blue">&#183;</span>D<span class="yellow">&#183;</span>S</span> episodes per season.
        </h1>
        <div id="data-source">
            Data Source: <a href="https://www.kaggle.com/datasets/bcruise/friends-episode-data" style="padding-right: 8px">Friends Episode Data</a>
            Layout: <a href="https://altair-viz.github.io/index.html">Observable Plot</a><br>
            Each dot represents an episode.
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

