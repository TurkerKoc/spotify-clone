import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { Album, Song } from "@/types";

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
}));
