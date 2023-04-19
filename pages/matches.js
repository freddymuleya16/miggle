import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
//import { db } from "../../firebase/firebase";

const MatchPage = ({ user }) => {
  const [potentialMatches, setPotentialMatches] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("users")
  //     .where("gender", "==", user.preference)
  //     .where("preference", "==", user.gender)
  //     .onSnapshot((snapshot) => {
  //       setPotentialMatches(
  //         snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //       );
  //     });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user.gender, user.preference]);

  const handleSwipe = (matchId, swipe) => {
    // update user's swiping history
    db.collection("users")
      .doc(user.id)
      .update({
        swipingHistory: {
          [matchId]: swipe,
          ...user.swipingHistory,
        },
      });

    // remove match from potential matches
    setPotentialMatches((matches) =>
      matches.filter((match) => match.id !== matchId)
    );
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {potentialMatches.map((match) => (
        <Card key={match.id} className="m-3">
          <Card.Img variant="top" src={match.pictures[0]} />
          <Card.Body>
            <Card.Title>{`${match.firstName} ${match.lastName}`}</Card.Title>
            <Card.Text>
              {`${match.age} years old, ${match.distance} away`}
            </Card.Text>
            <Button
              variant="success"
              onClick={() => handleSwipe(match.id, "like")}
            >
              Like
            </Button>
            <Button
              variant="danger"
              onClick={() => handleSwipe(match.id, "dislike")}
            >
              Dislike
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MatchPage;
