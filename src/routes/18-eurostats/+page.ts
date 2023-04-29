import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    // const exports = fetch(`${base}/data/18/estat_tet00003.tsv`)
    //     .then(data => data.text())
    //     .then(data => {
    //         const d = Papa.parse(data, {header:true})
    //         return d
    //     })
    const exports = fetch(`${base}/data/18/exports.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:false, delimiter:"\t"})
            return d
        })

    // const imports = fetch(`${base}/data/18/estat_tet00004.tsv`)
    //     .then(data => data.text())
    //     .then(data => {
    //         const d = Papa.parse(data, {header:true})
    //         return d
    //     })
    const imports = fetch(`${base}/data/18/imports.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:false, delimiter:"\t"})
            return d
        })

    const map = fetch(`${base}/data/18/ne_50m_admin_0_countries.json`)
        .then(data => data.json())

    const world = fetch("https://raw.githubusercontent.com/neocarto/bertin/main/data/world.geojson")
        .then(data => data.json())

    return {
        imports,
        exports,
        map,
        world
    }
}) satisfies PageLoad;



