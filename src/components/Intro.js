import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function Intro() {
    return (
        <div className='cmp-loading'>
            <ScaleLoader size={150} />
        </div>
    )
}

export default Intro