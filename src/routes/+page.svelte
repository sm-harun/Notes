<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton";
	import type { ModalComponent, ModalSettings, ModalStore } from "@skeletonlabs/skeleton";

	import { notes } from "$lib/stores";
  import { fly } from "svelte/transition";

	const modalStore = getModalStore();

	function confirmDeletion(noteId: string): void {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Please Confirm',
			body: 'Are you sure you want to delete the Note?',
			response: (r: boolean) => deleteNote(noteId),
		};
		modalStore.trigger(modal);
	}

	function deleteNote(noteID: string): void {
		notes.update((currentNotes) => {
			return currentNotes.filter((note) => note.id !== noteID);
		})
	}
</script>

<div class="grid grid-cols-2 p-5 gap-4">
	{#each $notes as note}
		<div class="card w-full h-20 p-4 flex justify-between hover:-translate-y-1 transition" in:fly|local={{ y: 30, duration: 500 }}>
			<div>{note.text}</div>
			<button class="btn bg-secondary-500" on:click={() => confirmDeletion(note.id)}>Delete</button>
		</div>
	{/each}
</div>