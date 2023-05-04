<script lang="ts">
    import {base, assets} from "$app/paths";
    import { page } from '$app/stores';

    import * as d3 from "d3";
    import {onMount} from "svelte";

    export let data;
    const FOLDERS = [
        "01-parttowhole",
        "02-waffle",
        "03-faunaflora",
        "04-historical",
        "05-slope",
        "06-OWID",
        "07-hazard",
        "08-humans",
        "09-lowhigh",
        "10-hybrid",
        "11-circular",
        "12-BBC",
        "13-pop",
        "14-newtool",
        "15-positiveNegative",
        "16-family",
        "17-networks",
        "18-eurostats",
        "21-downupwards",
        "23-tiles"
    ]

    let path = $page.url.pathname == "/" ? "" : $page.url.pathname;
    console.log(path)
</script>


<style>
    :global(body) {
        font-family: Rasa;
    }

    #main {
        display: flex;
        flex-direction: column;
        margin: 1% 8%;
        margin-bottom: 4%;
        align-items: center;

    }

    #text {
        font-size: 2.8em;
        margin-bottom: 1%;
        text-align: center;
    }

    #challenge {
        width: 56%;
    }

    #grid {
        display: grid;
        grid-gap: 2%;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    .day {
        /*border: 1px solid black;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    img {
        /*height: 10em;*/
        width: 100%;
    }

    svg {
        margin-top: -60px;
        /*padding-top: -100px;*/
    }
</style>


<svelte:head>
    <style>
        body {
            /*background-color: rgba(190, 255, 245, 0.5);*/
        }
    </style>
</svelte:head>

<div id="main">
    <div id="text">
        Here are <a href="https://alexispister.github.io/">my</a> 20 contributions to the <a
            href="https://twitter.com/30DayChartChall">#30DayChartChallenge</a> 2023.
        You can click on the images to go to the charts.
    </div>
    <img id="challenge" src="{base}/30challenge.jpeg">
    <div id="grid">
        {#each FOLDERS as day}
            <a class="day" href="{base}/{day}">
<!--            <a class="day" href="{base}{path}/{day}">-->
                <!--            <div >-->
                <div></div>
                <img src="{base}/screen/{day.slice(0, 2)}.png">
                {day}
                <!--            </div>-->
            </a>

        {/each}
    </div>
</div>

