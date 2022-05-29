import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'

function Controls(props) {
    return (
        <div className="cmp-player--controls">
            {props.isFullScreen ?
                <button className="skip-btn" onClick={() => props.SkipSong(false)}>
                    <FontAwesomeIcon icon={faBackwardStep} />
                </button>
                : null}
            <button className="play-btn" onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
            </button>
            {props.isFullScreen ?
                <button className="skip-btn" onClick={() => props.SkipSong()}>
                    <FontAwesomeIcon icon={faForwardStep} />
                </button>
                : null}
        </div>
    )
}

export default Controls
