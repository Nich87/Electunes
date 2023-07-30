<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	let ready: boolean = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<slot />
{/if}
