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
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { getAuth } from 'firebase/auth';
import { getUser } from '@/actions/authActions';
import FullscreenLoading from '../FullscreenLoading';
import OverLayLoading from '../OverLayLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faHome, faHomeAlt, faLocationDot, faMars, faVenus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaHome } from 'react-icons/fa';
import ChatList from './ChatList';
import UserMessageAction from '../UserMessageAction';
import { decryptMessage, encryptMessage } from '@/utils/helpers';



function Messages({ receiverId, matchDate, updateCurrentMatch, user }) {
    // Define a state for the message
    const [message, setMessage] = useState("");

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

        getChatDocument(getAuth().currentUser.uid, receiverId).then((chatId) => {
            setChatRef(
                chatId
            );
        })
        getUser(receiverId).then((user) => {
            setReceiver(user)
        })
        getUser(getAuth().currentUser.uid).then((user) => {
            setCurrentUser(user)
        })


    }, [receiverId])

    // Listen for changes in messages when a chat is opened
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



    // Get the chat document for two given user IDs
    const getChatDocument = async (user1Id, user2Id) => {
        const chatCollection = collection(db, "chats");
        // Create a query for all chat documents that contain user1Id
        const q = query(chatCollection, where("users", "array-contains", user1Id));
        const querySnapshot = await getDocs(q);
        // Filter the results to find the chat document that contains both user1Id and user2Id
        const matchingDocs = querySnapshot.docs.filter((doc) => {
            return doc.data().users.includes(user2Id);
        });
        // If there's a match, return the chat document ID
        if (matchingDocs.length > 0) {
            return matchingDocs[0].id;
        } else {
            // If there's no match, create a new chat document and return its ID
            const newChatRef = doc(chatCollection);
            await setDoc(newChatRef, {
                id: newChatRef.id,
                users: [user1Id, user2Id],
            });
            return newChatRef.id;
        }
    };

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
        const newMessage = {
            sender: getAuth().currentUser.uid,
            message: encryptMessage(message),
            timestamp: serverTimestamp(),
            liked: false
        };
        // setMessages([...messages, newMessage]);
        setMessage("");
        await addMessage(chatRef, newMessage);
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
                                <button onClick={() => updateCurrentMatch(null)} className="flex items-center justify-center rounded-full  border-gray-500 text-gray-500  border-2 text-xl p-4 w-12 h-12  hover:border-4 hover:text-2xl">
                                    <FontAwesomeIcon icon={faXmark} size="2xl" />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="overflow-auto h-80-p scroll-botton">
                        <ChatList groupedChats={groupedMessages} receiver={receiver} currentUser={user} chatRef={chatRef} />
                        {/* {messages.map((message, index) =>
                            <Chat key={index} data={{ pictures: receiver.pictures, ...message, isCurrent: message.sender == currentUser.id, gender: message.sender == currentUser.id ? currentUser.gender : receiver.gender, chatRef }} />

                        )} */}
                    </div>


                </div>
                <div className=" h-[10vh] px-4 border-t-2 border-gray-400 bg-gray-200 fixed bottom-0 left-0 right-0 sm:relative">
                    <input value={message}
                        onChange={(event) => setMessage(event.target.value)} placeholder="Type a message ..." className="h-full w-5/6 bg-transparent  font-poppins  border-none outline-none placeholder-gray-500 text-lg" />
                    <button
                        onClick={handleSubmit}
                        className="w-1/6 h-4/6 rounded-full font-poppins bg-gradient-to-r from-rose-500 to-rose-300 text-white py-2 px-2 sm:px-4 hover:opacity-75 focus:outline-none"
                    >
                        Send
                    </button>
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