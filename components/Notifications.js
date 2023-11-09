import { markAsRead } from "@/actions/notificationActions";
import { db } from "@/utils/firebase";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Badge, Dropdown, Nav, NavDropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function UseNotifications() {
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
  const notification = (<>

    {notifications.length === 0 && (
      <div className="bg-transparent p-3 inline-flex w-full cursor-pointer mt-3"  >
        <FontAwesomeIcon icon={faBell} size="xs" className={`inline-block   text-gray-500   h-12 w-12 rounded-full ring-2 ring-white `} />
        <div className="w-4/5  mx-2">
          <span className="font-poppins font-bold text-ms">
            No notifications
          </span>
          <span className="font-poppins font-bold text-xs block w-80 text-ellipsis whitespace-nowrap overflow-hidden">
            You currently have no notifications
          </span>
        </div>
      </div>
    )}
    {notifications.map((notification) => (
      <>
        <div key={notification.id}
          onClick={() => handleRead(notification.id)} className="bg-transparent p-3 inline-flex w-full cursor-pointer mt-3"  >
          <FontAwesomeIcon icon={faBell} size="xs" className={`inline-block ${notification.read ? "text-gray-500" : "text-rose-500"}  h-12 w-12 rounded-full ring-2 ring-white `} />
          <div className="w-4/5  mx-2">
            <span className="font-poppins font-bold text-ms">
              {notification.title}
            </span>
            <span className="font-poppins font-bold text-xs block w-40 text-ellipsis whitespace-nowrap overflow-hidden">
              {notification.message}
            </span>
          </div>
        </div>
      </>
    ))}
  </ >
  );
  return {
    notificationNumber: notifications.filter((n) => !n.read).length, notification
  }

}
