<script lang="ts">
    import logo from './assets/svelte.png'
    import Counter from './lib/Counter.svelte'
    import {Button, SvelteUIProvider, Switch} from "@svelteuidev/core";
    import {writable} from "svelte/store";
    import ThemeIcon from 'svelte-material-icons/ThemeLightDark.svelte'
    import YearDataInput from "./lib/YearDataInput.svelte";
    import MissedDaysView from "./lib/MissedDaysView.svelte";
    import {YearData} from "./model/year-data.model";
    import {darkModeEnabled} from "./utils/stores.js";



    let displayMode: 'year-data' | 'missed-days' = 'year-data';
    const yearlyData = new YearData({
        className: ""
    });
</script>
<SvelteUIProvider withGlobalStyles themeObserver={$darkModeEnabled ? 'dark' : 'light'}>
    <main>
        <Switch bind:checked="{$darkModeEnabled}" label="Dark Mode"></Switch>

        {#if displayMode === "year-data"}
            <YearDataInput yearData={yearlyData}></YearDataInput>
            <Button on:click={()=>displayMode='missed-days'}>Weiter zur Fehlzeitenansicht</Button>
        {:else if displayMode === "missed-days"}
            <MissedDaysView yearlyData={yearlyData}></MissedDaysView>
            <Button on:click={()=>displayMode='year-data'}>Zurück zur Basisdatenansicht</Button>
        {/if}
    </main>

    <style>
    </style>
</SvelteUIProvider>
