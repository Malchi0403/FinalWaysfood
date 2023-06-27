import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { APILOC } from "../../config/api";
import { useCustomMutation } from "../../config/query";
import { UserContext } from "../../utils/context/userContext";
import { editProfile } from "../../utils/profile";
import Map from "../Map";
const EditProfile = () => {
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [state, _] = useContext(UserContext)


  const getLocation = (lats, lngs) => {
    APILOC.get(`/reverse?format=json&lat=${lats}&lon=${lngs}`).then(
      (response) => {
        console.log(response, "ini response");
        setSelectedLocation(response?.data?.display_name);
      }
    );
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(lat, lng, "ini lat n lang")
    setLat(lat);
    setLng(lng);
  };

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleMapModalClose = () => {
    setShowMap(false);
  };

  const latUser = state?.user.location.split(",")[0]
  const lngUser = state?.user.location.split(",")[1]
  useEffect(() => {
    if (lat && lng) {
      getLocation(lat, lng);
      console.log("engga ini yg terender");
    } else if (latUser && lngUser) {
      getLocation(
        parseFloat(latUser),
        parseFloat(lngUser)
      );
      console.log("ini terrednder");
    }
  }, [lat, lng, state?.user]);

  const loc = `${lat}, ${lng}`;

  const [userUpdateData, setUserUpdateData] = useState({
    fullname: "",
    email: "",
    location: "",
    phone: "",
    image: null,
  });
  const postForm = useCustomMutation("patch", editProfile);


  const handleInputChange = (e) => {
    setUserUpdateData({
      ...userUpdateData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };
  const updateUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("fullname", userUpdateData.fullname);
    formData.set("email", userUpdateData.email);
    formData.set("phone", userUpdateData.phone);
    if (userUpdateData?.image[0].name) {
      formData.set("image", userUpdateData?.image[0], userUpdateData?.image[0].name);
    } else {
      formData.set("image", "");
    }
    formData.set("location", loc);
    const result = postForm.mutate(formData);
  };




  return (
    <>
      <Modal size="xl" show={showMap} onHide={handleMapModalClose}>
        <Modal.Body>
          <Map
            selectedLat={lat}
            selectedLng={lng}
            handleMapClick={(e) => handleMapClick(e)}
          />
        </Modal.Body>
      </Modal>
      <Container style={{ margin: "80px auto" }}>
        <h4
          className="addProduct"
        >
          Edit Profile Partner
        </h4>

        <Form onSubmit={(e) => updateUser(e)}>
          <Form.Group className="d-flex justify-content-between" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              name="fullname"
              value={userUpdateData.fullname}
              onChange={handleInputChange}
              placeholder="Name Partner"
              style={{ width: "69%", backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
            />
            <Form.Control
              type="file"
              style={{ width: "30%", backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
              name="image"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">

            <Form.Control
              type="email"
              name="email"
              value={userUpdateData.email}
              onChange={handleInputChange}
              placeholder="Email"
              style={{ backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">

            <Form.Control
              type="text"
              name="phone"
              value={userUpdateData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              style={{ backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-between mt-3" controlId="exampleForm.ControlInput1">

            <Form.Control
              type="text"
              name="location"
              onChange={(e) => handleInputChange(e)}
              defaultValue={selectedLocation}
              placeholder="Location"
              style={{ width: "75%", backgroundColor: "#D2D2D240", border: "2px solid #766C6C", height: "50px" }}
            />
            <div className="MapButton">
              <button type="button"
                onClick={handleMapButtonClick}
              >
                Select On Map <FontAwesomeIcon icon={faMapLocation} />
              </button>
            </div>
          </Form.Group>

          <div className="buttonAddProduct mt-5">
            <button
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </Container>

    </>
  );
};

export default EditProfile;
