import React,{useState} from 'react'
import Player from './Player';

function SongList(props) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    let displaySong = (title)=>{
        let index = props.songs.findIndex(i => i.title === title)
        console.log("Song clicked "+index);
        setCurrentSongIndex(index);
    }
    return (
        <div className="cmp-song-list">
            <div> {props.songs.map( song => (
                <div key={song.title} onClick={() => displaySong(song.title)}>{song.title}</div>
            ))}
            </div>
            <Player 
                currentSongIndex={currentSongIndex} 
                setCurrentSongIndex={setCurrentSongIndex} 
                songs={props.songs}
            /> 
        </div>
    )
}

export default SongList
