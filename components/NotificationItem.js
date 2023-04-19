import Image from "next/image";
import React from "react";
import { Badge, Button, Media } from "react-bootstrap";

const NotificationItem = ({ message, time, read }) => {
  return (
    <div className={`py-3 media ${read ? "" : "bg-light"}`}>
      
      {/* <Image
      src="https://via.placeholder.com/64"
      alt="notification sender"
      width={400}
      height={400}
      className="mr-3 rounded-circle"
      /> */}
      <div className="media-body">
        <h5>{message}</h5>
        <p className="text-muted mb-0">{time}</p>
      </div>
      {!read && (
        <div className="ml-3">
          <Badge variant="primary">New</Badge>
        </div>
      )}
      <Button variant="link" className="ml-3">
        View
      </Button>
    </div>
  );
};

export default NotificationItem;
