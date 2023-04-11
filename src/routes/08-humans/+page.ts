import type {PageLoad} from './$types';
import { base } from "$app/paths";

export const load = (({ fetch }) => {
    return fetch(`${base}/data/08/solar_system_data.json`)
        .then(data => data.json())
        .then(d => {
            return {planets: d}
        })
}) satisfies PageLoad;



