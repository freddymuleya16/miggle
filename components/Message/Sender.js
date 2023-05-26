import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

function Sender({ data,onClick }) {
    return (
        <div className="bg-transparent p-3 inline-flex w-full cursor-pointer" onClick={()=>onClick()}>
            <Image src={data.pictures[0]} alt="" width={48} height={48} className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white bg-gray-700" />
            <div className="w-4/5  mx-2">
                <span className="font-poppins font-bold text-ms">
                    {data.name} {data.surname}
                </span>
                <p className="font-poppins font-bold text-xs">Hi Freddy</p>
            </div>
        </div>
    )
}


export default Sender
