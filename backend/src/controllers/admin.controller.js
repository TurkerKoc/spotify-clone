import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const getAdmin = async (req, res) => {
    res.send("Hello Admin");
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload an audio file and an image file" });
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const song = new Song({
            title,
            artist,
            audoUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        });

        await song.save();

        //if albumId is provided, add song to album
        if(albumId) {
            const album = await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } }, { new: true });
            await album.save();
        }

        res.status(201).json({ message: "Song created successfully", song });
    } catch (error) {
        next(error);
    }
}