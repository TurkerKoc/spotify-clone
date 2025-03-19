import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null); // reference to the audio element
  const prevSongRef = useRef<string | null>(null); // reference to the previous song

  const { currentSong, isPlaying, playNext } = usePlayerStore();
  
  //handle play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play(); // play the audio if the isPlaying state is true
    else audioRef.current?.pause(); // pause the audio if the isPlaying state is false
  }, [isPlaying]);

  //handle song ends
  useEffect(() => {
    const audio = audioRef.current; // get the audio element
    if (!audio) return; // if the audio element is not found, return

    const handleEnded = () => { // handle the song ends
      playNext();
    };

    audio?.addEventListener("ended", handleEnded); // add the event listener to the audio element

    return () => {
      audio?.removeEventListener("ended", handleEnded); // remove the event listener from the audio element
    };
  }, [playNext]);

  //handle song change
  useEffect(() => {
    if (!audioRef.current || !currentSong) return; // if the audio element is not found or the current song is not found, return
    const audio = audioRef.current; // get the audio element
    
    //check if this is actually a new song
    const isSongChanged = prevSongRef.current !== currentSong?.audioUrl;

    //if it is a new song, load the new song
    if (isSongChanged) {
      audio.src = currentSong?.audioUrl; // set the src of the audio element to the new song
      audio.currentTime = 0; // set the current time of the audio element to 0
      prevSongRef.current = currentSong?.audioUrl; // update the previous song

      if (isPlaying) audio.play(); // if the audio is playing, play the new song
    }
  }, [currentSong, isPlaying]);
  
  return <audio ref={audioRef} />;
}

export default AudioPlayer
