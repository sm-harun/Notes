<script lang="ts">
	import { AppShell, AppBar, Modal, initializeStores, getModalStore, LightSwitch } from '@skeletonlabs/skeleton';
	import type { ModalStore, ModalSettings } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	import NavItems from '$lib/components/NavItems.svelte';

	import { notes } from '$lib/stores';

	initializeStores();
	
	const modalStore: ModalStore = getModalStore();

	function askPrompt() {
		const modal: ModalSettings = {
			type: 'prompt',
			title: 'Note',
			body: 'Provide note content',
			valueAttr: { type: 'text', minlength: 3, maxlength: 100, required: true },
			response: (r: string) => addNote(r),
		}

		modalStore.trigger(modal);
	}

	function addNote(inputText: string): void {
		modalStore.close();

		notes.update((notes) => {
			return [...notes, {
				id: crypto.randomUUID(),
				text: inputText,
			}]
		})
	}
</script>

<Modal />

<AppShell slotHeader="h-50" slotSidebarLeft="bg-surface-500/20 w-52 p-1" slotSidebarRight="w-30 p-5 bg-surface-700">
	<svelte:fragment slot="header">

		<AppBar>
			<svelte:fragment slot="lead">
				<h1 class="text-primary-500">Notes</h1>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>

	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">

		<NavItems />

	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<button class="btn bg-primary-500 grid place-items-center p-4" on:click={askPrompt}>+Add</button>
	</svelte:fragment>

	<slot />

</AppShell>