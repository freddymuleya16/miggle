import { uploadFormToFirebase } from "@/actions/authActions";
import Layout from "@/components/Layout";
import OverLayLoading from "@/components/OverLayLoading";
import { withAuth } from "@/utils/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const QuestionnaireForm = () => {
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [distance, setDistance] = useState("");
  const [pictures, setPictures] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const profileCompleted = useSelector((state) => state.auth.profileCompleted);
  const rooter = useRouter()

  if(profileCompleted){
    rooter.push('/')
  }
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate form fields
    const errors = {};

    if (!gender) {
      errors.gender = "Please select your gender";
    }

    if (!orientation) {
      errors.orientation = "Please select your preferred orientation";
    }

    if (!firstName.trim()) {
      errors.firstName = "Please enter your first name";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      errors.firstName = "First name should only contain letters";
    } else if (firstName.length < 2 || firstName.length > 30) {
      errors.firstName =
        "First name should be between 2 and 30 characters long";
    }

    if (!lastName.trim()) {
      errors.lastName = "Please enter your last name";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      errors.lastName = "Last name should only contain letters";
    } else if (lastName.length < 2 || lastName.length > 30) {
      errors.lastName = "Last name should be between 2 and 30 characters long";
    }

    if (!age) {
      errors.age = "Please enter your age";
    } else if (age < 18) {
      errors.age = "You must be at least 18 years old to use this app";
    } else if (!/^\d+$/.test(age)) {
      errors.age = "Age should only contain numbers";
    }

    if (!ageRange) {
      errors.ageRange = "Please select your preferred age range";
    }

    if (!distance) {
      errors.distance = "Please enter your preferred distance";
    } else if (!/^\d+$/.test(distance)) {
      errors.distance = "Distance should only contain numbers";
    } else if (distance < 0) {
      errors.distance = "Distance should be a non-negative number";
    }

    if (!pictures || pictures.length < 1) {
      errors.pictures = "Please upload at least one picture";
    }

    if (Object.keys(errors).length > 0) {
      // set errors in state
      setErrors(errors);
      return;
    }
console.log(pictures)
    // handle form submission
    dispatch(uploadFormToFirebase(gender,orientation,firstName,lastName,age,ageRange,distance,pictures))
  };

  return (
    <Layout>
      
        <Col style={{ height: "90vh", overflowY: "auto" }}>
          <h1>
            Find your true <br />
            L❤️VE
          </h1>
          {isLoading ? (
        <OverLayLoading />
      ) : (
          <Form onSubmit={handleSubmit} className="text-left">
            <Form.Group className="text-left">
              <Row>
                <Col>
                  <Form.Label>I am a</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Man"
                    name="gender"
                    id="man"
                    checked={gender === "man"}
                    onChange={() => setGender("man")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Woman"
                    name="gender"
                    id="woman"
                    checked={gender === "woman"}
                    onChange={() => setGender("woman")}
                  />
                </Col>
              </Row>
              {errors.gender && <p className="text-danger">{errors.gender}</p>}
            </Form.Group>
            <hr className="mt-5" />
            <Form.Group className="text-left">
              <Row>
                <Col>
                  <Form.Label>Looking for</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Men"
                    name="orientation"
                    id="men"
                    checked={orientation === "men"}
                    onChange={() => setOrientation("men")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Women"
                    name="orientation"
                    id="women"
                    checked={orientation === "women"}
                    onChange={() => setOrientation("women")}
                  />
                </Col>
              </Row>
              {errors.orientation && (
                <p className="text-danger">{errors.orientation}</p>
              )}
            </Form.Group>
            <hr className="mt-5" />

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>My first name is</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName}</p>
              )}
            </Form.Group>
            <hr className="mt-5" />

            <Form.Group controlId="formBasicLastName">
              <Form.Label>My last name is</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName}</p>
              )}
            </Form.Group>
            <hr className="mt-5" />

            <Form.Group controlId="formBasicAge">
              <Form.Label>My age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {errors.age && <p className="text-danger">{errors.age}</p>}
            </Form.Group>
            <hr className="mt-5" />

            <Form.Group controlId="formBasicAgeRange">
              <Form.Label>My dating range</Form.Label>
              <Form.Control
                as="select"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
              >
                <option value="">Select age range</option>
                <option value="18-25">18-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>

                <option value="46-55">46-55</option>
                <option value="56+">56+</option>
              </Form.Control>
              {errors.ageRange && (
                <p className="text-danger">{errors.ageRange}</p>
              )}
            </Form.Group>
            <hr className="mt-5" />

            <Form.Group controlId="formBasicDistance">
              <Form.Label>My prefered distance is</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </Form.Group>
            {errors.distance && (
              <p className="text-danger">{errors.distance}</p>
            )}
            <hr className="mt-5" />

            <Form.Group controlId="formBasicPictures">
              <Form.Label>And here are my pictures</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPictures(e.target.files)}
              />
              {errors.pictures && (
                <p className="text-danger">{errors.pictures}</p>
              )}
            </Form.Group>
            <hr className="mt-5" />

            <Button type="submit" className="btn btn-info">
              Done
            </Button>
          </Form> )}
        </Col>
     
    </Layout>
  );
};
export default withAuth(QuestionnaireForm);
