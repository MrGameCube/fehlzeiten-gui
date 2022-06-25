<script lang="ts">
    import {Button, SvelteUIProvider, Switch} from "@svelteuidev/core";
    import YearDataInput from "./lib/YearDataInput.svelte";
    import MissedDaysView from "./lib/MissedDaysView.svelte";
    import {YearData} from "./model/year-data.model";
    import {darkModeEnabled} from "./utils/stores.js";
    import {element} from "svelte/internal";
    import {StudentModel} from "./model/student.model";



    let displayMode: 'year-data' | 'missed-days' = 'year-data';
    const storedData = localStorage.getItem("yearlyData2022");
    let yearlyData: YearData;
    if(storedData) {
        yearlyData = JSON.parse(storedData);
        yearlyData.students = yearlyData.students.map((s)=>StudentModel.fromJSON(s));
    } else {
        yearlyData = new YearData({
            className: ""
        });
    }

    const saveInterval = setInterval(()=> {
            localStorage.setItem("yearlyData2022", JSON.stringify(yearlyData));
    }, 5000);
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
