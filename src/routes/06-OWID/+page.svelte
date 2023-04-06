<script lang="ts">
    import * as d3 from "d3";
    import * as turf from "turf";
    import {onMount} from "svelte";
    import {base} from "$app/paths";
    // import * as Plot from "@observablehq/plot";
    // import type {PlotOptions} from "@observablehq/plot";
    import {color} from "d3";
    // import {geo2rect} from "../../../modules/d3geo2rect/build/geo2rect.min"

    export let data;
    let dataProc = data.data

    // const ISO_FILTER = ["LIE", "FRO", "AND", "MCO", "VAT", "LUX"];
    const ISO_FILTER = ["LIE", "FRO", "AND", "MCO", "VAT"];
    const yearMin = 2010;
    const yearMax = 2017;
    // const yearMin = 2000;
    // const yearMax = 2019;

    const PM_THRESHOLD = 12
    const PM_THRESHOLD_OFF = 5



    // visual variables
    const WIDTH = 1300;
    const HEIGHT = 900;
    // const COLORS = ["#dc3e3e", "#f6a15e"]
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {
        right: 180
    }

    // TODO: compute
    const WIDTH_SQUARE = 86;
    const HEIGHT_SQUARE = 86;


    const xScale = d3.scaleLinear()
        .domain([yearMin, yearMax])
        .range([0, WIDTH_SQUARE]);

    // Add Y axis
    const yScale = d3.scaleLinear()
        .domain([2, 44])
        // .domain([0.5, 28])
        // .domain([25, 45])
        .range([HEIGHT_SQUARE, 0]);

    // variables
    let svg;
    let config = {
        width: WIDTH,
        height: HEIGHT,
        // padding: 70,
        projection: d3.geoMercator(),
        // duration: 1000,
        duration: 0,
        // key: function (d) {
        //     console.log(d)
        //     // console.log(d.properties.FID, d.properties.FIPS, d.properties.ISO2, d.properties.ISO3)
        //     console.log(d.properties.ISO2)
        //     return d.properties.ISO2;
        // },
        key: function (d) {
            // return d.properties.ISO_A3;
            // console.log(d.properties.NAME, d.properties.ISO3)
            return d.properties.ISO3;
        },
        grid: {
            ALB: {x: 5, y: 8},
            ARM: {x: 9, y: 6},
            AUS: {x: 9, y: 9},
            AUT: {x: 4, y: 5},
            AZE: {x: 9, y: 5},
            BEL: {x: 2, y: 3},
            BGR: {x: 7, y: 6},
            BIH: {x: 5, y: 6},
            BLR: {x: 6, y: 3},
            CHE: {x: 3, y: 4},
            CYP: {x: 8, y: 7},
            CZE: {x: 4, y: 4},
            DEU: {x: 4, y: 3},
            DNK: {x: 4, y: 2},
            ESP: {x: 1, y: 5},
            EST: {x: 6, y: 1},
            FIN: {x: 6, y: 0},
            FRA: {x: 1, y: 4},
            GBR: {x: 1, y: 2},
            GEO: {x: 8, y: 5},
            GRC: {x: 6, y: 8},
            HUN: {x: 5, y: 5},
            HRV: {x: 4, y: 6},
            IRL: {x: 0, y: 2},
            ISL: {x: 0, y: 0},
            ISR: {x: 8, y: 8},
            ITA: {x: 3, y: 5},
            KOS: {x: 6, y: 7},
            LTU: {x: 6, y: 2},
            LUX: {x: 2, y: 4},
            LVA: {x: 7, y: 2},
            MDA: {x: 7, y: 5},
            MKD: {x: 7, y: 7},
            MLT: {x: 1, y: 7},
            MNE: {x: 5, y: 7},
            NLD: {x: 3, y: 3},
            NOR: {x: 4, y: 0},
            POL: {x: 5, y: 3},
            PRT: {x: 0, y: 5},
            ROU: {x: 6, y: 5},
            RUS: {x: 7, y: 3},
            SMR: {x: 2, y: 6},
            SRB: {x: 6, y: 6},
            SVK: {x: 5, y: 4},
            SVN: {x: 3, y: 6},
            SWE: {x: 5, y: 0},
            UKR: {x: 6, y: 4},
            TUR: {x: 8, y: 6},
            // LIE: {x: 8, y: 6},
            // FRO: {x: 8, y: 6},
            // AND: {x: 8, y: 6},
            // MCO: {x: 8, y: 6},
            // VAT: {x: 8, y: 6},
        }
    };

    let g2r = new geo2rect.draw();
    console.log(g2r)

    onMount(() => {
        svg = d3.select("svg")

        // return fetch(`${base}/data/03/phylograph_tree.json`)
        d3.json(`${base}/data/06/map-of-europe-master/GeoJSON/europe.geojson`)
            .then(dataMap => {
                dataMap.features = dataMap.features.filter(c => {
                    // if (c.properties.NAME == "Israel") {
                    //     console.log(11)
                    //     return false
                    // }

                    return !ISO_FILTER.includes(c.properties.ISO3)
                })

                const EUROPE_COUNTRIES = dataMap.features.map(c => c.properties.NAME)
                dataProc = dataProc.filter(d => {
                    return EUROPE_COUNTRIES.includes(d["Country Name"])
                })

                let geojson = geo2rect.compute(dataMap);

                g2r.config = config;
                g2r.data = geojson;
                g2r.svg = svg.append('g');

                g2r.toggle();
                g2r.draw();

                setTimeout(function () {
                    d3.selectAll("path")
                        .each((d, i, nodes) => {
                            const iso = d.properties.ISO3
                            const name = d.properties.NAME

                            let xSvg = svg.node().getBoundingClientRect().x
                            let ySvg = svg.node().getBoundingClientRect().y

                            let {x, y} = nodes[i].getBoundingClientRect()
                            x = x - xSvg
                            y = y - ySvg
                            makeLineChart(iso, name, x, y)
                        })
                        // .attr("fill", "rgb(255,248,198)")
                        // .attr("fill", "none")
                        .attr("fill", "white")
                        .attr("stroke", "black")


                    d3.selectAll(".redbar").raise().raise().raise().raise().raise().raise().raise()
                        .raise().raise().raise().raise().raise().raise().raise().raise().raise().raise().raise().raise()
                        .raise().raise().raise().raise().raise().raise().raise().raise().raise().raise()
                        .raise().raise().raise().raise().raise().raise().raise().raise().raise().raise()
                        .raise().raise().raise().raise().raise().raise().raise().raise().raise().raise()

                    renderLegend()
                }, 10);
            })

        render()
    });


    function makeLineChart(iso, name, x, y) {
        let square = svg.append("g")
            .classed("chart", true)
            .attr("transform", `translate(${x}, ${y})`)

        square
            .selectAll(".line")
            .data(dataProc)
            .join("path")
            .attr("fill", "none")
            .classed("redbar", d => {
                if (d["Country Name"] == name) {
                    return true
                }
                return false
            })
            .attr("stroke", (d) => {
                if (d["Country Name"] == name) {
                    return COLORS[0]
                }
                return "lightgray"
                // return "gray"
            })
            .attr("stroke-width", d => {
                if (d["Country Name"] == name) {
                    return 4
                }
                return 1
            })
            .attr("opacity", d => {
                if (d["Country Name"] == name) {
                    return 1
                }
                return 0.7
            })
            .attr("d", function (d) {
                let yearValues = d3.range(yearMin, yearMax + 1).map(year => {
                    return {year: year, value: d[year]}
                })

                for (let v of yearValues) {
                    if (!v.value) {
                        return ""
                    }
                }

                if (d["Country Name"] == name) {
                    yearValues.forEach((d, i) => {
                        if (i < yearValues.length - 1) {
                            square
                                .append("line")
                                .attr("x1", xScale(d.year))
                                .attr("y1", yScale(d.value))
                                .attr("x2", xScale(yearValues[i + 1].year))
                                .attr("y2", yScale(yearValues[i + 1].value))
                                .attr("stroke", () => {
                                    if (yearValues[i + 1].value <= PM_THRESHOLD) {
                                        return COLORS[1]
                                    } else {
                                        return COLORS[0]
                                    }
                                })
                                .attr("stroke-width", 4)
                        }
                    })
                    return ""
                } else {
                    return d3.line()
                        .x(function (d) {
                            return xScale(d.year);
                        })
                        .y(function (d) {
                            return yScale(+d.value);
                        })
                        (yearValues)
                }
            })
            .classed("line", true)

        square
            .append("line")
            .attr("x1", xScale(yearMin))
            .attr("y1", yScale(PM_THRESHOLD))
            .attr("x2", xScale(yearMax))
            .attr("y2", yScale(PM_THRESHOLD))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "6")

        square
            .append("line")
            .attr("x1", xScale(yearMin))
            .attr("y1", yScale(PM_THRESHOLD_OFF))
            .attr("x2", xScale(yearMax))
            .attr("y2", yScale(PM_THRESHOLD_OFF))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "3")

        square.append("text")
            // .text(name)
            .text(iso)
            .attr("y", 15)
            .attr("x", 2)
            .attr("font-size", "20px")
    }


    function render() {
        //
    }

    function renderLegend() {
        let legendX = xScale.copy().range([0, WIDTH_SQUARE * 2]).nice()
        let legendY = yScale.copy().range([HEIGHT_SQUARE * 2, 0]).nice()

        let legend = svg.append("g")
            .attr("transform", "translate(1000, 100)")

        legend.append("rect")
            .attr("width", WIDTH_SQUARE * 2)
            .attr("height", WIDTH_SQUARE * 2)
            .attr("fill", "none")
            .attr("stroke", "black")

        legend.append("text")
            .text("Code ISO3")
            .attr("x", 6)
            .attr("y", 30)
            .attr("font-size", "29px")
            // .attr("stroke", "black")



        let fr = dataProc.filter(d => d["Country Name"] == "Lithuania")[0]

        let yearValues = d3.range(yearMin, yearMax + 1).map(year => {
            return {year: year, value: fr[year]}
        })

        yearValues.forEach((d, i) => {
            if (i < yearValues.length - 1) {
                legend
                    .append("line")
                    .attr("x1", legendX(d.year))
                    .attr("y1", legendY(d.value))
                    .attr("x2", legendX(yearValues[i + 1].year))
                    .attr("y2", legendY(yearValues[i + 1].value))
                    .attr("stroke", () => {
                        if (yearValues[i + 1].value < PM_THRESHOLD) {
                            return COLORS[1]
                        } else {
                            return COLORS[0]
                        }
                    })
                    .attr("stroke-width", 3)
            }
        })


        legend.append("line")
            .attr("x1", legendX(yearMin))
            .attr("y1", legendY(PM_THRESHOLD))
            .attr("x2", legendX(yearMax))
            .attr("y2", legendY(PM_THRESHOLD))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "6")

        legend.append("line")
            .attr("x1", legendX(yearMin))
            .attr("y1", legendY(PM_THRESHOLD))
            .attr("x2", legendX(yearMax))
            .attr("y2", legendY(PM_THRESHOLD))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "6")

        legend.append("line")
            .attr("x1", legendX(yearMin))
            .attr("y1", legendY(PM_THRESHOLD_OFF))
            .attr("x2", legendX(yearMax))
            .attr("y2", legendY(PM_THRESHOLD_OFF))
            .attr("stroke", "black")
            .attr("stroke-dasharray", "3")

        legend.append("g")
            .call(d3.axisTop(legendX).tickValues([2010, 2017]).tickFormat(d => Math.round(d)))
        legend.append("g")
            .call(d3.axisLeft(legendY).tickValues([0, PM_THRESHOLD_OFF, 12, 40]).tickFormat(d3.format(",.0f")))

        legend.append("text")
            .attr("x", legendX(yearMin))
            .attr("y", legendY(PM_THRESHOLD))
            .text("*")
        legend.append("text")
            .attr("x", legendX(yearMin))
            .attr("y", legendY(PM_THRESHOLD_OFF))
            .text("**")

        let t = legend.append("text")
            .attr("x", 0)
            .attr("y", (HEIGHT_SQUARE * 2) + 20)
            .append("tspan")
            .text("PM2.5 annual mean concentration")
        legend.append("text")
            .attr("x", 0)
            .attr("y", (HEIGHT_SQUARE * 2) + 40)
            .append("tspan")
            .text("threshold (μg/m3) given by ")


        legend.append("text")
            .attr("x", 7)
            .attr("y", (HEIGHT_SQUARE * 2) + 60)
            .text("* ny.gov")
        legend.append("text")
            .attr("x", 0)
            .attr("y", (HEIGHT_SQUARE * 2) + 80)
            .text("** the World Health Organization (WHO)")
    }

</script>


<style>
    :global(body) {
        font-family: Rasa;
        /*background-color: #f4efff;*/
        /*background-color: #b3e0ef;*/
        background-color: #78a0c4;
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
<!--            All European countries are <span style="color: {COLORS[0]}">over</span> the annual mean PM2.5 concentration recommendation of the World Health Organization-->
            All European countries are <strong>over</strong> the PM2.5 annual mean concentration recommendation of the World Health Organization
        </h1>
        <div id="data-source">
            Data Source: <a href="https://data.worldbank.org/indicator/EN.ATM.PM25.MC.M3?end=2017&start=2006&view=chart&year=2016">data.worldbank.org</a><br>
            Layout: <a href="https://d3js.org/">D3JS</a>, <a href="https://github.com/sebastian-meier/d3.geo2rect">geo2rect</a>
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

