import Image from "next/image";
import React from "react";
import Temp from "./../public/img/login-bg.jpg"
import Carousel from "@/components/Carousel";
import Sender from "@/components/Message/Sender";
import Chat from "@/components/Message/Chat";
import Messages from "@/components/Message/Messages";

function Template() {
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
            <Sender data={{ pictures: [Temp], name: 'Freddy', surname: 'Mul' }} />
            <Sender data={{ pictures: [Temp], name: 'Freddy', surname: 'Mul' }} />
            <Sender data={{ pictures: [Temp], name: 'Freddy', surname: 'Mul' }} />
            <Sender data={{ pictures: [Temp], name: 'Freddy', surname: 'Mul' }} />
            <Sender data={{ pictures: [Temp], name: 'Freddy', surname: 'Mul' }} />
            <Sender data={{ pictures: [Temp], name: 'Freddy', surname: 'Mul' }} />
          </div>
        </div>
        <div class="basis-3/4 flex flex-row mx-0 my-0">
          <Messages/>
        </div>
      </div>
    </div>
  );
}

export default Template;
