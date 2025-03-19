import { create } from "zustand";
import { Song } from "@/types";
// import { useChatStore } from "./useChatStore";

interface PlayerStore {
	currentSong: Song | null;
	isPlaying: boolean;
	queue: Song[];
	currentIndex: number;

	initializeQueue: (songs: Song[]) => void; 	// array of songs into a queue
	playAlbum: (songs: Song[], startIndex?: number) => void; 	// play an album
	setCurrentSong: (song: Song | null) => void; 	// set the current song
	togglePlay: () => void; 	// toggle the play state
	playNext: () => void; 	// play the next song
	playPrevious: () => void; 	// play the previous song
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	currentSong: null,
	isPlaying: false,
	queue: [],
	currentIndex: -1,

	initializeQueue: (songs: Song[]) => {
		set({
			queue: songs, // array of songs into a queue
			currentSong: get().currentSong || songs[0], // set the current song
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex, // set the current index
		});
	},

	playAlbum: (songs: Song[], startIndex = 0) => {
		if (songs.length === 0) return;

		const song = songs[startIndex];

		// const socket = useChatStore.getState().socket;
		// if (socket.auth) {
		// 	socket.emit("update_activity", {
		// 		userId: socket.auth.userId,
		// 		activity: `Playing ${song.title} by ${song.artist}`,
		// 	});
		// }
		set({
			queue: songs,
			currentSong: song,
			currentIndex: startIndex,
			isPlaying: true,
		});
	},

	setCurrentSong: (song: Song | null) => {
		if (!song) return; // if there is no song, return

		// const socket = useChatStore.getState().socket;
		// if (socket.auth) {
		// 	socket.emit("update_activity", {
		// 		userId: socket.auth.userId,
		// 		activity: `Playing ${song.title} by ${song.artist}`,
		// 	});
		// }

		// find the index of the song in the queue
		const songIndex = get().queue.findIndex((s) => s._id === song._id);
		set({
			currentSong: song,
			isPlaying: true,
			currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
		});
	},

	togglePlay: () => {		
		const willStartPlaying = !get().isPlaying; // toggle the play state

		// const currentSong = get().currentSong;
		// const socket = useChatStore.getState().socket;
		// if (socket.auth) {
		// 	socket.emit("update_activity", {
		// 		userId: socket.auth.userId,
		// 		activity:
		// 			willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle",
		// 	});
		// }

		set({
			isPlaying: willStartPlaying,
		});
	},

	playNext: () => {
		const { currentIndex, queue } = get(); // get the current index and queue
		const nextIndex = currentIndex + 1; // get the next index

		// if there is a next song to play, let's play it
		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex]; // get the next song

			// const socket = useChatStore.getState().socket;
			// if (socket.auth) {
			// 	socket.emit("update_activity", {
			// 		userId: socket.auth.userId,
			// 		activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
			// 	});
			// }

			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
			});
		} else {
			// no next song
			set({ isPlaying: false });

			// const socket = useChatStore.getState().socket;
			// if (socket.auth) {
			// 	socket.emit("update_activity", {
			// 		userId: socket.auth.userId,
			// 		activity: `Idle`,
			// 	});
			// }
		}
	},
	playPrevious: () => {
		const { currentIndex, queue } = get();
		const prevIndex = currentIndex - 1;

		// theres a prev song
		if (prevIndex >= 0) {
			const prevSong = queue[prevIndex];

			// const socket = useChatStore.getState().socket;
			// if (socket.auth) {
			// 	socket.emit("update_activity", {
			// 		userId: socket.auth.userId,
			// 		activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
			// 	});
			// }

			set({
				currentSong: prevSong,
				currentIndex: prevIndex,
				isPlaying: true,
			});
		} else {
			// no prev song
			set({ isPlaying: false });

			// const socket = useChatStore.getState().socket;
			// if (socket.auth) {
			// 	socket.emit("update_activity", {
			// 		userId: socket.auth.userId,
			// 		activity: `Idle`,
			// 	});
			// }
		}
	},
}));