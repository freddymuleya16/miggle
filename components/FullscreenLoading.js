import React from 'react'
import { CircleLoader } from 'react-spinners'

function FullscreenLoading() {
    return (
        <div className="bg-image h-screen" style={{ backgroundColor: '#fff' }}   >
            <div className="align-items-center flex h-screen justify-center welcome-screen">
                <CircleLoader color="#fda4af" />
                <h6 style={{ color: '#fda4af' }}>Loading...</h6>
            </div>
        </div>
    )
}

export default FullscreenLoading