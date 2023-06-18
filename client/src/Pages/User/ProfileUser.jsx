import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Icon from "../../assets/waysfood/Icon.svg";
import Profile from "../../assets/waysfood/profile.png";
import { useContext } from "react";
import { UserContext } from "../../utils/context/userContext";
const DetailProfilePartner = () => {
  const navigate = useNavigate()
  const handleButtonProfile = () => {
    navigate("/EditProfile")
  }
  const [state] = useContext(UserContext)
  return (
    <>
      <Container className="ProfileUser">
        <Row >
          <Col className="textProfile" >Profile</Col>
          <Col className="textProfile" >History Transaction</Col>
        </Row>
        <Row className="divProfile">

          <Col >
            <Row >
              <Col md={4}>
                <img src={state.user.image} alt="" className="imageProfile" />
              </Col>
              <Col md={4} className="detailProfile">
                <div>
                  <h5>Name Partner</h5>
                  <p>{state.user.fullname}</p>
                </div>
                <div>
                  <h5>Email</h5>
                  <p>{state.user.email}</p>
                </div>
                <div>
                  <h5>Phone</h5>
                  <p>{state.user.phone}</p>
                </div>
              </Col>
            </Row>
            <Col md={12} >
              <button onClick={handleButtonProfile}>Edit Profile</button>
            </Col>
          </Col>
          <Col >

            <Row className="cardHistory">
              <Col md={7} >
                <p className="pName" style={{ marginBottom: "4px" }}>Nama</p>
                <p className="pDate" style={{ marginBottom: "14px" }}><span>Hari</span>Tanggal</p>
                <p className="pTotal">Total : Rp </p>
              </Col>
              <Col md={5}>
                <img src={Icon} alt="" />
                <div className="historyStatus">
                  <p>Status</p>
                </div>
              </Col>
            </Row>

          </Col>
        </Row>

      </Container>
    </>
  );
};

export default DetailProfilePartner
  ;
