<script lang="ts">
    import Visu from "../../../static/data/07/visualization.svelte"

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

    // variables
    let svg;
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
</style>

<div id="container">
    <div id="main-text">
        <h1>
            Does the <a href="https://fr.wikipedia.org/wiki/Club_des_27"><i>27 Club</i></a> generalize to the overall population of artists?
        </h1>
        <div id="data-source">
            Data Source: <a href="https://www.kaggle.com/datasets/imoore/age-dataset">Kaggle</a><br>
            Layout: <a href="https://altair-viz.github.io/index.html">Altair</a>
        </div>
    </div>
    <div id="graph">
<!--        <svg width="{WIDTH}" height="{HEIGHT}">-->
<!--        </svg>-->

        <Visu></Visu>

        <h1>
            It does not seem like it ¯\_(ツ)_/¯
        </h1>

    </div>
</div>

<!--<svg id="vis" width={WIDTH} height={HEIGHT}>-->
<!--    <g id="legend">-->
<!--    </g>-->
<!--</svg>-->

