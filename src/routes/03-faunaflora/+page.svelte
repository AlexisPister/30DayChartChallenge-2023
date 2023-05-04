<script lang="ts">
    import * as d3 from "d3";
    import {onMount} from "svelte";
    import {filter} from "d3";
    import {base} from "$app/paths";

    export let data;

    function getSvgTextWidth(text: string, fontSize: number, fontFamily: string): number {
        // create a temporary SVG element to calculate the text width
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElem.setAttribute('font-size', fontSize.toString());
        textElem.setAttribute('font-family', fontFamily);
        const textNode = document.createTextNode(text);
        textElem.appendChild(textNode);
        svg.appendChild(textElem);
        document.body.appendChild(svg);

        // get the bounding box of the text element and return its width
        const bbox = textElem.getBBox();
        const width = bbox.width;
        document.body.removeChild(svg);
        return width;
    }

    function filterTree(node, parent = null) {
        if (!node.children) {
            return;
        }


        let newChildren = node.children

        // console.log(node.data.name, node)

        // if (parent && (parent.children.length < 2 && node.children.length < 2)) {
        if (parent && (parent.children.length < 2 && node.children.length < 2)) {
            parent.children = node.children

            for (let child of node.children) {
                child.parent = parent
            }
            node = parent
        }
        // else if (parent && node.children && node.children.length < 2 && parent.children.length > 1) {
        //     parent.children = node.children
        //     node = parent
        // }

        for (let children of newChildren) {
            filterTree(children, node)
        }
    }

    function filterTree2(node, parent = null) {
        if (!node.children) {
            return;
        }

        let newChildren = node.children

        // if (d.children && d.parent && d.parent.children.length > 1 && d.children.length == 1) {
        //     return;
        // }
        // console.log(node.data.name, node)
        if (parent && node.children && parent.children.length > 1 && node.children.length == 1) {
            console.log(22, node)
            parent.children = node.children
            node = parent
        }

        for (let children of newChildren) {
            filterTree2(children, node)
        }
    }


    filterTree(data);
    // filterTree2(data);


    let root = d3.hierarchy(data)
        .sum(d => d.children ? 0 : 1)
        .sort((a, b) => (a.value - b.value) || d3.ascending(a.data.length, b.data.length));

    // Visual Variables
    // const SPACING = 10;
    const SPACING = 8;
    // const SQUARE_WIDTH = 20;
    const WIDTH = 1800;
    const HEIGHT = 1400;
    const RADIUS = 10;
    // const STEP_WIDTH = WIDTH / (root.height + 1);
    const STEP_WIDTH = 300;
    const ICON_HEIGHT = 160;
    const margin = {
        right: 180
    }
    let colors = ["#deebf7", "#9ecae1", "#3182bd"]

    // root.dx = 10;
    // root.dy = width / (root.height + 1);

    d3.cluster()
        // .size([WIDTH, HEIGHT])
        // .size([HEIGHT - 200, WIDTH - 200])
        .size([HEIGHT - 200, WIDTH - 600])
        (root)

    // console.log(root)
    // console.log(root.links())
    // console.log(cluster)

    let svg;

    // Variables


    // let dataProc = filterData(data.data);
    onMount(() => {
        svg = d3.select("#vis")
            .append("g")
            .attr("transform", `translate(${margin.right}, 0)`)
        render()
    })


    function render() {
        // const nodes = svg.append("g")
        //     .attr("fill", "black")
        //     .attr("stroke", "#000")
        //     .selectAll("circle")
        //     // .data(root.descendants().reverse())
        //     .data(root.descendants())
        //     .join("circle")
        //     .filter(d => {
        //         // if (d.children && d.parent && d.parent.children.length > 1 && d.children.length == 1) {
        //         //     return;
        //         // }
        //         return d
        //     })
        //     .attr("r", 4)
        //     .attr("cx", d => d.y)
        //     .attr("cy", d => d.x)

        const icons = svg.append("g")
            .selectAll(".icon")
            .data(root.descendants().filter(d => {
                return !d.children
            }))
            .join("svg:foreignObject")
            .attr("x", d => d.y)
            .attr("y", d => d.x - ICON_HEIGHT / 2)
            .attr("width", 400)
            .attr("height", ICON_HEIGHT)
            // .attr("transform", `translate(${margin.right}, 0) scale(0.4)`)
            // .attr("transform", `translate(${margin.right}, 0)`)
            .classed("icon", true)
            .append("xhtml:img")
            .attr("src", d => {
                if (d.data.name == "Cyanobacteria") {
                    return 'https://images.phylopic.org/images/9a7caf63-cd50-4841-a2bc-33ed6ec44856/vector.svg'
                } else if (d.data.name == "Green plants") {
                    return "https://images.phylopic.org/images/9c1635ff-9fec-402b-82f2-100515286713/vector.svg"
                } else if (d.data.name == "Phaeophytes (brown algae)") {
                    return "https://images.phylopic.org/images/61e2982f-07d4-44db-ac00-27a2d86ca855/vector.svg"
                } else if (d.data.name == "Homo sapiens") {
                    return "https://images.phylopic.org/images/a9f4ebd5-53d7-4de9-9e66-85ff6c2d513e/vector.svg"
                } else if (d.data.name == "Fungi") {
                    return "https://images.phylopic.org/images/e5d32221-7ea9-46ed-8e0a-d9dbddab0b4a/vector.svg"
                } else if (d.data.name == "Nematoda") {
                    return "https://images.phylopic.org/images/3c60fbfb-5722-4248-94f0-23f841030294/vector.svg"
                }
            })
            .attr("width", 200)
            .attr("height", ICON_HEIGHT)

        const text = svg.append("g")
            .selectAll("circle")
            .data(root.descendants())
            .join("text")
            .text(d => {
                // return d.data.name
                if (!d.children || d.children.length > 1) {
                    if (d.data.name == "Phaeophytes (brown algae)") return "Algae"
                    return d.data.name
                }
            })
            .attr("x", d => {
                let name = d.data.name
                if (d.data.name == "Phaeophytes (brown algae)") name = "Algae"

                let width = getSvgTextWidth(name, "1.6em", "Rasa");
                // let width = getSvgTextWidth(d.data.name);
                console.log(width)
                return d.y - 20 - width;
                // return d.y - 180
            })
            .attr("y", d => d.x - 14)
            .attr("font-size", "1.6em")

        const HSToFungi = ["Homo sapiens", "Bilateria", "Opisthokonts", "Fungi", "Deuterostomia", "opi", "fung"]
        // const HSToFungi = [""]
        // const PlantsToFungi = ["Green plants", "Eukaryotes", "Opisthokonts"]
        const PlantsToFungi = ["Green plants", "Eukaryotes", "Opisthokonts", "Fungi", "fung"]
        // const PlantsToFungi = ["G"]


        const commonPathH = ["Opisthokonts", "Fungi", "fung"]
        // opi and fung


        // const link = svg.append("g")
        //     .attr("fill", "none")
        //     .selectAll("path")
        //     .data(root.links())
        //     .join("path")
        //     .attr("d", linkPath)
        //     .attr("stroke-width", d => {
        //         // console.log(d)
        //         if (HSToFungi.includes(d.source.data.name) && HSToFungi.includes(d.target.data.name)) {
        //             return 20
        //         } else if (PlantsToFungi.includes(d.source.data.name) && PlantsToFungi.includes(d.target.data.name)){
        //             return 20
        //         }
        //
        //         return 10
        //     })
        //     // .attr("stroke", "#000")
        //     .attr("stroke", d => {
        //         if (HSToFungi.includes(d.source.data.name) && HSToFungi.includes(d.target.data.name)) {
        //             // return "red"
        //             return colors[1]
        //         } else if (PlantsToFungi.includes(d.source.data.name) && PlantsToFungi.includes(d.target.data.name)){
        //             // return "blue"
        //             return colors[2]
        //         }
        //         return "black"
        //     })

        const link = svg.append("g")
            .attr("fill", "none")
            .selectAll("path")
            .data(root.links())
            .join((enter) => {

                enter.append("path")
                    .attr("d", linkPath)
                    .attr("stroke-width", d => {
                        // console.log(d)
                        if (HSToFungi.includes(d.source.data.name) && HSToFungi.includes(d.target.data.name)) {
                            return 20
                        } else if (PlantsToFungi.includes(d.source.data.name) && PlantsToFungi.includes(d.target.data.name)) {
                            return 20
                        }

                        return 10
                    })
                    // .attr("stroke", "#000")
                    .attr("stroke", d => {
                        if (HSToFungi.includes(d.source.data.name) && HSToFungi.includes(d.target.data.name)) {
                            // return "red"
                            return colors[1]
                        } else if (PlantsToFungi.includes(d.source.data.name) && PlantsToFungi.includes(d.target.data.name)) {
                            // return "blue"
                            return colors[2]
                        }
                        return "black"
                    })


                enter
                    .filter(d => {
                        return commonPathH.includes(d.source.data.name) && PlantsToFungi.includes(d.target.data.name)
                    })
                    .append("path")
                    .attr("d", linkPath)
                    .attr("stroke-width", 20)
                    .style("stroke-dasharray", 10)
                    .style("z-index", 2000)
                    .attr("stroke", colors[2])
                    // .attr("stroke", "white")
                    .raise()

                // enter
                //     .filter(d => {
                //         let f =d.source.data.name == "Eukaryotes" && d.target.data.name == "Green plants"
                //         return f
                //     })
                //     .attr("stroke", "white")
                    // .raise()

                return enter
            }, update => update, exit => exit.remove())
    }

    function linkPath(d) {
        // console.log(d.source);
        // console.log(d.target);

        let x0 = d.source.y;
        let y0 = d.source.x;

        let x2 = d.target.y;
        let y2 = d.target.x;

        let x1 = x0;
        // let y1 = (y0 + y2) / 2;
        let y1 = y2;

        // const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
        // const s0 = Math.sin(startAngle);
        // const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
        // const s1 = Math.sin(endAngle);
        return "M" + x0 + "," + y0
            + "L" + x1 + "," + y1
            + "L" + x2 + "," + y2;
    }
