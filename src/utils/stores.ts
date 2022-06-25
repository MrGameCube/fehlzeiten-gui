import {writable} from "svelte/store";

export const darkModeEnabled = writable(JSON.parse(localStorage.getItem("darkMode")));
darkModeEnabled.subscribe((value) => localStorage.setItem("darkMode", value));
