import React, { useState } from 'react'
import Player from './Player';
import AudioPlayer from './AudioPlayer';

function SongList(props) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const displaySong = (title) => {
        let index = props.songs.findIndex(i => i.title === title)
        // console.log("Song clicked " + index);
        setCurrentSongIndex(index);
    }

    return (
        <div className="cmp-song-list">
            <ul className="cmp-song-list-ul"> {props.songs.map(song => (
                <li className="cmp-song-list-item" key={song.title} onClick={() => displaySong(song.title)}>
                    <img className='cmp-song-list-img' src={song.albumart} alt="Mini album-art" />
                    <div className='cmp-song-list-text'>
                        <span className='cmp-song-list-title'>{song.title}</span>
                        <br />
                        <span className='cmp-song-list-album'>{song.album}</span>
                    </div>
                </li>
            ))}
            </ul>
            <Player
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                songs={props.songs}
            />
            {/* <AudioPlayer
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            songs={props.songs}
            /> */}
        </div>
    )
}

export default SongList