</script>

<svelte:head>
    <style>
    body {
        background-color: rgba(222, 235, 247, 0.8);
        font-family: Rasa;
    }
  </style>
</svelte:head>

<style>
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
        font-size: 3.9em;
        margin-bottom: 10px;
        width: 60%;
        /*text-align: center;*/
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
        Fungi are closer to Homo Sapiens than Green Plants in the Tree of Life.
<!--        Homo Sapiens and fungi are closer relatives than fungi and green plants in the Tree of Life.-->
    </h1>
    <div id="data-source">
        Data Source: <a href="http://tolweb.org/tree/">Tolweb</a><br>
        Icons: <a href="https://images.phylopic.org/">Phylopic</a>

    </div>
</div>


<svg id="vis" width={WIDTH} height={HEIGHT}>
    <g id="legend">
    </g>

    <!--    <foreignObject height="1000" width="1000" transform="scale(0.2)">-->
    <!--        <img src="https://images.phylopic.org/images/3c60fbfb-5722-4248-94f0-23f841030294/vector.svg">-->
    <!--    </foreignObject>-->

</svg>

<!--<div>-->
<!--    *If the life expectancy does not change.<br>-->
<!--    Data Source: <a-->
<!--        href="https://www.ined.fr/en/everything_about_population/data/europe-developed-countries/life-expectancy/">Ined</a>-->
<!--</div>-->

