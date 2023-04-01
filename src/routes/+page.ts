import type {PageLoad} from './$types';
import Papa from "papaparse";

export const load = (({ fetch}) => {
    // d3.csv("static/data/01/life_expect_eu.pd.csv")
    return fetch("data/01/life_expect_eu.pd.csv")
        .then(data => data.text())
        .then(data => {
            // return Papa.parse(data, {header: true})
            return Papa.parse(data)
        })
}) satisfies PageLoad;