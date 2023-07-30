import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export class Queue<T> {
	public items: T[];
	public storeItems: Writable<T[]>;

	constructor() {
		this.items = [];
		this.storeItems = writable(this.items);
	}

	get size(): number {
		return this.items.length;
	}

	get isEmpty(): boolean {
		return this.items.length === 0;
	}

	index(item: T): number {
		return this.items.indexOf(item);
	}

	add(item: T): number {
		this.items.push(item);
		this.storeItems.set(this.items);
		return this.items.length;
	}

	remove(): T | undefined {
		//TODO:loop
		if (this.items.length > 0) {
			const item = this.items.shift();
			this.storeItems.set(this.items);
			return item;
		}
		return undefined;
	}

	delete(item: T): T[] {
		const index = this.items.indexOf(item);
		if (index === -1) return this.items;
		this.items.splice(index, 1);
		this.storeItems.set(this.items);
		return this.items;
	}

	next(): void {
		this.items.push(this.items.shift());
		this.storeItems.set(this.items);
	}

	previous(): void {
		this.items.unshift(this.items.pop());
		this.storeItems.set(this.items);
	}

	shuffle(): void {
		this.items.sort(() => Math.random() - 0.5);
		this.storeItems.set(this.items);
	}

	clear(): void {
		this.items = [];
		this.storeItems.set(this.items);
	}
}
