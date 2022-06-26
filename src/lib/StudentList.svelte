<script lang="ts">
import {StudentModel} from "../model/student.model";
import {ActionIcon, Button, TextInput} from "@svelteuidev/core";
import Plus from 'svelte-material-icons/Plus.svelte'
import Delete from 'svelte-material-icons/Delete.svelte'
import {CsvUtils} from "../utils/csv-utils";

export let students: StudentModel[];
let currentFirstName = "";
let currentName = "";
$: formFilled= currentFirstName != "" && currentName != "";
let csvInput: HTMLInputElement;
const importFromCSV = async ()=> {
    if(csvInput.files.length < 1) {
        return;
    }
    const studentData = await CsvUtils.importStudents(csvInput.files[0]);
    students.push(...studentData);
    students = students;
};
</script>
<h2>Schüler:innen</h2>
{#each students as student, index}
    <div class="student-entry">
       <span>{student.firstName} {student.name}</span>
       <ActionIcon title="Schüler:in entfernen" on:click={()=>{students.splice(index, 1); students = students;}}>
           <Delete color="red" size="1.5em"></Delete>
       </ActionIcon>
    </div>
{/each}
<h3>Neue Schüler:in hinzufügen</h3>
<TextInput label="Vorname" bind:value={currentFirstName}></TextInput>
<TextInput label="Nachname" bind:value={currentName}></TextInput>
<ActionIcon disabled={!formFilled} on:click={()=>{students.push(new StudentModel({name: currentName, firstName: currentFirstName})); students = students;}}>
    <Plus></Plus>
</ActionIcon>
<input bind:this={csvInput} type="file" accept="text/csv" on:change={()=>importFromCSV()} hidden/>
<Button on:click={()=>csvInput.click()}>
    CSV Import
</Button>
<style>
.student-entry {
    display: flex;
    align-items: center;
    gap: .2em;
}
</style>
