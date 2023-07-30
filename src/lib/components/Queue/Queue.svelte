<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
	} from 'flowbite-svelte';
	import { queue } from '$lib/utils/queue.store';
	let items = queue.items;

	setInterval(() => (items = queue.items), 16);
</script>

<Table>
	{#if items}
		{#each items as song}
			<TableBodyRow>
				<TableBodyCell>{String(song).split('\\').pop()}</TableBodyCell>
			</TableBodyRow>
		{/each}
	{:else}
		<TableBodyRow>
			<TableBodyCell>Queue is Not found.</TableBodyCell>
		</TableBodyRow>
	{/if}
</Table>
