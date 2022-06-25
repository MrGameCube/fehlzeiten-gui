<script lang="ts">
import {StudentModel} from "../model/student.model";
import {ActionIcon, TextInput} from "@svelteuidev/core";
import Plus from 'svelte-material-icons/Plus.svelte'
import Delete from 'svelte-material-icons/Delete.svelte'

export let students: StudentModel[];
let currentFirstName = "";
let currentName = "";
$: formFilled= currentFirstName != "" && currentName != "";
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

<style>
.student-entry {
    display: flex;
    align-items: center;
    gap: .2em;
}
</style>
