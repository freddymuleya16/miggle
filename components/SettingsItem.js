import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

function SettingsItem({profileOpen, name, picture, onClick }) {
    return (<>
        <div className="bg-transparent  inline-flex w-full cursor-pointer mt-3"  >

            <div className=" relative rounded overflow-hidden shadow-lg w-100 h-20 cursor-pointer m-2" onClick={() => onClick()}>
                <Image src={picture} alt="" width={800} height={800} className="h-20 object-cover" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                        <h2 className={`font-poppins text-2xl font-bold mb-2 ${profileOpen?'text-rose-500':''}`}>{name}</h2>
                    </div>
                </div>
            </div>
        </div>

    </>

    )
}

export default SettingsItem
