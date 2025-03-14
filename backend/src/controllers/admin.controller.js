import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function to upload to cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto", //auto detect file type
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
}

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

        const audoUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

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

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id); //get song by id
        if (!song) {
            return res.status(404).json({ message: "Song not found" }); //if song not found, return 404
        }

        if(song.albumId) {
            const album = await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
            await album.save();
        }
        
        await Song.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;
        
        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({ 
            title: title, 
            artist: artist, 
            imageUrl: imageUrl, 
            releaseYear: releaseYear 
        });
        
        await album.save();
        res.status(201).json({ message: "Album created successfully", album });
    } catch (error) {
        next(error);
    }
}   

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const album = await Album.findById(id);
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        //delete all songs associated with the album
        await Song.deleteMany({ albumId: id });        
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        next(error);
    }
}       

export const checkAdmin = async (req, res) => {
    res.status(200).json({ admin: true }); //if user is admin, then we can come to this route.
}