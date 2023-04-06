import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    return fetch(`${base}/data/06/API_EN.ATM.PM25.MC.M3_DS2_en_csv_v2_5362918.csv`)
    // return fetch(`${base}/data/06/API_EN.ATM.CO2E.PC_DS2_en_csv_v2_5358914.csv`)
    // return fetch(`${base}/data/06/API_SI.POV.GINI_DS2_en_csv_v2_5358360.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })
}) satisfies PageLoad;



