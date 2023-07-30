<script lang="ts">
	import Controller from '$lib/components/Controller.svelte';
	import Queue from '$lib/components/Queue/Queue.svelte';
	import SongInfo from '$lib/components/SongInfo.svelte';
	import { Img, DarkMode, Tabs, TabItem } from 'flowbite-svelte';
	import { base64ImgSrc } from '../public/noImg.js';
	import { queue } from '$lib/utils/queue.store';
	import { Parser } from '$lib/utils/parser';
	let parser = new Parser();
	let current = queue.items;
	let imgSrc = base64ImgSrc;

	setInterval(async () => {
		if (!queue.isEmpty && current !== queue.items[0]) {
			imgSrc = await parser.getArtwork(String(queue.items[0]));
		}
	}, 300);
</script>

<main>
	<div class="flex flex-row-reverse">
		<DarkMode />
	</div>
	<Tabs>
		<TabItem open title="NowPlaying">
			<div class="flex justify-center my-0 2xl:my-16">
				<Img src={imgSrc} class="w-1/4 h-1/4 rounded-lg object-cover shadow-md" />
			</div>
		</TabItem>
		<TabItem title="Song Infos">
			<SongInfo />
		</TabItem>
		<TabItem title="Queue">
			<Queue />
		</TabItem>
		<TabItem title="Playlist"></TabItem>
		<TabItem title="Settings"></TabItem>
	</Tabs>
	<Controller />
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		padding: 0em 1em 0em 1em;
		text-align: center;
		margin: 0 auto;
	}
</style>
