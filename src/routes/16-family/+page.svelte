<script lang="ts">
    import * as Plot from "@observablehq/plot";
    import {onMount} from "svelte";
    import * as d3 from 'd3';


    // Variables
    let data = [
        [
            {id: "Paulus Atréides", affiliation: "Atréides"},
            {id: "Héléna Richese", affiliation: "Richese"},
            {id: "Vladimir Harkonnen", affiliation: "Harkonnen"},
            {id: "Tanidia Nerus"},
            {id: "Elrood IX", affiliation: "Corrino"},
            {id: "Unknown2"},
            {id: "Abulurd Harkonnen II", affiliation: "Harkonnen"},
            {id: "Emmi Rabban"},
            {id: "Unknown"}
        ],
        [
            {id: 'Leto Atréides', parents: ["Paulus Atréides", "Héléna Richese"], affiliation: "Atréides"},
            {id: 'Jessica Atréides', parents: ["Vladimir Harkonnen", "Tanidia Nerus"], affiliation: "Atréides"},
            {id: 'Liet Kynes', affiliation: "Fremen"},
            {id: 'Faroula', affiliation: "Fremen"},
            {id: 'Anirul Corrino', affiliation: "Corrino"},
            {id: "Shaddam IV Corrino", parents: ["Elrood IX", "Unknown2"], affiliation: "Corrino"},
            {id: 'Glossu Rabban', parents: ["Abulurd Harkonnen II", "Emmi Rabban"], affiliation: "Harkonnen"},
            {id: 'Feyd-Rautha Harkonnen', parents: ["Abulurd Harkonnen II", "Unknown"], affiliation: "Harkonnen"}
        ],
        [
            {id: 'Alia Atréides', parents: ["Leto Atréides", "Jessica Atréides"], affiliation: "Atréides"},
            {id: 'Paul Atréides', parents: ["Leto Atréides", "Jessica Atréides"], affiliation: "Atréides"},
            {id: 'Chani Kynes', parents: ["Liet Kynes", "Faroula"], affiliation: "Fremen"},
            {id: "Irulan Corrino", parents: ["Shaddam IV Corrino", "Anirul Corrino"], affiliation: "Corrino"},
            {id: "Wensicia Corrino", parents: ["Shaddam IV Corrino", "Anirul Corrino"], affiliation: "Corrino"},
            {id: 'Unknown1'},
        ],
        [
            {id: 'Leto Atréides II', parents: ["Paul Atréides", "Chani Kynes"], affiliation: "Atréides"},
            {id: 'Paul Atréides II the elder', parents: ["Paul Atréides", "Chani Kynes"], affiliation: "Atréides"},
            {id: 'Ghanima Atreides', parents: ["Paul Atréides", "Chani Kynes"], affiliation: "Atréides"},
            {id: "Farad'n Corrino", parents: ["Wensicia Corrino", "Unknown1"], affiliation: "Corrino"}
        ]
    ]

    let order = {
        "Harkonnen": 0,
        "Atréides": 1,
        "Fremen": 2,
        Corrino: 3,
        Richese: 4,
        undefined: 5
    }

    // data.forEach(layer => {
    //     layer = layer.sort((a, b) => order[a.affiliation] - order[b.affiliation])
    // })

    let layoutData;

    // Visual variables
    let WIDTH = 1300;
    const HEIGHT = 1000;
    const COLORS = ["#dc3e3e", "#f6a15e"]
    const margin = {bottom: 20, left: 60, right: 120, top: 20}

    let affiliations = Object.keys(order).slice(0, -1).concat([undefined]);
    const affiScale = d3.scaleOrdinal(d3.schemeSet2).domain(Object.keys(order).slice(0, -1).concat([undefined])).range(["#4377b9", "#e51b1a", '#f4d4a9', "#f0f001", "#3797af", "lightgray"])

    let c = "#3797af"

    onMount(() => {
        layoutData = constructTangleLayout(data);
        WIDTH = layoutData.layout.width
        console.log(layoutData)
        render()
    })

    function constructTangleLayout(levels, options = {}) {
        // precompute level depth
        levels.forEach((l, i) => l.forEach(n => (n.level = i)));

        var nodes = levels.reduce((a, x) => a.concat(x), []);
        var nodes_index = {};
        nodes.forEach(d => (nodes_index[d.id] = d));

        // objectification
        nodes.forEach(d => {
            d.parents = (d.parents === undefined ? [] : d.parents).map(
                p => nodes_index[p]
            );
        });

        // precompute bundles
        levels.forEach((l, i) => {
            var index = {};
            l.forEach(n => {
                if (n.parents.length == 0) {
                    return;
                }

                var id = n.parents
                    .map(d => d.id)
                    .sort()
                    .join('-X-');
                if (id in index) {
                    index[id].parents = index[id].parents.concat(n.parents);
                } else {
                    index[id] = {
                        id: id,
                        parents: n.parents.slice(),
                        level: i,
                        span: i - d3.min(n.parents, p => p.level)
                    };
                }
                n.bundle = index[id];
            });
            l.bundles = Object.keys(index).map(k => index[k]);
            l.bundles.forEach((b, i) => (b.i = i));
        });

        var links = [];
        nodes.forEach(d => {
            d.parents.forEach(p =>
                links.push({source: d, bundle: d.bundle, target: p})
            );
        });

        var bundles = levels.reduce((a, x) => a.concat(x.bundles), []);

        // reverse pointer from parent to bundles
        bundles.forEach(b =>
            b.parents.forEach(p => {
                if (p.bundles_index === undefined) {
                    p.bundles_index = {};
                }
                if (!(b.id in p.bundles_index)) {
                    p.bundles_index[b.id] = [];
                }
                p.bundles_index[b.id].push(b);
            })
        );

        nodes.forEach(n => {
            if (n.bundles_index !== undefined) {
                n.bundles = Object.keys(n.bundles_index).map(k => n.bundles_index[k]);
            } else {
                n.bundles_index = {};
                n.bundles = [];
            }
            n.bundles.sort((a, b) => d3.descending(d3.max(a, d => d.span), d3.max(b, d => d.span)))
            n.bundles.forEach((b, i) => (b.i = i));
        });

        links.forEach(l => {
            if (l.bundle.links === undefined) {
                l.bundle.links = [];
            }
            l.bundle.links.push(l);
        });

        // layout
        const padding = 8;
        // const node_height = 22;
        const node_height = 30;
        // const node_width = 70;
        const node_width = 180;
        const bundle_width = 14;
        // const bundle_width = 50;
        const level_y_padding = 16;
        const metro_d = 4;
        const min_family_height = 22;

        options.c ||= 16;
        // options.c ||= 2;
        const c = options.c;
        options.bigc ||= node_width + c;

        nodes.forEach(
            n => (n.height = (Math.max(1, n.bundles.length) - 1) * metro_d)
        );

        var x_offset = padding;
        var y_offset = padding;
        levels.forEach(l => {
            x_offset += l.bundles.length * bundle_width;
            y_offset += level_y_padding;
            l.forEach((n, i) => {
                n.x = n.level * node_width + x_offset;
                n.y = node_height + y_offset + n.height / 2;

                y_offset += node_height + n.height;
            });
        });

        var i = 0;
        levels.forEach(l => {
            l.bundles.forEach(b => {
                b.x =
                    d3.max(b.parents, d => d.x) +
                    node_width +
                    (l.bundles.length - 1 - b.i) * bundle_width;
                b.y = i * node_height;
            });
            i += l.length;
        });

        links.forEach(l => {
            l.xt = l.target.x;
            l.yt =
                l.target.y +
                l.target.bundles_index[l.bundle.id].i * metro_d -
                (l.target.bundles.length * metro_d) / 2 +
                metro_d / 2;
            l.xb = l.bundle.x;
            l.yb = l.bundle.y;
            l.xs = l.source.x;
            l.ys = l.source.y;
        });

        // compress vertical space
        var y_negative_offset = 0;
        levels.forEach(l => {
            y_negative_offset +=
                -min_family_height +
                d3.min(l.bundles, b =>
                    d3.min(b.links, link => link.ys - 2 * c - (link.yt + c))
                ) || 0;
            l.forEach(n => (n.y -= y_negative_offset));
        });

        // very ugly, I know
        links.forEach(l => {
            l.yt =
                l.target.y +
                l.target.bundles_index[l.bundle.id].i * metro_d -
                (l.target.bundles.length * metro_d) / 2 +
                metro_d / 2;
            l.ys = l.source.y;
            l.c1 = l.source.level - l.target.level > 1 ? Math.min(options.bigc, l.xb - l.xt, l.yb - l.yt) - c : c;
            l.c2 = c;
        });

        var layout = {
            width: d3.max(nodes, n => n.x) + node_width + 2 * padding,
            height: d3.max(nodes, n => n.y) + node_height / 2 + 2 * padding,
            node_height,
            node_width,
            bundle_width,
            level_y_padding,
            metro_d
        };

        return {levels, nodes, nodes_index, links, bundles, layout};
    }

    function render() {
        const svg = d3.select("svg")

        svg
            .selectAll(".label")
            .data(layoutData.nodes)
            .join("text")
            .classed("label", true)
            .text(d => {
                if (d.id.includes("known")) return "Unknown"
                return d.id
            })
            .attr("x", d => d.x + 7)
            .attr("y", d => d.y - 4)
            .attr("fill", d => affiScale(d.affiliation))
        // .attr("fill", d => affiScale(d.affiliation))

        svg
            .selectAll(".path")
            .data(layoutData.links)
            .join((enter) => {
                let g = enter.append("g")

                g.append("path")
                    .attr("d", l => {
                        let aff1 = l.source.affiliation
                        let aff2 = l.target.affiliation
                        return `
                      M${l.xt} ${l.yt}
                      L${l.xb - l.c1} ${l.yt}
                      A${l.c1} ${l.c1} 90 0 1 ${l.xb} ${l.yt + l.c1}
                      L${l.xb} ${l.ys - l.c2}
                      A${l.c2} ${l.c2} 90 0 0 ${l.xb + l.c2} ${l.ys}
                      L${l.xs} ${l.ys}`
                    })
                    .attr("fill", "none")
                    .attr("stroke", d => {
                        return affiScale(d.source.affiliation)
                        // return affiScale(d.target.affiliation)
                    })

                g.append("path")
                    .attr("d", l => {
                        return `
                      M${l.xt} ${l.yt}
                      L${l.xb - l.c1} ${l.yt}
                      A${l.c1} ${l.c1} 90 0 1 ${l.xb} ${l.yt + l.c1}
                      L${l.xb} ${l.ys - l.c2}
                      A${l.c2} ${l.c2} 90 0 0 ${l.xb + l.c2} ${l.ys}
                      L${l.xs} ${l.ys}`
                    })
                    .attr("fill", "none")
                    .attr("stroke", d => {
                        return affiScale(d.source.affiliation)
                        // return affiScale(d.target.affiliation)
                    })
                    .attr("stroke-dasharray", d => 4)

                return g
            })
            .classed(".path", true)


        svg
            .selectAll(".node")
            .data(layoutData.nodes)
            .join("circle")
            .classed("node", true)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => 4)
            .attr("fill", d => {
                return affiScale(d.affiliation)
                // return "black"
            })
        .attr("stroke", d => {
                // return affiScale(d.affiliation)
                return "black"
            })

        renderLegend()
    }


    function renderLegend() {
        let legend = d3.select("svg")
            .append("g")
            .attr("transform", `translate(500, 70)`)



        let marginRight = 100;
        let marginTop = 33;

        legend.append("text")
            .text("Affiliations")
            .attr("transform", (d, i) => `translate(${marginRight - 4},10)`)
            .attr("fill", "white")
            .attr("font-size", "22px")

        legend.selectAll(".dot")
            .data(affiliations)
            .join("rect")
            .attr("transform", (d, i) => `translate(${marginRight}, ${marginTop + i * 25})`)
            .attr("x", -7)
            .attr("y", -7)
            .attr("width", 10)
            .attr("height", 10)
            // .attr("x", (d, i) => `translate(${marginRight}, ${marginTop + i * 25})`)
            // .attr("y", (d, i) => `translate(${marginRight}, ${marginTop + i * 25})`)
            // .attr("cx", 100)
            // .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            // .attr("r", 7)
            .style("fill", function (d) {
                return affiScale(d)
            })
            .classed("dot", true)


        legend.selectAll(".llabel")
            .data(affiliations)
            .join("text")
            .attr("x", marginRight + 20)
            .attr("y", function (d, i) {
                return marginTop + i * 25
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) {
                return affiScale(d)
            })
            .text(function (d) {
                if (d) return d
                return 'Other/Unknown'
            })
            // .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .classed("llabel", true)
    }
</script>


<style>
    :global(body) {
        /*font-family: Rasa;*/
        /*background-color: #428ad2;*/
        /*background-color: #311100;*/
        background-color: #4f210e;
        color: white;
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
        font-size: 2.9em;
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
        font-size: 1.3em;
    }

    svg {
        /*background-color: #4d1b00;*/
        /*background-color: #462303;*/
    }

    a {
        color: #78a0c4;
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
Dune novel's main characters family tree
        </h1>
<!--        <h3 id="subtitle">-->
<!--            The Sepal width of Iris flowers is positively correlated with sepal length but inversely correlated when-->
<!--            looking at Iris species individually.-->
<!--        </h3>-->
        <div id="data-source">
            Data Source: <a href="https://dune.fandom.com/">dune.fandom.com</a>
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

