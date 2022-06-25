<script lang="ts">
    import {YearData} from "../model/year-data.model";
    import {ActionIcon} from "@svelteuidev/core";
    import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
    import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
    import ArrowLast from 'svelte-material-icons/PageLast.svelte';
    import ArrowFirst from 'svelte-material-icons/PageFirst.svelte';
    import {darkModeEnabled} from "../utils/stores.js";
    import {DateUtils} from "../utils/date.utils";
    import {StudentModel} from "../model/student.model";
    import {MissedType} from "../model/missed-time.model";

    export let yearlyData: YearData;
    let currentWeekDate: Date = new Date(yearlyData.schoolYear.startDate);
    $: firstDay = DateUtils.getFirstDayOfWeek(currentWeekDate);
    $: lastDay = DateUtils.getLastDayOfWeek(currentWeekDate);

    $: isFirstWeek = firstDay <= yearlyData.schoolYear.startDate;
    $: isLastWeek = lastDay >= yearlyData.schoolYear.endDate;

    let weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const dateFormatter = new Intl.DateTimeFormat("de", {day: "2-digit", month:'long', year: "2-digit"});
    const nextWeek= () => {
        currentWeekDate.setDate(currentWeekDate.getDate() + 7);
        currentWeekDate = currentWeekDate;
    };
    const prevWeek= () => {
        currentWeekDate.setDate(currentWeekDate.getDate() - 7);
        currentWeekDate = currentWeekDate;
    };
    const handleClick = (student: StudentModel, isoDate: string)=> {
        if(!student.missedTimes.has(isoDate)) {
            student.missedTimes.set(isoDate, {
                date: new Date(isoDate),
                type: MissedType.EXCUSED,
                hours: 0
            });
            yearlyData.students = yearlyData.students;
            return;
        }

        let missingInfo = student.missedTimes.get(isoDate);
        if(missingInfo.type === MissedType.EXCUSED) {
            missingInfo.type = MissedType.UNEXCUSED;
        } else {
            student.missedTimes.delete(isoDate);
        }
        yearlyData.students = yearlyData.students;

    };

    const handleRightClick = (student: StudentModel, isoDate: string)=> {
        if(!student.missedTimes.get(isoDate)) {
            return;
        }
        const missedInfo = student.missedTimes.get(isoDate);
        missedInfo.hours = ((missedInfo.hours + 1) % 6);
        yearlyData.students = yearlyData.students;
    };
</script>
<div class="header">
    <h2>Woche von: {dateFormatter.format(firstDay)}  bis: {dateFormatter.format(lastDay)}</h2>
    <span class="buttons">
    <ActionIcon disabled={isFirstWeek} title="Erste Woche" on:click={()=>currentWeekDate=new Date(yearlyData.schoolYear.startDate)}>
        <ArrowFirst color={$darkModeEnabled ? 'white' : 'black'} size="2em"></ArrowFirst>
    </ActionIcon>
    <ActionIcon disabled={isFirstWeek} title="Woche zurück" on:click={()=>prevWeek()}>
        <ArrowLeft color={$darkModeEnabled ? 'white' : 'black'} size="2em"></ArrowLeft>
    </ActionIcon>
    <ActionIcon disabled={isLastWeek} title="Woche vor" on:click={()=>nextWeek()}>
        <ArrowRight color={$darkModeEnabled ? 'white' : 'black'} size="2em"></ArrowRight>
    </ActionIcon>
    <ActionIcon disabled={isLastWeek} title="Woche vor" on:click={()=>currentWeekDate=new Date(yearlyData.schoolYear.endDate)}>
        <ArrowLast color={$darkModeEnabled ? 'white' : 'black'} size="2em"></ArrowLast>
    </ActionIcon>
    </span>
</div>
<table>
    <tr>
        <td></td>
        {#each yearlyData.students as student}
            <th title={student?.getMissedDaysAndHours()}>{student.name}, {student.firstName}</th>
        {/each}
    </tr>
    {#each weekdays as weekday, dayOfWeek}
        <tr>
            <th>{weekday}</th>
            {#each yearlyData.students as student}
                {@const isoDate = DateUtils.getISOForDay(currentWeekDate, dayOfWeek)}
                {@const missedEntry = student.missedTimes.get(isoDate)}
                <td on:click={()=>handleClick(student, isoDate)} on:contextmenu|preventDefault={()=>handleRightClick(student, isoDate)}
                    class:excused={missedEntry?.type===MissedType.EXCUSED}
                    class:unexcused={missedEntry?.type===MissedType.UNEXCUSED}
                    class="day"
                >{missedEntry ? missedEntry?.hours === 0 ? "" : missedEntry?.hours : ""}</td>
            {/each}
        </tr>
    {/each}
    <tr></tr>
    <tr>
        <td class="excused"></td>
        <td>Entschuldigt</td>
        <td class="unexcused"></td>
        <td>Unentschuldigt</td>
    </tr>
</table>
<style>
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }
    .excused {
        background-color: aqua;
    }
    .unexcused {
        background-color: #ff3e00;
    }
    .buttons {
        display: flex;
    }
</style>
