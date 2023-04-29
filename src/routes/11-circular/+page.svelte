<script lang="ts">
    import {onMount} from "svelte";
    import * as d3 from "d3";
    import {to_number} from "svelte/internal";

    // Variables
    export let data;
    let mainData = data.data;
    console.log(mainData)

    // let mainV = "US Viewership (in millions)";

    // Visual variables
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}
    const WIDTH = 1800 - margin.left - margin.right;
    const HEIGHT = 1000 - margin.top - margin.bottom;

    const outerRadius = HEIGHT / 2.4 - 30
    const innerRadius = outerRadius / 3
    const cornerRadius = 30;
    const labelRadius = (innerRadius * 0.2 + outerRadius * 0.6) // center radius of labels
    const pie = d3.pie().padAngle(0.03);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    // const arcLabelIn = d3.arc().innerRadius(labelRadius * 0.3).outerRadius(labelRadius * 0.5);
    const arcLabelIn = d3.arc().innerRadius(labelRadius * 2.4).outerRadius(labelRadius * 1.05);
    const arcLabelOut = d3.arc().innerRadius(labelRadius * 2.2).outerRadius(labelRadius);

    let svg;

    let massData = mainData.map(d => to_number(d.percentmass))
    let percentAtomsData = mainData.map(d => to_number(d.percentatoms))

    const colorScale = d3.scaleOrdinal().domain(mainData.map(d => d.Element)).range(["rgb(152,193,239)",
        "rgb(204,200,123)",
        "rgb(164,182,192)",
        "rgb(173,157,157)",
        "rgb(255,255,255)",
        "rgb(162,206,153)",
        "rgb(245,225,24)",
        "rgb(220,126,91)",
        "rgb(99,115,189)",
        "rgb(121,198,201)",
        "rgb(207,159,210)",
        "rgb(107,107,107)"])

    onMount(() => {
        svg = d3.select("svg")
        render();
    })

    function render() {
        let firstG = svg.append("g")
            .attr("transform", `translate(${WIDTH / 2 - WIDTH / 4}, ${HEIGHT / 2})`)
        firstG
            .append("text")
            .text("By mass")
            .attr("font-weight", "bold")
            .attr("font-size", "200%")
            .attr("text-anchor", "middle")
        let secondG = svg.append("g")
            .attr("transform", `translate(${(WIDTH / 2 + WIDTH / 4)}, ${HEIGHT / 2})`)

        secondG
            .append("text")
            .text("By number")
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .attr("font-size", "200%")
        secondG
            .append("text")
            .text("of atoms")
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .attr("font-size", "200%")
            .attr("y", "34")

        firstG.append("g")
            .attr("fill", "#ccc")
            .attr("stroke", "#000")
            .attr("stroke-width", "1.5px")
            .selectAll("path")
            .data(pie(massData))
            .join("path")
            .attr("d", arc.cornerRadius(cornerRadius))
            .attr("fill", (d, i) => {
                return colorScale(mainData[i].Element)
            })

        firstG.append("g")
            .selectAll("text")
            .data(pie(massData))
            .join((enter) => {
                let g = enter.append("g")
                g.append("text")
                    .attr("transform", (d, i) => {
                        let el = mainData[i].Element;
                        if (["Calcium", "Magnesium", "Potassium", "Sodium"].includes(el)) {
                            return `translate(${arcLabelOut.centroid(d)})`
                        } else if (["Chlorine", "All others", "Potassium", "Sulfur", "Phosphorus", "All others"].includes(el)) {
                            return `translate(${arcLabelIn.centroid(d)})`
                        }
                        return `translate(${arcLabel.centroid(d)})`

                    })
                    .attr("x", (d, i) => {
                        let el = mainData[i].Element;
                        if (el == "All others") return 20

                        return 0;
                    })
                    .attr("y", d => {
                        let c = arc.centroid(d);
                        return 0
                    })
                    .text((d, i) => {
                        let el = mainData[i].Element;
                        if (el == "Nitrogen") {
                            return "N"
                        } else if (el == "Calcium") {
                            return "Ca"
                        } else if (el == "Sulfur") {
                            return "S"
                        } else if (el == "Potassium") {
                            return "K"
                        } else if (el == "Phosphorus") {
                            return "P"
                        } else if (el == "Sodium") {
                            return "Na"
                        } else if (el == "Chlorine") {
                            return "Cl"
                        } else if (el == "Magnesium") {
                            return "Mg"
                        } else if (el == "All others") {
                            return "Others"
                        } else if (el == "Hydrogen") {
                            return "Hydrogen (H)"
                        } else if (el == "Carbon") {
                            return "Carbon (C)"
                        } else if (el == "Oxygen") {
                            return "Oxygen (O)"
                        }
                        return mainData[i].Element
                    })
                    .attr("text-anchor", "middle")


                g.append("text")
                    .attr("transform", (d, i) => {
                        let el = mainData[i].Element;
                        if (["Calcium", "Magnesium", "Potassium", "Sodium"].includes(el)) {
                            return `translate(${arcLabelOut.centroid(d)})`
                        } else if (["Chlorine", "All others", "Potassium", "Sulfur", "Phosphorus", "All others"].includes(el)) {
                            return `translate(${arcLabelIn.centroid(d)})`
                        }
                        return `translate(${arcLabel.centroid(d)})`
                    })
                    .attr("x", (d, i) => {
                        let el = mainData[i].Element;
                        if (el == "All others") return 20
                        return 0;
                    })
                    .attr("y", d => {
                        return 15;
                    })
                    .text((d, i) => {
                        let el = mainData[i].Element;
                        let v = d.value

                        if (el == "All others") {
                            return "-0.1%"
                        }

                        return `${v}%`
                    })
                    .attr("text-anchor", "middle")
                    .attr("font-size", "80%")


                return g
            })
            .attr("font-weight", "bold")
                    .attr("font-size", "18px")



        secondG.append("g")
            .attr("fill", "#ccc")
            .attr("stroke", "#000")
            .attr("stroke-width", "1.5px")
            .selectAll("path")
            .data(pie(percentAtomsData))
            .join("path")
            .attr("d", arc.cornerRadius(cornerRadius))
            .attr("fill", (d, i) => {
                return colorScale(mainData[i].Element)
            })

        secondG.append("g")
            .selectAll("text")
            .data(pie(percentAtomsData))
            .join((enter) => {
                let g = enter.append("g")
                g.append("text")
                    .attr("transform", (d, i) => {
                        let el = mainData[i].Element;
                        if (["Calcium", "Magnesium", "Potassium", "Sulfur"].includes(el)) {
                            return `translate(${arcLabelOut.centroid(d)})`
                        } else if (["Chlorine", "All others", "Potassium", "Sodium", "Phosphorus", "All others"].includes(el)) {
                            return `translate(${arcLabelIn.centroid(d)})`
                        }
                        return `translate(${arcLabel.centroid(d)})`

                    })
                    .attr("x", (d, i) => {
                        let el = mainData[i].Element;
                        if (el == "All others") return 20

                        return 0;
                    })
                    .attr("y", d => {
                        let c = arc.centroid(d);
                        return 0
                    })
                    .text((d, i) => {
                        let el = mainData[i].Element;
                        if (el == "Nitrogen") {
                            return "N"
                        } else if (el == "Calcium") {
                            return "Ca"
                        } else if (el == "Sulfur") {
                            return "S"
                        } else if (el == "Potassium") {
                            return "K"
                        } else if (el == "Phosphorus") {
                            return "P"
                        } else if (el == "Sodium") {
                            return "Na"
                        } else if (el == "Chlorine") {
                            return "Cl"
                        } else if (el == "Magnesium") {
                            return "Mg"
                        } else if (el == "All others") {
                            return "Others"
                        } else if (el == "Hydrogen") {
                            return "Hydrogen (H)"
                        } else if (el == "Carbon") {
                            return "Carbon (C)"
                        } else if (el == "Oxygen") {
                            return "Oxygen (O)"
                        }
                        return mainData[i].Element
                    })
                    .attr("text-anchor", "middle")


                g.append("text")
                    .attr("transform", (d, i) => {
                        let el = mainData[i].Element;
                        if (["Calcium", "Magnesium", "Potassium", "Sulfur"].includes(el)) {
                            return `translate(${arcLabelOut.centroid(d)})`
                        } else if (["Chlorine", "All others", "Potassium", "Sodium", "Phosphorus", "All others"].includes(el)) {
                            return `translate(${arcLabelIn.centroid(d)})`
                        }
                        return `translate(${arcLabel.centroid(d)})`
                    })
                    .attr("x", (d, i) => {
                        let el = mainData[i].Element;
                        if (el == "All others") return 20
                        return 0;
                    })
                    .attr("y", d => {
                        return 15;
                    })
                    .text((d, i) => {
                        let el = mainData[i].Element;
                        let v = d.value

                        if (["Carbon", "Hydrogen", "Oxygen"].includes(el)) {
                            return `${v}%`
                            // return `${d3.format(".2f")(v)}%`
                        } else if (el == "All others") {
                            return "-0.3"
                        } else {
                            return `${d3.format(".2f")(v)}`
                        }

                    })
                    .attr("text-anchor", "middle")
                    .attr("font-size", "80%")


                return g
            })
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
    }
</script>


<style>
    :global(body) {
        /*font-family: Rasa;*/
        /*background-color: #ffb0b0;*/
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

    .yellow {
        color: #feed01;
    }

    .blue {
        color: #36a9e0;
    }

    .red {
        color: #e30713;
    }
</style>

<div id="container">
    <div id="main-text">
        <h1>
            Atom composition of the human body
        </h1>
        <div id="data-source">
            Data Source: <a href="https://en.wikipedia.org/wiki/Composition_of_the_human_body"
                            style="padding-right: 8px">Wikipedia</a>
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

