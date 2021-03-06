<script lang="ts">
    import {ActionIcon, Button, Checkbox, SvelteUIProvider, Switch} from "@svelteuidev/core";
    import YearDataInput from "./lib/YearDataInput.svelte";
    import MissedDaysView from "./lib/MissedDaysView.svelte";
    import {YearData} from "./model/year-data.model";
    import {darkModeEnabled} from "./utils/stores.js";
    import {StudentModel} from "./model/student.model";
    import LoadIcon from 'svelte-material-icons/Upload.svelte'
    import SaveIcon from 'svelte-material-icons/ContentSave.svelte'
    import NewIcon from 'svelte-material-icons/Note.svelte'
    import ExportIcon from 'svelte-material-icons/Export.svelte'
    import {Utils} from "./utils/utils";
    import {CsvUtils} from "./utils/csv-utils";
    import {SchoolYearUtils} from "./utils/school-year.utils";


    let displayMode: 'year-data' | 'missed-days' = 'year-data';
    let exportDates = false;
    let exportHours = false;
    const storedData = localStorage.getItem("yearlyData2022");
    let yearlyData: YearData;
    let loadInputElem: HTMLInputElement;

    if (storedData) {
        yearlyData = YearData.fromJSON(JSON.parse(storedData));
    } else {
        yearlyData = new YearData({
            className: ""
        });
    }

    const saveInterval = setInterval(() => {
        localStorage.setItem("yearlyData2022", JSON.stringify(yearlyData));
    }, 5000);

    const onLoadClicked = ()=> {
        loadInputElem.click();
    };
    const onFileSelected = async ()=> {
        if(loadInputElem.files.length < 1) {
            return;
        }
        const file = loadInputElem.files[0];
        try {
            const content = await file.text();
            const jsonContent = JSON.parse(content);
            if(jsonContent.format === "fehlzeiten-gui") {
                yearlyData = YearData.fromJSON(jsonContent);
            }
        } catch (ex) {
            console.error(ex);
            return;
        }

    };

    const saveData = ()=> {
      const dataJSON = JSON.parse(JSON.stringify(yearlyData));
      dataJSON.format = "fehlzeiten-gui";
      Utils.download(JSON.stringify(dataJSON), "fehlzeiten.json", "application/json");
    };

    const exportData = ()=> {
        const dataCSV = CsvUtils.exportToCSV(yearlyData.students, exportHours, exportDates);
        Utils.download(dataCSV, "fehlzeiten.csv", "text/csv");
    };

    const resetData = ()=> {
        const res = confirm("Sollen die Daten wirklich zurückgesetzt werden?");
        if(!res) {
            return;
        }
        yearlyData = new YearData({
            className: "",
        });
        localStorage.removeItem("yearlyData2022");
        // easy way to reset. a bit hacky I guess ¯\_(ツ)_/¯
        location.reload();
    };

</script>
<SvelteUIProvider withGlobalStyles themeObserver={$darkModeEnabled ? 'dark' : 'light'}>
    <input bind:this={loadInputElem} type="file" class="load-input" accept="application/json" on:change={()=>onFileSelected()} hidden/>
    <nav class="nav-bar">
        <Button color="violet" compact="true" ripple="true" on:click={()=>resetData()}>
            <NewIcon slot="leftIcon"></NewIcon>
            Neu
        </Button>
        <Button color="violet" compact="true" ripple="true" on:click={()=>onLoadClicked()}>
            <LoadIcon slot="leftIcon"></LoadIcon>
            Laden
        </Button>

        <Button color="violet" compact="true" ripple="true" on:click={()=>saveData()}>
            <SaveIcon slot="leftIcon"></SaveIcon>
            Speichern
        </Button>
        <Button color="violet" compact="true" ripple="true" on:click={()=>exportData()}>
            <ExportIcon slot="leftIcon"></ExportIcon>
            Export
        </Button>
        <Checkbox bind:checked={exportHours} label="Fehlstunden exportieren"></Checkbox>
        <Checkbox bind:checked={exportDates} label="Fehldaten exportieren"></Checkbox>
        <Switch bind:checked="{$darkModeEnabled}" label="Dark Mode"></Switch>
    </nav>
    <main>
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

<style>
    .nav-bar {
        display: flex;
        gap: .5em
    }
</style>
