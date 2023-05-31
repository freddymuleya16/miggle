import { withAuth } from '@/utils/withAuth'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Temp from "./../public/img/login-bg.jpg"
import Carousel from "@/components/Carousel";
import Sender from "@/components/Message/Sender";
import Chat from "@/components/Message/Chat";
import Messages from "@/components/Message/Messages";
import { collection, doc, documentId, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { getAuth } from 'firebase/auth';
import Matcher from '@/components/Matcher'; 
import MatchCard from '@/components/MatchCard';


function Home({user}) {
    const [matches, setMatches] = useState([])
    const [currentMatch, setCurrentMatch] = useState(null)
    const updateCurrentMatch = (match) => {
        setCurrentMatch(match);
    }; 
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                doc(db, `users`, getAuth().currentUser.uid),
            ),
            (querySnapshot) => {
                const data = querySnapshot.data();
                getUsers(data.matches.map((match) => {
                    if (match.matchId) {
                        return match.matchId
                    } else {
                        return match
                    }
                })).then((users) => {

                    const usersWitchMatchdate = users.map(obj1 => {
                        const match = data.matches.find(obj2 => obj1.id === obj2.matchId);
                        return { ...obj1, ...match };
                    });

                    setMatches([...usersWitchMatchdate])
                })
            }
        );
        return () => unsubscribe();
    }, [])
    // Get the user documents for a list of user IDs
    async function getUsers(userIds) {
        const userDocs = [];
        if (userIds.length > 0) {
            const q = query(
                collection(db, "users"),
                where(documentId(), "in", userIds)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                userDocs.push({ ...doc.data(), id: doc.id });
            });
        }

        return userDocs;
    }
    const [activeTab, setActiveTab] = useState('matches');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className=" min-h-screen bg-slate-300 px-0">
            <div class="flex flex-row mx-0 ">
                <div class="basis-1/4  h-screen bg-white">
                    <div className=" h-1/6">
                        <div className="bg-gradient-to-r from-rose-500 to-rose-300 p-3 h-3/4 flex items-center  ">
                            <Image src={user.pictures[0]} width={300} height={300} alt="" className="object-cover inline-block h-12 w-12 rounded-full ring-2 ring-white bg-white" />
                            <span className="body-font font-poppins text-white mx-3 ">
                                {user.firstName} {user.lastName} 
                            </span>
                        </div>
                        <div className="px-2 h-1/4 "> 
                                <button
                                    className={`mr-3  px-2 font-medium focus:outline-none ${activeTab === 'matches' ? 'border-b-4 border-rose-500' : 'text-slate-700 p-2'
                                        }`}
                                    onClick={() => handleTabClick('matches')}
                                >
                                    Matches
                                </button>
                                <button
                                    className={`mr-3  px-2  font-medium focus:outline-none ${activeTab === 'messages' ? 'border-b-4 border-rose-500' : 'text-slate-700  p-2'
                                        }`}
                                    onClick={() => handleTabClick('messages')}
                                >
                                    Messages
                                </button>
                            </div> 
                    </div>


                    {
                        activeTab === 'matches'
                        &&
                        <div className="overflow-y-auto  h-5/6 p-3 flex ">
                            {matches.map((match, index) => <Matcher onClick={() => {
                                setCurrentMatch(match)
                            console.log(match)
                                handleTabClick('messages')
                            }

                            } key={index} data={{ pictures: match.pictures, name: match.firstName, surname: match.lastName, id: match.id }} />)}
                        </div>
                    }
                    {
                        activeTab === 'messages'
                        &&
                        <div className="overflow-y-auto   h-5/6">
                            {matches.map((match, index) => <Sender onClick={() => setCurrentMatch(match)} key={index} data={{ pictures: match.pictures, name: match.firstName, surname: match.lastName, id: match.id }} />)}
                        </div>
                    }

                </div>
                <div class="basis-3/4 flex flex-row mx-0 my-0">
                {!currentMatch && <MatchCard user={user}/>}
                    {currentMatch &&
                        <Messages receiverId={currentMatch.id} matchDate={currentMatch.matchDate} updateCurrentMatch={updateCurrentMatch} />}
                </div>
            </div>
        </div>
    )
}

export default withAuth(Home)