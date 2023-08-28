import { db } from '@/utils/firebase';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image'
import React from 'react'

function Chat({ data }) {
    const like = async (id) => {
        const messageRef = doc(db, `chats/${data.chatRef}/messages/${id}`);

        await updateDoc(messageRef, {
            liked: true
        });
    }
    return (
        <div className={`w-full  h-max p-3 flex   items-center ${data.isCurrent && 'justify-end'}`}>
            {!data.isCurrent &&
                <Image src={data.pictures[0]} width={56} height={56} alt="" className="object-cover items-start inline-block h-14 w-14 rounded-full ring-4 ring-white bg-white" />
            }
            {data.isCurrent && data.liked &&
                <div className="h-5 w-5 -mr-10 -mt-12   z-10  rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faHeart} size='md' className={`${data.liked ? "text-red-500" : "text-white"}`} />

                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z" fill={data.liked ? "red" : "white"} stroke={data.liked ? "red" : "gray"} stroke-linecap="round" stroke-linejoin="round" stroke-width="8"></path></svg> */}
                </div>
            }
            <div>
                {data.images && data.images.map((attachment, i) => {
                    return (
                        <div key={i} className={`${data.gender == 'woman' ? 'bg-pink-500' : data.gender == 'man' ? 'bg-blue-800' : ''} max-w-md my-3 px-2 py-2 ${data.isCurrent ? 'rounded-s-2xl' : 'rounded-e-2xl'} rounded-t-2xl body-font font-poppins text-white  mx-3 text-lg`}>
                            <Image src={attachment} width={500} height={500} alt='' className={`${data.isCurrent ? 'rounded-s-2xl' : 'rounded-e-2xl'} rounded-t-2xl `} /></div>)
                })}
                {data.videos && data.videos.map((attachment, i) => {
                    return (
                        <div key={i} className={`${data.gender == 'woman' ? 'bg-pink-500' : data.gender == 'man' ? 'bg-blue-800' : ''} max-w-md my-3 px-2 py-2 ${data.isCurrent ? 'rounded-s-2xl' : 'rounded-e-2xl'} rounded-t-2xl body-font font-poppins text-white  mx-3 text-lg`}>
                            <video autoPlay controls loop className={`${data.isCurrent ? 'rounded-s-2xl' : 'rounded-e-2xl'} rounded-t-2xl w-full  object-Cover`} >
                                <source src={attachment} />
                            </video>
                        </div>)
                })}
                {
                    data.audio
                    &&
                    <div className={`${data.gender == 'woman' ? 'bg-pink-500' : data.gender == 'man' ? 'bg-blue-800' : ''} max-w-md my-3 px-2 py-2 ${data.isCurrent ? 'rounded-s-2xl' : 'rounded-e-2xl'} rounded-t-2xl body-font font-poppins text-white  mx-3 text-lg `} >
                        <audio color='blue' controls>
                            <source src={data.audio} type="audio/wav" ></source>
                        </audio>
                    </div>
                }

                {data.message != '' && <p className={`${data.gender == 'woman' ? 'bg-pink-500' : data.gender == 'man' ? 'bg-blue-800' : ''} max-w-md px-3 py-2 ${data.isCurrent ? 'rounded-s-2xl' : 'rounded-e-2xl'} rounded-t-2xl body-font font-poppins text-white  mx-3 text-lg`}>
                    {data.message} {data.text}
                </p>
                }
            </div>



            {!data.isCurrent &&
                <div className="h-8 w-8 cursor-pointer  rounded-full flex items-center justify-centern " onClick={() => like(data.id)}>
                    <FontAwesomeIcon icon={faHeart} size='xl' className={`${data.liked ? "text-red-500" : "text-white"}`} />

                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z" fill={data.liked ? "red" : "white"} stroke={data.liked ? "red" : "gray"} stroke-linecap="round" stroke-linejoin="round" stroke-width="8"></path></svg> */}
                </div>
            }
        </div>
    )
}

export default Chat