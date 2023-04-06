<script lang="ts">
    import * as d3 from "d3";
    // import "d3-graphviz"
    import {graphviz} from "d3-graphviz";
    // import * as graphviz from "d3-graphviz";
    import {onMount} from "svelte";
    import {filter} from "d3";
    import {base} from "$app/paths";

    export let data;

    // visual variables
    const WIDTH = 1800;
    const HEIGHT = 1400;
    const langLabelWidth = 8;
    const langPos = "l";
    const langLoc = "b";
    const fontsize = "14"

    const color1 = "#fbb4ae"
    const color2 = "#b3cde3"
    const color3 = "#ccebc5"
    const color4 = "#decbe4"

    const colorEng = "#decbe4"
    // const colorFrench = ["#7e98af", "#b3cde3"];
    const colorFrench = ["#b0c9de", "#cbe0f3"];
    const colorLatin = ["#cea874", "#ecc999"];
    const colorInd = ["#75a46b"];

    const margin = {
        right: 180
    }

    // variables
    let svg;


    const node = (label, meaning, labelid=null, ps=9) => {
        if (!labelid) labelid = label;
        return `${labelid}[rank=1,label=<${label}<br/><FONT POINT-SIZE="${ps}">${meaning}</FONT>>]`
    }

    const dotSrc = `
  digraph {
    rankdir = BT;
    newrank=true;


    subgraph cluster_fr {
        style=filled;
        color="${colorFrench[1]}";
        node [style=filled,color="${colorFrench[1]}", fontsize=${fontsize}];

        ${node("avis", "opinion")};
        ${node("visage", "face (of a human)")};

        label = "French";
        labelloc=${langLoc};
        labeljust=${langPos};
        fontsize = ${langLabelWidth};
    }

    subgraph cluster_fro {
        style=filled;
        color="${colorFrench[0]}";
        node [style=filled,color="${colorFrench[0]}", fontsize=${fontsize}];

        ${node("avis", " ", "avisOF", 1)};
        ${node("vis", "face")};

        label = "Old French";
        // labelloc=${langLoc};
        // labeljust=${langPos};
        labeljust=r;
        fontsize = ${langLabelWidth};
    }

    avisOF -> avis
    vis -> avisOF
    vis -> visage


    subgraph cluster_eng {
        style=filled;
        color="${colorEng}";
        node [style=filled,color="${colorEng}", fontsize=${fontsize}];

        ${node("visualization", " ")};



        visualize -> visualization;
        visual -> visualize;
        label = "English";
        labelloc=${langLoc};
        labeljust=${langPos};
        fontsize = ${langLabelWidth};
    }

    subgraph cluster_2 {
        style=filled;
        color="${colorLatin[1]}";
        node [style=filled,color="${colorLatin[1]}", fontsize=${fontsize}];
        visus -> visualis;

        ${node("visus", "the action of looking")};
        ${node("visualis", "attained by sight")};

        label = "Latin";
        labelloc=${langLoc};
        labeljust=${langPos};
        fontsize = ${langLabelWidth};
    }

    visualis -> visual;
    // visus -> avisOF
    visus -> vis

    subgraph cluster_3 {
        style=filled;
        color="${colorLatin[0]}";
        node [style=filled,color="${colorLatin[0]}", fontsize=${fontsize}];
        weissus;
        label = "Proto-Latin";
        labelloc=${langLoc};
        labeljust=${langPos};
        fontsize = ${langLabelWidth};
    }

    weissus -> visus

    subgraph cluster_4 {
    labelloc="c"
        style=filled;
        color="${colorInd}";
        node [style=filled,color="${colorInd}", fontsize=${fontsize}];

        ${node("weyd", "to see")};
        ${node("wéydˢtus", "(act of) seeing, knowledge")};

        weyd -> wéydˢtus;
        label = "Proto-Indo-European";
        // labelloc=${langLoc};
        labeljust=${langPos};
        fontsize = ${langLabelWidth};
    }

    wéydˢtus -> weissus;

    {rank = same; visualization; avis; visage;}
  }
`;

    // let dataProc = filterData(data.data);
    onMount(() => {
        svg = d3.select("#vis")
            .append("g")
            .attr("transform", `translate(${margin.right}, 0)`)
        render()
    })


    function render() {
        // graphviz(d3.select('#graph'), {useWorker: false})
        graphviz('#graph', {useWorker: false})
            .renderDot(dotSrc)
        // .catch(e => {
        //     console.log(e)
        // })

    }
</script>


<style>
    :global(body) {
        font-family: Rasa;
    }

    #container {
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        width: 60%;
    }

    #main-text {
        padding: 20px;
        padding-top: 0;
        z-index: 2;
        /*text-align: justify;*/
    }

    h1 {
        font-size: 3em;
        /*font-size: 3.9em;*/
        margin-bottom: 10px;
        /*width: 80%;*/
        /*text-align: center;*/
    }

    #data-source {
        /*padding-left: 4px;*/
    }
</style>

<div id="container">

<div id="main-text">
    <h1>
        The words <i>visualization</i> (eng), <i>avis</i> (fra), and <i>visage</i> (fra) share the same etymological roots.
    </h1>
    <div id="data-source">
        Data Source: <a href="https://en.wiktionary.org/wiki/Wiktionary:Main_Page">Wikitionary</a><br>
        Layout: <a href="https://graphviz.org/">Graphviz</a>

    </div>
</div>

<div id="graph">
</div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

