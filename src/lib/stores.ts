import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";

type Note = {
    id: number,
    text: string,
}

export const notes: Writable<Note[]> = localStorageStore('notes', []);