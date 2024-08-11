<script lang="ts">
	import { AppShell, AppBar, Modal, initializeStores, getModalStore, LightSwitch, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { ModalStore, ModalSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	import NavItems from '$lib/components/NavItems.svelte';

	import { notes } from '$lib/stores';

	initializeStores();
	
	const modalStore: ModalStore = getModalStore();
	const drawerStore: DrawerStore = getDrawerStore();

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

	function openDrawer(): void {
		drawerStore.open();
	}

	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<Modal />

<Drawer width="w-60">
	<div class="w-full h-full p-5">
		<button on:click={closeDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:scale-110 focus:scale-110">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		</button>
		<NavItems />
	</div>
</Drawer>

<AppShell slotHeader="h-50" slotSidebarLeft="bg-surface-500/20 w-0 md:w-52 md:p-1" slotSidebarRight="bg-surface-700/40  hidden md:w-30 md:block md:p-5">
	<svelte:fragment slot="header">

		<AppBar slotLead="md:hidden" slotTrail="ml-auto">
			<svelte:fragment slot="lead">
				<button on:click={openDrawer}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 focus:scale-110 hover:scale-110 transition">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</button>
			</svelte:fragment>
			<strong>Notes</strong>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<button on:click={askPrompt}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:hidden">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			</svelte:fragment>
		</AppBar>

	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">

		<NavItems />

	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<button class="bg-secondary-500 rounded-full p-3" on:click={askPrompt}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	</svelte:fragment>

	<slot />

</AppShell>