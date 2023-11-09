import { getAuth } from "firebase/auth";
import React from "react";
import { Card } from "react-bootstrap";

function ChatItem({ message }) {
  const { sender, text, timestamp } = message;

  const messageDate = new Date(timestamp.seconds * 1000).toLocaleString();

  const isSent = sender === getAuth().currentUser.uid; // replace "current_user_id" with actual user ID

  return (
    <Card
      bg={isSent ? "info" : "warning"}
      text="white"
      className="my-2 p-0"
      style={{ borderRadius: "10px",width:'fit-content' }}
  
    >
      <Card.Body className="p-2">
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}



export default ChatItem;
