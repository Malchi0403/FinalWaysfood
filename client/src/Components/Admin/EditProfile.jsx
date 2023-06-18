import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../config/query";
import { editProfile } from "../../utils/profile";
import { distance } from "@turf/turf"
import Map from "../Map";
const EditProfile = () => {
  const [location, setLocation] = useState({ lat: -6.402484, lng: 106.794243 })
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: -6.175110, lng: 106.865036 });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const { lat, lng } = event;
    setSelectedLocation({ lat, lng });
  };

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleMapModalClose = () => {
    setShowMap(false);
  };

  const handleMapModalSave = () => {

    setShowMap(false);
  };

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

    const loc = `${selectedLocation.lat}, ${selectedLocation.lng}`
    console.log(loc)
    e.preventDefault();
    const formData = new FormData();
    formData.set("fullname", userUpdateData.fullname);
    formData.set("email", userUpdateData.email);
    formData.set("location", loc);
    formData.set("phone", userUpdateData.phone);
    formData.set("image", userUpdateData.image[0], userUpdateData.image[0].name);
    const result = postForm.mutate(formData);


  };

  const calculateDistance = (startLng, startLat, endLng, endLat) => {
    const startPoint = ([startLng, startLat])
    const endPoint = ([endLng, endLat])
    const option = { units: 'kilometers' };
    const dist = distance(startPoint, endPoint, option)
    return dist
  }
  const loc = `${selectedLocation?.lat}, ${selectedLocation?.lng}`
  const locationVal = loc.toString
  console.log(loc, "ini loc")
  console.log(selectedLocation, "ini pencobaan")
  const [distances, setDistances] = useState()

  const startLng = -74.005974;
  const startLat = 40.712776;
  const endLng = -118.243683;
  const endLat = 34.052235;
  const calculatedDistance = calculateDistance(loc.split(",")[1], loc.split(",")[0], 106.91914366287244, -6.177908904782766)

  console.log(calculatedDistance.toFixed(2));
  useEffect(() => {
    setDistances()
  }, [])

  return (
    <>
      <Modal size="xl" show={showMap} onHide={handleMapModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Location on Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Map
            defaultCenter={mapCenter}
            defaultZoom={13}
            selectedLocation={selectedLocation}
            handleMapClick={handleMapClick}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleMapModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMapModalSave}>
            Save Location
          </Button>
        </Modal.Footer>
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
              value={userUpdateData.location}
              onChange={handleInputChange}
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
