import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Controls from './Controls';
import Details from './Details';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <div className={"cmp-player " + (isFullScreen ? 'cmp-player-full' : 'cmp-player-mini')}>
            <button className="angle-btn" onClick={() => setIsFullScreen(!isFullScreen)}>
                <FontAwesomeIcon icon={isFullScreen ? faAngleDown : faAngleUp} />
            </button>
            <audio src={props.songs[props.currentSongIndex].track} ref={audioEl}></audio>
            <Details song={props.songs[props.currentSongIndex]} isFullScreen={isFullScreen} />
            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} isFullScreen={isFullScreen} />
        </div>
    )
}

export default Player;
