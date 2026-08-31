
import type { Track } from '$lib/types';

class PlayerState {
	currentTrack = $state<Track | null>(null);
	queue = $state<Track[]>([]);
	isPlaying = $state(false);
	currentTime = $state(0);
	duration = $state(0);

	restart() {
		if (!this.currentTrack) return;

		this.currentTime = 0;

		if (!this.isPlaying) {
			this.play();
		}
	}

	enqueue(track: Track) {
		this.queue.push(track);
	}

	playNow(track: Track) {
		this.stop();
		this.loadTrack(track);
		this.play();
	}

	loadTrack(track: Track) {
		this.currentTrack = track;
		this.currentTime = 0;
		this.duration = 0;
	}

	clearTrack() {
		this.currentTrack = null;
		this.currentTime = 0;
		this.duration = 0;
	}

	play() {
		this.isPlaying = true;
	}

	pause() {
		this.isPlaying = false;
	}

	stop() {
		this.isPlaying = false;
		this.clearTrack();
	}

	skip() {
		this.isPlaying = false;
		this.currentTrack = null;

		const nextTrack = this.nextTrack();

		if (!nextTrack) {
			return null;
		}

		this.loadTrack(nextTrack);
		this.play();
	}

	nextTrack(): Track | null {
		if (this.queue.length === 0) {
			return null;
		}

		const next = this.queue.shift() as Track;
		return next;
	}
}

export const player = new PlayerState();