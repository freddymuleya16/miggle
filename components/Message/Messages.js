import Chat from './Chat'
import Image from 'next/image'
import Carousel from '../Carousel'
import Temp from "../../public/img/login-bg.jpg"
import { db } from "@/utils/firebase";
import {
    collection,
    query,
    where,
    getDocs,
    FieldPath,
    documentId,
    doc,
    setDoc,
    addDoc,
    onSnapshot,
    serverTimestamp,
    orderBy, updateDoc, arrayRemove, getDoc, increment
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { getAuth } from 'firebase/auth';
import { getUser } from '@/actions/authActions';
import FullscreenLoading from '../FullscreenLoading';
import OverLayLoading from '../OverLayLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faHome, faHomeAlt, faImages, faLocationDot, faMars, faTrash, faTrashAlt, faVenus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaHome } from 'react-icons/fa';
import ChatList from './ChatList';
import UserMessageAction from '../UserMessageAction';
import { decryptMessage, encryptMessage, getChatDocument } from '@/utils/helpers';
import FileUploader from './FileUploader';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';



function Messages({ receiverId, matchDate, updateCurrentMatch, user }) {
    // Define a state for the message
    const [message, setMessage] = useState("");
    const effectRan = useRef(false)

    // Define a state for the list of messages
    //const [messages, setMessages] = useState([]);

    // Define a state for the chat document reference
    const [chatRef, setChatRef] = useState(null);

    const [current, setCurrent] = useState(null);

    const [receiver, setReceiver] = useState(null);

    const [currentUser, setCurrentUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const [groupedMessages, setGroupedMessages] = useState({})

    const [show, setShow] = useState(false)

    function toggle() {
        setShow((prev) => !prev)
    }
    useEffect(() => {
        if (effectRan.current === false) {
            async function fetchData() {
                // You can await here
                const response = await getChatDocument(getAuth().currentUser.uid, receiverId, 'messages.js');
                setChatRef(
                    response
                );
            }
            fetchData();

        }
        return () => { effectRan.current = true }
    }, [receiverId]);
    useEffect(() => {
        getUser(receiverId).then((user) => {
            setReceiver(user)
        })
        getUser(getAuth().currentUser.uid).then((user) => {
            setCurrentUser(user)
        })


    }, [chatRef, receiverId])

    useEffect(() => {

        if (chatRef) {
            // Use onSnapshot to listen for changes in the messages collection for this chat
            const unsubscribe = onSnapshot(
                query(
                    collection(db, `chats/${chatRef}/messages`),
                    orderBy("timestamp", "asc")
                ),
                (querySnapshot) => {
                    const messages = [];
                    // Loop through each document in the messages collection and add it to the messages array
                    querySnapshot.forEach((doc) => {
                        messages.push({ ...doc.data(), id: doc.id, message: decryptMessage(doc.data().message) });
                    });
                    // setMessages([...messages]); 

                    const groupedChats = {};
                    messages.forEach((chat) => {
                        const { timestamp } = chat;
                        let date;
                        if (timestamp?.seconds) {
                            date = new Date(timestamp.seconds * 1000);
                        } else {
                            date = new Date();
                        }

                        const dateString = date.toLocaleDateString('en-GB');
                        if (!groupedChats[dateString]) {
                            groupedChats[dateString] = [];
                        }
                        groupedChats[dateString].push(chat);
                    });


                    // Print the grouped chats
                    setGroupedMessages(groupedChats)
                }
            );
            return () => unsubscribe();
        }
    }, [chatRef]);


    // Add a new message to the messages collection for a chat
    const addMessage = async (chatId, message) => {
        try {
            const messagesRef = collection(db, `chats/${chatId}/messages`);
            await addDoc(messagesRef, message);
        } catch (error) {
            console.error("Error adding message: ", error);
        }
    };

    // Handle the form submission to send a new message
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            if (message == '' && selectedFiles.length == 0) return;

            const filteredVideos = selectedFiles.filter(x => x.type == "video/mp4")
            const filteredImages = selectedFiles.filter(x => x.type !== "video/mp4")
            const [videos, images] = await Promise.all(
                [
                    handleUpload(filteredVideos),
                    handleUpload(filteredImages),
                ])
             
            const newMessage = {
                sender: getAuth().currentUser.uid,
                message: encryptMessage(message),
                timestamp: serverTimestamp(),
                liked: false,
                videos,
                images
            };
            console.log(videos, images)
            // setMessages([...messages, newMessage]);
            setMessage("");
            await addMessage(chatRef, newMessage);
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    const removeMatch = async (userId, matchId) => {
        setLoading(true)
        try {
            const userDoc = doc(db, "users", userId);
            const userSnap = await getDoc(userDoc);
            const userData = userSnap.data();

            const matchDoc = doc(db, "users", matchId);
            const matchSnap = await getDoc(matchDoc);
            const matchData = matchSnap.data();

            // Remove the match from the user's matches array
            const updatedUserMatches = userData.matches.filter(
                (match) => {
                    if (match.matchId) {
                        return match.matchId !== matchId
                    } else {
                        return match !== matchId
                    }
                }
            );
            await updateDoc(userDoc, { matches: updatedUserMatches });

            // Remove the user from the match's matches array
            const updatedMatchMatches = matchData.matches.filter(
                (match) => {
                    if (match.matchId) {
                        return match.matchId !== userId
                    } else {
                        return match !== userId
                    }
                }
            );
            await updateDoc(matchDoc, { matches: updatedMatchMatches });
            updateCurrentMatch(null);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };


    const blockUser = async (userId) => {
        setLoading(true)
        try {
            const currentUser = getAuth().currentUser;

            // Remove the user from the current user's matches
            await removeMatch(currentUser.uid, userId);

            // Add the blocked user to the current user's blockedUsers array
            const currentUserDoc = doc(db, "users", currentUser.uid);
            await updateDoc(currentUserDoc, { blockedUsers: [userId, ...currentUser?.blockedUsers ?? []] });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }


    };

    const reportAndUnmatchUser = async (userId) => {
        setLoading(true)
        try {
            // Remove the user from the current user's matches
            await blockUser(userId);

            // Report the user by incrementing the reportedCount field
            const userDoc = doc(db, "users", userId);
            await updateDoc(userDoc, { reportedCount: increment(1) });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    const likeMessage = async (chatId, liked) => {
        setLoading(true)
        try {

            // Report the user by incrementing the reportedCount field
            const userDoc = doc(db, `chats/${chatId}`,);
            await updateDoc(userDoc, { reportedCount: increment(1) });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    };
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentFile, setCurrentFile] = useState(0)

    const handleFileChange = (e) => {
        const newObjectUrls = [...e.target.files].map((pic) => {
            pic.preview = window.URL.createObjectURL(pic)
            return pic
        });

        setSelectedFiles([...newObjectUrls])
    };

    const handleUpload = async (files) => {
        if (!files) return [];
        if (files.length == 0) return [];
        const storage = getStorage();

        const pictureRefs = await Promise.all(
            files.map((picture) => {

                const fileRef = ref(
                    storage,
                    `Chats/${Date.now()}-${picture.name}`
                );
                const uploadTask = uploadBytesResumable(fileRef, picture)


                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setUploadProgress(progress);
                        switch (snapshot.state) {
                            case 'paused':
                                //console.log('Upload is paused');
                                break;
                            case 'running':
                                //console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error('Error uploading file:', error);

                    },
                    async () => {
                        try {
                            //const pictureRef = await getDownloadURL(fileRef);
                            //console.log('pics', pictureRef)
                        } catch (error) {
                            console.error("Error adding message:", error);
                        }
                        setSelectedFiles([]);
                        setUploadProgress(0);

                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        // return await getDownloadURL(uploadTask.snapshot.ref)
                    }
                );

                return uploadTask.then((snapshot) =>
                    getDownloadURL(snapshot.ref)
                );
            }))

        return pictureRefs;
    };


    if (receiver == null || currentUser == null) {
        return <OverLayLoading />
    }


    return (
        <>
            {loading && <OverLayLoading />}
            <div className={`${show ? 'hidden sm:block' : ''} sm:block basis-2/3 bg-gray-200`}>
                <div className="bg-gray-200   h-[90vh]">
                    <div onClick={() => toggle()} className="bg-gray-200 bg-transparent p-3 h-10p flex items-center   shadow-md hover:shadow-lg transition-shadow">
                        <div className='  flex w-full justify-between'>
                            <div className=' flex items-center'>
                                <Image src={receiver.pictures[0]} alt="" className="inline-block h-12 sm:w-12 w-16 rounded-full ring-2 ring-white bg-white object-cover" width={200} height={200} />
                                <p className="body-font sm:text-2xl font-poppins text-gray-800 mx-3  ">
                                    You matched with {receiver.firstName} {receiver.lastName} on {matchDate?.toDate().toLocaleDateString('en-GB')}
                                </p>
                            </div>
                            <div className='  w-fit justify-self-end'>
                                <button onClick={() => updateCurrentMatch(null)} className="focus:outline-none flex items-center justify-center rounded-full  border-gray-500 text-gray-500  border-2 text-xl p-4 w-12 h-12  hover:border-4 hover:text-2xl">
                                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="overflow-auto h-80-p scroll-botton">
                        {!(selectedFiles.length > 0) && <ChatList groupedChats={groupedMessages} receiver={receiver} currentUser={user} chatRef={chatRef} />}
                        {
                            selectedFiles.length > 0 &&
                            (
                                selectedFiles[currentFile].type == "video/mp4" ?
                                    <div className="  h-full items-center object-Cover w-full" >
                                        <video autoPlay controls loop className=" w-full  object-Cover" >
                                            <source src={selectedFiles[currentFile].preview} />
                                        </video>
                                    </div>

                                    :
                                    <Image width={500} height={500} src={selectedFiles[currentFile]?.preview ?? window.URL.createObjectURL(selectedFiles[currentFile])} alt="Selected Image" className=" w-full h-full object-Cover" />
                            )
                        }
                        {
                            selectedFiles.length > 0 && <div className='flex justify-center -mt-28 mb-3   overflow-y-auto mx-2'>
                                {selectedFiles.map((pic, i) => (
                                    <div key={i} className={`relative justify-center w-20 h-20 rounded-md  mr-2  ${i == currentFile ? 'border-4 border-rose-500' : 'border-2'}`}>
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                const updatedPictures = [...selectedFiles];
                                                updatedPictures.splice(i, 1);
                                                console.log(currentFile, updatedPictures.length)
                                                if (currentFile > updatedPictures.length - 1) {
                                                    setCurrentFile(updatedPictures.length - 1)
                                                }
                                                setSelectedFiles(updatedPictures);
                                            }}
                                            size="md"
                                            icon={faTrashAlt}
                                            className="absolute top-1 right-1 text-[#fff] cursor-pointer   rounded-full p-1 hover:text-red-500"
                                        />
                                        {pic.type == "video/mp4" ?
                                            <video onClick={() => setCurrentFile(i)} muted autoPlay={false} className={`cursor-pointer rounded-sm  w-full h-full object-cover`} >
                                                <source src={pic.preview} />
                                            </video>
                                            :
                                            <Image width={500} onClick={() => setCurrentFile(i)} height={500} src={pic.preview} alt="Selected Image" className={`cursor-pointer rounded-sm  w-full h-full object-cover`} />
                                        }
                                    </div>
                                ))}
                            </div>

                        }
                    </div>


                </div>


                <div className=" h-[10vh] px-4 border-t-2 border-gray-400 bg-gray-200 fixed bottom-0 left-0 right-0 sm:relative">

                    <div className=' w-full flex h-full items-center'>
                        <label className="flex flex-col items-center justify-center  cursor-pointer">
                            <FontAwesomeIcon icon={faImages} size='xl' className='mr-2 text-gray-600 cursor-pointer ' />

                            <input
                                type="file"
                                className="hidden"
                                accept="image/*, video/*"
                                multiple={true}
                                onChange={handleFileChange}
                            />
                        </label>
                        <input value={message}
                            onChange={(event) => setMessage(event.target.value)} placeholder="Type a message ..." className="flex-grow  bg-transparent  font-poppins  border-none outline-none placeholder-gray-500 text-lg" />
                        <button
                            onClick={handleSubmit}
                            className="w-1/6 h-4/6 rounded-full font-poppins bg-gradient-to-r from-rose-500 to-rose-300 text-white py-2 px-2 sm:px-4 hover:opacity-75 focus:outline-none"
                        >
                            Send
                        </button>
                    </div>

                </div>

            </div>
            <div className={`${!show ? 'hidden sm:block' : ''} basis-1/3 bg-gray-200 h-screen overflow-y-auto`}>
                <Carousel images={receiver.pictures} />
                <div className='justify-end flex h-0 '>

                    <FontAwesomeIcon onClick={() => toggle()} icon={faArrowAltCircleLeft} className='sm:hidden text-5xl text-rose-500  hover:text-rose-700 my-2 mx-2' />

                </div>

                <div className="bg-gray-200 border-l-2 border-b-2 border-gray-400 w-full h-max  py-3 px-2">
                    <h2 className="text-3xl font-poppins font-extrabold ">{receiver.firstName} {receiver.lastName} {receiver.age}</h2>
                    {/* <h2 className="text-xl font-poppins my-2 ">
                        <FontAwesomeIcon icon={faHome} className='text-2xl text-gray-800  hover:text-gray-700' />
                        {' '} Lives in Polokwane</h2> */}
                    <h2 className="text-xl font-poppins capitalize my-2"> <FontAwesomeIcon icon={receiver.gender == 'woman' ? faVenus : faMars} className='text-2xl text-gray-800  hover:text-gray-700' />
                        {' '} {receiver.gender}</h2>
                    <h2 className="text-xl font-poppins  my-2">
                        <FontAwesomeIcon icon={faLocationDot} className='text-2xl text-gray-800  hover:text-gray-700' />
                        {' '} {receiver.distance} kilometres away</h2>

                </div>
                <UserMessageAction onConfirm={() => removeMatch(currentUser.id, receiver.id)}>
                    <h2 className="text-3xl font-poppins font-extrabold text-gray-600 text-center">Unmatch</h2>
                    <p className="text-xl font-poppins mt-3  text-gray-600 text-center">
                        No longer interested? Remove them from your matches.
                    </p>
                </UserMessageAction>

                <UserMessageAction onConfirm={() => blockUser(receiver.id)}>
                    <h2 className="text-3xl font-poppins font-extrabold text-gray-600 text-center">Block</h2>
                    <p className="text-xl font-poppins mt-3  text-gray-600 text-center">
                        You won&rsquo;t see them; they won&rsquo;t see you.
                    </p>
                </UserMessageAction>

                <UserMessageAction onConfirm={() => reportAndUnmatchUser(receiver.id)}>
                    <h2 className="text-3xl font-poppins font-extrabold text-gray-600 text-center">Report</h2>
                    <p className="text-xl font-poppins mt-3  text-gray-600 text-center">
                        Don&rsquo;t worry - we won&rsquo;t tell them.
                    </p>
                </UserMessageAction>
            </div>
        </>
    )
}



export default Messages