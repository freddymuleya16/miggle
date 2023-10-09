import React from "react";
import Chat from "./Chat";

const ChatGroup = ({ date, chats, receiver, currentUser, chatRef }) => {
   return (
    <div className="flex-row justify-center">
      <span className={`w-full  h-max p-3 flex items-center  justify-center  font-poppins`}>{date}</span>
      {chats.map((message, index) => (
        <Chat key={index} data={{ pictures: receiver.pictures, ...message, isCurrent: message.sender == currentUser.id, gender: message.sender == currentUser.id ? currentUser.gender : receiver.gender, chatRef }} />

      ))}
    </div>
  );
};

const ChatList = ({ groupedChats, receiver, currentUser, chatRef }) => {
  return (
    <div>
      {Object.entries(groupedChats).map(([date, chats]) => (
        <ChatGroup key={date} date={date} chats={chats} receiver={receiver} currentUser={currentUser} chatRef={chatRef} />
      ))}
    </div>
  );
};
export default ChatList;
