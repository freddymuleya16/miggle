import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'
import { decryptMessage, getChatDocumentWithoutCreating } from '@/utils/helpers'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faMicrophone, faReply, faVideo } from '@fortawesome/free-solid-svg-icons'

function Sender({ data, onClick,isSubscribed }) {
    const [chatId, setChatId] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await getChatDocumentWithoutCreating(getAuth().currentUser.uid, data.id, 'sender.js');
            setChatId(
                response
            );
        }
        fetchData();
    }, [data.id]);

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
                        messages.push({ ...doc.data(), id: doc.id, message: decryptMessage(doc.data().message) });
                    });
                    setMessage(messages[0] ?? "-");
                }
            );
            return () => unsubscribe();
        }
    }, [chatId]);

    if (message == null || message == '-') {
        return <></>
    }

    return (
        <div className="bg-transparent p-3 inline-flex w-full cursor-pointer" onClick={() => onClick()}>
            <Image src={data.pictures[0]} alt="" width={48} height={48} className="inline-block object-cover h-12 w-12 rounded-full ring-2 ring-white bg-gray-700" />
            <div className="w-4/5  mx-2">
                <span className="font-poppins font-bold text-ms">
                    {data.name} {data.surname}  {" "} {isSubscribed
                        && <svg className="svg-icon inline fill-rose-500 h-4 mb-1 rounded-full" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1024 512c0-75.4-47.4-139.8-114.2-164.8 29.4-64.8 17.6-143.8-35.8-197.2-53.4-53.4-132.4-65.2-197.2-35.8C651.8 47.4 587.4 0 512 0s-139.8 47.4-164.8 114.2c-64.8-29.4-144-17.6-197.2 35.8-53.4 53.4-65.2 132.4-35.8 197.2C47.4 372.2 0 436.6 0 512s47.4 139.8 114.2 164.8c-29.4 64.8-17.6 144 35.8 197.2 53.2 53.2 132.2 65.4 197.2 35.8 25 66.6 89.4 114.2 164.8 114.2s139.8-47.4 164.8-114.2c65.2 29.6 144 17.4 197.2-35.8 53.4-53.4 65.2-132.4 35.8-197.2 66.8-25 114.2-89.4 114.2-164.8z m-289.6-88.5L472.32 683.48c-8.62 8.56-22.56 8.5-31.1-0.12l-151.44-152.66c-8.56-8.62-8.5-22.56 0.12-31.12l52.06-51.64c8.62-8.56 22.56-8.5 31.12 0.12l84.3 84.98 194.4-192.84c8.62-8.56 22.56-8.5 31.1 0.12l51.64 52.06c8.56 8.64 8.52 22.58-0.12 31.12z" /></svg>
                    }
                </span>

                <span className="font-poppins font-bold text-xs block w-40 text-ellipsis whitespace-nowrap overflow-hidden">
                    {message == null ? (
                        "Loading..."
                    ) : (message.videos && message.videos.length > 0) ? (
                        <>
                            {message.sender == getAuth().currentUser.uid && (
                                <FontAwesomeIcon icon={faReply} size="xs" className='mr-2' />
                            )}
                            <FontAwesomeIcon icon={faVideo} size="xs" className='mr-2' />
                            {message?.message ? message?.message : "Video"}
                        </>
                    ) : message.images && message.images.length > 0 ? (
                        <>

                            {message.sender == getAuth().currentUser.uid && (
                                <FontAwesomeIcon icon={faReply} size="xs" className='mr-2' />
                            )}
                            <FontAwesomeIcon icon={faImage} size="xs" className='mr-2' />
                            {message?.message ? message?.message : "Image"}
                        </>
                    ) : message.audio ? (
                        <>
                            {message.sender == getAuth().currentUser.uid && (
                                <FontAwesomeIcon icon={faReply} size="xs" className='mr-2' />
                            )}
                            <FontAwesomeIcon icon={faMicrophone} size="xs" className='mr-2' />
                            Audio
                        </>
                    ) : (
                        <>
                            {message.sender == getAuth().currentUser.uid && (
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
