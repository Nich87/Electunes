<script>
	import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
	export let Player;
	export let isPlay;
	export let intCurrentTime;
	export let change;
</script>

<BottomNav position="absolute" navType="application" classInner="grid-cols-5">
	<BottomNavItem btnName="shuffle" appBtnPosition="left" on:click={() => {}}>
		<svg
			class="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 18"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M11.484 6.166 13 4h6m0 0-3-3m3 3-3 3M1 14h5l1.577-2.253M1 4h5l7 10h6m0 0-3 3m3-3-3-3"
			/>
		</svg>
		<Tooltip arrow={false}>Shuffle</Tooltip>
	</BottomNavItem>

	<BottomNavItem
		btnName="backward-step"
		appBtnPosition="middle"
		on:click={() => {
			Player.previous();
		}}
	>
		<svg
			class="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 12 16"
		>
			<path
				d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z"
			/>
		</svg>
		<Tooltip arrow={false}>backward-step</Tooltip>
	</BottomNavItem>

	<BottomNavItem
		btnName="PlayPause"
		appBtnPosition="middle"
		btnClass=""
		on:click={() => {
			Player.play_pause();
		}}
	>
		{#if isPlay}
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 12 16"
			>
				<path
					d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"
				/>
			</svg>
			<Tooltip arrow={false}>Pause</Tooltip>
		{:else}
			<svg
				class="w-6 h-6 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 14 16"
			>
				<path
					d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"
				/>
			</svg>
			<Tooltip arrow={false}>Play</Tooltip>
		{/if}
		<Tooltip arrow={false}>Play</Tooltip>
	</BottomNavItem>

	<BottomNavItem
		btnName="forward-step"
		appBtnPosition="middle"
		on:click={() => {
			Player.next();
		}}
	>
		<svg
			class="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 12 16"
		>
			<path
				d="M11 0a1 1 0 0 0-1 1v5.7a2.028 2.028 0 0 0-.177-.194L3.33.732A2 2 0 0 0 0 2.227v11.546A1.977 1.977 0 0 0 1.181 15.6a1.982 1.982 0 0 0 2.147-.33l6.5-5.773A1.88 1.88 0 0 0 10 9.3V15a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Z"
			/>
		</svg>
		<Tooltip arrow={false}>forward-step</Tooltip>
	</BottomNavItem>

	<BottomNavItem btnName="Queue" appBtnPosition="right">
		<svg
			class="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 18 16"
		>
			<path
				d="M14.316.051A1 1 0 0 0 13 1v8.473A4.49 4.49 0 0 0 11 9c-2.206 0-4 1.525-4 3.4s1.794 3.4 4 3.4 4-1.526 4-3.4a2.945 2.945 0 0 0-.067-.566c.041-.107.064-.22.067-.334V2.763A2.974 2.974 0 0 1 16 5a1 1 0 0 0 2 0C18 1.322 14.467.1 14.316.051ZM10 3H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Z"
			/>
			<path
				d="M10 7H1a1 1 0 0 1 0-2h9a1 1 0 1 1 0 2Zm-5 4H1a1 1 0 0 1 0-2h4a1 1 0 1 1 0 2Z"
			/>
		</svg>
		<Tooltip arrow={false}>Queue</Tooltip>
	</BottomNavItem>
</BottomNav>
