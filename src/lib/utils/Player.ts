//TODO: mute(), unmute(), setVolume()
//TODO:WebAudioAPI(EQ)

import { queue } from '$lib/utils/queue.store';

export class MediaPlayer {
	private audio: HTMLAudioElement;

	constructor() {
		this.audio = new Audio();
		this.audio.addEventListener('ended', () => this.next());
	}

	play() {
		this.audio.src = String(queue.items[0]);
		this.audio.play();
	}

	play_pause() {
		if (this.audio.paused) {
			if (!this.audio.src) return this.play();
			this.audio.play();
		} else {
			this.audio.pause();
		}
	}

	pause() {
		this.audio.pause();
	}

	stop() {
		this.audio.pause();
		this.audio.currentTime = 0;
	}

	next() {
		this.audio.pause();
		queue.next();
		const src = String(queue.items[0]);
		this.audio.src = src;
		this.audio.play();
	}

	previous() {
		this.audio.pause();
		queue.previous();
		const src = String(queue.items[0]);
		this.audio.src = src;
		this.audio.play();
	}

	setRate(rate: number) {
		this.audio.playbackRate = rate;
	}

	seek(time: number) {
		this.audio.currentTime = time / 60;
	}

	isPlaying() {
		return !this.audio.paused;
	}

	getDuration() {
		return this.audio.duration;
	}

	now() {
		return this.audio.currentTime;
	}
}
