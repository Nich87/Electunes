<script lang="ts">
	import { Range, Label } from 'flowbite-svelte';
	import { secondsToTime, timeToSeconds } from '$lib/utils/convert';
	import { MediaPlayer } from '$lib/utils/Player';
	import { queue } from '$lib/utils/queue.store';
	import { Parser } from '$lib/utils/parser';
	import Nav from '$lib/components/BottomNav.svelte';
	const parser = new Parser();
	let text: string = 'Not Playing';
	let isPlay = false;

	let Player: MediaPlayer;
	let songCurrentTime = secondsToTime(Player?.now());
	let songDuration = secondsToTime(Player?.getDuration());
	let intCurrentTime: number | string = secondsToTime(Player?.now());
	const change = () => Player?.seek(intCurrentTime);

	window.electron.receive('start', async (filelist: Array<string>) => {
		filelist.map((e) => queue.add(e));
		console.log(queue.items);
		if (queue.isEmpty) return;
		Player = new MediaPlayer();
		Player.play();
	});

	setInterval(async () => {
		songCurrentTime = secondsToTime(Player?.now());
		songDuration = secondsToTime(Player?.getDuration());
		intCurrentTime = timeToSeconds(songCurrentTime);
		if (!queue.isEmpty) {
			const json = await parser.getBasicMetadata(String(queue.items[0]));
			if (text !== `${json.title} - ${json.artist}`) text = `${json.title} - ${json.artist}`;
		}
		isPlay = Player?.isPlaying() || false;
	}, 300);
</script>

<Nav {Player} {isPlay} {intCurrentTime} {change}></Nav>

<div class="my-4">
	<div class="mb-1 text-base font-medium dark:text-white">{text}</div>

	<div class="flex justify-between">
		<Label>{songCurrentTime}</Label>
		<Label>{songDuration}</Label>
	</div>
	<Range
		id="small-range"
		size="sm"
		bind:value={intCurrentTime}
		min="0"
		max={timeToSeconds(songDuration)}
		on:change={change}
	/>
</div>
