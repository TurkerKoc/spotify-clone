import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";

// We need this interface to type the store
// Otherwise, the store will be of type any
interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  // fetch albums
  fetchAlbums: () => Promise<void>;

  // fetch album by id
  fetchAlbumById: (id: string) => Promise<void>;

  // fetch featured songs
  fetchFeaturedSongs: () => Promise<void>;

  // fetch made for you songs
  fetchMadeForYouSongs: () => Promise<void>;

  // fetch trending songs
  fetchTrendingSongs: () => Promise<void>;

  // fetch stats
  fetchStats: () => Promise<void>;

  // fetch songs
  fetchSongs: () => Promise<void>;

  // delete song
  deleteSong: (id: string) => Promise<void>;

  // delete album
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },
  
  // fetch albums
  fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {      
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // fetch made for you songs
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // fetch featured songs
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // fetch trending songs
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // fetch songs
  fetchSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // fetch stats
  fetchStats: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // delete song
	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

      // get the current state and filter out the song with the id from songs array
			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},

  // delete album
	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},
}));
