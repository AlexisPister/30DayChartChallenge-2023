import type {PageLoad} from './$types';
import { base } from "$app/paths";

export const load = (({ fetch }) => {
    // return fetch(`${base}/data/03/phylograph.json`)
    return fetch(`${base}/data/03/phylograph_tree.json`)
        .then(data => data.json())
        .then(data => {
            return data
        })
}) satisfies PageLoad;



