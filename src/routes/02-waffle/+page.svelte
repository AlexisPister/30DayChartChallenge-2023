<script lang="ts">
    import * as d3 from "d3";
    import {onMount} from "svelte";
    import {filter} from "d3";

    enum FOODTYPES {
        Protein = "Protein",
        Fat = "Fat",
        Carbohydrates = "Carbohydrates",
        Other = "Other"
    }

    export let data;
    let svg;

    // Variables
    // let dataToPlot = filterData(data.data);
    let dataProc = filterData(data.data);
    // $: render(dataProc);
    // $: render(dataToPlot);

    // Visual Variables
    // const SPACING = 10;
    const SPACING = 8;
    // const SQUARE_WIDTH = 20;
    const SQUARE_WIDTH = 18;
    const WIDTH = 1800;
    const HEIGHT = 1600;

    // Mcdo colors
    // const GREEN = "#264f36"
    const GREEN = "#427e5a"
    // const GREEN = "#603d0d"
    const YELLOW = "#f5b100"
    const RED = "#D62718"
    let color = d3.scaleOrdinal()
      .domain(Object.values(FOODTYPES))
      .range([RED, YELLOW, GREEN, "white"]);
      // .range([RED, YELLOW, GREEN, "rgb(255,223,185)"]);


    function filterData(data) {
        // const itemsToKeep = ["Big Mac", "Double Cheeseburger", "McChicken", "Chicken McNuggets (6 piece)", "Filet-O-Fish", "Medium French Fries", "Side Salad", "Coca-Cola Classic (Medium)", "McFlurry with M&M’s Candies (Small)"]
        // const itemsToKeep = ["Big Mac", "Double Cheeseburger", "McChicken", "Chicken McNuggets (6 piece)", "Filet-O-Fish", "Medium French Fries", "Side Salad", "McFlurry with M&M’s Candies (Small)"]
        const itemsToKeep = ["McFlurry with M&M’s Candies (Small)", "Big Mac", "Filet-O-Fish", "Medium French Fries", "Chicken McNuggets (6 piece)", "Side Salad"]
        let dataProc = data.filter(d => itemsToKeep.includes(d.Item))

        dataProc.sort((a, b) => {
            return itemsToKeep.indexOf(a.Item) - itemsToKeep.indexOf(b.Item)
        })

        console.log(dataProc)

        return dataProc
    }

    // let dataProc = filterData(data.data);
    onMount(() => {
        svg = d3.select("#vis")
            .append("g")
            .attr("transform", "translate(20, 0)")

        render(dataProc)
    })


    function render(dataToPlot) {
        // let container = d3.select("#vis")
        let container = svg

        let groups = container
            .selectAll(".aliment")
            .data(dataToPlot)
            .join("g")
            .attr("transform", (d, i) => {
                if (i < 3) {
                    // return `translate(${i * 500}, 120)`
                    return `translate(${i * 500}, -100)`
                } else {
                    return `translate(${(i - 3) * 500}, ${heightOfAlimentG() / 3})`
                }
            })
            .classed("aliment", true)

        groups
            .selectAll("rect")
            .data(d => alimentToData(d))
            .join("rect")
            .attr("width", SQUARE_WIDTH)
            .attr("height", SQUARE_WIDTH)
            .attr("x", d => x(d))
            .attr("y", d => y(d))
            .style("fill", d => {
                return color(d.type)
                // if (d.type == FOODTYPES.Protein) {
                //     return GREEN
                // } else if (d.type == FOODTYPES.Carbohydrates) {
                //     return RED
                // } else if (d.type == FOODTYPES.Fat) {
                //     return YELLOW
                // } else if (d.type == FOODTYPES.Other) {
                //     return color(d.type)
                // }
            })
            .attr("stroke", "black")
            .attr("stroke-width", d => {
                return 1
            })

        groups
            .append("text")
            .classed("title", true)
            .text(d => {
                if (d.Item == "McFlurry with M&M’s Candies (Small)") {
                    return "M&M’s McFlurry (Small)"
                }
                return d.Item
            })
            .attr("x", d => 0)
            // .attr("y", d => heightOfAlimentG() + 50)
            .attr("y", d => heightOfAlimentG() + 40)
            .attr("font-size", "2em")
            .attr("font-family", "Rasa")

        renderLegend()
    }

    function renderLegend() {
        let legend = d3.select("#legend")
        // let domain = Object.values(FOODTYPES);
        let domain = [FOODTYPES.Fat, FOODTYPES.Protein, FOODTYPES.Carbohydrates, FOODTYPES.Other]
        // Add one dot in the legend for each name.
        let size = 20
        let x = 1500
        let y = heightOfAlimentG() - SQUARE_WIDTH - 100 - 235;

        legend.selectAll("mydots")
            .data(domain)
            .join("rect")
            .attr("x", x)
            .attr("y", function (d, i) {
                return y + i * (size + 5)
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function (d) {
                return color(d)
            })
            .attr("stroke", "black")

        // Add one dot in the legend for each name.
        legend.selectAll("mylabels")
            .data(domain)
            .enter()
            .append("text")
            .attr("x", x + size * 1.2)
            .attr("y", function (d, i) {
                return y + i * (size + 5) + ((size) / 1.6)
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) {
                if (d == FOODTYPES.Other) return "black"
                return color(d)
            })
            .text(function (d) {
                return d
            })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .attr("font-size", "1.3em")

        legend.append("text")
            // .attr("x", x + size * 1.2)
            .attr("x", x - 2)
            .attr("y", function (d, i) {
                // return 100 + 5 * (size + 5) + (size / 2)
                return (y - 23) + (size / 2)
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .text("Each square represents one gram of food.")
            .attr("font-size", "1.4em")
    }


    function alimentToData(aliment) {
        // console.log(aliment)
        let g = serviceSizeToGr(aliment["Serving Size"])

        let NProt = Number(aliment.Protein)
        let NSugars = aliment.Sugars
        let NCarb = Number(aliment.Carbohydrates)
        let NFat = Number(aliment["Total Fat"])
        let NSatFat = aliment["Saturated Fat"]
        let NTransFat = aliment["Trans Fat"]


        let alimentData = generateTypeData(NProt, FOODTYPES.Protein)
            .concat(generateTypeData(NCarb, FOODTYPES.Carbohydrates))
            .concat(generateTypeData(NFat, FOODTYPES.Fat))

        let nOther = g - alimentData.length;
        // console.log(NProt, NFat, NCarb, alimentData.length, g, nOther)
        alimentData = alimentData.concat(generateTypeData(nOther, FOODTYPES.Other))

        alimentData.forEach((datum, i) => {
            datum.n = i + 1
        })
        return alimentData
    }

    function generateTypeData(N, type) {
        return d3.range(1, N + 1).map(n => {
            return {type}
            // return {type, n}
        })
    }

    function serviceSizeToGr(serviceSize: string) {
        let g = serviceSize.split("(")[1].split(" ")[0]
        return Number(g)
    }


    const x = (d) => {
        // let x = ((d.n - 1) * SQUARE_WIDTH + (d.n - 1) * SPACING) % WIDTH
        let x = ((d.n - 1) * SQUARE_WIDTH + (d.n - 1) * SPACING) % lineWidth()
        return x
    }

    const y = (d) => {
        let nLine = Math.floor((d.n - 1) / squarePerLine()) + 1; // +1 to start at 1 and not 0
        let yVal = nLine * SQUARE_WIDTH + (nLine - 1) * SPACING;
        return heightOfAlimentG() - yVal
    }

    function heightOfAlimentG(): number {
        return (HEIGHT / 2) - SQUARE_WIDTH * 2
    }

    function squarePerLine() {
        // return WIDTH / (SQUARE_WIDTH + SPACING)
        return 14;
    }

    function lineWidth() {
        return squarePerLine() * (SQUARE_WIDTH + SPACING)
    }
</script>

<svelte:head>
    <style>
    body {
        background-color: rgba(248, 189, 35, 0.32);
        font-family: Rasa;
    }
  </style>
</svelte:head>

<style>
    /*:global(body) {*/
    /*    background-color: rgba(248, 189, 35, 0.32);*/
    /*    !*background-color: rgba(89, 52, 2, 0.4);*!*/
    /*}*/

    .option {
        padding: 3px;
    }

    #main-text {
        padding: 20px;
        z-index: 2;
    }

    #data-source {
        padding-left: 4px;
    }

    h1 {
        /*font-size: 3em;*/
        font-size: 3.5em;
        margin-bottom: 0;
    }

    svg {
        margin-top: -25px;
        /*padding-top: -100px;*/
        margin-left: 40px;
        z-index: 1;
    }
</style>

<div id="main-text">

    <h1>
<!--        Distribution of macronutrients of famous McDonald's dishes.-->
        Macronutrients' distributions of famous McDonald's dishes.
    </h1>
    <div id="data-source">
    Data Source: <a href="https://www.kaggle.com/datasets/mcdonalds/nutrition-facts">Kaggle</a>
    </div>
</div>


<svg id="vis" width={WIDTH + 600} height={HEIGHT}>
    <g id="legend">
    </g>
</svg>

<!--<div>-->
<!--    *If the life expectancy does not change.<br>-->
<!--    Data Source: <a-->
<!--        href="https://www.ined.fr/en/everything_about_population/data/europe-developed-countries/life-expectancy/">Ined</a>-->
<!--</div>-->

