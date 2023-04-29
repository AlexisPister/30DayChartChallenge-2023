import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    // const  d = fetch(`${base}/data/15/diabetes.csv`)
    // const  d = fetch(`${base}/data/15/StudentsPerformance.csv`)
    const  d = fetch(`${base}/data/15/Iris.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })

    return d
}) satisfies PageLoad;



