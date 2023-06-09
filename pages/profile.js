import { logout, uploadFormToFirebase } from "@/actions/authActions";
import Layout from "@/components/Layout";
import OverLayLoading from "@/components/OverLayLoading";
import { getUserLocation } from "@/utils/helpers";
import { withAuth } from "@/utils/withAuth";
import Link from "next/link";
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
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [distance, setDistance] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [pictures, setPictures] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const profileCompleted = useSelector((state) => state.auth.profileCompleted);
  const router = useRouter();

  const [location, setLocation] = useState(null);

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    return () => {
      getUserLocation().then((value) => {
        setLocation(value);
      });
    };
  }, []);

  if (profileCompleted) {
    router.push("/");
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate form fields
    const validatinErrors = {};

    if (!gender) {
      validatinErrors.gender = "Please select your gender";
    }

    if (!orientation) {
      validatinErrors.orientation = "Please select your preferred orientation";
    }

    if (!firstName.trim()) {
      validatinErrors.firstName = "Please enter your first name";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      validatinErrors.firstName = "First name should only contain letters";
    } else if (firstName.length < 2 || firstName.length > 30) {
      validatinErrors.firstName =
        "First name should be between 2 and 30 characters long";
    }

    if (!lastName.trim()) {
      validatinErrors.lastName = "Please enter your last name";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      validatinErrors.lastName = "Last name should only contain letters";
    } else if (lastName.length < 2 || lastName.length > 30) {
      validatinErrors.lastName = "Last name should be between 2 and 30 characters long";
    }

    if (!age) {
      validatinErrors.age = "Please enter your age";
    } else if (age < 18) {
      validatinErrors.age = "You must be at least 18 years old to use this app";
    } else if (!/^\d+$/.test(age)) {
      validatinErrors.age = "Age should only contain numbers";
    }

    if (!minAge) {
      validatinErrors.minAge = "Please enter the minimum age range";
    } else if (!/^\d+$/.test(minAge)) {
      validatinErrors.minAge = "Minimum age should only contain numbers";
    }

    if (!maxAge) {
      validatinErrors.maxAge = "Please enter the maximum age range";
    } else if (!/^\d+$/.test(maxAge)) {
      validatinErrors.maxAge = "Maximum age should only contain numbers";
    }

    if (Number(minAge) > Number(maxAge)) {
      validatinErrors.ageRange = "Minimum age should be less than maximum age";
    }

    if (!distance) {
      validatinErrors.distance = "Please enter your preferred distance";
    } else if (!/^\d+$/.test(distance)) {
      validatinErrors.distance = "Distance should only contain numbers";
    } else if (distance < 0) {
      validatinErrors.distance = "Distance should be a non-negative number";
    }

    if (!pictures || pictures.length < 1) {
      validatinErrors.pictures = "Please upload at least one picture";
    }

    if (!aboutMe) {
      validatinErrors.aboutMe = "Please provide some information about yourself";
    } else if (aboutMe.length < 10) {
      validatinErrors.aboutMe = "About me should be at least 10 characters long";
    } else if (aboutMe.length > 200) {
      validatinErrors.aboutMe = "About me should not exceed 200 characters";
    }

    if (Object.keys(validatinErrors).length > 0) {
      // set validatinErrors in state
      setErrors(validatinErrors);
      console.log(validatinErrors)
      return;
    }

    let value = await getUserLocation();
    setLocation(value);

    if (location == null) {
      toast.error(
        "Please allow location access. To do so, please check your browser settings and make sure that location access is enabled for this website."
      );
      return;
    }

    // handle form submission
    dispatch(
      uploadFormToFirebase(
        gender,
        orientation,
        firstName,
        lastName,
        age,
        `${minAge}-${maxAge}`,
        distance,
        pictures,
        location,
        aboutMe
      )
    );
  };

  return (
    <Layout>
      {isLoading && <OverLayLoading />}
      
      <div className="sm:h-[90vh] overflow-y-auto  ">
        <h1 className="text-4xl">
          Find your true <br />
          L❤️VE
        </h1>
        <form onSubmit={handleSubmit} className="text-left">
          <div className="text-left mt-3">
            <label className="mr-4">I am a</label>
            <div className="flex">
              <div className="  items-center mr-4">
                <input
                  type="radio"
                  id="man"
                  checked={gender === "man"}
                  onChange={() => setGender("man")}
                  className="mr-2"
                />
                <label htmlFor="man">Man</label>
              </div>
              <div className="  items-center">
                <input
                  type="radio"
                  id="woman"
                  checked={gender === "woman"}
                  onChange={() => setGender("woman")}
                  className="mr-2"
                />
                <label htmlFor="woman">Woman</label>
              </div>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <hr className="my-3" />
          <div className="text-left">
            <label>Looking for</label>
            <div className="flex">
              <div className=" mr-4 items-center">
                <input
                  type="radio"
                  id="men"
                  checked={orientation === "man"}
                  onChange={() => setOrientation("man")}
                  className="mr-2"
                />
                <label htmlFor="men">Men</label>
              </div>
              <div className="  items-center">
                <input
                  type="radio"
                  id="women"
                  checked={orientation === "woman"}
                  onChange={() => setOrientation("woman")}
                  className="mr-2"
                />
                <label htmlFor="women">Women</label>
              </div>
            </div>

            {errors.orientation && <p className="text-red-500">{errors.orientation}</p>}
          </div>

          <hr className="my-3" />

          <div className="form-group" controlId="formBasicFirstName">
            <label>My first name is</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </div>
          <hr className="my-3" />

          <div className="form-group" controlId="formBasicLastName">
            <label>My last name is</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
          </div>
          <hr className="my-3" />

          <div className="form-group" controlId="formBasicAge">
            <label>My age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
            />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
          <hr className="my-3" />

          <div className="form-group" controlId="formBasicAgeRange">
            <label>My dating range</label>
            <div className="flex">
              <div className="flex-col">
                <input
                type="number"
                className="form-control mr-2"
                placeholder="Min age"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
              />
              {errors.minAge && (
                <p className="text-danger">{errors.minAge}</p>
              )}
              </div>
              <div className="flex-col ml-2"> <input
                type="number"
                className="form-control"
                placeholder="Max age"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
              />
              {errors.maxAge && (
                <p className="text-danger">{errors.maxAge}</p>
              )}
              </div>
              
            </div>
            {errors.ageRange && (
              <p className="text-red-500">{errors.ageRange}</p>
            )}
          </div>
          <hr className="my-3" />

          <div className="form-group" controlId="formBasicDistance">
            <label>My preferred distance is</label>
            <input
              type="number"
              placeholder="Enter distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="form-control"
            />
          </div>
          {errors.distance && (
            <p className="text-red-500">{errors.distance}</p>
          )}
          <hr className="my-3" />

          <div className="form-group" controlId="formBasicAbout">
            <label>About Me</label>
            <textarea
              rows={3}
              placeholder="Tell us about yourself"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="form-control"
            ></textarea>
            {errors.aboutMe && (
              <p className="text-red-500">{errors.aboutMe}</p>
            )}
          </div>
          <hr className="my-3" />

          <div className="form-group" controlId="formBasicPictures">
            <label>And here are my pictures</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPictures([...e.target.files])}
              className="form-control"
            />
            {errors.pictures && (
              <p className="text-red-500">{errors.pictures}</p>
            )}
          </div>

          <hr className="my-3" />

          <div className="text-center mt-4">
            <button
              className="btn-fill bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md mb-4"
              type="submit"
            >
              Save
            </button>
          </div>

        </form>
        <Link href="#"
          onClick={handleSignout} className="text-center block mt-1">
          <span className="text-info">Sign out</span>
        </Link>

      </div>
    </Layout>
  );
};

export default withAuth(QuestionnaireForm);
