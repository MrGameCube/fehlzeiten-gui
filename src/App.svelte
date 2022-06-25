<script lang="ts">
    import logo from './assets/svelte.png'
    import Counter from './lib/Counter.svelte'
    import {Button, SvelteUIProvider, Switch} from "@svelteuidev/core";
    import {writable} from "svelte/store";
    import ThemeIcon from 'svelte-material-icons/ThemeLightDark.svelte'
    import YearDataInput from "./lib/YearDataInput.svelte";
    import MissedDaysView from "./lib/MissedDaysView.svelte";


    let darkMode = writable(JSON.parse(localStorage.getItem("darkMode")));
    darkMode.subscribe((value) => localStorage.setItem("darkMode", value));

    let displayMode: 'year-data' | 'missed-days' = 'year-data';

</script>
<SvelteUIProvider withGlobalStyles themeObserver={$darkMode ? 'dark' : 'light'}>
    <main>
        <Switch bind:checked="{$darkMode}" label="Dark Mode"></Switch>

        {#if displayMode === "year-data"}
            <YearDataInput></YearDataInput>
            <Button on:click={()=>displayMode='missed-days'}>Weiter zur Fehlzeitenansicht</Button>
        {:else if displayMode === "missed-days"}
            <MissedDaysView></MissedDaysView>
            <Button on:click={()=>displayMode='year-data'}>Zurück zur Basisdatenansicht</Button>
        {/if}
    </main>

    <style>
    </style>
</SvelteUIProvider>
