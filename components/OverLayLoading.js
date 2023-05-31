import React from 'react'
import { CircleLoader } from 'react-spinners'

function OverLayLoading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
        <div className="relative">
          <CircleLoader color="#fda4af" />
          <h6 style={{ color: '#fda4af' }}>Loading...</h6>
        </div>
      </div>
      
    )
}

export default OverLayLoading