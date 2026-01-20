/**
 * Defense stocks store
 */

import { writable } from 'svelte/store';
import type { DefenseStock } from '$lib/api/defense';

export interface DefenseState {
	items: DefenseStock[];
	loading: boolean;
	error: string | null;
	lastUpdated: number | null;
}

// Create initial state
function createInitialState(): DefenseState {
	return {
		items: [],
		loading: false,
		error: null,
		lastUpdated: null
	};
}

// Create the store
function createDefenseStore() {
	const { subscribe, update } = writable<DefenseState>(createInitialState());

	return {
		subscribe,

		/**
		 * Set loading state
		 */
		setLoading(loading: boolean) {
			update((state) => ({
				...state,
				loading,
				error: loading ? null : state.error
			}));
		},

		/**
		 * Set error state
		 */
		setError(error: string | null) {
			update((state) => ({
				...state,
				loading: false,
				error,
				lastUpdated: Date.now()
			}));
		},

		/**
		 * Set defense stocks data
		 */
		setItems(items: DefenseStock[]) {
			update((state) => ({
				...state,
				items,
				loading: false,
				error: null,
				lastUpdated: Date.now()
			}));
		},

		/**
		 * Clear all data
		 */
		clear() {
			update(() => createInitialState());
		}
	};
}

// Export the store instance
export const defense = createDefenseStore();
