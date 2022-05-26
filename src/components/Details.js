import React from 'react'

function Details(props) {
    return (
        <div className="cmp-player--details">
            {props.isFullScreen ?   
            <div className="details-img">
                    <img src={props.song.albumart} alt="Album Art" />
                </div>: null }
            <p className="details-title">{props.song.title}</p>
            <p className="details-artist">{props.song.artist}</p>
        </div>
    )
}

export default Details
