import { markAsRead } from "@/actions/notificationActions";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge, Dropdown, Nav, NavDropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function NotificationItem() {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  // Listen for changes in messages when a chat is opened
  useEffect(() => {
    // Use onSnapshot to listen for changes in the messages collection for this chat
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          `notification/${getAuth().currentUser.uid}/notifications`
        ),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        const notifications = [];
        // Loop through each document in the messages collection and add it to the messages array
        querySnapshot.forEach((doc) => {
          notifications.push({ ...doc.data(), id: doc.id });
        });
        setNotifications([...notifications]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleRead = (id) => {
    {
      dispatch(markAsRead(id));
    }
  };
  return (
    <NavDropdown
      title={
        <>
          <FaBell className="me-1" />
          {notifications.filter((n) => !n.read).length > 0 && (
            <Badge
              bg="danger"
              style={{
                fontSize: "8px",
                marginLeft: "-5px",
              }}
            >
              {notifications.filter((n) => !n.read).length}
            </Badge>
          )}
        </>
      }
      ali
      align="end"
      menuAlign="end"
      id="basic-nav-dropdown"
      className="py-1"
    >
      {notifications.length === 0 && (
        <NavDropdown.Item disabled>No notifications yet</NavDropdown.Item>
      )}
      {notifications.map((notification) => (
        <>
          <Dropdown.Item
            key={notification.id}
            onClick={() => handleRead(notification.id)}
            className={`fw-bold ${notification.read ? "text-muted" : ""}`}
          >
            {notification.message}
          </Dropdown.Item>
        </>
      ))}
    </NavDropdown>
  );
}
