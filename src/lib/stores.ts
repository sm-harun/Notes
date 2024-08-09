import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";

type Note = {
    id: string,
    text: string,
}

export const notes: Writable<Note[]> = localStorageStore('notes', []);