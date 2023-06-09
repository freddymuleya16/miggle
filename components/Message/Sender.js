import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'
import { getChatDocument } from '@/utils/helpers'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

function Sender({ data, onClick }) {
    const [chatId, setChatId] = useState(null)
    const [message, setMessage] = useState(null)
    useEffect(() => { 
        getChatDocument(getAuth().currentUser.uid, data.id).then((chatId) => {
             setChatId(
                chatId
            );
        })
    }, [data.id])

    // Listen for changes in messages when a chat is opened
    useEffect(() => {

        if (chatId) {
            // Use onSnapshot to listen for changes in the messages collection for this chat
            const unsubscribe = onSnapshot(
                query(
                    collection(db, `chats/${chatId}/messages`),
                    orderBy("timestamp", "desc"),
                    limit(1)
                ),
                (querySnapshot) => {
                    const messages = [];
                    // Loop through each document in the messages collection and add it to the messages array
                    querySnapshot.forEach((doc) => {
                        messages.push({ ...doc.data(), id: doc.id });
                    });
                     setMessage(messages[0]??"-");
                }
            );
            return () => unsubscribe();
        }
    }, [chatId]);
    
    if(message == "-"){
        return <></>
    }

    return (
        <div className="bg-transparent p-3 inline-flex w-full cursor-pointer" onClick={() => onClick()}>
            <Image src={data.pictures[0]} alt="" width={48} height={48} className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white bg-gray-700" />
            <div className="w-4/5  mx-2">
                <span className="font-poppins font-bold text-ms">
                    {data.name} {data.surname}
                </span>
                <span className="font-poppins font-bold text-xs block w-40 text-ellipsis whitespace-nowrap overflow-hidden">
                    {message == null ? (
                        "Loading ..."
                    ) : (
                        <>
                            {message.sender === getAuth().currentUser.uid && (
                                <FontAwesomeIcon icon={faReply} size="xs" />
                            )}
                            {" "}{message?.text}{message?.message}
                        </>
                    )}
                </span>

            </div>
        </div>
    )
}


export default Sender
