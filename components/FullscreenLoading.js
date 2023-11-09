import React from 'react'
import { CircleLoader } from 'react-spinners'

function FullscreenLoading() {
    return (
        <div className="bg-image h-screen" style={{ backgroundColor: '#fff' }}   >
            <div className="align-items-center flex h-screen justify-center welcome-screen">
                <CircleLoader color="#319795" />
                <h6 style={{ color: '#319795' }}>Loading...</h6>
            </div>
        </div>
    )
}

export default FullscreenLoading