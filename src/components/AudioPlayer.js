import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faBackwardStep, faAngleDown } from '@fortawesome/free-solid-svg-icons'

function AudioPlayer(props) {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

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
            <FontAwesomeIcon icon={ faAngleDown } />
        </button>
        <audio ref={audioPlayer} src={props.songs[props.currentSongIndex].track} preload="metadata"></audio>
        <div className="cmp-player--details">
            {isFullScreen ?   
			<div className="details-img">
				<img src={props.songs[props.currentSongIndex].albumart} alt="Album Art" />
			</div>: null }
			<p className="details-title">{props.songs[props.currentSongIndex].title}</p>
			<p className="details-artist">{props.songs[props.currentSongIndex].artist}</p>
        </div>

		<div className='cmp-player--progress-bar'>
			{/* current time */}
			<div className="cmp-progress-bar-current-time">{calculateTime(currentTime)}</div>

			{/* progress bar */}
			<div>
				<input type="range" className="cmp-progress-bar-bar progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
			</div>

			{/* duration */}
			<div className="cmp-progress-bar-duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
		</div>
        
		<div className="cmp-player--controls">
			<button className="skip-btn" onClick={() => SkipSong(false)}><FontAwesomeIcon icon={faBackwardStep} /></button>
			<button onClick={togglePlayPause} className="play-btn">
				{isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
			</button>
			<button className="skip-btn" onClick={() => SkipSong()}><FontAwesomeIcon icon={faForwardStep} /></button>
      	</div>
    </div>
  )
}

export default AudioPlayer