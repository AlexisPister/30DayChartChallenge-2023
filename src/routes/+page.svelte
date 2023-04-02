<script lang="ts">
    import * as d3 from "d3";
    import {onMount} from "svelte";

    export let data;

    // Variables
    let country = "France";
    let gender = "male";
    let ageExpectancy: number;
    let age = 20;
    let dataToPlot: Array<any>;

    // Visual Variables
    const SPACING = 30;
    const SQUARE_WIDTH = 70;
    const WIDTH = 1000;
    const HEIGHT = 1000;


    let dataProc = filterData(data.data);
    const countries = dataProc.map(d => d[0]).filter(d => d != "Country");
    countries.sort()
    const genders = ["male", "female"]

    $: ageExpectancy = getLifeExpectancy(country, gender);
    $: dataToPlot = computeData(age, ageExpectancy);
    $: render(dataToPlot);

    onMount(() => {
        render(dataToPlot)
    })

    function getLifeExpectancy(country, gender) {
        let countryData = dataProc.filter(d => d[0] == country)[0]
        let age;
        if (gender == "male") {
            age = countryData[2]
        } else {
            age = countryData[3]
        }
        // return Math.floor(Number(age));
        return Math.round(Number(age));
    }

    function render(dataToPlot) {
        let container = d3.select("#vis")

        container
            .selectAll("rect")
            .data(dataToPlot)
            .join("rect")
            .attr("width", SQUARE_WIDTH)
            .attr("height", SQUARE_WIDTH)
            .attr("x", d => x(d))
            .attr("y", d => y(d))
            .style("fill", d => {
                if (d.isLived == 1) {
                    // return "rgb(172,176,255)"
                    return "rgb(149,225,177)"
                } else if (d.isLived == 0.5) {
                    // return "rgb(149,225,177)"
                    return "rgb(172,176,255)"
                } else {
                    // return "rgb(246,241,241)"
                    return "white"
                }
            })
            .attr("stroke", "black")
            .attr("stroke-width", d => {
                if (d.isLived == 0.5) return 6
                if (d.isLived == 1) return 3
                return 1
            })


        container
            .selectAll(".text")
            .data(dataToPlot)
            .join("text")
            .classed("text", true)
            .text(d => {
                if (d.isLived == 0.5) return d.year
                if (d.year == ageExpectancy) return d.year
                return ""
            })
            .attr("x", d => x(d) + SQUARE_WIDTH / 3.8)
            .attr("y", d => y(d) + 2 * SQUARE_WIDTH / 3.2)
            .attr("font-size", "2em")

        container
            .select("path")
            .attr("d", () => {
                let xStart = x({year: age})
                let yStart = y({year: age})

                let d = `M ${xStart + SQUARE_WIDTH},${yStart + SQUARE_WIDTH / 2}
           Q 1100,220 1100,300`
                return d
            })
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .raise()

        // let xStart = x({year: age})
        //         let yStart = y({year: age})
        // container
        //     .select("line")
        //     .attr("x1", () => xStart + SQUARE_WIDTH)
        //     .attr("y1", () => yStart + SQUARE_WIDTH / 2)
        //     .attr("x2", () => 1100)
        //     .attr("y2", () => 500)
        //     .attr("stroke", "black")
        //     .attr("stroke-width", 3)
        //     .attr("fill", "none")
        //     .raise()

        container
            .select("#path-text")
            .attr("x", () => {
                return 1110
            })
            .attr("y", () => {
                return 310
            })
    }

    const x = (d) => {
        let x = ((d.year - 1) * SQUARE_WIDTH + (d.year - 1) * SPACING) % WIDTH
        return x
    }

    const y = (d) => {
        let nLine = Math.floor((d.year - 1) / squarePerLine()) + 1; // +1 to start at 1 and not 0
        let yVal = nLine * SQUARE_WIDTH + (nLine - 1) * SPACING;
        return yVal
    }

    function squarePerLine() {
        return WIDTH / (SQUARE_WIDTH + SPACING)
    }

    function computeData(age, ageExpectancy) {
        let data = d3.range(1, ageExpectancy + 1).map((i) => {
            let isLived;
            if (age == i) {
                isLived = 0.5
            } else if (age > i) {
                isLived = 1
            } else {
                isLived = 0
            }
            return {
                year: i,
                isLived: isLived
            }
        })
        return data
    }

    const handleGenderChange = (e: Event) => {
        gender = (e.target as HTMLInputElement).value;
    };

    const handleCountryChange = (e: Event) => {
        country = (e.target as HTMLInputElement).value;
    };

    const handleAgeChange = (e: Event) => {
        age = parseInt((e.target as HTMLInputElement).value);
    };

    function filterData(countries) {
        return countries.filter(c => c[0] && c[1] && c[2] && c[3]);
    }
</script>


<style>
    :global(body) {
        background-color: lightgoldenrodyellow;
    }

    .option {
        padding: 3px;
    }

    #main-text {

    }

    svg {
        margin-top: -60px;
        /*padding-top: -100px;*/
    }
</style>


<svelte:head>
</svelte:head>

<div id="options">
<div class="option">
    <label for="gender">Gender:</label>
    {#each genders as g}
        <label>
            <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    on:change={handleGenderChange}
            />
            {g}
        </label>
    {/each}
</div>
<div class="option">
<!--    <label for="country">Country:</label>-->
<!--    <input-->
<!--            type="text"-->
<!--            id="country"-->
<!--            name="country"-->
<!--            value={country}-->
<!--            on:input={handleCountryChange}-->
<!--    />-->

    <label>Country:</label>
    <select on:change={handleCountryChange}>
        {#each countries as c}
            <option value={c}>{c}</option>
        {/each}
    </select>

</div>
<div class="option">
    <label for="age">Age:</label>
    <input
            type="number"
            id="age"
            name="age"
            value={age}
            on:input={handleAgeChange}
    />
</div>
</div>

<div id="main-text">
    <h1>
        You have {ageExpectancy - age} years left to  live in average*, for a {gender} living in {country}.
    </h1>
</div>

<svg id="vis" width={WIDTH + 600} height={HEIGHT}>
    <path></path>
    <line></line>
    <text id="path-text">You are here</text>
</svg>

<div>
    *If the life expectancy does not change.<br>
    Data Source: <a
        href="https://www.ined.fr/en/everything_about_population/data/europe-developed-countries/life-expectancy/">Ined</a>
</div>

