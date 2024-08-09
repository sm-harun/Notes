<script lang="ts">
	import { AppShell, AppBar, Modal, getModalStore, initializeStores } from '@skeletonlabs/skeleton';
	import type { ModalComponent, ModalSettings, ModalStore } from '@skeletonlabs/skeleton';

	import '../app.postcss';

	import NavItems from '$lib/components/NavItems.svelte';

	initializeStores();
</script>

<Modal />

<AppShell slotPageHeader="h-20" slotSidebarLeft="bg-surface-500/50 w-52" slotSidebarRight="w-30 p-5 bg-surface-700">
	<svelte:fragment slot="header">

		<AppBar>
			<h1 class="text-primary-500">Notes</h1>
		</AppBar>

	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">

		<NavItems />

	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<div class="btn bg-primary-500 grid place-items-center p-4">+Add</div>
	</svelte:fragment>

	<slot />

</AppShell>