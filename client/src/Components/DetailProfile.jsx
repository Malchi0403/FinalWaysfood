import { Col, Container, Row } from "react-bootstrap";
import UserImage from "../assets/images/UserImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import IconUser from "../assets/images/iconUser.png";
import { useCustomQuery } from "../config/query";
import { User } from "../utils/profile";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/context/userContext";
import ModalProfile from "./ModalProfile";

const DetailProfile = ({ data }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);
  const [showProfile, setShowProfile] = useState(false);

  const handleClose = () => {
    setShowProfile(false);
  };

  const handleShowProfile = () => {
    handleClose(true);
    setShowProfile(true);
  };

  return (
    <Container>
      <div
        className="ms-auto me-auto styleProfile"
        style={{
          width: "785px",
          height: "453px",
          backgroundColor: "#fff",
          marginTop: "128px",
        }}
      >
        <Row>
          <Col>
            <h3
              className="mt-3 ms-4"
              style={{ fontSize: "36px", fontWeight: "900", color: "#050505" }}
            >
              Personal Info
            </h3>
            <div className="d-flex ms-4 mt-5 ">
              <img
                src={IconUser}
                alt=""
                style={{ height: "30px", width: "30px", marginTop: "8px" }}
              />
              <div className="ms-3">
                <h6
                  style={{
                    marginBottom: "2px",
                    fontSize: "14px",
                    fontWeight: "900",
                    color: "#050505",
                  }}
                >
                  {profile?.fullname}
                </h6>
                <p className="colorStyleProfile">full name</p>
              </div>
            </div>
            <div className="d-flex ms-4 mt-3">
              <span>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ height: "30px", width: "30px", marginTop: "7px" }}
                  className="colorStyleProfile"
                />
              </span>
              <div className="ms-3">
                <h6
                  style={{
                    marginBottom: "2px",
                    fontSize: "14px",
                    fontWeight: "900",
                    color: "#050505",
                  }}
                >
                  {profile?.email}
                </h6>
                <p className="colorStyleProfile">Email</p>
              </div>
            </div>
            <div className="d-flex ms-4 mt-3">
              <span>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ height: "30px", width: "30px", marginTop: "7px" }}
                  className="colorStyleProfile"
                />
              </span>
              <div className="ms-3">
                <h6
                  style={{
                    marginBottom: "2px",
                    fontSize: "14px",
                    fontWeight: "900",
                    color: "#050505",
                  }}
                >
                  {profile?.phone}
                </h6>
                <p className="colorStyleProfile">Phone</p>
              </div>
            </div>
            <div className="d-flex ms-4 mt-3">
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ height: "30px", width: "30px", marginTop: "7px" }}
                  className="colorStyleProfile"
                />
              </span>
              <div className="ms-3">
                <h6
                  style={{
                    marginBottom: "2px",
                    fontSize: "14px",
                    fontWeight: "900",
                    color: "#050505",
                  }}
                >
                  {profile?.address}
                </h6>
                <p className="colorStyleProfile">Address</p>
              </div>
            </div>
          </Col>
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "26px 24px 13px 12px",
              }}
            >
              <img src={UserImage} alt="" style={{ borderRadius: "5px" }} />
            </div>
            <button className="buttonProfile ms-5" onClick={handleShowProfile}>
              Change Photo Profile
            </button>
          </Col>
        </Row>
      </div>
      <ModalProfile show={showProfile} onHide={handleClose} />
    </Container>
  );
};

export default DetailProfile;
