import { db } from "@/utils/firebase";
import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { calculateDistance } from "@/utils/helpers";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import OverLayLoading from "@/components/OverLayLoading";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const MatchPage = ({ user }) => {
  const [potentialMatches, setPotentialMatches] = useState([]);
  const firestore = db;

  const usersCollection = collection(firestore, "users");
  const [match, setMatch] = useState(null);
  const [noMatches, setNoMatches] = useState(false);

  useEffect(() => {
    if (noMatches) {
      toast.info("No more matches come back later");
    }

    return () => {};
  }, [noMatches]);

  useEffect(() => {
    // Fetch users from Firestore
    const fetchUsers = async () => {
      //console.log("Fetching potential matches...");

      try {
        // Query for all users in the "users" collection
        const querySnapshot = await getDocs(usersCollection);

        // Map the documents to a plain object containing the document ID and data
        const users = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          // Filter the users based on the current user's preferences and swiping history
          .filter((potentialMatch) => {
            // Check if the potential match has a location
            if (!potentialMatch.location) {
              return false;
            }

            // Calculate the distance between the potential match and the current user
            const distance = calculateDistance(
              potentialMatch.location,
              user.location
            );

            // Check if the potential match is within the desired distance
            if (distance > user.distance) {
              return false;
            }

            // Get the potential match's age
            const age = potentialMatch.age;

            // Check if the potential match's age is within the desired range
            const [minAge, maxAge] = user.ageRange
              .split("-")
              .map((value) => parseInt(value));
            if (age < minAge || age > maxAge) {
              return false;
            }

            // Check if the potential match's gender matches the current user's orientation
            if (user.orientation !== potentialMatch.gender) {
              console.info(
                `Current user (${user.gender}) is looking for ${user.orientation}, but potential match (${potentialMatch.gender}) is the same gender.`
              );
              return false;
            }

            // Check if the potential match has already been swiped on by the current user
            if (user.swipingHistory && user.swipingHistory[potentialMatch.id]) {
              return false;
            }

            // Check if the potential match is the current user
            let uid = getAuth().currentUser.uid;
            if (uid == potentialMatch.id) {
              return false;
            }

            // If the potential match passes all filters, return true
            return true;
          });

        // Set the potential matches state variable
        setPotentialMatches(users);

        if (users.length > 0) {
          // Set the current match to the first potential match
          setMatch(users[0]);
          // Set the "no matches" flag to false
          setNoMatches(false);
        } else {
          // Set the "no matches" flag to true
          setNoMatches(true);
        }
      } catch (error) {
        //console.log("Error getting documents: ", error);
      }
    };

    // Call fetchUsers when the component mounts
    fetchUsers();

    // Unsubscribe here if needed
    return () => {};
  }, []);

  const handleSwipe = async (matchId, swipe) => {
    // Clear current match
    setMatch(null);

    // Get user document and update swiping history
    const usersCollection = collection(db, "users");
    const userId = getAuth().currentUser.uid;
    const userDoc = doc(usersCollection, userId);
    const updatedData = {
      swipingHistory: {
        [matchId]: swipe,
        ...user.swipingHistory,
      },
    };
    await updateDoc(userDoc, updatedData);

    // Check if the user swiped right and the match also swiped right
    if (swipe === "like") {
      const matchDoc = doc(usersCollection, matchId);
      const matchDocData = (await getDoc(matchDoc)).data();
      if (
        matchDocData.swipingHistory &&
        matchDocData.swipingHistory[userId] === "like"
      ) {
        // Update both users' matches arrays
        const userMatches = user.matches
          ? [...user.matches, matchId]
          : [matchId];
        const matchMatches = matchDocData.matches
          ? [...matchDocData.matches, userId]
          : [userId];
        const updatedUserData = { matches: userMatches };
        const updatedMatchData = { matches: matchMatches };
        await updateDoc(userDoc, updatedUserData);
        await updateDoc(matchDoc, updatedMatchData);

        // Display match success message
        const fullName = `${matchDocData.firstName} ${matchDocData.lastName}`;
        toast.success(`Matched with ${fullName}`);
      }
    }

    // Remove match from potential matches and display next match (if available)
    setPotentialMatches((matches) => {
      const remainingMatches = matches.filter((match) => match.id !== matchId);
      if (remainingMatches.length > 0) {
        setMatch(remainingMatches[0]);
        setNoMatches(false);
      } else {
        setNoMatches(true);
      }
      return remainingMatches;
    });
  };

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={8} lg={6} xl={4}>
          <div
            className={`login-box content ${match !== null && "fade-in"}`}
            style={
              false
                ? { boxShadow: "none", padding: "20px 0px" }
                : { padding: "0px 0px", border: "2px solid #36d7b7" }
            }
          >
            {match ? (
              <Card className="m-0 py-n2" style={{ borderRadius: "10px" }}>
                <Carousel  pause='hover' prevLabel={null} nextLabel={null} indicators={false}>
                    {match.pictures.map((picture,index) => {
                    return ( <Carousel.Item key={index}>
                        <Card.Img
                        height={300}
                        fill
                          variant="top"
                          className="d-block w-100"
                          src={picture}
                          style={{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        />
                      </Carousel.Item>);
                    })}
                  </Carousel>
                <Card.Body>
                  
                  <Card.Title className="text-black">{`${match.firstName} ${match.lastName}`}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {`${match.age} years old, ${calculateDistance(
                      match.location,
                      user.location
                    )} away`}
                  </Card.Subtitle>
                  <Card.Text>
                    {match.aboutMe ??
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sediquam erat volutpat.      "}
                  </Card.Text>

                  <Button
                    variant="danger"
                    onClick={() => handleSwipe(match.id, "dislike")}
                  >
                    <FaHeartBroken />
                  </Button>
                  <Button
                    className="ml-2"
                    variant="success"
                    onClick={() => handleSwipe(match.id, "like")}
                  >
                    <FaHeart />
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              !noMatches && <OverLayLoading />
            )}
          </div>{" "}
          {noMatches && (
            <Card>
              <Card.Body>
                <h2 className="text-center text-black">No more matches</h2>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MatchPage;
