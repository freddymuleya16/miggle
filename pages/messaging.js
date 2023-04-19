import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const MessagingPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "John", text: "Hey there!" },
    { id: 2, sender: "Jane", text: "Hi John!" },
    { id: 3, sender: "John", text: "How's it going?" },
    { id: 4, sender: "Jane", text: "Pretty good, thanks! And you?" },
    { id: 5, sender: "John", text: "Can't complain!" },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      id: messages.length + 1,
      sender: "John",
      text: message,
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <>
        <Container>
      <Row>
        <Col>
          <h1>Messaging</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <h2>Contacts</h2>
          <ul>
            <li>Jane</li>
            <li>Mike</li>
            <li>Sara</li>
            <li>Tom</li>
          </ul>
        </Col>
        <Col md={8}>
          <h2>Conversation with Jane</h2>
          <div style={{ height: "400px", overflowY: "scroll" }}>
            {messages.map((message) => (
              <div key={message.id}>
                {message.sender === "John" ? (
                  <div style={{ textAlign: "right" }}>{message.text}</div>
                ) : (
                  <div style={{ textAlign: "left" }}>{message.text}</div>
                )}
              </div>
            ))}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
    
  );
};

export default MessagingPage;
