import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'
import { getChatDocument } from '@/utils/helpers'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

function Matcher({ data, onClick }) {
    return (
        <div className=" relative rounded overflow-hidden shadow-lg w-1/3 h-1/3 cursor-pointer m-2" onClick={() => onClick()}>
            <Image src={data.pictures[0]} alt="" width={800} height={800} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="font-poppins text-2xl font-bold mb-2">{data.name} {data.surname}</h2>
                </div>
            </div>
        </div>

    )

}


export default Matcher
