import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    const data = fetch(`${base}/data/21/LynxHare.txt`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:false, delimiter:" "})
            return d
        })
    return data
}) satisfies PageLoad;



