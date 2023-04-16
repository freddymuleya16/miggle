import React from 'react'
import { CircleLoader } from 'react-spinners'

function OverLayLoading() {
    return (
        <div className="bg-image" style={{ backgroundColor: '#fff' }}   >
            <div className="welcome-screen">
                <CircleLoader color="#36d7b7" />
                <h6 style={{ color: '#36d7b7' }}>Loading...</h6>
            </div>
        </div>
    )
}

export default OverLayLoading