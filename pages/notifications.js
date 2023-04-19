import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import NotificationItem from "../components/NotificationItem";

const NotificationsPage = () => {
  // Example notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      message: "John liked your profile",
      time: "3 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      type: "message",
      message: "You have a new message from Sarah",
      time: "10 minutes ago",
      isRead: true,
    },
    {
      id: 3,
      type: "match",
      message: "You matched with Alex",
      time: "1 hour ago",
      isRead: false,
    },
  ]);

  // Function to mark notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <>
       <Container className="mt-4">
      <h1>Notifications</h1>
      <ListGroup>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            markAsRead={markAsRead}
          />
        ))}
      </ListGroup>
    </Container> 
    </>
    
  );
};

export default NotificationsPage;
