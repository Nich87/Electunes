<script lang="ts">
	//TODO:ratingStars,miniArtowork
	import { Card, Table, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
	import { queue } from '$lib/utils/queue.store';
	import { Parser } from '$lib/utils/parser';
	const parser = new Parser();
	let metadata: any = [];
	(async () => (metadata = await parser.getFullMetadata(String(queue.items[0]))))();
</script>

<div class="flex">
	<Card>
		<Table>
			<TableBodyRow>
				<TableBodyCell>Codec</TableBodyCell>
				<TableBodyCell>{metadata[0]?.codec}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>Bits</TableBodyCell>
				<TableBodyCell>{metadata[0]?.bitsPerSample}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>sampleRate</TableBodyCell>
				<TableBodyCell>{metadata[0]?.sampleRate}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>Lossless</TableBodyCell>
				<TableBodyCell>{metadata[0]?.lossless}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>duration</TableBodyCell>
				<TableBodyCell>{metadata[0]?.duration}</TableBodyCell>
			</TableBodyRow>
		</Table>
	</Card>

	<Card>
		<Table>
			<TableBodyRow>
				<TableBodyCell>Title</TableBodyCell>
				<TableBodyCell>{metadata[2]?.title}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>Artist</TableBodyCell>
				<TableBodyCell>{metadata[2]?.artist}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>Album</TableBodyCell>
				<TableBodyCell>{metadata[2]?.album}</TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>Data Lost</TableBodyCell>
				<TableBodyCell></TableBodyCell>
			</TableBodyRow>

			<TableBodyRow>
				<TableBodyCell>Data Lost</TableBodyCell>
				<TableBodyCell></TableBodyCell>
			</TableBodyRow>
		</Table>
	</Card>
</div>
