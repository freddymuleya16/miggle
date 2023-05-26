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


function Home() {
    const [matches, setMatches] = useState([])
    const [currentMatch,setCurrentMatch] = useState(null)
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
                getUsers(data.matches.map((match)=>{
                    if(match.matchId){
                        return match.matchId
                    }else{
                        return match
                    }})).then((users) => {

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
        if(userIds.length>0){
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

    return (
        <div className=" min-h-screen bg-slate-300 px-0">
            <div class="flex flex-row mx-0 ">
                <div class="basis-1/4  h-screen bg-white">
                    <div className=" h-1/6">
                        <div className="bg-gradient-to-r from-rose-500 to-rose-300 p-3 h-3/4 flex items-center  ">
                            <Image src={Temp} alt="" className="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-white" />
                            <span className="body-font font-poppins text-white mx-3 ">
                                Freddy Muleya
                            </span>
                        </div>
                        <div className=" p-2 h-1/4">
                            <a
                                href="#"
                                className="mr-3 py-2 text-slate-700 font-medium hover:no-underline hover:text-slate-900 active:text-rose-500 active:no-underline"
                            >
                                Matches
                            </a>

                            <a
                                href="#"
                                className=" mr-3 py-2 text-slate-700 font-medium hover:no-underline hover:text-slate-900 active:text-rose-500 active:no-underline"
                            >
                                Messages
                            </a>
                        </div>
                    </div>

                    <div className="overflow-y-auto bg-gray-100 h-5/6">
                        {matches.map((match, index) => <Sender onClick={()=>setCurrentMatch(match)} key={index} data={{ pictures: match.pictures, name: match.firstName, surname: match.lastName }} />)}


                    </div>
                </div>
                <div class="basis-3/4 flex flex-row mx-0 my-0">
                    {currentMatch &&
                    <Messages receiverId={currentMatch.id} matchDate={currentMatch.matchDate} updateCurrentMatch={updateCurrentMatch} />}
                </div>
            </div>
        </div>
    )
}

export default withAuth(Home)