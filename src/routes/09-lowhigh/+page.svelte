<script lang="ts">
    import * as d3 from "d3";
    import {onMount} from "svelte";
    import CanadaFlag from "../../../static/data/09/CanadaFlag.svelte";

    export let data;
    let dataTemp = data.data;
    let tempColumn = "MEAN_TEMPERATURE_CALGARY";

    dataTemp.forEach(d => {
        let date = d["LOCAL_DATE"];
        let month = date.split("-")[1]
        let year = date.split("-")[2].split(" ")[0]
        // let monthYear = date.split("-")[1] + date.split("-")[2]
        // let month = date.split("-")[1].split("-")[0]
        // d["month"] = month;
        // d["monthYear"] = monthYear;
        d["monthYear"] = month + year;
        d["year"] = year;
        // console.log(d["monthYear"])
    })

    // FILTER YEARS
    dataTemp = dataTemp.filter(d => d.year >= 2010)

    // let monthYeardata = d3.group(dataTemp, d => d.monthYear)
    let monthYeardata = d3.rollup(dataTemp, v => d3.mean(v, d => d[tempColumn]), d => d.monthYear)
    // console.log(monthYeardata)
    let tempData: [string, number] = [...monthYeardata]
    tempData = tempData.filter(d => {
        return d[0].includes("Jan") || d[0].includes("Jun")
    })
    tempData = tempData.filter(d => {
        return d[0].includes("Jan") || d[0].includes("Jun")
    })

    console.log(tempData)

    // visual variables
    const WIDTH = 1600;
    const HEIGHT = 900;
    // const margin = {bottom: 20, left: 40, right: 26, top: 20}
    const margin = {bottom: 20, left: 60, right: 120, top: 20}
    const COLORS = ["#dc3e3e", "#f6a15e"]
    // let BANDWIDTH = 30
    // let BANDSPACE = 20
    let BANDWIDTH;
    let BANDSPACE;


    // variables
    let svg;

    let minMax = d3.extent(tempData, d => d[1])
    console.log(minMax)
    // const tempScale = d3.scaleLinear().domain(d3.extent(tempData, d => d[1])).range([margin.bottom, HEIGHT - margin.top])
    const tempScale = d3.scaleLinear().domain([18, -18]).range([0, HEIGHT - margin.top - margin.bottom])
    // const tempScale = d3.scaleLinear().domain([-17, 17]).range([0, HEIGHT - margin.top - margin.bottom])
    let axisScale = d3.scaleBand()
        .domain(tempData.map(d => d[0]))
        .range([0, WIDTH - margin.right - margin.left])
        .paddingInner(0.5)
    // .bandwidth(BANDWIDTH + BANDSPACE)


    onMount(() => {
        svg = d3.select("svg")
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        BANDWIDTH = axisScale.bandwidth();
        BANDSPACE = axisScale.paddingInner() * BANDWIDTH;

        let xAxis = d3.axisBottom(axisScale)
        let yAxis = d3.axisRight(tempScale)
            .tickFormat((d, i) => `${d} °C`)
        // .tickValues([0, 8026492406])
        .ticks(18)
        // .tickSize(0)

        render();

        let axisG = svg.append("g").call(xAxis)
            .attr("transform", `translate(0, ${yMiddle()})`)
            .attr("font-size", 15)
            .attr("font-weight", "bold")
            // .attr("color", "white")

        let axisTempG = svg.append("g").call(yAxis)
            .attr("transform", `translate(-55, 0)`)
            .attr("font-size", 14)
            .attr("font-weight", "bold")

        d3.select("#gflag")
            .raise()

    })

    function render() {
        svg.selectAll(".monthyear")
            .data(tempData)
            .join(enter => {
                let g = enter.append("g")

                g.append("line")
                    .attr("x1", (d, i) => {
                        return axisScale(d[0])
                    })
                    .attr("y1", (d, i) => yMiddle())
                    .attr("x2", (d, i) => axisScale(d[0]))
                    .attr("y2", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        return tempScale(d[1]) + sign * BANDWIDTH
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)

                g.append("line")
                    .attr("x1", (d, i) => axisScale(d[0]) + BANDWIDTH)
                    .attr("y1", (d, i) => yMiddle())
                    .attr("x2", (d, i) => axisScale(d[0]) + BANDWIDTH)
                    .attr("y2", (d, i) => tempScale(d[1]))
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)



                // large hline
                g.append("line")
                    .attr("x1", (d, i) => axisScale(d[0]))
                    .attr("y1", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        return tempScale(d[1]) + sign * BANDWIDTH
                    })
                    .attr("x2", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE) * 2)
                    .attr("y2", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        return tempScale(d[1]) + sign * BANDWIDTH
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)


                // small hline
                g.append("line")
                    .attr("x1", (d, i) => axisScale(d[0]) + BANDWIDTH)
                    .attr("y1", (d, i) => tempScale(d[1]))
                    .attr("stroke", "black")
                    .attr("x2", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE + BANDWIDTH / 2))
                    .attr("y2", d => tempScale(d[1]))
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)


                // // large second vline
                g.append("line")
                    .attr("x1", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE) * 2)
                    .attr("y1", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        return tempScale(d[1]) + sign * BANDWIDTH
                    })
                    .attr("x2", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE) * 2)
                    .attr("y2", (d, i) => yMiddle())
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)


                // small second vline
                g.append("line")
                    .attr("x1", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE + BANDWIDTH / 2))

                    .attr("y1", (d, i) => tempScale(d[1]))
                    .attr("stroke", "black")
                    .attr("x2", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE + BANDWIDTH / 2))
                    .attr("y2", (d, i) => {
                        return yMiddle()
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)


                // First saure
                g.append("rect")
                    .attr("width", (d, i) => BANDWIDTH)
                    .attr("height", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        let y2 = tempScale(d[1]) + sign * BANDWIDTH
                        let y1 = yMiddle()
                        return Math.abs(y2 - y1);
                    })
                    .attr("x", (d, i) => axisScale(d[0]))
                    .attr("y", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        let y2 = tempScale(d[1]) + sign * BANDWIDTH
                        let y1 = yMiddle()
                        let height = Math.abs(y2 - y1);
                        if (d[1] > 0) {
                            return yMiddle() - height
                        } else {
                            return yMiddle()
                        }
                    })
                    .attr("fill", fillRect)

                // Other vSquare
                g.append("rect")
                    .attr("width", (d, i) => BANDWIDTH)
                    .attr("height", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        let y2 = tempScale(d[1]) + sign * BANDWIDTH
                        let y1 = yMiddle()
                        return Math.abs(y2 - y1);
                    })
                    .attr("x", (d, i) => axisScale(d[0]) + (BANDWIDTH + BANDSPACE * 2))
                    .attr("y", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        let y2 = tempScale(d[1]) + sign * BANDWIDTH
                        let y1 = yMiddle()
                        let height = Math.abs(y2 - y1);
                        if (d[1] > 0) {
                            return yMiddle() - height
                        } else {
                            return yMiddle()
                        }
                    })
                    .attr("fill", fillRect)

                // HSquare
                g.append("rect")
                    .attr("width", (d, i) => BANDWIDTH * 2)
                    .attr("height", (d, i) => BANDWIDTH)
                    .attr("x", (d, i) => {
                        return axisScale(d[0])
                    })
                    .attr("y", (d, i) => {
                        let sign = d[1] < 0 ? 1 : -1
                        let y2 = tempScale(d[1]) + sign * BANDWIDTH
                        let y1 = yMiddle()
                        let height = Math.abs(y2 - y1);
                        if (d[1] > 0) {
                            return yMiddle() - height
                        } else {
                            return yMiddle() + height - BANDWIDTH
                        }
                    })
                    .attr("fill", fillRect)

                return g
            })
            .classed("monthyear", true);


    }

    const fillRect = (d) => {
        if (d[1] > 0) {
            // return "red"
            return "#fbb4ae"
            // return "#ff0000"

        } else {
            // return "blue"
            return "#b3cde3"
            // return "#dfdfdf"
        }
    }

    function yMiddle() {
        return (HEIGHT - margin.top - margin.bottom) / 2
    }

</script>


<svelte:head>
    <style>
    body {
        background-color: rgba(162, 99, 164, 0.2);
    }
  </style>
</svelte:head>

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
</style>

<div id="container">
    <div id="main-text">
        <h1>
            Mean Temperatures during the months of January (Jan) and June (Jun) at Calgary, Canada, 2010-2020.
        </h1>
        <div id="data-source">
            Data Source: <a href="https://www.kaggle.com/datasets/aturner374/eighty-years-of-canadian-climate-data" style="padding-right: 8px">Eighty years of Canadian climate data</a>
            Layout: <a href="https://d3js.org/">D3JS</a><br>
        </div>
    </div>
    <div id="graph">
        <svg width="{WIDTH}" height="{HEIGHT}">
            <g id ="gflag" transform="translate({WIDTH - 103}, {yMiddle() + 21}) scale(0.08) ">
                <CanadaFlag></CanadaFlag>
            </g>
        </svg>

    </div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

