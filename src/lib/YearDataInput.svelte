<script lang="ts">

import SchoolYearInput from "./SchoolYearInput.svelte";
import {SchoolYearUtils} from "../utils/school-year.utils.js";
import {YearData} from "../model/year-data.model";
import {TextInput} from "@svelteuidev/core";
import StudentList from "./StudentList.svelte";
export let yearData;
</script>
<SchoolYearInput currentSchoolYear={SchoolYearUtils.generateCurrentSchoolYear()}></SchoolYearInput>
<TextInput label="Klassenname" bind:value={yearData.className}></TextInput>
<StudentList students={yearData.students}></StudentList>
