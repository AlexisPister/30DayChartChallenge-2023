import type {PageLoad} from './$types';
import { base } from "$app/paths";

import Papa from "papaparse";

export const load = (({ fetch }) => {
    const neurons = fetch(`${base}/data/17/Connectome.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })

    const neuronToMuscle = fetch(`${base}/data/17/Neurons_to_Muscles.csv`)
        .then(data => data.text())
        .then(data => {
            const d = Papa.parse(data, {header:true})
            return d
        })

    return {
        neurons: neurons,
        muscles: neuronToMuscle
    }
}) satisfies PageLoad;



