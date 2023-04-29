import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    const  d = fetch(`${base}/data/10/friends.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })

    const imdb = fetch(`${base}/data/10/friends_imdb.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })

    return {d,
        imdb}
}) satisfies PageLoad;



