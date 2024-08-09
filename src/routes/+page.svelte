<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { ModalComponent, ModalSettings, ModalStore } from "@skeletonlabs/skeleton";

	import { notes } from "$lib/stores";
</script>

<div class="grid grid-cols-1 p-5 gap-4">
	{#each $notes as note}
		<div class="card w-full h-20 p-4 flex justify-between">
			<div>{note.text}</div>
			<button class="btn bg-secondary-500">Delete</button>
		</div>
	{/each}
</div>