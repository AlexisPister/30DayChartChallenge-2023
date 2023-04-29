import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    const  d = fetch(`${base}/data/11/table.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })

    return d
}) satisfies PageLoad;



