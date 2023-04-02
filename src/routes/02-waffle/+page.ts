import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch}) => {
    // return fetch("data/01/life_expect_eu.pd.csv")
    return fetch(`${base}/data/02/menu.csv`)
        .then(data => data.text())
        .then(data => {
            // return Papa.parse(data, {header: true})
            return Papa.parse(data, {header:true})
        })
}) satisfies PageLoad;



