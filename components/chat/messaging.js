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
  orderBy,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import ChatItem from "./messages";

const MessagingPage = (props) => {
  // Define a state for the message
  const [message, setMessage] = useState("");

  // Define a state for the list of matches
  const [matches, setMatches] = useState([]);

  // Define a state for the list of messages
  const [messages, setMessages] = useState([]);

  // Define a state for the chat document reference
  const [chatRef, setChatRef] = useState(null);

  const [current, setCurrent] = useState(null);

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
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages([...messages]);
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
        messages: [],
      });
      return newChatRef.id;
    }
  };

  // Get the user documents for a list of user IDs
  async function getUsers(userIds) {
    const userDocs = [];
    const q = query(
      collection(db, "users"),
      where(documentId(), "in", userIds)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userDocs.push({ ...doc.data(), id: doc.id });
    });
    return userDocs;
  }

  // Get the user matches and store them in the state
  useEffect(() => {
    getUsers(props.user.matches).then((users) => {
      setMatches([...users]);
    });
  }, [props.user.matches]);

  // Add a new message to the messages collection for a chat
  const addMessage = async (chatId, message) => {
    try {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      await addDoc(messagesRef, message);
      console.log("Message added successfully!");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  // Handle the form submission to send a new message
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = {
      sender: props.user.id,
      text: message,
      timestamp: serverTimestamp(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
    await addMessage(chatRef, newMessage);
  };

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} lg={6} xl={4}>
          <div
            className={`login-box content  fade-in `}
            style={
              false
                ? { boxShadow: "none", padding: "20px 0px" }
                : { padding: "0px 0px", border: "2px solid #36d7b7" }
            }
          >
            <div
              style={{ overflowX: "auto", borderBottom: "1px solid #dee2e6" }}
            >
              <div style={{ width: "max-content" }}>
                <Nav
                  variant="tabs"
                  activeKey="/home"
                  onSelect={async (selectedKey) => {
                    let cur = matches.find((x) => x.id == selectedKey);
                    setCurrent(` ${cur.firstName} ${cur.lastName}`);
                    setChatRef(
                      await getChatDocument(props.user.id, selectedKey)
                    );
                  }}
                >
                  {matches.length > 0 &&
                    matches.map((match) => {
                      console.log(match.lastName);
                      return (
                        <Nav.Item key={match.id}>
                          <Nav.Link
                            href={match.id}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <Image
                              src={match.pictures[0]}
                              width={25}
                              height={25}
                              alt=""
                              className="rounded-circle"
                              style={{ objectFit: "cover" }}
                            />
                            <span className="text-dark">
                              {" "}
                              {match.firstName} {match.lastName}
                            </span>
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  {/* <Nav.Item>
                    <Nav.Link href="#home">
                      <Image
                        src={props.user.pictures[0]}
                        width={25}
                        height={25}
                        alt=""
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                      <span>
                        {" "}
                        {props.user.firstName} {props.user.lastName}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">
                      {" "}
                      <Image
                        src={props.user.pictures[0]}
                        width={25}
                        height={25}
                        alt=""
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                      <span>
                        {" "}
                        {props.user.firstName} {props.user.lastName}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">
                      {" "}
                      <Image
                        src={props.user.pictures[0]}
                        width={25}
                        height={25}
                        alt=""
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                      <span>
                        {" "}
                        {props.user.firstName} {props.user.lastName}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">
                      {" "}
                      <Image
                        src={props.user.pictures[0]}
                        width={25}
                        height={25}
                        alt=""
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                      <span>
                        {" "}
                        {props.user.firstName} {props.user.lastName}
                      </span>
                    </Nav.Link>
                  </Nav.Item> */}
                </Nav>
              </div>
            </div>
            <Row className="p-2">
              <Col>
                <h5 className="text-dark text-left mt-0 mb-2">{current}</h5>

                <div
                  style={{ height: "300px", overflowY: "scroll", width: "" }}
                >
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.sender === props.user.id ? (
                        <div
                          style={{ textAlign: "right" }}
                          className="text-dark d-flex justify-content-end"
                        >
                          <ChatItem message={message} />
                        </div>
                      ) : (
                        <div
                          style={{ textAlign: "left" }}
                          className="text-dark"
                        >
                          <ChatItem message={message} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {chatRef && (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formMessage">
                      <Row className="d-flex justify-content-center m-0">
                        <Form.Control
                          className="d-flex  mr-2 w-75"
                          type="text"
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                        />
                        <Button variant="primary" type="submit">
                          Send
                        </Button>
                      </Row>
                    </Form.Group>
                  </Form>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MessagingPage;
