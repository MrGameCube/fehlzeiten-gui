<script lang="ts">

    import {InputWrapper, NativeSelect} from "@svelteuidev/core";
import {SchoolYearUtils} from "../utils/school-year.utils";

export let currentSchoolYear;
$: startDate = currentSchoolYear.startDate.toISOString().split("T")[0];
$: endDate = currentSchoolYear.endDate.toISOString().split("T")[0];
</script>
<h3>Schuljahr {currentSchoolYear.name}</h3>
<InputWrapper label="Start Datum">
    <input type="date" bind:value={startDate} on:change={(v)=>currentSchoolYear.startDate = v.target.valueAsDate} />
</InputWrapper>
<InputWrapper label="End Datum">
<input type="date" bind:value={endDate} on:change={(v)=>currentSchoolYear.endDate = v.target.valueAsDate} />
</InputWrapper>
